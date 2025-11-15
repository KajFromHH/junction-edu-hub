import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface EventModalProps {
  event: any;
  onChoice: (choice: any) => void;
}

export function EventModal({ event, onChoice }: EventModalProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.8, rotate: -5 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0.8, rotate: 5 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
        >
          {/* Animated header */}
          <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 p-8 relative overflow-hidden">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"
            />
            
            <div className="relative flex items-center justify-center gap-3">
              <Sparkles className="w-8 h-8 text-white" />
              <h2 className="text-white text-center">Random Event!</h2>
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="text-center mb-6">
              <h3 className="text-gray-900 mb-3">{event.title}</h3>
              <p className="text-gray-700">{event.description}</p>
            </div>

            {/* Choices */}
            <div className="space-y-3">
              {event.choices.map((choice: any, index: number) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onChoice(choice)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 text-left">
                      <p className="text-white mb-2">{choice.text}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {choice.moneyChange && (
                          <span className="px-2 py-1 rounded-full text-white bg-white/20">
                            {choice.moneyChange > 0 ? '+' : ''}{choice.moneyChange} 💵
                          </span>
                        )}
                        {choice.happinessChange && (
                          <span className="px-2 py-1 rounded-full text-white bg-white/20">
                            {choice.happinessChange > 0 ? '+' : ''}{choice.happinessChange} ❤️
                          </span>
                        )}
                        {choice.ageChange && (
                          <span className="px-2 py-1 rounded-full text-white bg-white/20">
                            Age +{choice.ageChange} 🎂
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <ArrowRight className="w-5 h-5 text-white flex-shrink-0" />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
