import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface TooltipProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Tooltip({ isOpen, onClose, title = 'Example:', children }: TooltipProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 20 : -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: isMobile ? 20 : -10 }}
          className={`
            bg-white p-4 rounded-lg shadow-depth z-50
            ${isMobile 
              ? 'fixed inset-x-4 bottom-4 tooltip-mobile' 
              : 'absolute right-0 top-12 w-80'}
          `}
        >
          <div className="flex justify-between items-start mb-2">
            <span className="font-medium text-sm text-emerald-500">{title}</span>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="text-sm text-gray-600">
            {children}
          </div>
          {isMobile && (
            <div className="mt-4 text-center text-xs text-gray-400">
              Tap anywhere to dismiss
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
} 