import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { loadFull } from "tsparticles";

interface MainSectionProps {
  onComplete: () => void;
}

const MainSection: React.FC<MainSectionProps> = ({ onComplete }) => {
  const [showButton, setShowButton] = useState(false);
  const [showSecondLine, setShowSecondLine] = useState(false);
  const [showThirdLine, setShowThirdLine] = useState(false);

  useEffect(() => {
    const initParticles = async () => {
      await loadFull();
      await (window as any).tsParticles.load("tsparticles", {
        particles: {
          number: { value: 50, density: { enable: true, area: 900 } },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: {
            value: { min: 0.2, max: 0.7 },
            random: true,
            animation: { enable: true, speed: 0.5, minimumValue: 0.2 },
          },
          size: { value: { min: 1, max: 2 }, random: true },
          move: {
            enable: true,
            speed: 0.3,
            direction: "none",
            random: true,
            straight: false,
            outModes: { default: "out" },
          },
          twinkle: {
            particles: {
              enable: true,
              frequency: 0.05,
              opacity: 1,
            },
          },
        },
        interactivity: {
          events: { onHover: { enable: true, mode: "grab" } },
          modes: { grab: { distance: 150, line_linked: { opacity: 0.3 } } },
        },
        retina_detect: true,
        background: { color: "transparent" },
      });
    };

    initParticles();
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
      style={{
        fontFamily: "'Merriweather', serif",
        background: `linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)`,
        color: "#f0f0f5",
        boxShadow: "inset 0 0 100px rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* Star map particles */}
      <div id="tsparticles" className="absolute inset-0 z-0" />

      {/* Subtle glowing overlays */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), transparent 60%)," +
            "radial-gradient(circle at 70% 70%, rgba(255,255,255,0.15), transparent 60%)",
          filter: "blur(60px)",
          zIndex: 1,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="max-w-4xl relative z-10 w-full px-4"
      >
        <h1
          className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-8 text-left"
          style={{
            color: "#ffffff",
            lineHeight: 1.3,
            letterSpacing: "0.07em",
            textShadow: "0 4px 12px rgba(255, 255, 255, 0.8)",
            fontVariationSettings: "'wght' 800, 'opsz' 72",
          }}
        >
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString("<br>My Dearest Love !")
                .pauseFor(1000)
                // .typeString("<br>My Eternal Flame !")
                // .pauseFor(2000)
                // .typeString("<br>My Precious One 💎!")
                // .pauseFor(2000)
                // .typeString("<br>My Heart's Desire !")
                // .pauseFor(2000)
                // .typeString("<br>My Guiding Star ! ")
                // .pauseFor(2000)
                // .typeString("<br>My Everything !")
                // .pauseFor(2000)
                // .typeString("<br>My Forever Love !")
                // .pauseFor(2000)
                // .typeString("<br>My One and Only !")
                // .pauseFor(2000)
                // .typeString("<br>3...2...1... 🎉")
                // .pauseFor(3000)
                // .typeString("<br>Happy Birthday Baby!")
                // .pauseFor(2000)
                // .typeString("<br>I Love You Soo Much❤️")
                // .pauseFor(2000)
                .callFunction(() => {
                  setShowSecondLine(true);
                })
                .start();
            }}
            options={{
              delay: 90,
              cursor: "|",
              wrapperClassName: "inline-block",
              cursorClassName: "text-white animate-pulse",
            }}
          />
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 2, ease: "easeInOut" }}
          className="text-lg md:text-xl font-medium mb-10 leading-relaxed text-left"
          style={{
            color: "#dce6f7",
            textShadow: "0 1px 5px rgba(0, 0, 0, 0.4)",
            fontStyle: "italic",
          }}
        >
          {showSecondLine && (
            <div className="min-h-[1.5em]">
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString(
                      "Though distance may separate us, our souls remain intertwined."
                    )
                    .callFunction(() => setShowThirdLine(true))
                    .start();
                }}
                options={{
                  delay: 40,
                  cursor: "",
                  wrapperClassName: "inline-block",
                }}
              />
            </div>
          )}

          {showThirdLine && (
            <div className="mt-4 min-h-[1.5em]">
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString(
                      "Today we celebrate the radiant light you bring to this world."
                    )
                    .callFunction(() => setShowButton(true))
                    .start();
                }}
                options={{
                  delay: 40,
                  cursor: "",
                  wrapperClassName: "inline-block",
                }}
              />
            </div>
          )}
        </motion.div>

        {showButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(255, 255, 255, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={onComplete}
            className="px-10 py-4 rounded-md text-lg md:text-xl font-semibold shadow-md transition-all duration-400 border border-white"
            style={{
              background: "transparent",
              color: "#fff",
              borderColor: "#fff",
            }}
          >
            Continue to Your Gift
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default MainSection;
