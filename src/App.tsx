import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EnvelopeAnimation from './components/EnvelopeAnimation';
import MainSection from './components/MainSection';
import ReasonsCarousel from './components/ReasonsCarousel';
import MemoryLane from './components/MemoryLane';
import StarMap from './components/StarMap';
import FinalSurprise from './components/FinalSurprise';
import AudioPlayer from './components/AudioPlayer';
// import ParticleBackground from './components/ParticleBackground';

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [showContent, setShowContent] = useState(false);

  const handleEnvelopeClick = () => {
    setShowContent(true);
    setTimeout(() => setCurrentSection(1), 2000);
  };

  const nextSection = () => {
    setCurrentSection(prev => prev + 1);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Particle Background */}
      {/* <ParticleBackground /> */}
      
      {/* Audio Player */}
      <AudioPlayer />
      
      {/* Main Content */}
      <AnimatePresence mode="wait">
        {!showContent ? (
          <motion.div
            key="envelope"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1.5 }}
            className="relative z-10"
          >
            <EnvelopeAnimation onEnvelopeClick={handleEnvelopeClick} />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="relative z-10"
          >
            {currentSection === 1 && (
              <MainSection onComplete={nextSection} />
            )}
            {currentSection === 2 && (
              <ReasonsCarousel onComplete={nextSection} />
            )}
            {currentSection === 3 && (
              <MemoryLane onComplete={nextSection} />
            )}
            {currentSection === 4 && (
              <StarMap onComplete={nextSection} />
            )}
            {currentSection === 5 && (
              <FinalSurprise />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;