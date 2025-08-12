import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX, Music } from "lucide-react";
import romance from "./assets/romance.mp3";

const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Note: In a real implementation, you would add your romantic background music file
  // For now, this creates the UI structure

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.3; // Soft background volume

    // Auto-play when component mounts (with user interaction)
    const playAudio = () => {
      if (audio && !isPlaying) {
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log("Autoplay prevented:", error);
          });
      }
    };

    // Start playing on first user interaction
    document.addEventListener("click", playAudio, { once: true });

    return () => {
      document.removeEventListener("click", playAudio);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.log("Play failed:", error);
        });
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      {/* Hidden audio element - replace src with your romantic music file */}
      <audio
        ref={audioRef}
        preload="auto"
        src={romance} // Use imported file
      />

      {/* Floating music controls */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        className="fixed top-4 right-4 z-50 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg border border-pink-200"
      >
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={togglePlay}
            className="p-2 rounded-full hover:bg-pink-100 transition-colors"
            title={isPlaying ? "Pause Music" : "Play Music"}
          >
            {isPlaying ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Music className="w-6 h-6 text-pink-500" />
              </motion.div>
            ) : (
              <Music className="w-6 h-6 text-gray-400" />
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleMute}
            className="p-2 rounded-full hover:bg-pink-100 transition-colors"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-gray-400" />
            ) : (
              <Volume2 className="w-5 h-5 text-pink-500" />
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Music note animations */}
      {isPlaying && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-300 text-2xl opacity-70"
              style={{
                top: `${20 + i * 15}%`,
                left: `${10 + i * 15}%`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0.3, 0.8, 0.3],
                rotate: [0, 15, -15, 0],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              ♪
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
};

export default AudioPlayer;
