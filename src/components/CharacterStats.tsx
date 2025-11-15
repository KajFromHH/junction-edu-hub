import { motion } from 'motion/react';
import { User, DollarSign, Heart, Briefcase, TrendingUp, TrendingDown, Sparkles, Zap, Shield } from 'lucide-react';
import { GameState } from '../App';

interface CharacterStatsProps {
  gameState: GameState;
}

export function CharacterStats({ gameState }: CharacterStatsProps) {
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('fi-FI', { 
      style: 'currency', 
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Convert money values to percentage for bar display (capped at reasonable max)
  const getMoneyPercentage = (amount: number, max: number) => {
    return Math.min((amount / max) * 100, 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 backdrop-blur-md rounded-xl p-2.5 shadow-2xl w-64"
    >
      {/* Character Name Header */}
      <div className="mb-2 pb-1.5 border-b border-gray-200">
        <div className="flex items-center justify-center gap-2">
          {/* Custom Avatar */}
          {gameState.characterAvatar && (
            <span className="text-2xl">{gameState.characterAvatar}</span>
          )}
          <p className="text-gray-800 text-center">
            {gameState.characterName || 'Helka'}
          </p>
        </div>
      </div>

      {/* Stats as compact rows with bar charts */}
      <div className="space-y-1.5">
        <SimpleStatRow
          icon={<User className="w-3.5 h-3.5" />}
          label="Age"
          value={`${gameState.age}`}
          color="bg-purple-500"
        />
        <SimpleStatRow
          icon={<DollarSign className="w-3.5 h-3.5" />}
          label="Cash"
          value={formatMoney(gameState.cash)}
          color="bg-green-500"
        />
        <StatRow
          icon={<Heart className="w-3.5 h-3.5" />}
          label="Happy"
          value={gameState.happiness}
          max={100}
          color="bg-pink-500"
        />
        <StatRow
          icon={<Sparkles className="w-3.5 h-3.5" />}
          label="Fun"
          value={gameState.entertainment}
          max={100}
          color="bg-yellow-500"
        />
        <StatRow
          icon={<Zap className="w-3.5 h-3.5" />}
          label="Stress"
          value={gameState.anxiety}
          max={100}
          color="bg-orange-500"
        />
        <StatRow
          icon={<Shield className="w-3.5 h-3.5" />}
          label="Safety"
          value={gameState.safety}
          max={100}
          color="bg-blue-500"
        />
      </div>

      {/* Divider */}
      <div className="my-2 border-t border-gray-200" />

      {/* Job info - compact */}
      <div className="flex items-center gap-1.5 mb-1.5">
        <div className="bg-indigo-500 text-white w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0">
          <Briefcase className="w-3.5 h-3.5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-gray-800 truncate">{gameState.job}</p>
          <p className="text-gray-600">{formatMoney(gameState.salary)}/mo</p>
        </div>
      </div>
    </motion.div>
  );
}

interface StatRowProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  max: number;
  color: string;
  showValue?: string;
}

function StatRow({ icon, label, value, max, color, showValue }: StatRowProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="flex items-center gap-1.5">
      {/* Icon */}
      <div className={`${color} text-white w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      
      {/* Label */}
      <span className="text-gray-700 w-12 flex-shrink-0">{label}</span>
      
      {/* Bar chart */}
      <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className={`${color} h-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {/* Optional value display */}
      {showValue && (
        <span className="text-gray-800 w-16 text-right flex-shrink-0">{showValue}</span>
      )}
    </div>
  );
}

interface SimpleStatRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}

function SimpleStatRow({ icon, label, value, color }: SimpleStatRowProps) {
  return (
    <div className="flex items-center gap-1.5">
      {/* Icon */}
      <div className={`${color} text-white w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      
      {/* Label */}
      <span className="text-gray-700 w-12 flex-shrink-0">{label}</span>
      
      {/* Value */}
      <span className="text-gray-800 w-16 text-right flex-shrink-0">{value}</span>
    </div>
  );
}