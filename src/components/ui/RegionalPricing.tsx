import { useState } from 'react';
import { Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { EnhancedCard, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './EnhancedCard';

interface PricingTier {
  name: string;
  description: string;
  features: string[];
  recommendedFor: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Rapid Prototype",
    description: "Perfect for validating your app idea quickly",
    features: [
      "Core feature development",
      "Basic user authentication",
      "Essential UI/UX design",
      "2-week delivery timeline"
    ],
    recommendedFor: "Startups that need to validate an idea quickly"
  },
  {
    name: "Professional Launch MVP",
    description: "Complete solution for serious businesses",
    features: [
      "Full feature development",
      "Advanced authentication & security",
      "Premium UI/UX with animations",
      "API integration & documentation",
      "4-6 week delivery timeline"
    ],
    recommendedFor: "Scale-ups preparing for a polished public launch"
  },
  {
    name: "Enterprise Scale",
    description: "Custom solutions for large organizations",
    features: [
      "Custom architecture & scaling",
      "Enterprise-grade security",
      "Dedicated project manager",
      "24/7 priority support",
      "Custom timeline & roadmap"
    ],
    recommendedFor: "Enterprises that require bespoke architecture and governance"
  }
];

const innovationCards = [
  {
    name: "Lightning Fast Delivery",
    description: "From concept to deployment in record time",
    features: [
      "Rapid prototyping",
      "Agile development",
      "Quick iterations",
      "2-week sprints"
    ],
    icon: "⚡"
  },
  {
    name: "Cutting-Edge Tech",
    description: "Built with the latest technologies",
    features: [
      "Modern frameworks",
      "Cloud-native solutions",
      "AI integration",
      "Scalable architecture"
    ],
    icon: "🚀"
  },
  {
    name: "Quality Assured",
    description: "Rigorous testing and optimization",
    features: [
      "Automated testing",
      "Performance optimization",
      "Security audits",
      "Best practices"
    ],
    icon: "✨"
  }
];

export function RegionalPricing() {
  const [showInfo, setShowInfo] = useState<number | null>(null);

  return (
    <div className="section-inner">
      <div className="grid-pro">
        {pricingTiers.map((tier, index) => (
          <EnhancedCard key={tier.name} showHoverEffect={false}>
            <CardHeader>
              <CardTitle>{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 
                                  bg-clip-text text-transparent block">
                    Price on Request
                  </span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Tailored quote following a quick discovery call
                  </p>
                </div>
                <button
                  className="p-2 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 
                             rounded-lg transition-colors group"
                  onClick={() => setShowInfo(showInfo === index ? null : index)}
                >
                  <Info className="w-5 h-5 text-emerald-600 dark:text-emerald-400 
                                  group-hover:text-emerald-500" />
                </button>
              </div>
              
              <AnimatePresence>
                {showInfo === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 p-3 bg-emerald-50/50 dark:bg-emerald-900/20 
                             rounded-lg text-sm border border-emerald-100 dark:border-emerald-800/30"
                  >
                    <p className="text-emerald-700 dark:text-emerald-300">
                      Recommended for: {tier.recommendedFor}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <CardContent>
              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start space-x-3 text-gray-600 dark:text-gray-300
                                         hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                    <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5 filter drop-shadow" 
                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <button 
                className="btn-pro-primary bg-gradient-to-r from-emerald-500 to-teal-500 
                           hover:from-emerald-600 hover:to-teal-600 w-full relative overflow-hidden group"
                onClick={() => {
                  window.location.href = '/contact';
                }}
              >
                <span className="relative z-10">Request Pricing</span>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4),transparent_70%)] 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
            </CardFooter>
          </EnhancedCard>
        ))}
      </div>
    </div>
  );
}

export function InnovationCards() {
  return (
    <div className="section-inner">
      <div className="grid-pro">
        {innovationCards.map((card) => (
          <div 
            key={card.name} 
            className={`card-pro relative overflow-hidden flex flex-col
                       before:absolute before:inset-0 
                       before:bg-gradient-to-br before:from-emerald-500/10 before:to-transparent
                       before:opacity-0 hover:before:opacity-100
                       before:transition-opacity before:duration-500
                       after:absolute after:inset-0 
                       after:bg-[radial-gradient(600px_circle_at_var(--mouse-x,0px)_var(--mouse-y,0px),rgba(16,185,129,0.1),transparent_40%)]
                       border border-emerald-500/20
                       dark:bg-gray-800/80 dark:backdrop-blur-xl
                       shadow-xl transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl`}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
              e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
            }}
          >
            <div className="relative z-10 flex flex-col h-full p-6">
              {/* Icon */}
              <div className="text-4xl mb-6">{card.icon}</div>

              {/* Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-br from-emerald-500 to-teal-600 
                              bg-clip-text text-transparent">{card.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{card.description}</p>
              </div>

              {/* Features */}
              <div className="flex-grow">
                <ul className="space-y-3">
                  {card.features.map((feature) => (
                    <li key={feature} className="flex items-start space-x-3 text-gray-600 dark:text-gray-300
                                               hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                      <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5 filter drop-shadow" 
                           fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Learn More Button */}
              <div className="mt-8">
                <button 
                  className="btn-pro-primary bg-gradient-to-r from-emerald-500 to-teal-500 
                             hover:from-emerald-600 hover:to-teal-600 w-full relative overflow-hidden group"
                  onClick={() => {
                    // Handle learn more action
                  }}
                >
                  <span className="relative z-10">Learn More</span>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4),transparent_70%)] 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 