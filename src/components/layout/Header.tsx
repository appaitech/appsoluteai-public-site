import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, Camera, Calculator, Sparkles, FileText, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '../ui/Logo';

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
}

export function Header({ theme, toggleTheme }: HeaderProps) {
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
    <header className="navbar-pro">
      <div className="container">
        <nav className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="hover:opacity-90 transition-opacity flex items-center"
            >
              <Logo width={120} height={40} />
            </Link>
            
            <div className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 rounded-lg transition-all duration-200
                            text-gray-600 hover:text-emerald-600
                            dark:text-gray-300 dark:hover:text-emerald-400
                            ${location.pathname === item.href ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : ''}
                            hover:bg-emerald-50 dark:hover:bg-emerald-900/30`}
                >
                  <span className="flex items-center space-x-2">
                    {item.icon && <item.icon className="w-4 h-4" />}
                    <span>{item.name}</span>
                    {item.isNew && (
                      <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400">
                        New
                      </span>
                    )}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className="btn-pro-secondary p-2"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <Link to="/prd" className="btn-pro-primary">
              Get Started
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
} 