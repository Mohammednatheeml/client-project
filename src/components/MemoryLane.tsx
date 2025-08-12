import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    emoji: "🏔️",
    title: "Mountain Adventures",
    description: "Hike and explore breathtaking landscapes.",
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

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const FloatingHeart = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 80, x: Math.random() * 100 - 50 }}
    animate={{
      opacity: [0, 0.6, 0],
      y: -140,
      x: Math.random() * 200 - 100,
      rotate: Math.random() * 360,
    }}
    transition={{
      duration: 6,
      delay,
      repeat: Infinity,
      repeatDelay: Math.random() * 3 + 2,
      ease: "easeInOut",
    }}
    className="absolute text-2xl pointer-events-none select-none"
    style={{
      left: `${Math.random() * 100}%`,
      bottom: "0%",
      color: "rgba(255, 105, 180, 0.7)", // Hot pink, but muted for dark bg
      filter: "drop-shadow(0 0 8px rgba(255, 105, 180, 0.6))",
    }}
  >
    💖
  </motion.div>
);

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
      backgroundColor: "rgba(255, 255, 255, 0.85)", // bright white star
      position: "absolute",
      top: `${top}%`,
      left: `${left}%`,
      filter: "drop-shadow(0 0 6px rgba(255, 255, 255, 0.9))",
      opacity: 0.7,
    }}
    animate={{
      opacity: [0.2, 1, 0.2],
      scale: [0.8, 1.1, 0.8],
      rotate: [0, 15, 0],
    }}
    transition={{
      repeat: Infinity,
      duration: 3 + Math.random() * 3,
      delay,
      ease: "easeInOut",
    }}
  />
);

const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
    emoji?: string;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 gap-8",
        className
      )}
    >
      {items.map((item, idx) => (
        <motion.div
          key={item?.title}
          className="relative group block p-2 h-full w-full cursor-pointer"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: idx * 0.1,
          }}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-gradient-to-br from-pink-700/30 via-purple-700/30 to-indigo-700/30 block rounded-xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.2 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.2, delay: 0.1 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            {item.emoji && (
              <div className="mb-4 flex justify-center text-4xl">
                {item.emoji}
              </div>
            )}
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div
    className={cn(
      "rounded-xl h-full w-full p-6 overflow-hidden bg-black/30 backdrop-blur-lg border border-pink-600/60 shadow-lg group-hover:border-pink-400/90 group-hover:shadow-pink-500/90 relative z-20 transition-all duration-300",
      className
    )}
  >
    <div className="relative z-50">
      <div className="p-2 text-white">{children}</div>
    </div>
  </div>
);

const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <h4
    className={cn(
      "font-bold tracking-wide mt-4 text-xl md:text-2xl text-pink-400",
      className
    )}
    style={{
      fontFamily: "'Playfair Display', serif",
    }}
  >
    {children}
  </h4>
);

const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <p
    className={cn(
      "mt-4 text-pink-300 tracking-wide leading-relaxed text-sm md:text-base",
      className
    )}
    style={{ fontFamily: "'Inter', sans-serif" }}
  >
    {children}
  </p>
);

const MemoryLane: React.FC<MemoryLaneProps> = ({ onComplete }) => {
  const memoryItems = futureGoals.map((goal) => ({
    title: goal.title,
    description: goal.description,
    link: "#",
    emoji: goal.emoji,
  }));

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0b1224] via-[#1c1f4a] to-[#190639] flex flex-col items-center justify-center px-4">
      {/* Bright white stars */}
      {[...Array(100)].map((_, i) => (
        <Star
          key={i}
          size={1 + Math.random() * 2}
          top={Math.random() * 100}
          left={Math.random() * 100}
          delay={Math.random() * 5}
        />
      ))}

      {/* Muted hot pink floating hearts */}
      {Array.from({ length: 20 }).map((_, i) => (
        <FloatingHeart key={i} delay={i * 0.5} />
      ))}

      <div className="container mx-auto px-4 relative z-10 py-20 max-w-7xl">
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
          <motion.h2
            className="text-5xl md:text-6xl mb-6 text-pink-400 font-bold"
            style={{
              fontFamily: "'Dancing Script', cursive",
            }}
          >
            Our Future Together
          </motion.h2>

          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ scale: { duration: 2, repeat: Infinity } }}
            className="text-4xl mb-4 text-pink-500"
          >
            💕
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-xl md:text-2xl font-medium text-pink-300"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Dreams We'll Make Come True Side by Side
          </motion.p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 1.5 }}>
          <HoverEffect items={memoryItems} className="max-w-7xl mx-auto" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5 }} className="text-center mt-20">
          <motion.p
            className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed font-medium text-pink-300"
            style={{
              fontFamily: "'Playfair Display', serif",
            }}
          >
            "Every dream we share brings us closer to a beautiful future filled with love and happiness."
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(219, 39, 119, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onComplete}
            className="bg-gradient-to-r from-pink-700 via-purple-700 to-indigo-900 text-white px-12 py-4 text-xl font-semibold rounded-full shadow-lg transition-all duration-300"
            style={{
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <motion.span animate={{ opacity: [1, 0.8, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              Continue Our Journey Together 💖
            </motion.span>
          </motion.button>
        </motion.div>
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;500;600&display=swap");
      `}</style>
    </div>
  );
};

export default MemoryLane;
