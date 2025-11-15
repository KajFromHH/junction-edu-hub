import { motion } from 'motion/react';
import { Trophy, TrendingUp, Brain, Heart, DollarSign, RotateCcw } from 'lucide-react';
import { GameState } from '../App';

interface GameOverProps {
  gameState: GameState;
  onRestart: () => void;
}

export function GameOver({ gameState, onRestart }: GameOverProps) {
  const calculateScore = () => {
    const moneyScore = Math.min(100, (gameState.cash / 50000) * 100);
    const savingsScore = Math.min(100, (gameState.savings / 30000) * 100);
    const debtPenalty = Math.min(50, (gameState.debt / 10000) * 50);
    const knowledgeScore = gameState.financialKnowledge;
    const happinessScore = gameState.happiness;
    
    return Math.round(
      (moneyScore * 0.25) +
      (savingsScore * 0.25) +
      (knowledgeScore * 0.25) +
      (happinessScore * 0.15) -
      (debtPenalty * 0.1)
    );
  };

  const score = calculateScore();
  
  const getRank = () => {
    if (score >= 90) return { title: '💎 Financial Genius', color: 'from-purple-500 to-pink-500' };
    if (score >= 75) return { title: '🌟 Money Master', color: 'from-blue-500 to-indigo-500' };
    if (score >= 60) return { title: '📈 Smart Saver', color: 'from-green-500 to-emerald-500' };
    if (score >= 40) return { title: '💼 Getting There', color: 'from-yellow-500 to-orange-500' };
    return { title: '📚 Learning Journey', color: 'from-gray-500 to-slate-500' };
  };

  const rank = getRank();

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('fi-FI', { 
      style: 'currency', 
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden"
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${rank.color} p-8 text-center relative overflow-hidden`}>
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"
          />
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Trophy className="w-20 h-20 text-white mx-auto mb-4" />
            <h1 className="text-white mb-2">You reached age 40!</h1>
            <h2 className="text-white/90 mb-2">{rank.title}</h2>
            <div className="bg-white/20 backdrop-blur rounded-2xl px-6 py-3 inline-block">
              <p className="text-white">Final Score: {score}/100</p>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="p-8">
          <h3 className="text-gray-900 mb-6 text-center">Your Life Summary</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <StatCard
              icon={<DollarSign className="w-6 h-6" />}
              label="Final Cash"
              value={formatMoney(gameState.cash)}
              color="bg-green-500"
            />
            <StatCard
              icon={<TrendingUp className="w-6 h-6" />}
              label="Total Savings"
              value={formatMoney(gameState.savings)}
              color="bg-blue-500"
            />
            <StatCard
              icon={<Brain className="w-6 h-6" />}
              label="Finance IQ"
              value={`${gameState.financialKnowledge}%`}
              color="bg-purple-500"
            />
            <StatCard
              icon={<Heart className="w-6 h-6" />}
              label="Happiness"
              value={`${gameState.happiness}%`}
              color="bg-pink-500"
            />
          </div>

          {/* Insights */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
            <h4 className="text-gray-900 mb-3">💡 Financial Insights</h4>
            <ul className="space-y-2 text-gray-700">
              {gameState.savings > 10000 && (
                <li>✅ Great job building an emergency fund!</li>
              )}
              {gameState.debt === 0 && (
                <li>✅ Excellent! You stayed debt-free!</li>
              )}
              {gameState.financialKnowledge >= 70 && (
                <li>✅ Your financial knowledge is impressive!</li>
              )}
              {gameState.happiness >= 70 && (
                <li>✅ You maintained great work-life balance!</li>
              )}
              {gameState.debt > 5000 && (
                <li>⚠️ Try to manage debt better in your next playthrough</li>
              )}
              {gameState.savings < 5000 && (
                <li>⚠️ Building savings is key to financial security</li>
              )}
            </ul>
          </div>

          {/* Restart button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRestart}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Start a New Life</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}

function StatCard({ icon, label, value, color }: StatCardProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-4 shadow-md"
    >
      <div className={`${color} text-white w-12 h-12 rounded-xl flex items-center justify-center mb-3 shadow-md`}>
        {icon}
      </div>
      <p className="text-gray-600 mb-1">{label}</p>
      <p className="text-gray-900">{value}</p>
    </motion.div>
  );
}