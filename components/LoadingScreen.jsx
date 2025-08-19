import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const LoadingScreen = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  
  // Check if loading screen has been shown before
  useEffect(() => {
    const hasShownLoading = localStorage.getItem('portfolio-loading-shown');
    if (hasShownLoading) {
      // Skip loading screen if already shown
      onComplete();
      return;
    }
    
    // Mark as shown
    localStorage.setItem('portfolio-loading-shown', 'true');
  }, [onComplete]);
  const [showCursor, setShowCursor] = useState(false);

  const bootSequence = [
    { text: 'BIOS Version 2.1.0', delay: 130, type: 'info' },
    { text: 'Initializing system components...', delay: 180, type: 'loading' },
    { text: 'Loading kernel modules...', delay: 130, type: 'loading' },
    { text: 'Mounting file systems...', delay: 130, type: 'loading' },
    { text: 'Starting network services...', delay: 250, type: 'loading' },
    { text: 'Loading development environment...', delay: 200, type: 'loading' },
    { text: 'Initializing portfolio system...', delay: 130, type: 'loading' },
    { text: 'Loading project data...', delay: 160, type: 'loading' },
    { text: 'Establishing secure connections...', delay: 130, type: 'loading' },
    { text: 'System ready', delay: 60, type: 'success' },
    { text: 'Welcome to Matheus Renzo Portfolio', delay: 200, type: 'welcome' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < bootSequence.length - 1) {
        setCurrentStep(currentStep + 1);
        setProgress(((currentStep + 1) / bootSequence.length) * 100);
      } else {
        setTimeout(() => {
          onComplete();
        }, 300);
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

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-900 z-50 flex items-center justify-center p-4"
    >
      <div className="w-full max-w-4xl mx-auto">
        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
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
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* System Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 sm:mb-8">
              <div className="bg-gray-700 rounded-lg p-3 sm:p-4 border border-gray-600">
                <h3 className="text-green-400 font-mono text-xs sm:text-sm mb-2">SYSTEM INFO</h3>
                <div className="space-y-1 text-xs text-gray-300">
                  <div>OS: Portfolio OS v2.1.0</div>
                  <div>Kernel: React 18.2.0</div>
                  <div>Architecture: Backend Focus</div>
                  <div>Memory: 8GB Available</div>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-3 sm:p-4 border border-gray-600">
                <h3 className="text-blue-400 font-mono text-xs sm:text-sm mb-2">DEVELOPER PROFILE</h3>
                <div className="space-y-1 text-xs text-gray-300">
                  <div>Name: Matheus Renzo Gama</div>
                  <div>Role: Backend Developer</div>
                  <div>Specialty: Python & VTEX</div>
                  <div>Status: Online & Available</div>
                </div>
              </div>
            </div>

            {/* Final Status */}
            {currentStep === bootSequence.length - 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="text-green-400 font-mono text-base sm:text-lg mb-2">
                  ✓ System initialized successfully
                </div>
                <div className="text-gray-400 font-mono text-xs sm:text-sm">
                  Press any key to continue...
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen; 
