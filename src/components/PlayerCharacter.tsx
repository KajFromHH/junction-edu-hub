import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { User } from 'lucide-react';

interface PlayerCharacterProps {
  position: { top: string; left: string };
}

export function PlayerCharacter({ position }: PlayerCharacterProps) {
  // This variable is for the character avatar in the map. It must be in JPG or JPEG format.
  const characterAvatarImage = null; // Character avatar placeholder for future purpose - set to image URL when ready

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: -50 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: 0,
      }}
      transition={{ 
        type: 'spring',
        stiffness: 200,
        damping: 15
      }}
      className="absolute z-20 pointer-events-none"
      style={{
        top: position.top,
        left: position.left,
        transform: 'translate(calc(-50% + 70px), -120%)' // Adjusted offset for bigger size
      }}
    >
      {/* Bouncing animation container */}
      <motion.div
        animate={{ 
          y: [0, -8, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Navigation marker style (like Google Maps) */}
        <div className="relative">
          {/* "You" label - now at the top */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-auto">
            <div className="bg-blue-600 text-white rounded-lg px-4 py-1.5 shadow-lg">
              You
            </div>
          </div>

          {/* Glow effect */}
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-xl"
          />

          {/* Navigation marker container */}
          <div className="relative flex flex-col items-center">
            {/* Circle top part (like navigation marker) - BIGGER */}
            <div className="relative bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full p-1.5 shadow-2xl border-4 border-white w-20 h-20 flex items-center justify-center">
              {/* Inner circle with character icon */}
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                {characterAvatarImage ? (
                  <ImageWithFallback
                    src={characterAvatarImage}
                    alt="Character Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-9 h-9 text-blue-600" strokeWidth={2.5} />
                )}
              </div>
              
              {/* Pulse ring */}
              <motion.div
                animate={{ 
                  scale: [1, 1.4, 1],
                  opacity: [0.6, 0, 0.6]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeOut"
                }}
                className="absolute inset-0 border-4 border-blue-400 rounded-full"
              />
            </div>

            {/* Triangle pointer (arrow pointing down to location) - BIGGER */}
            <div className="relative -mt-1.5">
              <div 
                className="w-0 h-0 drop-shadow-lg"
                style={{
                  borderLeft: '10px solid transparent',
                  borderRight: '10px solid transparent',
                  borderTop: '16px solid white',
                }}
              />
              <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0"
                style={{
                  borderLeft: '8px solid transparent',
                  borderRight: '8px solid transparent',
                  borderTop: '13px solid #3b82f6', // Blue color
                }}
              />
            </div>

            {/* Connection line to building */}
            <motion.div
              animate={{ 
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-0.5 h-20 bg-gradient-to-b from-blue-400 to-transparent"
            />
          </div>
        </div>
      </motion.div>

      {/* Note comment for developers */}
      <div className="sr-only">Navigation marker - Placeholder for future custom character illustration</div>
    </motion.div>
  );
}