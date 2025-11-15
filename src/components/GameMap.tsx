import { motion } from 'motion/react';
import { Building2, Home, ShoppingCart, Hospital, Landmark, Dices } from 'lucide-react';
import { Location } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PlayerCharacter } from './PlayerCharacter';

interface GameMapProps {
  onLocationClick: (location: Location) => void;
  currentLocation: string | null;
}

export function GameMap({ onLocationClick, currentLocation }: GameMapProps) {
  const locations = [
    { 
      id: 'home', 
      name: 'Your Home', 
      icon: 'home', 
      color: 'from-amber-400 to-orange-500', 
      Icon: Home,
      position: { top: '30%', left: '8%' }
    },
    { 
      id: 'bank', 
      name: 'Bank', 
      icon: 'bank', 
      color: 'from-blue-500 to-indigo-600', 
      Icon: Landmark,
      position: { top: '30%', left: '65%' }
    },
    { 
      id: 'store', 
      name: 'Mall', 
      icon: 'store', 
      color: 'from-green-500 to-emerald-600', 
      Icon: ShoppingCart,
      position: { top: '60%', left: '25%' }
    },
    { 
      id: 'hospital', 
      name: 'Hospital', 
      icon: 'hospital', 
      color: 'from-red-400 to-pink-500', 
      Icon: Hospital,
      position: { top: '55%', left: '70%' }
    },
    { 
      id: 'casino', 
      name: 'Casino', 
      icon: 'casino', 
      color: 'from-purple-500 to-fuchsia-600', 
      Icon: Dices,
      position: { top: '25%', left: '40%' }
    },
    { 
      id: 'office', 
      name: 'Office Building', 
      icon: 'office', 
      color: 'from-slate-500 to-gray-600', 
      Icon: Building2,
      position: { top: '70%', left: '50%' }
    },
  ];

  // This variable is for 2D city map images. Format must be JPG or JPEG format.
  const cityBackgroundImage = "https://i.imgur.com/yRjp0aR.jpeg"; // Custom city map background from team artist

  // Find current location position
  const currentLocationData = locations.find(loc => loc.id === currentLocation);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative w-full h-full overflow-hidden"
    >
      {/* City Background - Full screen */}
      <div className="relative w-full h-full">
        {/* Background city image with overlay */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src={cityBackgroundImage}
            alt="City Map"
            className="w-full h-full object-cover"
          />
          {/* Colorful overlay for game feel */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/40 via-pink-500/30 to-blue-500/40 mix-blend-multiply" />
          {/* Lighter overlay for readability */}
          <div className="absolute inset-0 bg-white/20" />
        </div>

        {/* Grid overlay for city feel */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />

        {/* Interactive Buildings */}
        {locations.map((location, index) => (
          <motion.div
            key={location.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.15, type: 'spring' }}
            className="absolute"
            style={{
              top: location.position.top,
              left: location.position.left,
              transform: 'translate(-50%, -50%)'
            }}
          >
            {/* Pulsing indicator */}
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className={`absolute inset-0 bg-gradient-to-r ${location.color} rounded-full blur-xl`}
            />

            {/* Building Button */}
            <motion.button
              whileHover={{ scale: 1.15, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onLocationClick(location)}
              className="relative group"
            >
              {/* Building container with 3D effect */}
              <div className="relative">
                {/* Shadow */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-black/30 rounded-full blur-md" />
                
                {/* Building */}
                <div className={`relative bg-gradient-to-br ${location.color} rounded-2xl p-5 shadow-2xl w-24 h-24 flex flex-col items-center justify-center transition-all duration-300 group-hover:shadow-3xl border-4 border-white/50`}>
                  {/* Icon */}
                  <div className="bg-white/90 rounded-xl p-3 shadow-lg mb-1">
                    <location.Icon className="w-8 h-8 text-gray-800" />
                  </div>
                </div>

                {/* Label - shows on button hover */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-white/95 backdrop-blur rounded-xl px-4 py-2 shadow-xl border-2 border-gray-200">
                    <p className="text-gray-800">{location.name}</p>
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${location.color} rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity`} />
              </div>
            </motion.button>
          </motion.div>
        ))}

        {/* Decorative elements - roads/paths */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" style={{ zIndex: 0 }}>
          <defs>
            <linearGradient id="roadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FFA500" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          {/* Connect buildings with decorative paths */}
          <path d="M 15% 15% Q 40% 20%, 65% 30%" stroke="url(#roadGradient)" strokeWidth="8" fill="none" strokeDasharray="10,5" />
          <path d="M 65% 30% Q 70% 40%, 70% 55%" stroke="url(#roadGradient)" strokeWidth="8" fill="none" strokeDasharray="10,5" />
          <path d="M 15% 15% Q 20% 40%, 25% 60%" stroke="url(#roadGradient)" strokeWidth="8" fill="none" strokeDasharray="10,5" />
          <path d="M 25% 60% Q 35% 65%, 50% 70%" stroke="url(#roadGradient)" strokeWidth="8" fill="none" strokeDasharray="10,5" />
        </svg>

        {/* Player Character */}
        {currentLocationData && (
          <PlayerCharacter position={currentLocationData.position} />
        )}
      </div>

      {/* Bottom instruction panel */}
      <div className="bg-gradient-to-r from-yellow-100 to-amber-100 p-4 border-t-4 border-yellow-300">
        <p className="text-center text-yellow-900">💡 Click on any building to make financial decisions and shape your future!</p>
      </div>
    </motion.div>
  );
}