import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

interface ReasonsCarouselProps {
  onComplete: () => void;
}

const reasons = [
  { text: "Your beautiful smile lights up my world", emoji: "😊" },
  { text: "The way you laugh at my silly jokes", emoji: "😂" },
  { text: "Your kind and caring heart", emoji: "💖" },
  { text: "How you make every day feel special", emoji: "✨" },
  { text: "Your amazing strength and determination", emoji: "💪" },
  { text: "The way you listen and understand me", emoji: "👂" },
  { text: "Your adorable sleepy voice in the morning", emoji: "😴" },
  { text: "How you support my dreams", emoji: "🌟" },
  { text: "Your incredible sense of humor", emoji: "🤣" },
  { text: "The way you make me feel loved", emoji: "🥰" },
  { text: "Your beautiful eyes that I get lost in", emoji: "👁️" },
  { text: "How you always know what to say", emoji: "💬" },
  { text: "Your passion for the things you love", emoji: "🔥" },
  { text: "The way you dance like no one's watching", emoji: "💃" },
  { text: "Your incredible cooking skills", emoji: "👩‍🍳" },
  { text: "How you make me want to be better", emoji: "🌱" },
  { text: "Your cute little habits that make me smile", emoji: "😌" },
  { text: "The way you care for everyone around you", emoji: "🤗" },
  { text: "Your beautiful singing voice", emoji: "🎵" },
  { text: "Your gentle touch that calms my soul", emoji: "🤲" },
  { text: "The way you remember the little things", emoji: "📝" },
  { text: "Your adventurous spirit", emoji: "🗺️" },
  { text: "How you make ordinary moments magical", emoji: "🪄" },
  { text: "Your wisdom and thoughtful advice", emoji: "🦉" },
  { text: "The way you blush when I compliment you", emoji: "😳" },
  { text: "Your creativity and imagination", emoji: "🎨" },
  
  { text: "How you make me laugh until my stomach hurts", emoji: "🤪" },
  { text: "Your patience with my quirks", emoji: "🙏" },
  { text: "The way you look at me like I'm your world", emoji: "🌍" },
  { text: "Your ability to find joy in simple things", emoji: "🌻" },
  { text: "How you believe in me even when I don't", emoji: "🦋" },
  { text: "Your cozy hugs that feel like home", emoji: "🏠" },
  { text: "The way you make me feel safe", emoji: "🛡️" },
  { text: "Your spontaneous kisses", emoji: "💋" },
  { text: "How you inspire me every single day", emoji: "🚀" },
  { text: "Because you're simply perfect for me", emoji: "💕" },
];

// Floating hearts
const FloatingHeart = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 100, x: Math.random() * 100 - 50 }}
    animate={{
      opacity: [0, 1, 0],
      y: -120,
      x: Math.random() * 200 - 100,
      rotate: Math.random() * 360,
    }}
    transition={{
      duration: 5,
      delay,
      repeat: Infinity,
      repeatDelay: Math.random() * 3 + 2,
      ease: "easeInOut",
    }}
    className="absolute text-2xl pointer-events-none select-none"
    style={{ left: `${Math.random() * 100}%`, bottom: "0%" }}
  >
    💖
  </motion.div>
);

// Stars
const Star = ({
  size,
  top,
  left,
  delay,
}: {
  size: number;
  top: number;
  left: number;
  delay: number;
}) => (
  <motion.div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      backgroundColor: "white",
      position: "absolute",
      top: `${top}%`,
      left: `${left}%`,
      filter: "drop-shadow(0 0 4px white)",
      opacity: 0.8,
    }}
    animate={{
      opacity: [0.2, 1, 0.2],
      scale: [0.8, 1.1, 0.8],
      rotate: [0, 15, 0],
    }}
    transition={{
      repeat: Infinity,
      duration: 3 + Math.random() * 2,
      delay,
      ease: "easeInOut",
    }}
  />
);

const Moon = () => (
  <motion.div
    className="absolute w-32 h-32 rounded-full bg-yellow-200 shadow-[0_0_60px_15px_rgba(255,255,200,0.5)]"
    style={{ top: "10%", right: "10%" }}
    animate={{ y: [0, 10, 0] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
  />
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
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: { x: 0, opacity: 1, scale: 1, rotateY: 0 },
    exit: (direction: number) => ({
      x: direction < 0 ? 400 : -400,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
    }),
  };

  const swipeConfidenceThreshold = 8000;
  const swipePower = (offset: number, velocity: number) =>
    Math.abs(offset) * velocity;

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) =>
      newDirection === 1
        ? prev === reasons.length - 1
          ? 0
          : prev + 1
        : prev === 0
        ? reasons.length - 1
        : prev - 1
    );
  };

  const handleNavigation = (newDirection: number) => {
    setIsAutoPlaying(false);
    paginate(newDirection);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0b1224] via-[#2c1558] to-[#190639] flex flex-col items-center justify-center px-4">
      {/* Moon */}
      <Moon />

      {/* Stars */}
      {[...Array(200)].map((_, i) => (
        <Star
          key={i}
          size={1 + Math.random() * 2}
          top={Math.random() * 100}
          left={Math.random() * 100}
          delay={Math.random() * 5}
        />
      ))}

      {/* Floating Hearts */}
      {Array.from({ length: 10 }).map((_, i) => (
        <FloatingHeart key={i} delay={i * 0.7} />
      ))}

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 max-w-3xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-serif text-white mb-10 text-center tracking-wide italic"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          I Love You For
        </motion.h2>

        <div className="relative w-full max-w-3xl h-[28rem] mx-auto flex justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.7, y: 60 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: -60 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute w-full"
            >
              <motion.div
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border border-white/20 flex flex-col justify-between items-center text-white h-full"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 140, damping: 12 }}
              >
                <motion.div
                  className="text-7xl mb-6"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {reasons[currentIndex].emoji}
                </motion.div>

                <p
                  className="text-2xl text-center max-w-xl mx-auto leading-relaxed"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontWeight: 700,
                    fontSize: "1.9rem",
                    background:
                      "linear-gradient(90deg, #f9d423, #ff4e50, #a18cd1)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0 2px 20px rgba(255, 223, 186, 0.7)",
                  }}
                >
                  {reasons[currentIndex].text}
                </p>

                <div className="flex justify-between items-center mt-8 text-pink-400 w-full px-10">
                  <button
                    onClick={() => handleNavigation(-1)}
                    aria-label="Previous reason"
                  >
                    <ChevronLeft className="w-8 h-8 hover:text-pink-300 transition" />
                  </button>
                  <Heart className="w-10 h-10 fill-pink-500 drop-shadow-lg animate-pulse" />
                  <button
                    onClick={() => handleNavigation(1)}
                    aria-label="Next reason"
                  >
                    <ChevronRight className="w-8 h-8 hover:text-pink-300 transition" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.button
          onClick={onComplete}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 20px rgba(255,182,193,0.6)",
          }}
          className="mt-12 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-10 py-4 rounded-full font-semibold shadow-lg hover:shadow-2xl transition"
        >
          Continue to Memory Lane 🌸
        </motion.button>
      </div>
    </div>
  );
};

export default ReasonsCarousel;
