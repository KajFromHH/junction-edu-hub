import { motion } from 'motion/react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Trophy, TrendingUp, Book, Youtube, ExternalLink, RotateCcw, Globe, Award } from 'lucide-react';
import { GameState } from '../App';
import { useState } from 'react';
import { CreditsModal } from './CreditsModal';

interface EndGameProps {
  gameState: GameState;
  onRestart: () => void;
}

export function EndGame({ gameState, onRestart }: EndGameProps) {
  const [showCredits, setShowCredits] = useState(false);

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('fi-FI', { 
      style: 'currency', 
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate net worth
  const netWorth = gameState.cash + gameState.savings - gameState.debt;

  // Prepare chart data
  const financialHistory = gameState.history.length > 0 ? gameState.history : [
    { age: 18, cash: 500, savings: 0, debt: 0, totalSpent: 0 }
  ];

  // Calculate financial score (0-100)
  const calculateScore = () => {
    let score = 0;
    
    // Net worth (max 30 points)
    if (netWorth > 50000) score += 30;
    else if (netWorth > 20000) score += 20;
    else if (netWorth > 0) score += 10;
    
    // Savings rate (max 25 points)
    if (gameState.savings > 30000) score += 25;
    else if (gameState.savings > 15000) score += 15;
    else if (gameState.savings > 5000) score += 10;
    
    // Debt management (max 25 points)
    if (gameState.debt === 0) score += 25;
    else if (gameState.debt < 5000) score += 15;
    else if (gameState.debt < 10000) score += 5;
    
    // Life balance (max 20 points)
    const avgWellbeing = (gameState.happiness + gameState.entertainment + gameState.safety) / 3;
    if (avgWellbeing > 70) score += 20;
    else if (avgWellbeing > 50) score += 10;
    else if (avgWellbeing > 30) score += 5;
    
    return Math.min(100, score);
  };

  const financialScore = calculateScore();

  // Get performance rating
  const getPerformanceRating = (score: number) => {
    if (score >= 80) return { text: 'Excellent!', emoji: '🏆', color: 'text-yellow-500' };
    if (score >= 60) return { text: 'Good Job!', emoji: '⭐', color: 'text-blue-500' };
    if (score >= 40) return { text: 'Not Bad!', emoji: '👍', color: 'text-green-500' };
    return { text: 'Keep Learning!', emoji: '📚', color: 'text-purple-500' };
  };

  const rating = getPerformanceRating(financialScore);

  // Educational resources - FINNISH FOCUSED
  const resources = [
    {
      type: 'website',
      title: 'Vero.fi - Tax Information',
      platform: 'Finnish Tax Administration',
      url: 'https://www.vero.fi/en/',
      icon: <Globe className="w-5 h-5" />,
    },
    {
      type: 'website',
      title: 'Kela - Social Security',
      platform: 'Social Insurance Institution',
      url: 'https://www.kela.fi/web/en',
      icon: <Globe className="w-5 h-5" />,
    },
    {
      type: 'website',
      title: 'Kuluttajaliitto - Consumer Guide',
      platform: 'Consumer League',
      url: 'https://www.kuluttajaliitto.fi/',
      icon: <Globe className="w-5 h-5" />,
    },
    {
      type: 'video',
      title: 'Personal Finance in Finland',
      platform: 'YouTube',
      url: 'https://www.youtube.com/results?search_query=personal+finance+finland',
      icon: <Youtube className="w-5 h-5" />,
    },
    {
      type: 'website',
      title: 'Finanssivalvonta - Financial Supervisory',
      platform: 'Finnish FSA',
      url: 'https://www.finanssivalvonta.fi/en/',
      icon: <Globe className="w-5 h-5" />,
    },
    {
      type: 'video',
      title: 'Investing & Savings Tips',
      platform: 'YouTube',
      url: 'https://www.youtube.com/results?search_query=saving+investing+tips+finland',
      icon: <Youtube className="w-5 h-5" />,
    },
    {
      type: 'article',
      title: 'Financial Education Research',
      platform: 'Google Scholar',
      url: 'https://scholar.google.com/scholar?q=financial+literacy+education+finland',
      icon: <Book className="w-5 h-5" />,
    },
    {
      type: 'website',
      title: 'Pörssisäätiö - Stock Market Foundation',
      platform: 'Investment Education',
      url: 'https://www.porssisaatio.fi/',
      icon: <Globe className="w-5 h-5" />,
    },
  ];

  // Finance tips based on performance - FINNISH CONTEXT
  const getTips = () => {
    const tips = [];
    
    if (gameState.debt > 0) {
      tips.push('💳 In Finland, high-interest consumer credit can be expensive. Always compare APR rates and pay off debt quickly!');
    }
    
    if (gameState.savings < 10000) {
      tips.push('💰 Build an emergency fund of 3-6 months expenses. Finnish social security (Kela) helps, but personal savings are crucial!');
    }
    
    if (gameState.anxiety > 50) {
      tips.push('🧘 Financial stress affects health. Use free budgeting tools and consider consulting Takuu-Säätiö for debt advice.');
    }
    
    if (netWorth > 20000) {
      tips.push('📈 Consider opening an investment account (osakesäästötili) - it offers tax benefits for long-term investing in Finland!');
    }
    
    tips.push('🏦 Finnish banks offer different account types. Compare fees and interest rates - switching banks is your right!');
    tips.push('📊 TyEL pension contributions build your future. Check your pension forecast at tyoelake.fi regularly.');
    tips.push('🎓 Education is subsidized in Finland. Take advantage of free learning resources and TE-toimisto career services.');
    tips.push('🏠 Housing costs are high in cities. Consider housing allowance (asumistuki) from Kela if eligible.');
    tips.push('⚡ Energy costs matter in Finland. Compare electricity contracts and consider district heating options.');
    
    return tips.slice(0, 6);
  };

  const tips = getTips();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 overflow-y-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-block"
          >
            <Trophy className="w-20 h-20 text-yellow-300 mx-auto mb-4" />
          </motion.div>
          <h1 className="text-white mb-2">🎉 Journey Complete!</h1>
          <p className="text-white/90">Helka's Financial Journey from Age 18 to 23</p>
        </div>

        {/* Performance Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl p-6 mb-6 shadow-2xl text-center"
        >
          <p className="text-gray-600 mb-2">Financial Literacy Score</p>
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className={`${rating.emoji} text-gray-800`}>{financialScore}/100</span>
            <span className={rating.color}>{rating.emoji}</span>
          </div>
          <p className={rating.color}>{rating.text}</p>
        </motion.div>

        {/* Final Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
        >
          <StatCard label="Net Worth" value={formatMoney(netWorth)} color="bg-gradient-to-br from-green-400 to-emerald-500" />
          <StatCard label="Total Savings" value={formatMoney(gameState.savings)} color="bg-gradient-to-br from-blue-400 to-cyan-500" />
          <StatCard label="Total Debt" value={formatMoney(gameState.debt)} color="bg-gradient-to-br from-red-400 to-orange-500" />
          <StatCard label="Final Cash" value={formatMoney(gameState.cash)} color="bg-gradient-to-br from-purple-400 to-pink-500" />
        </motion.div>

        {/* Charts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid md:grid-cols-2 gap-6 mb-6"
        >
          {/* Financial History Chart */}
          <div className="bg-white rounded-3xl p-6 shadow-2xl">
            <h3 className="text-gray-800 mb-4">💰 Financial Journey</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={financialHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="age" />
                <YAxis />
                <Tooltip formatter={(value) => formatMoney(Number(value))} />
                <Legend />
                <Line type="monotone" dataKey="cash" stroke="#10b981" name="Cash" strokeWidth={2} />
                <Line type="monotone" dataKey="savings" stroke="#3b82f6" name="Savings" strokeWidth={2} />
                <Line type="monotone" dataKey="debt" stroke="#ef4444" name="Debt" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Life Stats */}
          <div className="bg-white rounded-3xl p-6 shadow-2xl">
            <h3 className="text-gray-800 mb-4">📊 Life Quality Stats</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={[{
                name: 'Final Stats',
                Happiness: gameState.happiness,
                Entertainment: gameState.entertainment,
                Safety: gameState.safety,
                Stress: 100 - gameState.anxiety,
              }]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Happiness" fill="#ec4899" />
                <Bar dataKey="Entertainment" fill="#fbbf24" />
                <Bar dataKey="Safety" fill="#3b82f6" />
                <Bar dataKey="Stress" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Financial Tips - FINNISH CONTEXT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-3xl p-6 mb-6 shadow-2xl"
        >
          <h3 className="text-gray-800 mb-4">💡 Finnish Financial Tips for Your Journey</h3>
          <div className="space-y-3">
            {tips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-3"
              >
                <p className="text-gray-800">{tip}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Educational Resources - FINNISH FOCUSED */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-3xl p-6 mb-6 shadow-2xl"
        >
          <h3 className="text-gray-800 mb-4">📚 Finnish Financial Resources</h3>
          <p className="text-gray-600 mb-4">Explore these Finnish resources to deepen your financial knowledge:</p>
          <div className="grid md:grid-cols-2 gap-3">
            {resources.map((resource, index) => (
              <motion.a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.05 }}
                className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-xl p-3 transition-colors group"
              >
                <div className="bg-blue-500 text-white w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                  {resource.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 truncate">{resource.title}</p>
                  <p className="text-gray-600">{resource.platform}</p>
                </div>
                <ExternalLink className="w-5 h-5 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Restart Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <button
            onClick={onRestart}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-2xl shadow-2xl transition-all transform hover:scale-105 inline-flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Play Again
          </button>
        </motion.div>

        {/* Credits Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="text-center mt-4"
        >
          <button
            onClick={() => setShowCredits(true)}
            className="bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800 text-white px-8 py-4 rounded-2xl shadow-2xl transition-all transform hover:scale-105 inline-flex items-center gap-2"
          >
            <Award className="w-5 h-5" />
            Credits
          </button>
        </motion.div>

        {/* Credits Modal */}
        <CreditsModal
          isOpen={showCredits}
          onClose={() => setShowCredits(false)}
        />
      </motion.div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  color: string;
}

function StatCard({ label, value, color }: StatCardProps) {
  return (
    <div className={`${color} rounded-2xl p-4 shadow-lg text-white`}>
      <p className="text-white/80 mb-1">{label}</p>
      <p className="text-white">{value}</p>
    </div>
  );
}