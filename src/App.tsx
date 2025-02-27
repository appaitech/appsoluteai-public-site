import React, { useState, useEffect } from 'react';
import { 
  Zap, Code, Rocket, Clock, CheckCircle, Package, 
  Users, ArrowRight, Mail, Phone, MapPin, Star,
  Menu, X, Send, FileText, Upload, AlertCircle, Shield,
  BarChart, Palette, Cloud, Info
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
import { Tooltip } from './components/ui/Tooltip';
import { Blog } from './components/sections/Blog';
import { HeartsAnimation } from './components/ui/HeartsAnimation';
import { useDarkMode } from '@/hooks/useDarkMode';
import { AnimatedHeading } from './components/ui/AnimatedHeading';
import { ThemeProvider } from './providers/ThemeProvider';
import { ProjectCalculator } from './components/ui/ProjectCalculator';
import { TimelineVisualizer } from './components/ui/TimelineVisualizer';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { ProjectCalculatorPage } from './pages/ProjectCalculator';
import { PRDFormPage } from './pages/PRDFormPage';
import { NotFound } from './pages/NotFound';
import { HelmetProvider } from 'react-helmet-async';
import { RegionalPricing } from './components/ui/RegionalPricing';
import { InnovationCards } from './components/ui/InnovationCards';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface PRDFormData {
  projectName: string;
  companyName: string;
  contactEmail: string;
  phone: string;
  budget: string;
  timeline: string;
  platform: string[];
  description: string;
  features: string;
  targetAudience: string;
  competitors: string;
  successCriteria: string;
  additionalInfo: string;
  termsAccepted: boolean;
  industryType: string;
  existingTech: string;
  userAuthentication: boolean;
  dataStorage: boolean;
  thirdPartyIntegrations: string[];
  monetizationStrategy: string;
  scalabilityRequirements: string;
  accessibilityRequirements: string;
  securityRequirements: string[];
  analyticsRequirements: boolean;
  multiLanguageSupport: boolean;
  offlineCapabilities: boolean;
  projectGoals: string;
  projectScope: string;
  keyMilestones: string[];
  projectConstraints: string;
  businessModel: string;
  revenueStreams: string[];
  marketStrategy: string;
  competitiveAdvantage: string;
  successMetrics: string[];
  userPersonas: string;
  userJourneys: string;
  userPainPoints: string;
  accessibilityNeeds: string[];
  preferredTechnologies: string[];
  existingSystemsIntegration: string;
  performanceRequirements: {
    loadTime: string;
    concurrent: string;
    availability: string;
  };
  deviceSupport: string[];
  browserSupport: string[];
  dataTypes: string[];
  dataRetention: string;
  backupStrategy: string;
  dataCompliance: string[];
  brandGuidelines: boolean;
  designPreferences: string;
  moodboardLinks: string;
  specialAnimations: boolean;
  hostingPreference: string;
  maintenancePlan: string;
  monitoringRequirements: string[];
  updateFrequency: string;
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
      content: "Idea2RealApp delivered our MVP in just 2 weeks. The quality and speed were exceptional!",
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
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <Seo />
            <CommandMenu />
            <Header theme={theme} toggleTheme={toggleTheme} />
            <ScrollProgress />

            <Routes>
              <Route path="/" element={
                <>
                  {/* Hero Section */}
                  <section className="pt-20 relative overflow-hidden">
                    {/* Enhanced Animated Background Elements */}
                    <div className="absolute inset-0 z-0">
                      {/* Primary gradient burst */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ 
                            scale: [0.8, 1.2, 1],
                            opacity: [0, 1, 0.8]
                          }}
                          transition={{ 
                            duration: 3, 
                            repeat: Infinity, 
                            repeatType: "reverse",
                            ease: "easeInOut" 
                          }}
                          className="w-[800px] h-[800px] rounded-full bg-[conic-gradient(from_0deg,#059669,#10b981,#059669)] 
                                    blur-3xl opacity-20 dark:opacity-30 animate-slow-spin"
                        />
                      </div>

                      {/* Floating orbs */}
                      <motion.div
                        animate={{ 
                          y: [-20, 20],
                          x: [-10, 10],
                          rotate: [0, 360]
                        }}
                        transition={{ 
                          duration: 8, 
                          repeat: Infinity, 
                          repeatType: "reverse" 
                        }}
                        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full 
                                   bg-gradient-to-r from-emerald-300 to-teal-400 
                                     blur-2xl mix-blend-screen opacity-30"
                      />
                      <motion.div
                        animate={{ 
                          y: [20, -20],
                          x: [10, -10],
                          rotate: [360, 0]
                        }}
                        transition={{ 
                          duration: 10, 
                          repeat: Infinity, 
                          repeatType: "reverse" 
                        }}
                        className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full 
                                   bg-gradient-to-r from-green-400 via-emerald-500 to-teal-300 
                                     blur-2xl mix-blend-screen opacity-30"
                      />

                      {/* Enhanced grid pattern */}
                      <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent" />
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f0f0f1a_1px,transparent_1px),linear-gradient(to_bottom,#0f0f0f1a_1px,transparent_1px)] 
                                bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
                      </div>

                      {/* Animated particles */}
                      <div className="absolute inset-0">
                        {[...Array(12)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ 
                              x: Math.random() * window.innerWidth,
                              y: Math.random() * window.innerHeight,
                              scale: 0,
                              opacity: 0
                            }}
                            animate={{ 
                              x: Math.random() * window.innerWidth,
                              y: Math.random() * window.innerHeight,
                              scale: [0, 1, 0],
                              opacity: [0, 1, 0]
                            }}
                            transition={{ 
                              duration: 8 + Math.random() * 5,
                              repeat: Infinity,
                              repeatType: "loop",
                              ease: "easeInOut"
                            }}
                            className="absolute w-2 h-2 rounded-full bg-emerald-400/30 
                                       shadow-[0_0_8px_3px_rgba(16,185,129,0.3)]"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="container mx-auto px-6 pt-32 pb-24 relative z-10">
                      <div className="text-center max-w-4xl mx-auto">
                        <motion.h1 
                          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8 }}
                        >
                          <span className="block mb-2">Turn Your Ideas Into</span>
                          <span className="bg-gradient-to-r from-emerald-500 to-teal-500 
                                          dark:from-emerald-400 dark:to-teal-400 
                                          bg-clip-text text-transparent">
                            Reality
                          </span>
                        </motion.h1>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                        >
                          <div className="flex flex-col items-center justify-center mb-12">
                            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                              <motion.div
                                className="group relative px-2"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                              >
                                <span className="text-2xl md:text-3xl font-light tracking-wide
                                               text-white dark:text-white/90">
                                  Dream it
                                </span>
                                <motion.div 
                                  className="absolute bottom-0 left-0 h-[2px] bg-white 
                                             w-0 group-hover:w-full transition-all duration-500 ease-out
                                             shadow-[0_2px_8px_rgba(255,255,255,0.5)]"
                                />
                              </motion.div>

                              <span className="text-white/60">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                              </span>

                              <motion.div
                                className="group relative px-2"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                              >
                                <span className="text-2xl md:text-3xl font-light tracking-wide
                                               text-white dark:text-white/90">
                                  Prototype it
                                </span>
                                <motion.div 
                                  className="absolute bottom-0 left-0 h-[2px] bg-white 
                                             w-0 group-hover:w-full transition-all duration-500 ease-out
                                             shadow-[0_2px_8px_rgba(255,255,255,0.5)]"
                                />
                              </motion.div>

                              <span className="text-white/60">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                              </span>

                              <motion.div
                                className="group relative px-2"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                              >
                                <span className="text-2xl md:text-3xl font-light tracking-wide
                                               text-white dark:text-white/90">
                                  Launch it
                                </span>
                                <motion.div 
                                  className="absolute bottom-0 left-0 h-[2px] bg-white 
                                             w-0 group-hover:w-full transition-all duration-500 ease-out
                                             shadow-[0_2px_8px_rgba(255,255,255,0.5)]"
                                />
                              </motion.div>
                            </div>

                            <motion.div 
                              className="mt-6 text-base md:text-lg text-white/80 dark:text-white/70 tracking-wider font-light"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.4 }}
                            >
                              Where innovation meets execution
                            </motion.div>
                          </div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.4 }}
                          className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                          <Link 
                            to="/prd" 
                            className="btn-pro-primary px-8 py-4 text-lg w-full sm:w-auto"
                          >
                            Start Your Project
                          </Link>
                          <Link 
                            to="#packages" 
                            className="btn-pro-secondary px-8 py-4 text-lg w-full sm:w-auto"
                          >
                            View Packages
                          </Link>
                        </motion.div>
                      </div>
                    </div>
                  </section>

                  {/* About Section - First section after hero */}
                  <section id="about" className="py-20 relative overflow-hidden">
                    {/* Background Effects */}
                    <div className="absolute inset-0">
                      <div className="absolute inset-0 bg-gradient-to-b from-white via-emerald-50/50 to-white 
                                      dark:from-gray-900 dark:via-emerald-900/10 dark:to-gray-900" />
                      
                      {/* Animated circles */}
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 180, 360],
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -right-64 -top-64 w-[500px] h-[500px] rounded-full 
                                   bg-gradient-to-br from-emerald-200/20 to-teal-200/20 dark:from-emerald-900/20 
                                   dark:to-teal-900/20 blur-3xl"
                      />
                      <motion.div
                        animate={{
                          scale: [1.2, 1, 1.2],
                          rotate: [360, 180, 0],
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute -left-64 -bottom-64 w-[500px] h-[500px] rounded-full 
                                   bg-gradient-to-br from-teal-200/20 to-emerald-200/20 dark:from-teal-900/20 
                                   dark:to-emerald-900/20 blur-3xl"
                      />
                    </div>

                    <div className="container mx-auto px-6 relative">
                      <AnimatedHeading 
                        variant="glitch"
                        className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-16"
                      >
                        Accelerating Digital Innovation
                      </AnimatedHeading>
                      
                      <div className="grid md:grid-cols-3 gap-12">
                        {[
                          {
                            icon: <Clock className="w-12 h-12" />,
                            title: "Lightning Fast Delivery",
                            description: "From concept to deployment in record time"
                          },
                          {
                            icon: <Code className="w-12 h-12" />,
                            title: "Cutting-Edge Tech",
                            description: "Built with the latest technologies"
                          },
                          {
                            icon: <CheckCircle className="w-12 h-12" />,
                            title: "Quality Assured",
                            description: "Rigorous testing and optimization"
                          }
                        ].map((item, index) => (
                          <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            whileHover={{ scale: 1.05 }}
                            className="relative group"
                          >
                            <div className="text-center p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 
                                           backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50
                                           shadow-lg hover:shadow-xl transition-all duration-300">
                              <div className="relative mb-4">
                                <div className="absolute inset-0 bg-emerald-500/20 dark:bg-emerald-500/10 
                                              rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
                                <div className="relative text-emerald-500">
                                  {item.icon}
                                </div>
                              </div>
                              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                                {item.title}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-300">
                                {item.description}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* Packages Section */}
                  <section id="packages" className="section gradient-pro-bg">
                    <div className="container">
                      <div className="text-center mb-12">
                        <h2 className="heading-2 mb-4">Our Packages</h2>
                        <p className="subtitle">Choose the perfect plan for your project</p>
                      </div>
                      <RegionalPricing />
                    </div>
                  </section>

                  {/* Testimonials Section */}
                  <section id="testimonials" className="py-24 bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-50 
                                             dark:from-emerald-900/40 dark:via-emerald-800/20 dark:to-gray-900">
                    <div className="container mx-auto px-6">
                      <AnimatedHeading 
                        variant="glitch"
                        className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12"
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
                  <section id="contact" className="py-24 bg-gradient-to-br from-white to-emerald-50 
                                             dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
                    {/* Decorative background elements */}
                    <div className="absolute inset-0 opacity-30 dark:opacity-20">
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
                        <div className="text-center mb-12">
                          <AnimatedHeading 
                            variant="glitch"
                            className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4"
                          >
                            Get In Touch
                          </AnimatedHeading>
                          <p className="text-gray-600 dark:text-gray-300">
                            Ready to transform your idea into reality? Let's start the conversation.
                          </p>
                        </div>

                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 
                                        shadow-lg border border-gray-100 dark:border-gray-700">
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
                                <a href="mailto:contact@appsnap.dev" className="flex items-center space-x-2 hover:text-emerald-500 transition-colors">
                                  <Mail className="w-5 h-5" />
                                  <span>contact@appsnap.dev</span>
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

                  {/* Accelerating Digital Innovation Section */}
                  <section className="section gradient-pro-bg">
                    <div className="container">
                      <div className="text-center mb-12">
                        <h2 className="heading-2 mb-4">Accelerating Digital Innovation</h2>
                        <p className="subtitle">Transforming ideas into powerful digital solutions</p>
                      </div>
                      <InnovationCards />
                    </div>
                  </section>
                </>
              } />
              <Route path="/calculator" element={<ProjectCalculatorPage />} />
              <Route path="/prd" element={<PRDFormPage />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>

            <ChatBot />
            <Analytics />
          </div>
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;