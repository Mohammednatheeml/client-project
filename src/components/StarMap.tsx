import React, { useState, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import { X, Heart } from 'lucide-react';

interface StarMapProps {
  onComplete: () => void;
}

const loveNotes = [
  "You are my sunshine on cloudy days ☀️",
  "Distance means nothing when you're everything to me 💫",
  "I fall in love with you more every day 💕",
  "You make my heart skip beats from miles away 💓",
  "Can't wait to hold you in my arms again 🤗",
  "Your love gives me strength to get through anything 💪",
  "You're the missing piece to my puzzle 🧩",
  "Every star in this sky reminds me of your beauty ✨",
  "I love how you make the ordinary feel magical 🪄",
  "You're my favorite hello and hardest goodbye 👋"
];

const AnimatedStars: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1}
      />
    </group>
  );
};

const StarMap: React.FC<StarMapProps> = ({ onComplete }) => {
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [clickedStars, setClickedStars] = useState<Set<number>>(new Set());

  const handleStarClick = (index: number) => {
    setSelectedNote(loveNotes[index]);
    setClickedStars(prev => new Set([...prev, index]));
  };

  const closeModal = () => {
    setSelectedNote(null);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Three.js Star Background */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Suspense fallback={null}>
            <AnimatedStars />
          </Suspense>
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-dancing text-white mb-8 text-center"
        >
          Our Love Constellation ⭐
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-xl text-white/80 font-medium text-center mb-12 max-w-2xl"
        >
          Click on the glowing stars to reveal hidden love notes written just for you 💫
        </motion.p>

        {/* Interactive Stars Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 mb-12">
          {loveNotes.map((_, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 + index * 0.1 }}
              whileHover={{ 
                scale: 1.3,
                filter: "brightness(1.5)",
                rotate: [0, -5, 5, 0]
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleStarClick(index)}
              className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                clickedStars.has(index) 
                  ? 'bg-gradient-to-r from-pink-400 to-purple-500 shadow-lg shadow-pink-500/50' 
                  : 'bg-gradient-to-r from-yellow-200 to-yellow-400 shadow-lg shadow-yellow-400/50'
              }`}
            >
              <span className="text-2xl animate-pulse">
                {clickedStars.has(index) ? '💖' : '⭐'}
              </span>
              
              {/* Sparkle effect */}
              <div className="absolute inset-0 rounded-full">
                {[...Array(4)].map((_, sparkleIndex) => (
                  <motion.div
                    key={sparkleIndex}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: sparkleIndex * 0.3,
                    }}
                  />
                ))}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Progress indicator */}
        <div className="mb-8">
          <p className="text-white/70 text-center">
            Discovered: {clickedStars.size} / {loveNotes.length} love notes
          </p>
          <div className="w-64 h-2 bg-white/20 rounded-full mt-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-400 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${(clickedStars.size / loveNotes.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {clickedStars.size === loveNotes.length && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onComplete}
            className="bg-gradient-to-r from-pink-400 via-purple-500 to-yellow-500 text-white px-8 py-4 rounded-full text-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Ready for Your Final Surprise? 🎁
          </motion.button>
        )}
      </div>

      {/* Love Note Modal */}
      <AnimatePresence>
        {selectedNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
              
              <div className="text-center">
                <Heart className="w-12 h-12 text-red-500 fill-current mx-auto mb-4 animate-pulse" />
                <p className="text-xl font-dancing text-gray-800 leading-relaxed">
                  {selectedNote}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StarMap;