import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Send, Star, Mail, Phone, Link
} from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Header } from './components/layout/Header';
import { CommandMenu } from './components/CommandMenu';
import { Seo } from './components/Seo';
import { useScrollPosition } from './hooks/use-scroll-position';
import { ChatBot } from './components/ui/ChatBot';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { SectionTransition } from './components/ui/SectionTransition';
import { Blog } from './components/sections/Blog';
import { HeartsAnimation } from './components/ui/HeartsAnimation';
import { useDarkMode } from '@/hooks/useDarkMode';
import { AnimatedHeading } from './components/ui/AnimatedHeading';
import { ThemeProvider } from './providers/ThemeProvider';
import { ProjectCalculator } from './components/ui/ProjectCalculator';
import { TimelineVisualizer } from './components/ui/TimelineVisualizer';
import { BrowserRouter as Router, Routes, Route, Navigate, Link as RouterLink } from 'react-router-dom';
import { PRDFormPage } from './pages/PRDFormPage';
import { NotFound } from './pages/NotFound';
import { HelmetProvider } from 'react-helmet-async';
import { About } from './pages/About';
import { Packages } from './pages/Packages';
import { Footer } from './components/layout/Footer';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Terms } from './pages/Terms';
import { ParticleAnimation } from './components/ui/ParticleAnimation';
import { Logo } from './components/ui/Logo';
import { PRDFormData } from './types/prd';
import { RegionalPricing } from './components/ui/RegionalPricing';
import ProjectExamples from './pages/ProjectExamples';
import { Button } from './components/ui/Button';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface TooltipState {
  [key: string]: boolean;
}

const queryClient = new QueryClient();

const formatPhoneNumber = (value: string) => {
  // Remove all non-numeric characters
  const numbers = value.replace(/[^\d]/g, '');
  
  // Format the number as (XXX) XXX-XXXX
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
  return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
};

