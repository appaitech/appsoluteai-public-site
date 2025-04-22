import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200/20 dark:border-gray-800/20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <h3 className="text-2xl font-bold gradient-pro-text">
              AppsoluteAI
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-xs">
              Transforming your digital dreams into reality, one innovative solution at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', href: '/' },
                { name: 'About', href: '/about' },
                { name: 'Packages', href: '/packages' },
                { name: 'PRD Form', href: '/prd' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 
                             dark:hover:text-emerald-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:contact@appsoluteai.com"
                  className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 
                           dark:text-gray-400 dark:hover:text-emerald-400 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>contact@appsoluteai.com</span>
                </a>
              </li>
              <li>
                <a 
                  href="tel:+27123456789"
                  className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 
                           dark:text-gray-400 dark:hover:text-emerald-400 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>+27 12 345 6789</span>
                </a>
              </li>
              <li>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>Cape Town, South Africa</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Follow Us
            </h4>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/yourusername" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 
                         text-gray-600 hover:text-emerald-600 
                         dark:text-gray-400 dark:hover:text-emerald-400 
                         transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com/in/yourusername" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 
                         text-gray-600 hover:text-emerald-600 
                         dark:text-gray-400 dark:hover:text-emerald-400 
                         transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com/yourusername" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 
                         text-gray-600 hover:text-emerald-600 
                         dark:text-gray-400 dark:hover:text-emerald-400 
                         transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200/20 dark:border-gray-800/20">
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} AppsoluteAI. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <Link 
                to="/privacy"
                className="text-sm text-gray-600 hover:text-emerald-600 
                         dark:text-gray-400 dark:hover:text-emerald-400 
                         transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms"
                className="text-sm text-gray-600 hover:text-emerald-600 
                         dark:text-gray-400 dark:hover:text-emerald-400 
                         transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 