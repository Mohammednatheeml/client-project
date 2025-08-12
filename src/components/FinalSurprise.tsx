import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Gift, Sparkles } from 'lucide-react';

const starCount = 80; // fewer stars for clarity
const emojiCount = 10;

const pastelColors = ['#f7c5cc', '#b4a6e0', '#a0d8ef']; // pink, lavender, baby blue

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#05091e] via-[#2c0f4d] to-[#1f1b4a] flex flex-col items-center justify-center px-4"
    >
      {/* Twinkling pastel stars */}
      {[...Array(starCount)].map((_, i) => {
        const size = Math.random() * 2 + 0.7;
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const delay = Math.random() * 3;
        const duration = 1.5 + Math.random() * 1.5;
        const color = pastelColors[i % pastelColors.length];
        const rotationDuration = 6 + Math.random() * 4;

        return (
          <motion.div
            key={i}
            style={{
              top: `${top}%`,
              left: `${left}%`,
              width: size,
              height: size,
              borderRadius: '50%',
              backgroundColor: color,
              position: 'absolute',
              filter: `drop-shadow(0 0 6px ${color})`,
              originX: 0.5,
              originY: 0.5,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              rotate: [0, 3, 0],
            }}
            transition={{
              repeat: Infinity,
              duration,
              delay,
              ease: 'easeInOut',
              rotate: { duration: rotationDuration, repeat: Infinity, ease: 'easeInOut' },
            }}
          />
        );
      })}

      {/* Glowing drifting orbs */}
      {[...Array(6)].map((_, i) => {
        const size = 40 + Math.random() * 40;
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const duration = 40 + Math.random() * 20;
        const color = pastelColors[i % pastelColors.length];

        return (
          <motion.div
            key={'orb' + i}
            style={{
              position: 'absolute',
              top: `${top}%`,
              left: `${left}%`,
              width: size,
              height: size,
              borderRadius: '50%',
              backgroundColor: color,
              filter: 'blur(60px)',
              opacity: 0.12,
              pointerEvents: 'none',
              mixBlendMode: 'screen',
            }}
            animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
            transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay: i * 5 }}
          />
        );
      })}

      {/* Comet streaks */}
      {[...Array(3)].map((_, i) => {
        const top = 10 + i * 30;
        const delay = i * 8;
        return (
          <motion.div
            key={'comet' + i}
            style={{
              position: 'absolute',
              top: `${top}%`,
              left: '-40%',
              width: '100px',
              height: '2px',
              background:
                'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)',
              filter: 'blur(2px)',
              borderRadius: '50%',
              pointerEvents: 'none',
            }}
            animate={{ x: ['0%', '150%'] }}
            transition={{
              repeat: Infinity,
              duration: 10,
              delay,
              ease: 'linear',
            }}
          />
        );
      })}

      {/* Floating emojis */}
      {[...Array(emojiCount)].map((_, i) => (
        <motion.div
          key={'emoji' + i}
          className="absolute text-2xl select-none"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            color: pastelColors[i % pastelColors.length],
            filter: `drop-shadow(0 0 6px ${pastelColors[i % pastelColors.length]})`,
            userSelect: 'none',
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
            opacity: [0.3, 1, 0.3],
            scale: [0.85, 1.05, 0.85],
          }}
          transition={{
            repeat: Infinity,
            duration: 8 + Math.random() * 6,
            delay: Math.random() * 8,
            ease: 'easeInOut',
          }}
        >
          {['💕', '✨', '🌟', '💖', '🎂'][i % 5]}
        </motion.div>
      ))}

      <div className="text-center max-w-4xl relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-sans font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-yellow-400 mb-8 tracking-wide"
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
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <motion.p
                className="text-xl md:text-2xl text-pink-300 font-light mb-8 leading-relaxed max-w-2xl"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                I have one more special surprise just for you...
              </motion.p>

              <motion.button
                whileHover={{
                  scale: 1.1,
                  rotate: [0, -5, 5, 0],
                  boxShadow: '0 0 30px rgba(255, 105, 180, 0.9)',
                }}
                whileTap={{ scale: 0.9 }}
                onClick={handleGiftClick}
                className="relative bg-gradient-to-r from-pink-500 via-purple-600 to-yellow-400 text-white px-12 py-6 rounded-full text-2xl font-semibold shadow-lg transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Gift className="w-8 h-8" />
                  Click for Your Gift
                  <Sparkles className="w-8 h-8" />
                </span>

                <motion.div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(270deg, #ff9a9e, #fad0c4, #fad0c4, #ff9a9e)',
                    opacity: 0.5,
                    filter: 'blur(15px)',
                  }}
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="gift-reveal"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: 'back.out(1.7)' }}
              className="flex flex-col items-center"
            >
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
                  transition={{ duration: 1.5 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-pink-300 max-w-2xl mx-4"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-3xl font-serif italic text-pink-500 mb-2">
                      A Poem Written Just for You
                    </h3>
                    <div className="flex justify-center gap-2">
                      {[...Array(5)].map((_, i) => (
                        <Heart key={i} className="w-5 h-5 text-pink-400 fill-current" />
                      ))}
                    </div>
                  </div>

                  <pre className="text-lg font-serif italic text-gray-800 leading-relaxed whitespace-pre-wrap text-center">
                    {poem}
                  </pre>
                </motion.div>
              )}

              {showPoem && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2, duration: 1.5 }}
                  className="text-xl font-serif italic text-pink-400 mt-8 animate-pulse"
                >
                  Happy Birthday, my love! I can't wait to celebrate with you in person soon 💕
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default FinalSurprise;
