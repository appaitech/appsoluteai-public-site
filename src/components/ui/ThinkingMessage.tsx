import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

export function ThinkingMessage() {
  const [show, setShow] = useState(true);
  const [dots, setDots] = useState('...');

  useEffect(() => {
    // Animate dots
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '.' : prev + '.');
    }, 500);

    // Hide message after 3 seconds
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(dotsInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 
                     bg-gradient-to-r from-emerald-500/90 to-teal-500/90
                     text-white px-6 py-3 rounded-full
                     backdrop-blur-md shadow-lg
                     text-sm font-medium z-50
                     flex items-center space-x-3
                     border border-white/10"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
            className="text-white/90"
          >
            <Sparkles className="w-4 h-4" />
          </motion.div>
          
          <div className="flex items-center space-x-2">
            <span className="text-white/90">AI is processing</span>
            <div className="w-8 overflow-hidden">
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {dots}
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 