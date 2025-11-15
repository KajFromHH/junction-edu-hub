import { motion } from 'motion/react';
import { X, Home } from 'lucide-react';

interface MenuModalProps {
  onClose: () => void;
  onReturnToMainMenu: () => void;
}

export function MenuModal({ onClose, onReturnToMainMenu }: MenuModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 relative">
          <h2 className="text-white text-center text-2xl">⚙️ Game Menu</h2>
          
          {/* Close Button (X) */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Menu Content */}
        <div className="p-8 space-y-4">
          {/* Return to Main Menu Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onReturnToMainMenu}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3"
          >
            <Home className="w-5 h-5" />
            <span>Return to Main Menu</span>
          </motion.button>

          {/* Close Button (alternative) */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-4 rounded-xl shadow-md transition-all"
          >
            Close Menu
          </motion.button>
        </div>

        {/* Footer Info */}
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
          <p className="text-gray-600 text-center text-sm">
            💡 Your progress will be lost if you return to main menu
          </p>
        </div>
      </motion.div>
    </div>
  );
}
