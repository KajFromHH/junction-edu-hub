import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Volume2, ChevronRight, Video, Headphones } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Location, GameState } from '../App';
import { scenarios } from '../data/scenarios';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { speakText, stopSpeaking } from '../utils/textToSpeech';
import { MediaPlayer } from './MediaPlayer';
import { DragDropShopping } from './DragDropShopping';

interface InteractionModalProps {
  location: Location;
  gameState: GameState;
  onClose: () => void;
  onChoice: (choice: any) => void;
}

// Background images for each location - Placeholder for future custom illustrations
const locationBackgrounds: Record<string, string> = {
  // This variable is for background image of HOME scenario. It must be JPG or JPEG format.
  home: 'https://images.unsplash.com/photo-1717241364864-34a3d2eb3781?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwaW50ZXJpb3IlMjBpbGx1c3RyYXRpb258ZW58MXx8fHwxNzYzMTkyMTg3fDA&ixlib=rb-4.1.0&q=80&w=1080', // HOME placeholder for future purpose
  
  // This variable is for background image of BANK scenario. It must be JPG or JPEG format.
  bank: 'https://images.unsplash.com/photo-1549928435-4bb7a754c4c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5rJTIwaW50ZXJpb3IlMjBpbGx1c3RyYXRpb258ZW58MXx8fHwxNzYzMTkyMTg3fDA&ixlib=rb-4.1.0&q=80&w=1080', // BANK placeholder for future purpose
  
  // This variable is for background image of MALL scenario. It must be JPG or JPEG format.
  store: 'https://images.unsplash.com/photo-1584445745938-e2c5a5ac7537?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9yZSUyMHNob3AlMjBpbGx1c3RyYXRpb258ZW58MXx8fHwxNjMxOTIxODd8MA&ixlib=rb-4.1.0&q=80&w=1080', // MALL placeholder for future purpose
  
  // This variable is for background image of HOSPITAL scenario. It must be JPG or JPEG format.
  hospital: 'https://images.unsplash.com/photo-1539814858141-928517f6afd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMG1lZGljYWwlMjBpbGx1c3RyYXRpb258ZW58MXx8fHwxNzYzMTkyMTg4fDA&ixlib=rb-4.1.0&q=80&w=1080', // HOSPITAL placeholder for future purpose
  
  // This variable is for background image of CASINO scenario. It must be JPG or JPEG format.
  casino: 'https://images.unsplash.com/photo-1567225299676-9ebaa1d8b28f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXNpbm8lMjBjb2xvcmZ1bCUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NjMxOTIxODh8MA&ixlib=rb-4.1.0&q=80&w=1080', // CASINO placeholder for future purpose
  
  // This variable is for background image of OFFICE scenario. It must be JPG or JPEG format.
  office: 'https://images.unsplash.com/photo-1742830279735-c4e986d77fb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjB3b3Jrc3BhY2UlMjBpbGx1c3RyYXRpb258ZW58MXx8fHwxNzYzMTkyMTg4fDA&ixlib=rb-4.1.0&q=80&w=1080', // OFFICE placeholder for future purpose
};

