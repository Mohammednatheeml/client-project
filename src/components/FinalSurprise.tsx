import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Gift, Sparkles } from 'lucide-react';

const FinalSurprise: React.FC = () => {
  const [showGift, setShowGift] = useState(false);
  const [showPoem, setShowPoem] = useState(false);

  const poem = `
    My dearest love, so far yet near,
    In every heartbeat, you I hear.
    
    Though miles divide our beating hearts,
    Nothing can tear our love apart.
    
    Your laugh, your smile, your gentle way,
    Brightens up my every day.
    
    This birthday wish I send to you,
    With all my love, forever true.
    
    Until the day we meet again,
    You'll be my sunshine after rain.
    
    Happy Birthday, my beautiful one,
    You make my world bright as the sun. ☀️
    
    With all my love,
    Forever yours 💕
  `;

  const handleGiftClick = () => {
    setShowGift(true);
    setTimeout(() => setShowPoem(true), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-yellow-200 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Floating background elements */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        >
          <span className="text-2xl">
            {['💕', '✨', '🌟', '💖', '🎂'][Math.floor(Math.random() * 5)]}
          </span>
        </motion.div>
      ))}

      <div className="text-center max-w-4xl relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-dancing text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 mb-8"
        >
          Your Final Birthday Surprise! 🎁
        </motion.h2>

        <AnimatePresence mode="wait">
          {!showGift ? (
            <motion.div
              key="gift-button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center"
            >
              <motion.p
                className="text-xl md:text-2xl text-purple-600 font-medium mb-8 leading-relaxed max-w-2xl"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                I have one more special surprise just for you...
              </motion.p>

              <motion.button
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, -5, 5, 0],
                  boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
                }}
                whileTap={{ scale: 0.9 }}
                onClick={handleGiftClick}
                className="relative bg-gradient-to-r from-pink-400 via-purple-500 to-yellow-500 text-white px-12 py-6 rounded-full text-2xl font-medium shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Gift className="w-8 h-8" />
                  Click for Your Gift
                  <Sparkles className="w-8 h-8" />
                </span>
                
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="gift-reveal"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, ease: "back.out(1.7)" }}
              className="flex flex-col items-center"
            >
              {/* Animated heart */}
              <motion.div
                className="mb-8"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <Heart className="w-32 h-32 text-red-400 fill-current filter drop-shadow-2xl" />
              </motion.div>

              {showPoem && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 2 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-pink-200 max-w-2xl mx-4"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-3xl font-dancing text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-2">
                      A Poem Written Just for You
                    </h3>
                    <div className="flex justify-center gap-2">
                      {[...Array(5)].map((_, i) => (
                        <Heart key={i} className="w-4 h-4 text-pink-400 fill-current" />
                      ))}
                    </div>
                  </div>

                  <pre className="text-lg font-dancing text-gray-700 leading-relaxed whitespace-pre-wrap text-center">
                    {poem}
                  </pre>
                </motion.div>
              )}

              {showPoem && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3, duration: 2 }}
                  className="text-xl font-dancing text-purple-600 mt-8 animate-pulse"
                >
                  Happy Birthday, my love! I can't wait to celebrate with you in person soon 💕
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FinalSurprise;