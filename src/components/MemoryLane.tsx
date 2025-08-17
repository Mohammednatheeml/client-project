import React from "react";
import { motion } from "framer-motion";

interface MemoryLaneProps {
  onComplete: () => void;
}

const futureGoals = [
  {
    emoji: "🏡",
    title: "Build Our Dream Home",
    description: "Create a cozy space to call our own and make it perfect.",
  },
  {
    emoji: "✈️",
    title: "Travel the World Together",
    description: "Explore new countries, cultures, and adventures side by side.",
  },
  {
    emoji: "💍",
    title: "Get Engaged",
    description: "Celebrate our love with a beautiful proposal.",
  },
  {
    emoji: "🎓",
    title: "Grow and Learn",
    description: "Support each other's dreams and personal growth.",
  },
  {
    emoji: "🐶",
    title: "Adopt a Pet",
    description: "Welcome a furry friend into our family.",
  },
  {
    emoji: "🍳",
    title: "Cook Together",
    description: "Try new recipes and enjoy homemade meals.",
  },
  {
    emoji: "🌅",
    title: "Watch Sunrises",
    description: "Start our days with beautiful views and gratitude.",
  },
  {
    emoji: "🧳",
    title: "Weekend Getaways",
    description: "Escape for spontaneous trips and make memories.",
  },
  {
    emoji: "👨‍👩‍👧‍👦",
    title: "Start a Family",
    description: "Dream about our future and growing together.",
  },
  {
    emoji: "🎉",
    title: "Celebrate Milestones",
    description: "Mark every achievement and special moment together.",
  },
  {
    emoji: "🛋️",
    title: "Cozy Movie Nights",
    description: "Cuddle up and binge our favorite shows.",
  },
  {
    emoji: "🌳",
    title: "Picnic in the Park",
    description: "Enjoy nature and each other's company outdoors.",
  },
  {
    emoji: "🚗",
    title: "Road Trips",
    description: "Drive to new places and sing along to our favorite songs.",
  },
  {
    emoji: "📝",
    title: "Write Our Story",
    description: "Document our journey and memories together.",
  },
  {
    emoji: "💪",
    title: "Stay Healthy",
    description: "Motivate each other to live a happy, healthy life.",
  },
  {
    emoji: "🌍",
    title: "Volunteer Together",
    description: "Make a positive impact in our community and beyond.",
  },
  {
    emoji: "🎶",
    title: "Attend Concerts",
    description: "Dance and sing along to our favorite artists live.",
  },
  {
    emoji: "🏖️",
    title: "Beach Holidays",
    description: "Relax by the ocean and build sandcastles together.",
  },
  
  {
    emoji: "📚",
    title: "Read Together",
    description: "Share stories and discover new worlds in books.",
  },
  {
    emoji: "🧘‍♀️",
    title: "Meditate & Grow",
    description: "Find peace and mindfulness side by side.",
  },
  {
    emoji: "🍦",
    title: "Ice Cream Dates",
    description: "Try every flavor and laugh at our silly choices.",
  },
  {
    emoji: "🖼️",
    title: "Create Art",
    description: "Paint, draw, and express ourselves together.",
  },
  {
    emoji: "🎂",
    title: "Birthday Surprises",
    description: "Make every birthday unforgettable.",
  },
];

const FloatingHeart = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 80, x: Math.random() * 100 - 50 }}
    animate={{ opacity: [0, 0.6, 0], y: -140, x: Math.random() * 200 - 100, rotate: Math.random() * 360 }}
    transition={{ duration: 6, delay, repeat: Infinity, repeatDelay: Math.random() * 3 + 2, ease: "easeInOut" }}
    className="absolute text-xl pointer-events-none select-none"
    style={{ 
      left: `${Math.random() * 100}%`, 
      bottom: "0%", 
      color: "rgba(255,215,255,0.7)", 
      filter: "drop-shadow(0 0 8px rgba(255,215,255,0.6))" 
    }}
  >
    ❤️
  </motion.div>
);

const Star = ({ size, top, left, delay }: { size: number; top: number; left: number; delay: number }) => (
  <motion.div
    style={{ 
      width: size, 
      height: size, 
      borderRadius: "50%", 
      backgroundColor: "rgba(255,255,255,0.9)", 
      position: "absolute", 
      top: `${top}%`, 
      left: `${left}%`, 
      filter: "drop-shadow(0 0 6px rgba(255,255,255,0.9))" 
    }}
    animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8], rotate: [0, 15, 0] }}
    transition={{ repeat: Infinity, duration: 3 + Math.random() * 3, delay, ease: "easeInOut" }}
  />
);

const MemoryLane: React.FC<MemoryLaneProps> = ({ onComplete }) => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#4b1248] via-[#6a3093] to-[#a044ff] flex flex-col items-center px-4 py-20">
      {/* Background elements */}
      {[...Array(200)].map((_, i) => (
        <Star 
          key={i} 
          size={1 + Math.random() * 2} 
          top={Math.random() * 100} 
          left={Math.random() * 100} 
          delay={Math.random() * 5} 
        />
      ))}
      {[...Array(25)].map((_, i) => (
        <FloatingHeart key={i} delay={i * 0.4} />
      ))}

      {/* Main content */}
      <motion.h2
        className="text-5xl md:text-7xl font-bold mb-6 text-center"
        style={{ 
          fontFamily: "'Playfair Display', serif",
          color: "#ffffff",
          textShadow: "0 2px 10px rgba(255,215,255,0.5)",
          letterSpacing: "1px",
          fontWeight: 700
        }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Our Future Together
      </motion.h2>
      
      <motion.p 
        className="text-white/80 text-lg md:text-xl mb-12 text-center font-light"
        style={{ fontFamily: "'Inter', sans-serif" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        Scroll to discover our dreams and aspirations ✨
      </motion.p>

      <div className="w-full max-w-3xl flex flex-col gap-6">
        {futureGoals.map((goal, idx) => (
          <motion.div
            key={idx}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/20 hover:border-pink-300/50 transition-all duration-300 relative overflow-hidden"
            initial={{ opacity: 0, x: idx % 2 === 0 ? -120 : 120, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, delay: idx * 0.3, type: "spring", stiffness: 100 }}
          >
            <div className="text-3xl md:text-4xl mb-3 text-center filter drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">
              {goal.emoji}
            </div>
            
            <h3 
              className="text-xl md:text-2xl font-semibold mb-2 text-center"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#ffffff",
                textShadow: "0 1px 3px rgba(0,0,0,0.3)"
              }}
            >
              {goal.title}
            </h3>
            
            <p 
              className="text-white/80 text-base md:text-lg leading-relaxed text-center"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {goal.description}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.button
        onClick={onComplete}
        className="mt-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-4 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20"
        style={{ fontFamily: "'Inter', sans-serif" }}
        whileHover={{ 
          scale: 1.05, 
          boxShadow: "0 10px 25px rgba(168, 85, 247, 0.5)",
          background: "linear-gradient(to right, #a855f7, #ec4899)"
        }}
        whileTap={{ scale: 0.98 }}
      >
        Continue Our Journey Together 💫
      </motion.button>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap");
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default MemoryLane;