export function InteractionModal({ location, gameState, onClose, onChoice }: InteractionModalProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<any>(null);
  const [showMedia, setShowMedia] = useState(false);
  const [shoppingData, setShoppingData] = useState<{ totalCost: number; selectedItems: any[] } | null>(null);
  
  // Reset state when location changes (new scenario)
  useEffect(() => {
    setCurrentPage(0);
    setSelectedChoice(null);
    setShowMedia(false);
    setShoppingData(null);
  }, [location.id]);
  
  const locationScenarios = scenarios[location.id] || [];
  
  // Select a scenario based on location
  const getScenario = () => {
    // For home, office, casino, store, bank, and hospital locations, always show the first scenario (multi-page)
    if (location.id === 'home' || location.id === 'office' || location.id === 'casino' || location.id === 'store' || location.id === 'bank' || location.id === 'hospital') {
      return locationScenarios[0];
    }
    
    // For other locations, use random selection
    const availableScenarios = locationScenarios.filter((scenario: any) => {
      if (scenario.condition) {
        return scenario.condition(gameState);
      }
      return true;
    });

    if (availableScenarios.length === 0) {
      return locationScenarios[0];
    }

    return availableScenarios[Math.floor(Math.random() * availableScenarios.length)];
  };

  const scenario = getScenario();

  // Safety check: if no scenario exists, close modal
  if (!scenario) {
    onClose();
    return null;
  }

  const handleChoice = (choice: any) => {
    if (scenario.isMultiPage) {
      // Store the selected choice to show result (don't increment page)
      setSelectedChoice(choice);
    } else {
      onChoice(choice);
    }
  };

  const handleNextPage = () => {
    if (scenario.isMultiPage && currentPage < scenario.pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleFinish = () => {
    if (selectedChoice) {
      onChoice(selectedChoice);
      // Reset state before closing
      setCurrentPage(0);
      setSelectedChoice(null);
      setShowMedia(false);
      setShoppingData(null);
      onClose();
    }
  };

  // Get background image for current location
  const backgroundImage = locationBackgrounds[location.id] || locationBackgrounds.home;

  // Render multi-page scenario
  if (scenario.isMultiPage) {
    // Safety check: ensure pages array exists and currentPage is valid
    if (!scenario.pages || !scenario.pages[currentPage]) {
      onClose();
      return null;
    }
    
    const page = scenario.pages[currentPage];
    
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            key={currentPage}
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Background Image */}
            <div className="relative p-4 rounded-t-3xl overflow-hidden min-h-[140px] flex items-end">
              {/* Background Image */}
              <div className="absolute inset-0">
                <ImageWithFallback
                  src={backgroundImage}
                  alt={`${location.name} - Placeholder for future custom illustration`}
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 backdrop-blur rounded-full p-2 transition-colors z-10"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Title */}
              <div className="relative z-10">
                <h3 className="text-white drop-shadow-lg">{location.name}</h3>
              </div>
            </div>

            {/* Page Content */}
            <div className="p-6">
              {/* Page 1: Intro */}
              {page.type === 'intro' && (
                <div>
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-xl p-6 mb-4">
                    <h3 className="text-amber-900 mb-3">{page.content.title}</h3>
                    <p className="text-gray-800 leading-relaxed">{page.content.storyIntro}</p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNextPage}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <span>Continue</span>
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              )}

              {/* Page 2: Lesson */}
              {page.type === 'lesson' && (
                <div>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-6 mb-4">
                    <h3 className="text-blue-900 mb-3">{page.content.title}</h3>
                    <p className="text-gray-800 mb-4">{page.content.description}</p>
                    
                    {/* Check if using sections structure (Home budget scenario) */}
                    {page.content.sections ? (
                      <div className="space-y-4">
                        {page.content.sections.map((section: any, idx: number) => (
                          <div key={idx} className="bg-white/70 rounded-lg p-4">
                            <h4 className="text-blue-800 mb-1">{section.title}</h4>
                            <p className="text-gray-700 text-sm mb-2">{section.subtitle}</p>
                            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                              {section.items.map((item: string, itemIdx: number) => (
                                <li key={itemIdx}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : page.content.deductions ? (
                      /* Check if using deductions structure (Office scenario) */
                      <div className="space-y-3">
                        {page.content.deductions.map((deduction: any, idx: number) => (
                          <div key={idx} className="bg-white/70 rounded-lg p-3">
                            <h4 className="text-blue-800 mb-1">{deduction.title}</h4>
                            <p className="text-gray-700 text-sm">{deduction.text}</p>
                          </div>
                        ))}
                        {page.content.conclusion && (
                          <p className="text-gray-800 mt-4 pt-3 border-t border-blue-200">{page.content.conclusion}</p>
                        )}
                      </div>
                    ) : page.content.microExamples ? (
                      /* Original micro/macro structure (Casino scenario) */
                      <>
                        <div className="mb-4">
                          <h4 className="text-blue-800 mb-2">💼 Micro (Personal) Examples:</h4>
                          <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                            {page.content.microExamples.map((example: string, idx: number) => (
                              <li key={idx}>{example}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-blue-800 mb-2">🌍 Macro (Society) Examples:</h4>
                          <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                            {page.content.macroExamples.map((example: string, idx: number) => (
                              <li key={idx}>{example}</li>
                            ))}
                          </ul>
                        </div>
                      </>
                    ) : null}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNextPage}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <span>Continue</span>
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              )}

              {/* Page 3: Importance */}
              {page.type === 'importance' && (
                <div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 rounded-xl p-6 mb-4">
                    <h3 className="text-purple-900 mb-3">{page.content.title}</h3>
                    
                    {/* Check if using bullet points structure (Office scenario) */}
                    {page.content.bulletPoints ? (
                      <>
                        <p className="text-gray-800 mb-3">Understanding your paycheck helps you:</p>
                        <ul className="list-disc list-inside space-y-2 text-gray-800 mb-4">
                          {page.content.bulletPoints.map((point: string, idx: number) => (
                            <li key={idx}>{point}</li>
                          ))}
                        </ul>
                        {page.content.warning && (
                          <p className="text-gray-800 leading-relaxed pt-3 border-t border-purple-200">{page.content.warning}</p>
                        )}
                      </>
                    ) : (
                      /* Original text-only structure (Home scenario) */
                      <p className="text-gray-800 leading-relaxed">{page.content.text}</p>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNextPage}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <span>Continue</span>
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              )}

              {/* Drag and Drop Page */}
              {page.type === 'dragdrop' && (
                <div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6 mb-4">
                    <h3 className="text-green-900 mb-3">{page.content.title}</h3>
                  </div>

                  <DragDropShopping
                    items={page.content.items}
                    onComplete={(totalCost, selectedItems) => {
                      // Store the results and move to next page
                      setShoppingData({ totalCost, selectedItems });
                      handleNextPage();
                    }}
                  />
                </div>
              )}

              {/* Shopping Result Page */}
              {page.type === 'shoppingresult' && shoppingData && (
                <div>
                  {/* Calculate stat changes based on purchases */}
                  {(() => {
                    const itemIds = shoppingData.selectedItems.map((item: any) => item.id);
                    const hasGames = itemIds.includes('games');
                    const hasClothes = itemIds.includes('clothes');
                    const hasFood = itemIds.includes('food');
                    const hasToilet = itemIds.includes('toilet');
                    
                    let result = '';
                    let entertainmentChange = 0;
                    let happinessChange = 0;
                    let safetyChange = 0;
                    let moneyChange = -shoppingData.totalCost;

                    // Check if only necessities were bought (food and toilet supplies only)
                    const onlyNecessities = hasFood && hasToilet && !hasGames && !hasClothes && itemIds.length === 2;
                    
                    if (hasGames && hasClothes) {
                      // Bought luxury items
                      entertainmentChange = 30;
                      safetyChange = -30;
                      result = `You spent €${shoppingData.totalCost} on shopping, including video games and clothes. You're having fun now, but you might have overspent on wants instead of needs. Your financial safety took a hit because you didn't prioritize essentials.`;
                    } else if (onlyNecessities) {
                      // Bought only necessities
                      safetyChange = 30;
                      happinessChange = -10;
                      entertainmentChange = -20;
                      result = `You spent €${shoppingData.totalCost} wisely on only necessities - food and toilet supplies. You're financially secure and responsible! However, you might feel a bit less happy since you didn't treat yourself to anything fun.`;
                    } else {
                      // Mixed purchases
                      result = `You spent €${shoppingData.totalCost} on your shopping. You made some balanced choices between needs and wants.`;
                      safetyChange = 0;
                      happinessChange = 0;
                      entertainmentChange = 0;
                    }

                    // Store calculated choice for finish handler
                    const calculatedChoice = {
                      moneyChange,
                      entertainmentChange,
                      happinessChange,
                      safetyChange,
                      result,
                      tip: 'Smart shopping means balancing needs with wants. Prioritize essentials first, then use leftover money for entertainment.',
                    };

                    return (
                      <>
                        {/* Result */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 mb-4">
                          <h4 className="text-blue-900 mb-2">Shopping Summary:</h4>
                          <div className="mb-3">
                            <p className="text-gray-800 mb-2">Items purchased:</p>
                            <ul className="list-disc list-inside space-y-1">
                              {shoppingData.selectedItems.map((item: any, idx: number) => (
                                <li key={idx} className="text-gray-700">
                                  {item.text} - {item.price} €
                                </li>
                              ))}
                            </ul>
                          </div>
                          <p className="text-gray-800 leading-relaxed">{result}</p>
                        </div>

                        {/* Stat Changes */}
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50">
                            <span className="text-sm text-red-700">
                              💵 -{shoppingData.totalCost}
                            </span>
                          </div>
                          {entertainmentChange !== 0 && (
                            <div className={`flex items-center gap-2 p-3 rounded-lg ${entertainmentChange > 0 ? 'bg-purple-50' : 'bg-gray-50'}`}>
                              <span className={`text-sm ${entertainmentChange > 0 ? 'text-purple-700' : 'text-gray-700'}`}>
                                🎮 {entertainmentChange > 0 ? '+' : ''}{entertainmentChange}
                              </span>
                            </div>
                          )}
                          {happinessChange !== 0 && (
                            <div className={`flex items-center gap-2 p-3 rounded-lg ${happinessChange > 0 ? 'bg-pink-50' : 'bg-gray-50'}`}>
                              <span className={`text-sm ${happinessChange > 0 ? 'text-pink-700' : 'text-gray-700'}`}>
                                ❤️ {happinessChange > 0 ? '+' : ''}{happinessChange}
                              </span>
                            </div>
                          )}
                          {safetyChange !== 0 && (
                            <div className={`flex items-center gap-2 p-3 rounded-lg ${safetyChange > 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                              <span className={`text-sm ${safetyChange > 0 ? 'text-green-700' : 'text-red-700'}`}>
                                🛡️ {safetyChange > 0 ? '+' : ''}{safetyChange}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Tips */}
                        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-300 rounded-xl p-4 mb-4">
                          <p className="text-amber-900 leading-relaxed">
                            <strong className="text-amber-800">💡 Shopping Tip:</strong><br />
                            {calculatedChoice.tip}
                          </p>
                        </div>

                        {/* Continue Button */}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            onChoice(calculatedChoice);
                            setCurrentPage(0);
                            setSelectedChoice(null);
                            setShowMedia(false);
                            setShoppingData(null);
                            onClose();
                          }}
                          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
                        >
                          Continue Journey
                        </motion.button>
                      </>
                    );
                  })()}
                </div>
              )}

              {/* Page 4: Task & Choices */}
              {page.type === 'task' && !selectedChoice && (
                <div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6 mb-4">
                    <h3 className="text-green-900 mb-3">{page.content.title}</h3>
                    <p className="text-gray-800 leading-relaxed">{page.content.description}</p>
                  </div>

                  {/* Accessibility Buttons */}
                  <div className="flex gap-2 mb-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        const textToRead = `${page.content.title}. ${page.content.description}. Vaihtoehdot: ${page.content.choices.map((c: any, i: number) => `Vaihtoehto ${i + 1}: ${c.text}`).join('. ')}`;
                        speakText(textToRead);
                      }}
                      className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-3 py-2 rounded-xl text-sm shadow-md transition-all"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Read Aloud</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => stopSpeaking()}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-xl text-sm transition-all"
                    >
                      ⏹️ Stop
                    </motion.button>
                  </div>

                  {/* Choices */}
                  <div className="space-y-3">
                    {page.content.choices.map((choice: any, index: number) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleChoice(choice)}
                        className="w-full bg-gradient-to-r from-white to-gray-50 hover:from-purple-50 hover:to-pink-50 rounded-xl p-4 shadow-md hover:shadow-lg transition-all border-2 border-gray-200 hover:border-purple-300 text-left"
                      >
                        <p className="text-gray-900">{choice.text}</p>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Page 5: Result */}
              {page.type === 'task' && selectedChoice && (
                <div>
                  {/* Result */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 mb-4">
                    <h4 className="text-blue-900 mb-2">What Happened:</h4>
                    <p className="text-gray-800 leading-relaxed">{selectedChoice.result}</p>
                  </div>

                  {/* Stat Changes */}
                  {(selectedChoice.happinessChange || selectedChoice.safetyChange) && (
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {selectedChoice.happinessChange && (
                        <div className={`flex items-center gap-2 p-3 rounded-lg ${selectedChoice.happinessChange > 0 ? 'bg-pink-50' : 'bg-gray-50'}`}>
                          <span className={`text-sm ${selectedChoice.happinessChange > 0 ? 'text-pink-700' : 'text-gray-700'}`}>
                            ❤️ {selectedChoice.happinessChange > 0 ? '+' : ''}{selectedChoice.happinessChange}
                          </span>
                        </div>
                      )}
                      {selectedChoice.safetyChange && (
                        <div className={`flex items-center gap-2 p-3 rounded-lg ${selectedChoice.safetyChange > 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                          <span className={`text-sm ${selectedChoice.safetyChange > 0 ? 'text-green-700' : 'text-red-700'}`}>
                            🛡️ {selectedChoice.safetyChange > 0 ? '+' : ''}{selectedChoice.safetyChange}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tips */}
                  {selectedChoice.tip && (
                    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-300 rounded-xl p-4 mb-4">
                      <p className="text-amber-900 leading-relaxed">
                        <strong className="text-amber-800">🇫🇮 Finnish Finance Fact:</strong><br />
                        {selectedChoice.tip}
                      </p>
                    </div>
                  )}

                  {/* Accessibility - Read Result */}
                  <div className="flex gap-2 mb-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        const textToRead = `Tulos: ${selectedChoice.result}. Vinkki: ${selectedChoice.tip}`;
                        speakText(textToRead);
                      }}
                      className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-3 py-2 rounded-xl text-sm shadow-md transition-all"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Read Result</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => stopSpeaking()}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-xl text-sm transition-all"
                    >
                      ⏹️ Stop
                    </motion.button>
                  </div>

                  {/* Learn More */}
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-xl p-4 mb-4">
                    <p className="text-purple-900 text-sm mb-3">📚 <strong>Learn More:</strong></p>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowMedia(true)}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-3 py-2 rounded-xl text-sm shadow-md transition-all"
                      >
                        <Video className="w-4 h-4" />
                        <span>Video</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowMedia(true)}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-3 py-2 rounded-xl text-sm shadow-md transition-all"
                      >
                        <Headphones className="w-4 h-4" />
                        <span>Podcast</span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Continue Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleFinish}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    Continue Journey
                  </motion.button>
                </div>
              )}

              {/* Page indicator */}
              <div className="flex justify-center gap-2 mt-4">
                {scenario.pages.map((_: any, idx: number) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentPage ? 'w-8 bg-purple-500' : 'w-2 bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Media Player Modal */}
          {showMedia && (
            <MediaPlayer
              scenarioId="unexpected-costs"
              onClose={() => setShowMedia(false)}
            />
          )}
        </motion.div>
      </AnimatePresence>
    );
  }

  // Render regular scenario (original flow)
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Background Image */}
          <div className="relative p-4 rounded-t-3xl overflow-hidden min-h-[140px] flex items-end">
            {/* Background Image */}
            <div className="absolute inset-0">
              <ImageWithFallback
                src={backgroundImage}
                alt={`${location.name} - Placeholder for future custom illustration`}
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 backdrop-blur rounded-full p-2 transition-colors z-10"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Title */}
            <div className="relative z-10">
              <h3 className="text-white drop-shadow-lg">{location.name}</h3>
            </div>
          </div>

          {/* Scenario Content */}
          <div className="p-4">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 mb-4">
              <h4 className="text-gray-900 mb-2">{scenario.title}</h4>
              <p className="text-gray-700 text-sm">{scenario.description}</p>
            </div>

            {/* Accessibility Buttons - Read Aloud */}
            <div className="flex gap-2 mb-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const textToRead = `${scenario.title}. ${scenario.description}. Vaihtoehdot: ${scenario.choices.map((c: any, i: number) => `Vaihtoehto ${i + 1}: ${c.text}`).join('. ')}`;
                  speakText(textToRead);
                }}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-3 py-2 rounded-xl text-sm shadow-md transition-all"
              >
                <Volume2 className="w-4 h-4" />
                <span>Read Aloud</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => stopSpeaking()}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-xl text-sm transition-all"
              >
                ⏹️ Stop
              </motion.button>
            </div>

            {/* Choices */}
            <div className="space-y-2">
              
              {scenario.choices.map((choice: any, index: number) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleChoice(choice)}
                  className="w-full bg-gradient-to-r from-white to-gray-50 hover:from-purple-50 hover:to-pink-50 rounded-xl p-3 shadow-md hover:shadow-lg transition-all duration-200 group border-2 border-gray-200 hover:border-purple-300"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 text-left">
                      <p className="text-gray-900 text-sm mb-1.5">{choice.text}</p>
                      
                      <div className="flex flex-wrap gap-1.5">
                        {choice.moneyChange && (
                          <span className={`px-2 py-0.5 text-xs rounded-full text-white ${choice.moneyChange > 0 ? 'bg-green-500' : 'bg-red-500'}`}>
                            {choice.moneyChange > 0 ? '+' : ''}{choice.moneyChange} 💵
                          </span>
                        )}
                        {choice.happinessChange && (
                          <span className={`px-2 py-0.5 text-xs rounded-full text-white ${choice.happinessChange > 0 ? 'bg-pink-500' : 'bg-gray-500'}`}>
                            {choice.happinessChange > 0 ? '+' : ''}{choice.happinessChange} ❤️
                          </span>
                        )}
                        {choice.savingsChange && (
                          <span className={`px-2 py-0.5 text-xs rounded-full text-white ${choice.savingsChange > 0 ? 'bg-emerald-500' : 'bg-orange-500'}`}>
                            {choice.savingsChange > 0 ? '+' : ''}{choice.savingsChange} 💰
                          </span>
                        )}
                        {choice.debtChange && (
                          <span className={`px-2 py-0.5 text-xs rounded-full text-white ${choice.debtChange > 0 ? 'bg-red-600' : 'bg-green-600'}`}>
                            {choice.debtChange > 0 ? '+' : ''}{choice.debtChange} 💳
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <ArrowRight className="w-5 h-5 text-purple-500 group-hover:text-pink-500 transition-colors flex-shrink-0 mt-0.5" />
                  </div>
                </motion.button>
              ))}
            </div>

            {scenario.educationalNote && (
              <div className="mt-3 bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-xl p-3">
                <p className="text-yellow-900 text-sm">💡 {scenario.educationalNote}</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}