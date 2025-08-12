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

  // Initialize tsParticles for floating particles
  useEffect(() => {
    const initParticles = async () => {
      await loadFull();
      await (window as any).tsParticles.load("tsparticles", {
        particles: {
          number: {
            value: 40,
            density: {
              enable: true,
              area: 800
            }
          },
          color: {
            value: ["#d4af37", "#c0c0c0", "#ffffff"]
          },
          shape: {
            type: ["circle", "triangle"],
            stroke: {
              width: 0,
              color: "#000000"
            },
          },
          opacity: {
            value: { min: 0.3, max: 0.8 },
            random: true,
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.1
            }
          },
          size: {
            value: { min: 1, max: 3 },
            random: true
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            straight: false,
            outModes: {
              default: "out"
            }
          },
          wobble: {
            distance: 5,
            enable: true,
            speed: {
              min: -1,
              max: 1
            }
          }
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse"
            }
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4
            }
          }
        },
        background: {
          color: "transparent"
        }
      });
    };

    initParticles();
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        background: `
          radial-gradient(ellipse at 20% 20%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 80%, rgba(192, 192, 192, 0.1) 0%, transparent 50%),
          linear-gradient(to bottom right, 
            #1a1a1a 0%, 
            #2d2d2d 20%, 
            #3d3d3d 40%, 
            #2a2a2a 60%, 
            #1f1f1f 80%, 
            #121212 100%
          )
        `,
        boxShadow: "inset 0 0 100px rgba(212, 175, 55, 0.1)"
      }}
    >
      {/* Floating particles */}
      <div id="tsparticles" className="absolute inset-0 z-0" />
      
      {/* Elegant overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-dotted border-opacity-20 rounded-full"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              borderColor: "#d4af37",
              opacity: 0
            }}
            animate={{
              opacity: [0, 0.3, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              repeatDelay: Math.random() * 10,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="max-w-4xl relative z-10 w-full px-4"
      >
        <h1
          className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 text-left"
          style={{
            color: "#d4af37",
            lineHeight: 1.3,
            letterSpacing: "0.05em",
            textShadow: "0 2px 10px rgba(212, 175, 55, 0.3)",
            fontVariationSettings: "'wght' 700, 'opsz' 60"
          }}
        >
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString("Happy Birthday,")
                .pauseFor(1000)
                .typeString("<br>My Dearest Love")
                .pauseFor(2000)
                .typeString("<br>My Eternal Flame")
                .pauseFor(2000)
                .typeString("<br>My Precious One")
                .pauseFor(2000)
                .typeString("<br>My Heart's Desire ")
                .pauseFor(2000)
                .typeString("<br>I Love You Shaheen")
                .pauseFor(2000)
                .callFunction(() => {
                  setShowSecondLine(true);
                })
                .start();
            }}
            options={{
              delay: 100,
              cursor: "|",
              wrapperClassName: "inline-block",
              cursorClassName: "text-yellow-500 animate-pulse",
            }}
          />
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 2, ease: "easeInOut" }}
          className="text-lg md:text-xl font-medium mb-10 leading-relaxed text-left"
          style={{
            color: "#c0c0c0",
            textShadow: "0 1px 3px rgba(0, 0, 0, 0.5)",
          }}
        >
          {showSecondLine && (
            <div className="min-h-[1.5em]">
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString("Though distance may separate us, our souls remain intertwined.")
                    .callFunction(() => setShowThirdLine(true))
                    .start();
                }}
                options={{
                  delay: 30,
                  cursor: "",
                  wrapperClassName: "inline-block"
                }}
              />
            </div>
          )}

          {showThirdLine && (
            <div className="mt-4 min-h-[1.5em]">
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString("Today we celebrate the radiant light you bring to this world.")
                    .callFunction(() => setShowButton(true))
                    .start();
                }}
                options={{
                  delay: 30,
                  cursor: "",
                  wrapperClassName: "inline-block"
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
              boxShadow: "0 10px 25px rgba(212, 175, 55, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={onComplete}
            className="px-10 py-4 rounded-sm text-lg md:text-xl font-semibold shadow-md transition-all duration-400 border border-d4af37"
            style={{
              background: "transparent",
              color: "#d4af37",
              borderColor: "#d4af37",
            }}
          >
            Continue to Your Gift
          </motion.button>
        )}
      </motion.div>

      {/* Subtle glow effect */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(212, 175, 55, 0.1), transparent 70%)",
          filter: "blur(40px)",
          zIndex: 1,
        }}
      />
    </div>
  );
};

export default MainSection;