import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Heart {
  id: number;
  x: number;
  delay: number;
}

export function HeartsAnimation() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    // Create 12 hearts with random positions
    const newHearts = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100 - 50, // Random X position between -50 and 50
      delay: Math.random() * 0.5, // Random delay between 0 and 0.5s
    }));
    setHearts(newHearts);

    // Clean up hearts after animation
    const timer = setTimeout(() => {
      setHearts([]);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ 
            scale: 0,
            y: 0,
            x: heart.x,
            opacity: 1,
          }}
          animate={{ 
            scale: [1, 0.8, 1],
            y: -100,
            opacity: [1, 0.8, 0],
          }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 1.5,
            delay: heart.delay,
            ease: "easeOut"
          }}
          className="absolute left-1/2 bottom-0 pointer-events-none"
        >
          <Heart className="w-6 h-6 text-red-500 fill-red-500" />
        </motion.div>
      ))}
    </AnimatePresence>
  );
} 