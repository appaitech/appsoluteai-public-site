import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import { Github, Twitter, Linkedin, ArrowRight, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '/features' },
        { name: 'PRD', href: '/prd' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Blog', href: '/blog' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Privacy', href: '/privacy' },
        { name: 'Terms', href: '/terms' },
      ],
    },
    {
      title: 'Contact',
      links: [
        { name: 'Support', href: 'mailto:support@appsoluteai.com' },
        { name: 'Sales', href: 'mailto:sales@appsoluteai.com' },
        { name: 'Info', href: 'mailto:info@appsoluteai.com' },
      ],
    },
  ];

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/appsoluteai', icon: Github },
    { name: 'Twitter', href: 'https://twitter.com/appsoluteai', icon: Twitter },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/appsoluteai', icon: Linkedin },
  ];

  return (
    <footer className="relative z-10 mt-32 border-t border-gray-800 bg-gradient-to-tr from-gray-900 via-gray-950 to-gray-900/90 backdrop-blur-sm overflow-hidden">
      {/* Animated gradient bar under logo */}
      <div className="absolute left-1/2 top-0 w-[320px] h-2 -translate-x-1/2 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500 rounded-b-full blur-lg opacity-60 animate-pulse" />
      <div className="container-fluid px-4 md:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-12 items-start relative z-10">
          {/* Logo with glow */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 md:space-y-8 md:col-span-1">
            <div className="relative flex items-center justify-center w-full">
              <span className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-emerald-500/20 via-blue-500/10 to-purple-500/20 blur-2xl scale-110" />
              <Link to="/" className="relative z-10 block">
                <Logo 
                  width={260} 
                  height={90} 
                  className="opacity-[0.92] drop-shadow-xl" 
                />
              </Link>
            </div>
            <p className="text-gray-300 text-base leading-relaxed max-w-xs mx-auto md:mx-0">
              Transform your product ideas into comprehensive PRDs with AI assistance. Get started today and streamline your product development process.
            </p>
          </div>

          {/* Product Links */}
          <div className="border-l border-gray-800 pl-6">
            <h3 className="font-semibold text-base text-white mb-3 tracking-wide">Product</h3>
            <ul className="space-y-2">
              {footerLinks[0].links.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm font-medium hover:underline underline-offset-4"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="border-l border-gray-800 pl-6">
            <h3 className="font-semibold text-base text-white mb-3 tracking-wide">Company</h3>
            <ul className="space-y-2">
              {footerLinks[1].links.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm font-medium hover:underline underline-offset-4"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Links with icons */}
          <div className="border-l border-gray-800 pl-6">
            <h3 className="font-semibold text-base text-white mb-3 tracking-wide">Contact</h3>
            <ul className="space-y-2">
              {footerLinks[2].links.map((link) => (
                <li key={link.name} className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm font-medium hover:underline underline-offset-4"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div className="border-l border-gray-800 pl-6 flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-base text-white mb-3 tracking-wide">Follow Us</h3>
            <div className="flex space-x-4 mt-2">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-gray-700 text-gray-300 hover:bg-gradient-to-tr hover:from-emerald-500/20 hover:to-blue-500/20 hover:text-emerald-400 transition-all duration-200 shadow-md hover:scale-110"
                  aria-label={item.name}
                >
                  <item.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 text-xs md:text-sm">
            © {currentYear} AppsoluteAI. All rights reserved.
          </p>
          <span className="text-gray-500 text-xs flex items-center gap-1">Made with <span className="text-emerald-400">❤️</span> by AppsoluteAI</span>
          <Button
            to="/prd"
            variant="primary"
            size="sm"
            className="shadow-lg hover:shadow-emerald-500/20 transition-shadow"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Get Started
          </Button>
        </div>
      </div>
    </footer>
  );
} 