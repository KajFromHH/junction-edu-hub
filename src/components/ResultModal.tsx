import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, TrendingDown, X, Volume2, Video, Headphones } from 'lucide-react';
import { useState } from 'react';
import { speakText, stopSpeaking } from '../utils/textToSpeech';
import { MediaPlayer } from './MediaPlayer';

interface ResultModalProps {
  choice: any;
  gameState: any;
  onClose: () => void;
}

export function ResultModal({ choice, gameState, onClose }: ResultModalProps) {
  const [showMedia, setShowMedia] = useState(false);
  
  // Generate a scenario ID based on the choice text for media lookup
  // This is a simple implementation - you can make it more sophisticated
  const getScenarioId = () => {
    const text = choice.text?.toLowerCase() || '';
    if (text.includes('rent') || text.includes('vuokr')) return 'rent';
    if (text.includes('furniture') || text.includes('huonekalu')) return 'furniture';
    if (text.includes('utility') || text.includes('sähkö')) return 'utility';
    if (text.includes('savings') || text.includes('säästö')) return 'savings';
    if (text.includes('credit') || text.includes('luotto')) return 'credit-card';
    if (text.includes('debt') || text.includes('velka')) return 'debt';
    if (text.includes('tax') || text.includes('vero')) return 'capital-gains';
    if (text.includes('invest') || text.includes('sijoita')) return 'investment';
    if (text.includes('student') || text.includes('opinto')) return 'student-loan';
    if (text.includes('church') || text.includes('kirkko')) return 'church-tax';
    if (text.includes('grocery') || text.includes('ruoka')) return 'groceries';
    if (text.includes('vat') || text.includes('alv')) return 'vat';
    if (text.includes('phone') || text.includes('puhelin')) return 'phone';
    if (text.includes('pay later') || text.includes('klarna')) return 'bnpl';
    if (text.includes('verokortti')) return 'verokortti';
    if (text.includes('summer') || text.includes('kesä')) return 'summer-job';
    if (text.includes('gambl') || text.includes('uhkap')) return 'gambling';
    if (text.includes('health') || text.includes('tervey')) return 'healthcare';
    return 'default';
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          transition={{ type: "spring", duration: 0.4 }}
          className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
        >
          {/* Close button */}
          <div className="flex justify-end p-4 pb-0">
            <button
              onClick={onClose}
              className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 pb-6 pt-2">
            {/* What happened - Result */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4 mb-4">
              <p className="text-gray-800 leading-relaxed">
                {choice.result || "You made your decision and moved forward with your financial journey."}
              </p>
            </div>

            {/* Accessibility Buttons - Read Result Aloud */}
            <div className="flex gap-2 mb-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const textToRead = `Tulos: ${choice.result || 'Teit päätöksesi'}. Vinkki: ${choice.tip || 'Jatka matkaa'}`;
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

            {/* Stat Changes - Compact Grid */}
            {(choice.moneyChange || choice.happinessChange || choice.anxietyChange || 
              choice.safetyChange || choice.savingsChange || choice.debtChange) && (
              <div className="grid grid-cols-2 gap-2 mb-4">
                {choice.moneyChange && (
                  <div className={`flex items-center gap-2 p-2 rounded-lg ${choice.moneyChange > 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                    {choice.moneyChange > 0 ? <TrendingUp className="w-4 h-4 text-green-600" /> : <TrendingDown className="w-4 h-4 text-red-600" />}
                    <span className={`text-sm ${choice.moneyChange > 0 ? 'text-green-700' : 'text-red-700'}`}>
                      Cash {choice.moneyChange > 0 ? '+' : ''}{choice.moneyChange}€
                    </span>
                  </div>
                )}
                {choice.happinessChange && (
                  <div className={`flex items-center gap-2 p-2 rounded-lg ${choice.happinessChange > 0 ? 'bg-pink-50' : 'bg-gray-50'}`}>
                    <span className={`text-sm ${choice.happinessChange > 0 ? 'text-pink-700' : 'text-gray-700'}`}>
                      ❤️ {choice.happinessChange > 0 ? '+' : ''}{choice.happinessChange}
                    </span>
                  </div>
                )}
                {choice.anxietyChange && (
                  <div className={`flex items-center gap-2 p-2 rounded-lg ${choice.anxietyChange > 0 ? 'bg-red-50' : 'bg-green-50'}`}>
                    <span className={`text-sm ${choice.anxietyChange > 0 ? 'text-red-700' : 'text-green-700'}`}>
                      😰 {choice.anxietyChange > 0 ? '+' : ''}{choice.anxietyChange}
                    </span>
                  </div>
                )}
                {choice.safetyChange && (
                  <div className={`flex items-center gap-2 p-2 rounded-lg ${choice.safetyChange > 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                    <span className={`text-sm ${choice.safetyChange > 0 ? 'text-green-700' : 'text-red-700'}`}>
                      🛡️ {choice.safetyChange > 0 ? '+' : ''}{choice.safetyChange}
                    </span>
                  </div>
                )}
                {choice.savingsChange && (
                  <div className={`flex items-center gap-2 p-2 rounded-lg ${choice.savingsChange > 0 ? 'bg-emerald-50' : 'bg-orange-50'}`}>
                    <span className={`text-sm ${choice.savingsChange > 0 ? 'text-emerald-700' : 'text-orange-700'}`}>
                      💰 {choice.savingsChange > 0 ? '+' : ''}{choice.savingsChange}€
                    </span>
                  </div>
                )}
                {choice.debtChange && (
                  <div className={`flex items-center gap-2 p-2 rounded-lg ${choice.debtChange > 0 ? 'bg-red-50' : 'bg-green-50'}`}>
                    <span className={`text-sm ${choice.debtChange > 0 ? 'text-red-700' : 'text-green-700'}`}>
                      💳 {choice.debtChange > 0 ? '+' : ''}{choice.debtChange}€
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Finnish Economy Facts & Learning */}
            {choice.tip && (
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-300 rounded-xl p-4 mb-4">
                <p className="text-amber-900 leading-relaxed">
                  <strong className="text-amber-800">🇫🇮 Finnish Finance Fact:</strong><br />
                  {choice.tip}
                </p>
              </div>
            )}

            {/* Learn More - Video & Podcast Buttons */}
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
              onClick={onClose}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Continue Journey
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Media Player Modal */}
      {showMedia && (
        <MediaPlayer
          scenarioId={getScenarioId()}
          onClose={() => setShowMedia(false)}
        />
      )}
    </AnimatePresence>
  );
}