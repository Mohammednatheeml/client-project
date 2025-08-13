import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Sparkles, Quote } from "lucide-react";
import myImage from "./assets/myimage.jpg"; // Adjust path as needed

const FinalSurprise = () => {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showImage, setShowImage] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const fireworksRef = useRef<HTMLDivElement>(null);

  const startCountdown = () => {
    let count = 3;
    setCountdown(count);
    const interval = setInterval(() => {
      count -= 1;
      if (count > 0) {
        setCountdown(count);
      } else {
        clearInterval(interval);
        setCountdown(null);
        setShowFireworks(true);
        setTimeout(() => {
          setShowImage(true);
          setShowFireworks(false);
        }, 2000);
      }
    }, 1000);
  };

  useEffect(() => {
    if (!showFireworks || !fireworksRef.current) return;

    const container = fireworksRef.current;
    let intervals: NodeJS.Timeout[] = [];

    const createFirework = (x: number, y: number) => {
      const firework = document.createElement('div');
      firework.className = 'firework';
      firework.style.left = `${x}%`;
      firework.style.top = `${y}%`;
      firework.style.setProperty('--color', 
        `hsl(${Math.random() * 360}, 100%, 75%)`);
      
      container.appendChild(firework);
      
      setTimeout(() => {
        firework.remove();
      }, 1500);
    };

    // Create random fireworks
    const randomFireworks = setInterval(() => {
      createFirework(
        Math.random() * 100,
        Math.random() * 100
      );
    }, 200);

    // Create burst at center
    const centerBurst = setTimeout(() => {
      for (let i = 0; i < 360; i += 15) {
        const angle = (i * Math.PI) / 180;
        createFirework(
          50 + Math.cos(angle) * 30,
          50 + Math.sin(angle) * 30
        );
      }
    }, 500);

    intervals.push(randomFireworks, centerBurst);

    return () => {
      intervals.forEach(clearInterval);
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [showFireworks]);

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center px-4 overflow-hidden bg-gradient-to-b from-[#1a0633] via-[#3a0b6d] to-[#2a1a5a]">
      {/* Fireworks container */}
      <div 
        ref={fireworksRef}
        className={`fixed inset-0 z-0 pointer-events-none ${!showFireworks ? 'hidden' : ''}`}
      />

      {/* Background elements */}
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            backgroundColor: `hsl(${Math.random() * 360}, 100%, 75%)`,
            filter: 'blur(1px)',
          }}
          animate={{ 
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2 + Math.random() * 3,
            ease: "easeInOut"
          }}
        />
      ))}

      <div className="text-center relative z-10 w-full max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 mb-8"
        >
          Your Special Surprise! ✨
        </motion.h2>

        <AnimatePresence mode="wait">
          {!showImage && !showFireworks && countdown === null ? (
            <motion.button
              onClick={startCountdown}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg mb-12"
            >
              <span className="flex items-center gap-2">
                <Gift className="w-6 h-6" />
                Reveal Your Surprise
                <Sparkles className="w-6 h-6" />
              </span>
            </motion.button>
          ) : null}

          {countdown !== null && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="text-8xl font-bold text-pink-300 mb-12"
            >
              {countdown}
            </motion.div>
          )}

          {showImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center"
            >
              <motion.img
                src={myImage}
                alt="Special Surprise"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  damping: 10
                }}
                className="rounded-lg shadow-xl border-4 border-white/20 w-full max-w-md mb-8"
              />
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-lg max-w-md"
              >
                <Quote className="w-8 h-8 text-white/50 mb-2" />
                <p className="text-white/90 text-lg italic">
                  "Wishing you endless joy and happiness on your special day!"
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        .firework {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--color);
          box-shadow: 0 0 10px 2px var(--color);
          transform: translate(-50%, -50%);
          animation: explode 1s ease-out forwards;
          pointer-events: none;
        }
        
        @keyframes explode {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(20);
            opacity: 0;
          }
        }
        
        .firework::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: var(--color);
          transform: translate(-50%, -50%);
          animation: particle 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default FinalSurprise;