export function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isPRDModalOpen, setIsPRDModalOpen] = useState(false);
  const [prdFormData, setPRDFormData] = useState<PRDFormData>({
    projectName: '',
    companyName: '',
    contactEmail: '',
    phone: '',
    budget: '',
    timeline: '',
    platform: [],
    description: '',
    features: '',
    targetAudience: '',
    competitors: '',
    successCriteria: '',
    additionalInfo: '',
    termsAccepted: false,
    industryType: '',
    existingTech: '',
    userAuthentication: false,
    dataStorage: false,
    thirdPartyIntegrations: [],
    monetizationStrategy: '',
    scalabilityRequirements: '',
    accessibilityRequirements: '',
    securityRequirements: [],
    analyticsRequirements: false,
    multiLanguageSupport: false,
    offlineCapabilities: false,
    projectGoals: '',
    projectScope: '',
    keyMilestones: [],
    projectConstraints: '',
    businessModel: '',
    revenueStreams: [],
    marketStrategy: '',
    competitiveAdvantage: '',
    successMetrics: [],
    userPersonas: '',
    userJourneys: '',
    userPainPoints: '',
    accessibilityNeeds: [],
    preferredTechnologies: [],
    existingSystemsIntegration: '',
    performanceRequirements: {
      loadTime: '',
      concurrent: '',
      availability: ''
    },
    deviceSupport: [],
    browserSupport: [],
    dataTypes: [],
    dataRetention: '',
    backupStrategy: '',
    dataCompliance: [],
    brandGuidelines: false,
    designPreferences: '',
    moodboardLinks: '',
    specialAnimations: false,
    hostingPreference: '',
    maintenancePlan: '',
    monitoringRequirements: [],
    updateFrequency: ''
  });

  const scrollPosition = useScrollPosition();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [tooltips, setTooltips] = useState<TooltipState>({});

  const [showHearts, setShowHearts] = useState(false);

  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // Update theme class when theme changes
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const toggleTooltip = (fieldId: string) => {
    setTooltips(prev => ({
      ...prev,
      [fieldId]: !prev[fieldId]
    }));
  };

  // Add scroll-based animations and effects
  const handleScroll = () => {
    // Your scroll logic
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  const handlePRDSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('PRD Form submitted:', prdFormData);
    // Handle form submission here
    setIsPRDModalOpen(false);
    setPRDFormData({
      projectName: '',
      companyName: '',
      contactEmail: '',
      phone: '',
      budget: '',
      timeline: '',
      platform: [],
      description: '',
      features: '',
      targetAudience: '',
      competitors: '',
      successCriteria: '',
      additionalInfo: '',
      termsAccepted: false,
      industryType: '',
      existingTech: '',
      userAuthentication: false,
      dataStorage: false,
      thirdPartyIntegrations: [],
      monetizationStrategy: '',
      scalabilityRequirements: '',
      accessibilityRequirements: '',
      securityRequirements: [],
      analyticsRequirements: false,
      multiLanguageSupport: false,
      offlineCapabilities: false,
      projectGoals: '',
      projectScope: '',
      keyMilestones: [],
      projectConstraints: '',
      businessModel: '',
      revenueStreams: [],
      marketStrategy: '',
      competitiveAdvantage: '',
      successMetrics: [],
      userPersonas: '',
      userJourneys: '',
      userPainPoints: '',
      accessibilityNeeds: [],
      preferredTechnologies: [],
      existingSystemsIntegration: '',
      performanceRequirements: {
        loadTime: '',
        concurrent: '',
        availability: ''
      },
      deviceSupport: [],
      browserSupport: [],
      dataTypes: [],
      dataRetention: '',
      backupStrategy: '',
      dataCompliance: [],
      brandGuidelines: false,
      designPreferences: '',
      moodboardLinks: '',
      specialAnimations: false,
      hostingPreference: '',
      maintenancePlan: '',
      monitoringRequirements: [],
      updateFrequency: ''
    });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setPRDFormData({ ...prdFormData, phone: formattedPhone });
  };

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart",
      content: "AppsoluteAI delivered our MVP in just 2 weeks. The quality and speed were exceptional!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Founder, InnovateCo",
      content: "The professional package was perfect for our needs. Great communication throughout.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "CTO, Enterprise Solutions",
      content: "Their enterprise solutions are top-notch. Highly recommend for large-scale projects.",
      rating: 5
    }
  ];

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Seo />
              <CommandMenu />
              <ScrollProgress />

              <Routes>
                <Route path="/" element={
                  <>
                    {/* Hero Section */}
                    <section className="pt-20 min-h-[calc(100vh-5rem)] relative overflow-hidden bg-black">
                      <ParticleAnimation />
                      
                      <div className="container mx-auto px-0 relative z-10 flex items-center justify-center min-h-[calc(100vh-5rem)]">
                        <div className="text-center py-20 w-full overflow-hidden">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2 }}
                            className="flex flex-col items-center"
                          >
                            <div className="w-[calc(100%+2rem)] -mx-4 overflow-hidden relative group">
                              {/* Enhanced gradient blur effects */}
                              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-30 blur-2xl"></div>
                              <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-30 blur-2xl"></div>
                              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,black_100%)] opacity-40"></div>
                              
                              {/* Logo with enhanced blend effects */}
                              <div className="relative px-4">
                                <Logo 
                                  width={2880} 
                                  height={960} 
                                  className="opacity-90 w-full mix-blend-plus-lighter filter contrast-125 saturate-150
                                           transition-all duration-700 ease-in-out
                                           hover:opacity-100 hover:saturate-200" 
                                />
                                
                                {/* Glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 mix-blend-overlay"></div>
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/20 mix-blend-overlay"></div>
                              </div>
                            </div>
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.5, duration: 0.8 }}
                              className="mt-16"
                            >
                              <Button
                                to="/prd"
                                variant="primary"
                                size="lg"
                                className=""
                              >
                                Start Your Journey
                              </Button>
                            </motion.div>
                          </motion.div>
                        </div>
                      </div>
                    </section>

                    {/* Packages Section */}
                    <section id="packages" className="section gradient-pro-bg">
                      <div className="container">
                        <div className="text-center mb-16">
                          <AnimatedHeading 
                            variant="gradient"
                            className="text-5xl md:text-6xl font-bold text-center mb-6 font-display tracking-normal"
                          >
                            Our Packages
                          </AnimatedHeading>
                          <p className="subtitle text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Choose the perfect plan for your project
                          </p>
                        </div>
                        <RegionalPricing />
                      </div>
                    </section>

                    {/* Testimonials Section */}
                    <section id="testimonials" className="py-24 bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-50 
                                               dark:from-emerald-900/40 dark:via-emerald-800/20 dark:to-gray-900">
                      <div className="container mx-auto px-6">
                        <AnimatedHeading 
                          variant="gradient"
                          className="text-5xl md:text-6xl font-bold text-center mb-16 font-display tracking-normal"
                        >
                          What Our Clients Say
                        </AnimatedHeading>
                        <div className="grid md:grid-cols-3 gap-8">
                          {testimonials.map((testimonial, index) => (
                            <div 
                              key={index} 
                              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 
                                         shadow-lg hover:shadow-xl transition duration-300 
                                         border border-emerald-100 dark:border-emerald-800"
                            >
                              <div className="flex items-center mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className="w-5 h-5 text-emerald-500 dark:text-emerald-400 fill-current" 
                                  />
                                ))}
                              </div>
                              <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                                "{testimonial.content}"
                              </p>
                              <div className="border-t border-emerald-100 dark:border-emerald-800/50 pt-4">
                                <p className="font-semibold text-gray-900 dark:text-white">
                                  {testimonial.name}
                                </p>
                                <p className="text-emerald-600 dark:text-emerald-400">
                                  {testimonial.role}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>

                    {/* Blog Section */}
                    <section className="py-24 bg-gradient-to-b from-emerald-50 via-white to-emerald-50 
                                       dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                      <Blog />
                    </section>

                    {/* Contact Section */}
                    <section id="contact" className="py-24 mb-32 relative overflow-hidden">
                      {/* Decorative background elements */}
                      <div className="absolute inset-0 opacity-50">
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-200 dark:bg-emerald-800/30 
                                        rounded-full mix-blend-multiply dark:mix-blend-lighten blur-3xl animate-float" />
                        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-200 dark:bg-teal-800/30 
                                        rounded-full mix-blend-multiply dark:mix-blend-lighten blur-3xl animate-float delay-300" />
                      </div>

                      <div className="container mx-auto px-6 relative">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          className="max-w-2xl mx-auto"
                        >
                          <div className="text-center mb-16">
                            <AnimatedHeading 
                              variant="gradient"
                              className="text-5xl md:text-6xl font-bold text-center mb-6 font-display tracking-normal"
                            >
                              Get In Touch
                            </AnimatedHeading>
                            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                              Ready to transform your idea into reality? Let's start the conversation.
                            </p>
                          </div>

                          <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-8 
                                        shadow-lg border border-gray-700/50">
                            <form onSubmit={handleSubmit} className="space-y-6">
                              <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Name
                                  </label>
                                  <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                             focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400
                                             transition-colors duration-200 ease-in-out
                                             placeholder-gray-400 dark:placeholder-gray-500"
                                    placeholder="John Doe"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email
                                  </label>
                                  <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                             focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400
                                             transition-colors duration-200 ease-in-out
                                             placeholder-gray-400 dark:placeholder-gray-500"
                                    placeholder="john@example.com"
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Message
                                </label>
                                <textarea
                                  name="message"
                                  required
                                  rows={6}
                                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                           focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400
                                           transition-colors duration-200 ease-in-out
                                           placeholder-gray-400 dark:placeholder-gray-500"
                                  placeholder="Tell us about your project..."
                                />
                              </div>

                              <div className="flex items-center justify-between pt-4">
                                <div className="flex items-center space-x-6 text-gray-600 dark:text-gray-400">
                                  <a href="mailto:contact@appsoluteai.dev" className="flex items-center space-x-2 hover:text-emerald-500 transition-colors">
                                    <Mail className="h-5 w-5" />
                                    <span>contact@appsoluteai.dev</span>
                                  </a>
                                  <a href="tel:+1234567890" className="flex items-center space-x-2 hover:text-emerald-500 transition-colors">
                                    <Phone className="w-5 h-5" />
                                    <span>+1 (234) 567-890</span>
                                  </a>
                                </div>
                                <button 
                                  type="submit" 
                                  className="btn-base flex items-center space-x-2 px-8"
                                >
                                  <Send className="w-5 h-5" />
                                  <span>Send Message</span>
                                  <motion.div
                                    className="absolute inset-0 bg-white/20"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: [0, 1.5, 1], opacity: [0, 0.2, 0] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                  />
                                </button>
                              </div>
                            </form>
                          </div>

                          {/* Social proof or additional contact info */}
                          <div className="mt-12 text-center">
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                              Trusted by companies worldwide
                            </p>
                            <div className="flex justify-center items-center space-x-8 opacity-50">
                              {/* Add your client logos here */}
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </section>
                  </>
                } />
                <Route path="/packages" element={<Packages />} />
                <Route path="/prd" element={<PRDFormPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/project-examples" element={<ProjectExamples />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </main>
            <Footer />
            <ChatBot />
            <Analytics />
          </div>
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;