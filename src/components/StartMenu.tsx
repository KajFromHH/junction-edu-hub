import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { LogIn, UserPlus, Award } from 'lucide-react';
import { useState } from 'react';
import { CreditsModal } from './CreditsModal';

// This is image for title in the main menu. It must be in format of JPG or JPEG.
const titleImage = "https://images.unsplash.com/photo-1533310266094-8898a03807dd?w=800&q=80";

interface StartMenuProps {
  onLogin: () => void;
  onCreateAccount: () => void;
}

export function StartMenu({ onLogin, onCreateAccount }: StartMenuProps) {
  const [showCredits, setShowCredits] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
      </div>

      {/* Main menu card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-5 max-w-md w-full"
      >
        {/* Title Image */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-3"
        >
          <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden shadow-xl mb-2">
            <ImageWithFallback
              src={titleImage}
              alt="Suomi Life"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-3">
              <h1 className="text-white drop-shadow-lg">Suomi Life</h1>
            </div>
          </div>
          <p className="text-center text-gray-600 text-xs">
            Learn finance through life choices
          </p>
        </motion.div>

        {/* Menu buttons */}
        <div className="space-y-2">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onLogin}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span className="text-xs">Login</span>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            onClick={onCreateAccount}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span className="text-xs">Create New Account</span>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowCredits(true)}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <Award className="w-3.5 h-3.5" />
            <span className="text-xs">Credits</span>
          </motion.button>
        </div>

        {/* Combined Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded-xl"
        >
          <p className="text-center text-blue-800 text-xs leading-relaxed">
            ℹ️ No data saved • Educational purposes only • Ages 12-18
          </p>
        </motion.div>

        {/* Figma Make AI Attribution */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-3 pt-3 border-t border-gray-200"
        >
          <div className="text-center space-y-1">
            <p className="text-gray-600 text-xs">
              🤖 Built with <strong>Figma Make AI</strong> • MIT License
            </p>
            <p className="text-gray-500 text-[10px]">
              Junction 2025 Hackathon • Helsinki Education Hub Challenge
            </p>
          </div>
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