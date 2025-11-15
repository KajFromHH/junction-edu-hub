import { useState } from 'react';
import { GameMap } from './components/GameMap';
import { CharacterStats } from './components/CharacterStats';
import { InteractionModal } from './components/InteractionModal';
import { EventModal } from './components/EventModal';
import { GameOver } from './components/GameOver';
import { StartMenu } from './components/StartMenu';
import { EndGame } from './components/EndGame';
import { ResultModal } from './components/ResultModal';
import { MenuModal } from './components/MenuModal';
import { PersonalInfoPage } from './components/PersonalInfoPage';
import { CharacterDesignPage } from './components/CharacterDesignPage';
import { QuizPage } from './components/QuizPage';
import { GraduationPage } from './components/GraduationPage';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export interface GameState {
  age: number;
  cash: number;
  happiness: number;
  entertainment: number;
  anxiety: number;
  safety: number;
  job: string;
  salary: number;
  debt: number;
  savings: number;
  currentLocation: string | null;
  characterName?: string;
  characterAvatar?: string;
  characterGender?: string;
  characterSkinColor?: string;
  quizAnswers?: Record<string, string>;
  quizScore?: number;
  storylineTitle?: string;
  history: {
    age: number;
    cash: number;
    savings: number;
    debt: number;
    totalSpent: number;
  }[];
}

export interface Location {
  id: string;
  name: string;
  icon: string;
}

type GameScreen = 'start' | 'personalInfo' | 'characterDesign' | 'quiz' | 'graduation' | 'playing' | 'gameOver' | 'end';

