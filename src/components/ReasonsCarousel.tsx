import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

interface ReasonsCarouselProps {
  onComplete: () => void;
}

const reasons = [
  { text: "Your beautiful smile lights up my world", emoji: "😊" },
  { text: "The way you laugh at my silly jokes", emoji: "😂" },
  { text: "Your kind and caring heart", emoji: "💖" },
  { text: "How you make every day feel special", emoji: "✨" },
  { text: "Your cozy hugs that feel like home", emoji: "🏠" },
  { text: "The way you look at me like I'm your world", emoji: "🌍" },
  { text: "Your spontaneous kisses", emoji: "💋" },
  { text: "Because you're simply perfect for me", emoji: "💕" }
];

const FloatingHeart = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 100, x: Math.random() * 100 - 50 }}
    animate={{
      opacity: [0, 1, 0],
      y: -120,
      x: Math.random() * 200 - 100,
      rotate: Math.random() * 360
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      repeatDelay: Math.random() * 3 + 2
    }}
    className="absolute text-2xl pointer-events-none"
    style={{
      left: `${Math.random() * 100}%`,
      bottom: '0%'
    }}
  >
    💖
  </motion.div>
);

const ReasonsCarousel: React.FC<ReasonsCarouselProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => paginate(1), 4000);
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 400 : -400,
      opacity: 0,
      scale: 0.9,
      rotateY: direction > 0 ? 45 : -45
    }),
    center: { x: 0, opacity: 1, scale: 1, rotateY: 0 },
    exit: (direction: number) => ({
      x: direction < 0 ? 400 : -400,
      opacity: 0,
      scale: 0.9,
      rotateY: direction < 0 ? 45 : -45
    })
  };

  const swipeConfidenceThreshold = 8000;
  const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) =>
      newDirection === 1
        ? prev === reasons.length - 1 ? 0 : prev + 1
        : prev === 0 ? reasons.length - 1 : prev - 1
    );
  };

  const handleNavigation = (newDirection: number) => {
    setIsAutoPlaying(false);
    paginate(newDirection);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Soft flowing romantic gradient background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(120deg, #ff9a9e 0%, #fecfef 100%)",
            "linear-gradient(120deg, #fbc2eb 0%, #a6c1ee 100%)",
            "linear-gradient(120deg, #ffdde1 0%, #ee9ca7 100%)"
          ]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Romantic soft pattern */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20px 20px, rgba(255,255,255,0.5) 2px, transparent 0),
                             radial-gradient(circle at 60px 60px, rgba(255,255,255,0.5) 2px, transparent 0)`,
          backgroundSize: '80px 80px'
        }}
        animate={{ backgroundPosition: ['0px 0px', '40px 40px', '0px 0px'] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating hearts */}
      {Array.from({ length: 10 }).map((_, i) => (
        <FloatingHeart key={i} delay={i * 0.5} />
      ))}

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-white mb-8 text-center"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          Reasons I Love You 💕
        </motion.h2>

        <div className="relative w-full max-w-md h-80 flex items-center justify-center perspective-1000">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 200, damping: 25 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 },
                rotateY: { duration: 0.4 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.3}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) handleNavigation(1);
                else if (swipe > swipeConfidenceThreshold) handleNavigation(-1);
              }}
              className="absolute w-full cursor-grab active:cursor-grabbing"
            >
              <motion.div
                className="bg-white/90 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/30 text-center h-full flex flex-col justify-between"
                whileHover={{ scale: 1.02 }}
              >
                <div>
                  <motion.div
                    className="text-5xl mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                  >
                    {reasons[currentIndex].emoji}
                  </motion.div>
                  <p
                    className="text-xl text-gray-700 leading-relaxed font-medium"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {reasons[currentIndex].text}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <button onClick={() => handleNavigation(-1)}>
                    <ChevronLeft className="w-5 h-5 text-pink-600" />
                  </button>
                  <Heart className="w-7 h-7 text-red-500 fill-current" />
                  <button onClick={() => handleNavigation(1)}>
                    <ChevronRight className="w-5 h-5 text-pink-600" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={onComplete}
          className="mt-8 bg-gradient-to-r from-pink-500 to-red-400 text-white px-6 py-3 rounded-full font-semibold shadow-lg"
        >
          Continue to Memory Lane 🌸
        </button>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Playfair+Display:wght@500;600&display=swap');
      `}</style>
    </div>
  );
};

export default ReasonsCarousel;
