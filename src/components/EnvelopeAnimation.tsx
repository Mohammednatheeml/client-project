import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface EnvelopeAnimationProps {
  onEnvelopeClick: () => void;
}

const EnvelopeAnimation: React.FC<EnvelopeAnimationProps> = ({
  onEnvelopeClick,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const fireHearts = () => {
    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      shapes: ["heart"],
      colors: ["#FFC0CB", "#FF69B4", "#FF1493", "#C71585"],
    };

    confetti({
      ...defaults,
      particleCount: 60, // slightly more
      scalar: 2,
    });

    confetti({
      ...defaults,
      particleCount: 35,
      scalar: 3,
    });

    confetti({
      ...defaults,
      particleCount: 20,
      scalar: 4,
    });
  };

  const handleClick = () => {
    setIsOpened(true);
    fireHearts();
    setTimeout(() => {
      onEnvelopeClick();
    }, 2500);
  };

  const FloatingSparkles = () => (
    <div className="fixed inset-0 pointer-events-none z-0">
      {Array.from({ length: 25 }, (_, i) => (
        <div
          key={`sparkle-${i}`}
          className="absolute text-pink-200 opacity-40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `sparkle-twinkle 4s ease-in-out ${Math.random() * 5}s infinite`,
            fontSize: `${Math.random() * 8 + 6}px`,
          }}
        >
          ✨
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-1000"
        style={{
          background:
            "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 25%, #fbcfe8 50%, #f9a8d4 75%, #f472b6 100%)",
        }}
      >
        {!isOpened && <FloatingSparkles />}

        <div className="text-center relative z-10 px-6 max-w-5xl mx-auto">
          <div
            className="mb-10"
            style={{
              transform: "scale(0)",
              animation: "bounce-in 1.8s ease-out 0.4s forwards",
            }}
          >
            <h1
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 drop-shadow-sm text-center"
              style={{
                color: "#be185d",
                textShadow: "1px 1px 3px rgba(190, 24, 93, 0.2)",
                fontFamily: "'Playfair Display', 'Georgia', serif",
                letterSpacing: "0.02em",
                lineHeight: "1.1",
                fontStyle: "italic",
              }}
            >
              For My Love
            </h1>
            <div
              className="text-xl md:text-2xl lg:text-3xl font-medium text-center"
              style={{
                color: "#881337",
                opacity: 0,
                animation: "fade-in-up 1.3s ease-out 1.8s forwards",
                textShadow: "0.5px 0.5px 2px rgba(136, 19, 55, 0.15)",
                fontFamily: "'Crimson Text', 'Times New Roman', serif",
                letterSpacing: "0.015em",
                lineHeight: "1.3",
                fontStyle: "italic",
              }}
            >
              <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-pink-500 animate-pulse" />
                <span className="text-center">
                  Click the envelope to open your surprise
                </span>
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-pink-500 animate-pulse" />
              </div>
            </div>
          </div>

          <div
            className="relative cursor-pointer transform-gpu mx-auto"
            style={{
              opacity: 0,
              transform: "translateY(30px) scale(0.9)",
              animation: "envelope-entrance 1.5s ease-out 2.2s forwards",
              maxWidth: "280px",
              width: "80vw",
            }}
            onClick={handleClick}
          >
            <div
              className="relative"
              style={{
                filter: isOpened
                  ? "drop-shadow(0 0 15px rgba(244, 114, 182, 0.4))"
                  : "drop-shadow(0 4px 12px rgba(0,0,0,0.15))",
                transition: "all 1.8s ease-out",
                transform: isOpened
                  ? "scale(1.02) translateY(-8px)"
                  : "scale(1)",
              }}
            >
              <div
                className="w-full h-40 rounded-md relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #f9a8d4 0%, #f472b6 50%, #ec4899 100%)",
                  boxShadow: isOpened
                    ? "0 8px 25px rgba(244, 114, 182, 0.25), inset 0 1px 0 rgba(255,255,255,0.1)"
                    : "0 6px 20px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)",
                  transition: "all 1.8s ease-out",
                  transform: isOpened
                    ? "rotateX(8deg) rotateY(-2deg)"
                    : "rotateX(0deg) rotateY(0deg)",
                  animation: !isOpened
                    ? "envelope-subtle-glow 4s ease-in-out infinite"
                    : "none",
                  maxWidth: "280px",
                  margin: "0 auto",
                }}
              >
                <div
                  className="absolute top-0 left-0 w-full h-20 transform origin-top"
                  style={{
                    background:
                      "linear-gradient(135deg, #e879f9 0%, #d946ef 100%)",
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    transformStyle: "preserve-3d",
                    transform: isOpened
                      ? "rotateX(-140deg) translateZ(6px)"
                      : "rotateX(0deg) translateZ(0px)",
                    transition: "transform 2s ease-out",
                    boxShadow: "0 2px 8px rgba(232, 121, 249, 0.2)",
                  }}
                />

                <div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl"
                  style={{
                    transform: isOpened
                      ? "translate(-50%, -50%) scale(1.2) rotateY(180deg)"
                      : "translate(-50%, -50%) scale(1)",
                    transition: "transform 1.8s ease-out",
                    filter:
                      "drop-shadow(0 0 6px rgba(244, 114, 182, 0.3))",
                  }}
                >
                  💌
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Crimson+Text:ital,wght@0,400;0,600;1,400;1,600&display=swap');

          @keyframes bounce-in {
            0% {
              transform: scale(0) rotate(-90deg);
              opacity: 0;
            }
            60% {
              transform: scale(1.05) rotate(3deg);
              opacity: 0.9;
            }
            100% {
              transform: scale(1) rotate(0deg);
              opacity: 1;
            }
          }

          @keyframes fade-in-up {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes envelope-entrance {
            0% {
              opacity: 0;
              transform: translateY(30px) scale(0.9) rotateY(-30deg);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1) rotateY(0deg);
            }
          }

          @keyframes envelope-subtle-glow {
            0%, 100% {
              box-shadow: 0 6px 20px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1);
            }
            50% {
              box-shadow: 0 8px 25px rgba(244, 114, 182, 0.15), inset 0 1px 0 rgba(255,255,255,0.12);
            }
          }

          @keyframes sparkle-twinkle {
            0%, 100% {
              opacity: 0.4;
              transform: scale(1);
            }
            50% {
              opacity: 0.8;
              transform: scale(1.1);
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default EnvelopeAnimation;