function App() {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('start');
  const [gameState, setGameState] = useState<GameState>({
    age: 18,
    cash: 500,
    happiness: 75,
    entertainment: 50,
    anxiety: 30,
    safety: 70,
    job: 'Part-time Cashier',
    salary: 1200,
    debt: 0,
    savings: 0,
    currentLocation: 'home',
    characterName: 'Helka',
    characterAvatar: '🧑', // Third emoji option from CharacterDesignPage
    characterGender: 'other',
    characterSkinColor: 'medium', // Middle option from skin color selection
    storylineTitle: 'Entrepreneur',
    history: [],
  });

  // Temporary storage for account creation flow
  const [playerName, setPlayerName] = useState('');
  const [playerAge, setPlayerAge] = useState(0);

  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [currentEvent, setCurrentEvent] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [lastChoice, setLastChoice] = useState<any>(null);
  const [showMenu, setShowMenu] = useState(false);

  const handleLogin = () => {
    setCurrentScreen('playing');
  };

  const handleCreateAccount = () => {
    setCurrentScreen('personalInfo');
  };

  const handlePersonalInfoNext = (name: string, age: number) => {
    setPlayerName(name);
    setPlayerAge(age);
    setCurrentScreen('characterDesign');
  };

  const handleCharacterDesignNext = (characterName: string, avatar: string, gender: string, skinColor: string) => {
    setGameState(prev => ({
      ...prev,
      characterName,
      characterAvatar: avatar,
      characterGender: gender,
      characterSkinColor: skinColor,
    }));
    setCurrentScreen('quiz');
  };

  const handleQuizComplete = (answers: Record<string, string>, score: number, storylineTitle: string) => {
    setGameState(prev => ({
      ...prev,
      quizAnswers: answers,
      quizScore: score,
      storylineTitle: storylineTitle,
    }));
    setCurrentScreen('graduation');
  };

  const handleGraduationComplete = () => {
    setCurrentScreen('playing');
  };

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location);
  };

  const handleCloseInteraction = () => {
    setSelectedLocation(null);
  };

  const handleChoice = (choice: any) => {
    // Update game state based on choice
    setGameState(prev => {
      const newState = { ...prev };
      
      const previousCash = prev.cash;
      
      // Handle both moneyChange (from scenarios) and cashChange (legacy)
      if (choice.moneyChange) newState.cash += choice.moneyChange;
      if (choice.cashChange) newState.cash += choice.cashChange;
      if (choice.happinessChange) newState.happiness = Math.min(100, Math.max(0, newState.happiness + choice.happinessChange));
      if (choice.entertainmentChange) newState.entertainment = Math.min(100, Math.max(0, newState.entertainment + choice.entertainmentChange));
      if (choice.anxietyChange) newState.anxiety = Math.min(100, Math.max(0, newState.anxiety + choice.anxietyChange));
      if (choice.safetyChange) newState.safety = Math.min(100, Math.max(0, newState.safety + choice.safetyChange));
      if (choice.debtChange) newState.debt = Math.max(0, newState.debt + choice.debtChange);
      if (choice.savingsChange) newState.savings = Math.max(0, newState.savings + choice.savingsChange);
      
      // Apply automatic financial stress/wellbeing effects based on debt and cash
      const applyFinancialStressEffects = () => {
        let anxietyChange = 0;
        let safetyChange = 0;
        let happinessChange = 0;
        let entertainmentChange = 0;

        // HIGH DEBT effects (negative)
        if (newState.debt > 10000) {
          anxietyChange += 15; // Very high stress
          safetyChange -= 20; // Feel very unsafe
          happinessChange -= 15; // Very unhappy
        } else if (newState.debt > 5000) {
          anxietyChange += 10; // High stress
          safetyChange -= 15; // Feel unsafe
          happinessChange -= 10; // Unhappy
        } else if (newState.debt > 2000) {
          anxietyChange += 5; // Moderate stress
          safetyChange -= 8; // Somewhat unsafe
          happinessChange -= 5; // Somewhat unhappy
        }

        // NEGATIVE CASH effects (additional stress)
        if (newState.cash < 0) {
          anxietyChange += 20; // Extreme stress from overdraft
          safetyChange -= 15; // Very unsafe feeling
          happinessChange -= 10; // Unhappy
        } else if (newState.cash < 100) {
          anxietyChange += 10; // High stress from low funds
          safetyChange -= 10; // Unsafe feeling
          happinessChange -= 5; // Somewhat unhappy
        }

        // POSITIVE effects: No debt + Good cash (positive)
        if (newState.debt === 0 && newState.cash > 2000) {
          anxietyChange -= 15; // Much less stress
          safetyChange += 20; // Feel very safe
          happinessChange += 10; // Happy
          entertainmentChange -= 5; // Slightly less entertainment (being more careful)
        } else if (newState.debt === 0 && newState.cash > 500) {
          anxietyChange -= 10; // Less stress
          safetyChange += 15; // Feel safe
          happinessChange += 5; // Somewhat happy
          entertainmentChange -= 3; // Slightly less entertainment
        }

        // Apply changes with bounds
        newState.anxiety = Math.min(100, Math.max(0, newState.anxiety + anxietyChange));
        newState.safety = Math.min(100, Math.max(0, newState.safety + safetyChange));
        newState.happiness = Math.min(100, Math.max(0, newState.happiness + happinessChange));
        newState.entertainment = Math.min(100, Math.max(0, newState.entertainment + entertainmentChange));
      };

      // Apply financial stress effects
      applyFinancialStressEffects();
      
      // Increment age by 1 year after each choice
      newState.age += 1;
      
      // Track spending (negative money/cash changes)
      const spent = (choice.moneyChange && choice.moneyChange < 0 ? Math.abs(choice.moneyChange) : 0) || 
                     (choice.cashChange && choice.cashChange < 0 ? Math.abs(choice.cashChange) : 0);
      const totalSpent = (prev.history[prev.history.length - 1]?.totalSpent || 0) + spent;
      
      // Add to history
      newState.history = [
        ...prev.history,
        {
          age: newState.age,
          cash: newState.cash,
          savings: newState.savings,
          debt: newState.debt,
          totalSpent,
        }
      ];
      
      // Update current location when interaction is closed
      if (selectedLocation) {
        newState.currentLocation = selectedLocation.id;
      }
      
      // Check if game should end
      if (newState.age >= 23) {
        setTimeout(() => {
          setCurrentScreen('end');
        }, 500);
      }
      
      return newState;
    });

    setSelectedLocation(null);
    setLastChoice(choice);
    setShowResult(true);
  };

  const triggerRandomEvent = () => {
    const events = [
      {
        title: '🎉 Birthday!',
        description: 'You\'re getting older! Time passes...',
        image: 'birthday celebration',
        choices: [
          {
            text: 'Celebrate responsibly ($50)',
            cashChange: -50,
            happinessChange: 15,
            ageChange: 1,
          },
          {
            text: 'Skip the party, save money',
            happinessChange: -5,
            ageChange: 1,
          },
        ],
      },
      {
        title: '💼 Work Opportunity',
        description: 'Your boss offers you extra hours this month.',
        image: 'office workspace',
        choices: [
          {
            text: 'Work overtime (+$300)',
            cashChange: 300,
            happinessChange: -10,
          },
          {
            text: 'Maintain work-life balance',
            happinessChange: 5,
          },
        ],
      },
    ];

    const randomEvent = events[Math.floor(Math.random() * events.length)];
    setCurrentEvent(randomEvent);
  };

  const handleEventChoice = (choice: any) => {
    setGameState(prev => {
      const newState = { ...prev };
      
      if (choice.cashChange) newState.cash += choice.cashChange;
      if (choice.happinessChange) newState.happiness = Math.min(100, Math.max(0, newState.happiness + choice.happinessChange));
      if (choice.ageChange) newState.age += choice.ageChange;
      
      // Check game over conditions
      if (newState.age >= 23) {
        setCurrentScreen('end');
      }
      
      return newState;
    });

    setCurrentEvent(null);
  };

  const handleRestart = () => {
    setGameState({
      age: 18,
      cash: 500,
      happiness: 75,
      entertainment: 50,
      anxiety: 30,
      safety: 70,
      job: 'Part-time Cashier',
      salary: 1200,
      debt: 0,
      savings: 0,
      currentLocation: 'home',
      characterName: 'Helka',
      characterAvatar: '🧑', // Third emoji option from CharacterDesignPage
      characterGender: 'other',
      characterSkinColor: 'medium', // Middle option from skin color selection
      storylineTitle: 'Entrepreneur',
      history: [],
    });
    setCurrentScreen('start');
    setSelectedLocation(null);
    setCurrentEvent(null);
    setShowResult(false);
    setLastChoice(null);
    setShowMenu(false);
  };

  // Show start menu
  if (currentScreen === 'start') {
    return <StartMenu onLogin={handleLogin} onCreateAccount={handleCreateAccount} />;
  }

  // Show personal info page
  if (currentScreen === 'personalInfo') {
    return <PersonalInfoPage onNext={handlePersonalInfoNext} />;
  }

  // Show character design page
  if (currentScreen === 'characterDesign') {
    return (
      <CharacterDesignPage
        playerName={playerName}
        onNext={handleCharacterDesignNext}
        onBack={() => setCurrentScreen('personalInfo')}
      />
    );
  }

  // Show quiz page
  if (currentScreen === 'quiz') {
    return (
      <QuizPage
        playerName={playerName}
        onComplete={handleQuizComplete}
        onBack={() => setCurrentScreen('characterDesign')}
      />
    );
  }

  // Show graduation page
  if (currentScreen === 'graduation') {
    return (
      <GraduationPage
        characterName={gameState.characterName || 'Helka'}
        storylineTitle={gameState.storylineTitle}
        onComplete={handleGraduationComplete}
      />
    );
  }

  // Show game over screen
  if (currentScreen === 'gameOver') {
    return <GameOver gameState={gameState} onRestart={handleRestart} />;
  }

  // Show end game screen
  if (currentScreen === 'end') {
    return <EndGame gameState={gameState} onRestart={handleRestart} />;
  }

  // Show main game
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 relative overflow-hidden">
      {/* Full-screen map container */}
      <div className="fixed inset-0">
        <GameMap onLocationClick={handleLocationClick} currentLocation={gameState.currentLocation} />
      </div>

      {/* Floating Stats Menu - positioned at bottom-left corner */}
      <div className="fixed bottom-4 left-4 z-30 max-w-md">
        <CharacterStats gameState={gameState} />
      </div>

      {/* Top Left Corner - Savings and Debt (Horizontal) */}
      <div className="fixed top-4 left-4 z-30 flex gap-3">
        {/* Savings Box */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/95 backdrop-blur rounded-2xl px-5 py-3 shadow-2xl"
        >
          <div className="flex items-center gap-3">
            <div className="bg-green-500 text-white w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Savings</p>
              <p className="text-gray-800">
                {new Intl.NumberFormat('fi-FI', { 
                  style: 'currency', 
                  currency: 'EUR',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(gameState.savings)}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Debt Box */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/95 backdrop-blur rounded-2xl px-5 py-3 shadow-2xl"
        >
          <div className="flex items-center gap-3">
            <div className="bg-red-500 text-white w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0">
              <TrendingDown className="w-5 h-5" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Debt</p>
              <p className="text-gray-800">
                {new Intl.NumberFormat('fi-FI', { 
                  style: 'currency', 
                  currency: 'EUR',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(gameState.debt)}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Top Center - Storyline Title */}
      {gameState.storylineTitle && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-30">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-2xl px-6 py-3 shadow-2xl border-2 border-purple-300"
          >
            <p className="text-[10px] uppercase tracking-wider opacity-90 text-center">Your Story</p>
            <p className="text-center whitespace-nowrap">{gameState.storylineTitle}</p>
          </motion.div>
        </div>
      )}

      {/* Top Right Corner - Menu */}
      <div className="fixed top-4 right-4 z-30">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowMenu(true)}
          className="bg-white/95 backdrop-blur rounded-2xl px-6 py-3 shadow-2xl hover:shadow-3xl transition-all cursor-pointer"
        >
          <h1 className="text-gray-800">💰 Menu</h1>
        </motion.button>
      </div>

      {/* Menu Modal */}
      {showMenu && (
        <MenuModal
          onClose={() => setShowMenu(false)}
          onReturnToMainMenu={handleRestart}
        />
      )}

      {selectedLocation && (
        <InteractionModal
          location={selectedLocation}
          gameState={gameState}
          onClose={handleCloseInteraction}
          onChoice={handleChoice}
        />
      )}

      {currentEvent && (
        <EventModal
          event={currentEvent}
          onChoice={handleEventChoice}
        />
      )}

      {showResult && (
        <ResultModal
          choice={lastChoice}
          gameState={gameState}
          onClose={() => setShowResult(false)}
        />
      )}
    </div>
  );
}

export default App;