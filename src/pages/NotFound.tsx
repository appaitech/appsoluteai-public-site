import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-emerald-50 dark:from-gray-900 dark:to-emerald-900/10">
      <div className="text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-bold text-emerald-500 mb-4"
        >
          404
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 dark:text-gray-300 mb-8"
        >
          Page not found
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link 
            to="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-emerald-500 text-white rounded-lg
                     hover:bg-emerald-600 transition-colors duration-200"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
} 