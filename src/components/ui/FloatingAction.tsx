import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Phone, Mail } from 'lucide-react';
import { useState } from 'react';

export function FloatingAction() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-16 right-0 space-y-3"
          >
            <button 
              onClick={() => window.location.href = 'tel:+1234567890'}
              className="btn-base flex items-center bg-white text-emerald-600 px-4 py-2 rounded-full shadow-lg hover:bg-emerald-50"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Us
            </button>
            <button 
              onClick={() => window.location.href = 'mailto:contact@appsnap.dev'}
              className="btn-base flex items-center bg-white text-emerald-600 px-4 py-2 rounded-full shadow-lg hover:bg-emerald-50"
            >
              <Mail className="w-4 h-4 mr-2" />
              Email Us
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="btn-base bg-emerald-500 text-white p-4 rounded-full shadow-lg hover:bg-emerald-600"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>
    </div>
  );
} 