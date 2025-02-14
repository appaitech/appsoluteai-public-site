import { motion } from 'framer-motion';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';

export function SwipeHint() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ 
        duration: 2,
        times: [0, 0.1, 0.9, 1],
        delay: 1,
      }}
      className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none md:hidden"
    >
      <div className="bg-black/50 backdrop-blur-sm text-white rounded-full p-2">
        <ChevronsLeft className="w-5 h-5" />
      </div>
      <div className="bg-black/50 backdrop-blur-sm text-white rounded-full p-2">
        <ChevronsRight className="w-5 h-5" />
      </div>
    </motion.div>
  );
} 