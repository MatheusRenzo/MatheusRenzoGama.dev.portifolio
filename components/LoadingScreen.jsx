import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const LoadingScreen = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showCursor, setShowCursor] = useState(false);
  const router = useRouter();
  
  // Check if this is a page reload (not navigation)
  useEffect(() => {
    // Only show loading screen on actual page reload
    const isReload = performance.navigation.type === 1 || 
                    (typeof window !== 'undefined' && window.performance && window.performance.navigation && window.performance.navigation.type === 1);
    
    // Also check if it's the first visit (no sessionStorage)
    const hasVisited = sessionStorage.getItem('portfolio-visited');
    
    if (!isReload && hasVisited) {
      // Skip loading screen if it's navigation, not reload
      onComplete();
      return;
    }
    
    // Mark as visited for this session
    sessionStorage.setItem('portfolio-visited', 'true');
  }, [onComplete]);

  // Ultra-fast boot sequence - total time: ~2.3 seconds
  const bootSequence = [
    { text: 'BIOS Version 2.1.0', delay: 120, type: 'info' },
    { text: 'Initializing system components...', delay: 100, type: 'loading' },
    { text: 'Loading kernel modules...', delay: 120, type: 'loading' },
    { text: 'Mounting file systems...', delay: 80, type: 'loading' },
    { text: 'Starting network services...', delay: 120, type: 'loading' },
    { text: 'Loading development environment...', delay: 100, type: 'loading' },
    { text: 'Initializing portfolio system...', delay: 80, type: 'loading' },
    { text: 'Loading project data...', delay: 70, type: 'loading' },
    { text: 'Establishing secure connections...', delay: 120, type: 'loading' },
    { text: 'System ready', delay: 40, type: 'success' },
    { text: 'Welcome to Matheus Renzo Portfolio', delay: 150, type: 'welcome' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < bootSequence.length - 1) {
        setCurrentStep(currentStep + 1);
        setProgress(((currentStep + 2) / bootSequence.length) * 100);
      } else {
        // Faster completion
        setTimeout(() => {
          onComplete();
        }, 100);
      }
    }, bootSequence[currentStep].delay);

    return () => clearTimeout(timer);
  }, [currentStep, bootSequence, onComplete]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  const getStepColor = (type) => {
    switch (type) {
      case 'info': return 'text-blue-400';
      case 'loading': return 'text-green-400';
      case 'success': return 'text-green-500';
      case 'welcome': return 'text-purple-400';
      default: return 'text-gray-300';
    }
  };

  // Skip button for impatient users
  const handleSkip = () => {
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-900 z-50 flex items-center justify-center p-4"
    >
      <div className="w-full max-w-4xl mx-auto">
        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-800 border border-gray-600 rounded-lg shadow-2xl overflow-hidden"
        >
          {/* Terminal Header */}
          <div className="bg-gray-700 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="text-gray-300 text-xs font-mono">
              matheus-renzo@portfolio:~$
            </div>
          </div>

          {/* Terminal Content */}
          <div className="p-4 sm:p-6">
            {/* Boot Sequence */}
            <div className="space-y-2 mb-6 sm:mb-8">
              {bootSequence.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: index <= currentStep ? 1 : 0.3,
                    x: index <= currentStep ? 0 : -20
                  }}
                  transition={{ duration: 0.3 }}
                  className={`font-mono text-xs sm:text-sm ${getStepColor(step.type)}`}
                >
                  <span className="text-gray-500 mr-2">[{index + 1}]</span>
                  {step.text}
                  {index === currentStep && showCursor && (
                    <span className="ml-1 bg-green-400 w-2 h-4 inline-block animate-pulse"></span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="mb-6 sm:mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400 font-mono text-xs sm:text-sm">System Boot Progress</span>
                <span className="text-green-400 font-mono text-xs sm:text-sm">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-green-400 to-blue-400 h-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.6 }}
                />
              </div>
            </div>



            {/* Final Status */}
            {currentStep === bootSequence.length - 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="text-green-400 font-mono text-base sm:text-lg mb-2">
                  ✓ System initialized successfully
                </div>
                <div className="text-gray-400 font-mono text-xs sm:text-sm mb-4">
                  Press any key to continue...
                </div>
              </motion.div>
            )}

            {/* Skip Button */}
            <div className="text-center">
              <button
                onClick={handleSkip}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-gray-300 text-xs font-mono rounded transition-colors duration-200"
              >
                Skip Loading
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Info about when it appears */}
      <div className="fixed bottom-4 right-4 text-gray-500 text-xs">
        Loading screen appears only on page reload
      </div>
    </motion.div>
  );
};

export default LoadingScreen; 
