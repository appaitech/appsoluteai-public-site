import { motion } from 'framer-motion';
import { EnhancedCard, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './EnhancedCard';

interface InnovationCard {
  name: string;
  description: string;
  features: string[];
  icon: string;
}

const innovationCards: InnovationCard[] = [
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

export function InnovationCards() {
  return (
    <div className="section-inner">
      <div className="grid-pro">
        {innovationCards.map((card) => (
          <EnhancedCard key={card.name}>
            <CardHeader>
              <div className="text-4xl mb-6">{card.icon}</div>
              <CardTitle>{card.name}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>

            <CardContent>
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
            </CardContent>

            <CardFooter>
              <button className="btn-pro-primary w-full">
                <span className="relative z-10">Learn More</span>
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