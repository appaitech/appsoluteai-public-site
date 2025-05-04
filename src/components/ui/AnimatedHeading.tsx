import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export interface AnimatedHeadingProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'gradient';
}

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({ 
  children, 
  className = '',
  variant = 'default'
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const variants = {
    gradient: `bg-clip-text text-transparent 
               bg-[linear-gradient(135deg,#059669,#10B981,#2DD4BF,#10B981,#059669)]
               bg-[length:200%_auto] animate-shimmer-slow
               relative z-10
               [text-shadow:0_0_25px_rgba(16,185,129,0.2),0_0_45px_rgba(16,185,129,0.1)]
               group-hover:[text-shadow:0_0_25px_rgba(16,185,129,0.3),0_0_45px_rgba(16,185,129,0.2)]
               transition-[text-shadow] duration-300`,
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'gradient':
        return variants.gradient;
      default:
        return '';
    }
  };

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent blur-2xl rounded-full transform scale-y-50" />
      </div>

      {/* Main heading */}
      <motion.h2
        className={`relative group text-center ${getVariantClasses()} ${className}`}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <span className="relative inline-block">
          {children}
          
          {/* Underline effect */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent 
                         transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
        </span>

        {/* Enhanced glow layer */}
        <div className="absolute inset-0 -z-10 opacity-50 blur-md bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0
                       group-hover:opacity-75 transition-opacity duration-300" />
      </motion.h2>

      {/* Subtle floating particles */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-emerald-500/20"
            animate={{
              y: [-20, -40, -20],
              x: [-10, 10, -10],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3,
              delay: i * 0.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: `${30 + i * 20}%`,
              top: '50%'
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}; 