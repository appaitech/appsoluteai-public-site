import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, Camera, Calculator, Sparkles, FileText, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';

interface HeaderProps {}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState<string>('');
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();
  const { scrollY } = useScroll();
  const isPRDPage = location.pathname === '/prd';
  
  const headerBackground = useTransform(
    scrollY,
    [0, 50],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.9)"]
  );

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Packages', href: '/packages' },
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
    if (!isPRDPage) {
      setIsVisible(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(e.clientY < 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isPRDPage]);

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
    <AnimatePresence>
      <motion.header 
        initial={false}
        animate={{ 
          y: (!isVisible && isPRDPage) ? -100 : 0,
          opacity: (!isVisible && isPRDPage) ? 0 : 1
        }}
        transition={{ duration: 0.3 }}
        style={{ backgroundColor: headerBackground }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-gray-800/20"
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-32">
            <div className="flex items-center space-x-12">
              <Link 
                to="/" 
                className="hover:opacity-90 transition-opacity flex items-center -ml-4"
              >
                <Logo width={360} height={120} className="opacity-[0.82] mix-blend-screen" />
              </Link>
              
              <div className="hidden md:flex items-center space-x-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`px-4 py-2 rounded-lg transition-all duration-300
                              text-gray-400 hover:text-emerald-400
                              ${location.pathname === item.href ? 'bg-emerald-900/30 text-emerald-400' : ''}
                              hover:bg-emerald-900/30
                              backdrop-blur-sm text-sm font-medium`}
                  >
                    <span className="flex items-center space-x-2">
                      {item.icon && <item.icon className="w-4 h-4" />}
                      <span>{item.name}</span>
                      {item.isNew && (
                        <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-emerald-400 backdrop-blur-sm">
                          New
                        </span>
                      )}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                to="/prd"
                variant="primary"
                size="sm"
                rightIcon={<Sparkles className="w-3.5 h-3.5" />}
                className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20
                           px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-300
                           hover:scale-[1.02] active:scale-[0.98]"
              >
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      </motion.header>
    </AnimatePresence>
  );
} 