import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import { Github, Twitter, Linkedin, ArrowRight } from 'lucide-react';

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
  ];

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/appsoluteai', icon: Github },
    { name: 'Twitter', href: 'https://twitter.com/appsoluteai', icon: Twitter },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/appsoluteai', icon: Linkedin },
  ];

  return (
    <footer className="relative z-10 mt-32 border-t border-gray-800 bg-gray-900/80 backdrop-blur-sm">
      <div className="container-fluid px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="col-span-1 md:col-span-9 space-y-8">
            <div className="flex flex-col md:flex-row md:items-start gap-16">
              <div className="-ml-6">
                <Link to="/" className="hover:opacity-90 transition-opacity block">
                  <Logo 
                    width={520} 
                    height={180} 
                    className="opacity-[0.82] mix-blend-screen" 
                  />
                </Link>
              </div>
              <div className="space-y-8 md:pt-8 md:max-w-xl">
                <p className="text-gray-300 text-lg leading-relaxed">
                  Transform your product ideas into comprehensive PRDs with AI assistance.
                  Get started today and streamline your product development process.
                </p>
                <div className="flex items-center space-x-5">
                  {socialLinks.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 hover:scale-110 transition-transform rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800 inline-flex items-center justify-center"
                      aria-label={item.name}
                    >
                      <item.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-3 grid grid-cols-2 gap-8 md:pt-8">
            {footerLinks.map((group) => (
              <div key={group.title} className="space-y-6">
                <h3 className="font-semibold text-lg text-white">
                  {group.title}
                </h3>
                <ul className="space-y-4">
                  {group.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-gray-300 hover:text-emerald-400 transition-colors hover:translate-x-1 inline-block transition-transform"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} AppsoluteAI. All rights reserved.
            </p>
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
      </div>
    </footer>
  );
} 