import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, Camera, Calculator, Sparkles, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useLocation } from 'react-router-dom';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState<string>('');
  const location = useLocation();
  const { scrollY } = useScroll();
  
  const headerBackground = useTransform(
    scrollY,
    [0, 50],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.8)"]
  );

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about' },
    { name: 'Packages', href: '#packages' },
    { 
      name: 'PRD Form', 
      href: '/prd', 
      icon: FileText,
      isNew: true 
    },
    { 
      name: 'Calculator', 
      href: '/calculator', 
      icon: Calculator,
      isNew: true 
    },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setActiveItem(hash.slice(1));
    } else if (location.pathname === '/calculator') {
      setActiveItem('calculator');
    } else {
      setActiveItem('home');
    }
  }, [location]);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      style={{ background: headerBackground }}
      className={cn(
        "fixed w-full z-50 backdrop-blur-md transition-all duration-300",
        isScrolled 
          ? "border-b border-emerald-100/20 dark:border-emerald-800/20 py-3 shadow-[0_2px_10px_-2px_rgba(16,185,129,0.1)]" 
          : "py-4"
      )}
    >
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Enhanced Logo */}
          <motion.a 
            href="/"
            className="flex items-center space-x-3 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 
                            rounded-full opacity-20 group-hover:opacity-40 blur-md transition-all duration-300" />
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3, type: "spring" }}
                className="relative z-10 bg-white/80 dark:bg-gray-900/80 rounded-full p-2"
              >
                <Camera className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
              </motion.div>
            </div>
            <div className="relative">
              <span className="text-lg font-semibold bg-clip-text text-transparent 
                             bg-gradient-to-r from-emerald-600 to-teal-600 
                             dark:from-emerald-400 dark:to-teal-400">
                Idea2RealApp
              </span>
              <motion.div
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-3"
              >
                <Sparkles className="w-3 h-3 text-emerald-500/50" />
              </motion.div>
            </div>
          </motion.a>

          {/* Enhanced Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-lg relative group transition-all duration-300",
                  activeItem === item.name.toLowerCase()
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center space-x-2">
                  {item.icon && <item.icon className="w-4 h-4" />}
                  <span className="font-medium">{item.name}</span>
                  {item.isNew && (
                    <span className="absolute -top-1 -right-6 px-1.5 py-0.5 
                                   bg-gradient-to-r from-emerald-500 to-teal-500
                                   text-white text-[10px] rounded-full 
                                   animate-pulse shadow-lg shadow-emerald-500/20">
                      New
                    </span>
                  )}
                </span>
                <motion.div
                  className="absolute inset-0 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                  layoutId={`${item.name}-background`}
                />
                {activeItem === item.name.toLowerCase() && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r 
                              from-emerald-500 to-teal-500"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.a>
            ))}
          </div>

          {/* Enhanced Actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <motion.button
              className="md:hidden relative group"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 
                            group-hover:bg-emerald-100 dark:group-hover:bg-emerald-800/30 
                            transition-colors duration-300">
                {isMenuOpen ? 
                  <X className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> : 
                  <Menu className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                }
              </div>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-emerald-100/20 dark:border-emerald-800/20 
                      bg-white/90 dark:bg-gray-900/90 backdrop-blur-md"
          >
            <div className="container mx-auto px-6 py-4">
              <motion.div 
                className="flex flex-col space-y-2"
                variants={{
                  open: { transition: { staggerChildren: 0.07 } },
                  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                }}
                initial="closed"
                animate="open"
              >
                {navigationItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300",
                      activeItem === item.name.toLowerCase()
                        ? "bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 text-emerald-600 dark:text-emerald-400"
                        : "hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-gray-600 dark:text-gray-300"
                    )}
                    variants={{
                      open: { x: 0, opacity: 1 },
                      closed: { x: -20, opacity: 0 }
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon && <item.icon className="w-4 h-4" />}
                    <span className="font-medium">{item.name}</span>
                    {item.isNew && (
                      <span className="ml-auto px-1.5 py-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 
                                     text-white text-xs rounded-full shadow-lg shadow-emerald-500/20">
                        New
                      </span>
                    )}
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
} 