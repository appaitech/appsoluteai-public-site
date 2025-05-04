import { Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  return (
    <motion.button
      className="relative p-2.5 rounded-xl bg-gray-800 border border-gray-700 group transition-all duration-300 cursor-not-allowed"
      aria-label="Dark mode only"
      disabled
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <Moon className="w-full h-full text-emerald-400" />
      </div>
    </motion.button>
  );
} 