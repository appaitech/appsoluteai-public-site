import { motion } from 'framer-motion';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';

interface SwipeIndicatorProps {
  direction: 'left' | 'right';
  isVisible: boolean;
}

export function SwipeIndicator({ direction, isVisible }: SwipeIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      className={`fixed ${direction === 'left' ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 
                  bg-black/50 backdrop-blur-sm text-white rounded-full p-3 z-50 pointer-events-none
                  md:hidden`}
    >
      {direction === 'left' ? (
        <ChevronsLeft className="w-6 h-6" />
      ) : (
        <ChevronsRight className="w-6 h-6" />
      )}
    </motion.div>
  );
} 