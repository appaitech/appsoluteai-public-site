import { useState } from 'react';
import { motion, useAnimation, PanInfo } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowLeft, ArrowRight, Sparkles, Award, Rocket, Star } from 'lucide-react';
import { EnhancedCard, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/EnhancedCard';
import { SwipeHint } from '@/components/ui/SwipeHint';
import { Seo } from '@/components/Seo';

// Enhanced project data with more variety and visual appeal
const featuredProjects = [
  {
    id: 'f1',
    title: 'AI Chatbot Platform',
    description: 'A customizable AI-powered chatbot for websites and apps, with natural language understanding and 24/7 support.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
    tags: ['AI', 'Chatbot', 'SaaS'],
    badge: 'Award-Winning',
    icon: <Sparkles className="w-6 h-6 text-emerald-400 animate-neon" />,
  },
  {
    id: 'f2',
    title: 'No-Code App Builder',
    description: 'Drag-and-drop builder for mobile and web apps, empowering anyone to create without code.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800',
    tags: ['No-Code', 'Builder', 'Web'],
    badge: 'No-Code Revolution',
    icon: <Rocket className="w-6 h-6 text-teal-400 animate-float" />,
  },
  {
    id: 'f3',
    title: 'E-Commerce Automation',
    description: 'Automate your online store with smart inventory, order management, and AI-driven recommendations.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800',
    tags: ['E-Commerce', 'Automation'],
    badge: 'AI-Powered',
    icon: <Award className="w-6 h-6 text-yellow-400 animate-pulse" />,
  },
];

const allProjects = [
  ...featuredProjects,
  {
    id: 'p4',
    title: 'Fitness Tracker App',
    description: 'Track workouts, nutrition, and progress with a beautiful, gamified mobile app.',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800',
    tags: ['Fitness', 'Mobile'],
    badge: 'Top Rated',
    icon: <Star className="w-6 h-6 text-amber-400 animate-pulse" />,
  },
  {
    id: 'p5',
    title: 'Remote Team Dashboard',
    description: 'Manage distributed teams with real-time collaboration, video chat, and productivity analytics.',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800',
    tags: ['Team', 'Dashboard', 'Collaboration'],
    badge: 'Collaboration Pro',
    icon: <Rocket className="w-6 h-6 text-blue-400 animate-float" />,
  },
  {
    id: 'p6',
    title: 'Smart Home Controller',
    description: 'Control and automate smart home devices from one app, with voice and AI routines.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
    tags: ['IoT', 'Smart Home'],
    badge: 'Next-Gen IoT',
    icon: <Sparkles className="w-6 h-6 text-cyan-400 animate-neon" />,
  },
  {
    id: 'p7',
    title: 'Healthcare Telemedicine Suite',
    description: 'Secure video consultations, patient management, and AI diagnostics for modern healthcare.',
    image: 'https://images.unsplash.com/photo-1511174511562-5f97f4f4e0c8?w=800',
    tags: ['Healthcare', 'Telemedicine', 'AI'],
    badge: 'HIPAA Compliant',
    icon: <Award className="w-6 h-6 text-green-400 animate-pulse" />,
  },
  {
    id: 'p8',
    title: 'EdTech Learning Platform',
    description: 'Interactive courses, gamification, and AI tutors for next-level online education.',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?w=800',
    tags: ['Education', 'AI', 'Gamification'],
    badge: 'EdTech Leader',
    icon: <Star className="w-6 h-6 text-purple-400 animate-pulse" />,
  },
];

export default function ProjectExamples() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation();
  const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 768 : false;

  // Section entrance animations
  const [carouselRef, carouselInView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [gridRef, gridInView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.15 });

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev < featuredProjects.length - 1 ? prev + 1 : 0));
  };
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : featuredProjects.length - 1));
  };

  // Carousel drag handlers (mobile)
  const handleDragEnd = (_: any, info: PanInfo) => {
    const swipe = info.offset.x;
    const swipeThreshold = 50;
    if (Math.abs(swipe) > swipeThreshold) {
      if (swipe > 0) prevSlide();
      else nextSlide();
    } else {
      controls.start({ x: `-${currentIndex * 100}%` });
    }
  };

  // Helper for animated icons on card hover
  const getAnimatedIcon = (icon: JSX.Element, hovered: boolean) => {
    // Only animate on hover for Rocket and Sparkles
    if (!hovered) return icon;
    if (icon.type === Rocket) {
      return <Rocket className="w-6 h-6 text-inherit animate-float" />;
    }
    if (icon.type === Sparkles) {
      return <Sparkles className="w-6 h-6 text-inherit animate-neon" />;
    }
    return icon;
  };

  return (
    <div className="min-h-screen bg-black bg-gradient-to-b from-black via-gray-900 to-emerald-950 text-white pt-20">
      <Seo />
      {/* Hero Section */}
      <motion.section
        className="relative overflow-hidden py-20 mb-12"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-blue-700/10 to-purple-800/20 opacity-60 blur-xl pointer-events-none" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-xl bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-500 bg-clip-text text-transparent animate-gradient-text">
            Project Examples
          </h1>
          <p className="text-2xl text-emerald-100 max-w-3xl mx-auto mb-6 font-medium">
            We don't just build apps—we craft digital experiences that set you apart. Our award-winning team delivers innovation, speed, and quality that make you the best in your market.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 text-white px-4 py-2 rounded-full text-lg font-semibold shadow-md">
              AI & Automation Experts
            </span>
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-lg font-semibold shadow-md">
              Award-Winning Solutions
            </span>
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 text-white px-4 py-2 rounded-full text-lg font-semibold shadow-md">
              Fastest Time to Market
            </span>
          </div>
        </div>
      </motion.section>

      {/* Featured Projects Carousel */}
      <motion.section
        ref={carouselRef}
        className="container mx-auto px-6 mb-16"
        initial={{ opacity: 0, y: 32 }}
        animate={carouselInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
      >
        <div className="relative">
          {isMobile && <SwipeHint />}
          <motion.div
            className="flex"
            initial={false}
            animate={controls}
            drag={isMobile ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            dragMomentum={false}
            style={{ x: `-${currentIndex * 100}%` }}
            transition={{ type: 'spring', stiffness: 200, damping: 25, mass: 0.8 }}
          >
            {featuredProjects.map((project) => {
              const [hovered, setHovered] = useState(false);
              return (
                <motion.div
                  key={project.id}
                  className="min-w-full md:min-w-[33%] px-2"
                  whileHover={{ y: -8, scale: 1.03, boxShadow: '0 8px 32px 0 rgba(16,185,129,0.25)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  <EnhancedCard className="bg-white/10 backdrop-blur-lg border border-emerald-900 shadow-2xl">
                    <div className="relative">
                      <img src={project.image} alt={project.title} className="w-full h-56 object-cover rounded-t-xl shadow-lg" loading="lazy" />
                      {project.badge && (
                        <span className="absolute top-4 left-4 bg-emerald-600/90 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                          {project.badge}
                        </span>
                      )}
                      <span className="absolute top-4 right-4">
                        {getAnimatedIcon(project.icon, hovered)}
                      </span>
                    </div>
                    <CardHeader>
                      <CardTitle>{project.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{project.description}</CardDescription>
                    </CardContent>
                    <CardFooter>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="bg-emerald-900/80 text-emerald-200 px-2 py-1 rounded text-xs font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardFooter>
                  </EnhancedCard>
                </motion.div>
              );
            })}
          </motion.div>
          {/* Carousel Controls */}
          <button onClick={prevSlide} className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 z-10 shadow-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button onClick={nextSlide} className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 z-10 shadow-lg">
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </motion.section>

      {/* All Projects Grid */}
      <motion.section
        ref={gridRef}
        className="container mx-auto px-6 pb-24"
        initial={{ opacity: 0, y: 32 }}
        animate={gridInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-500 bg-clip-text text-transparent animate-gradient-text">
          Our Most Popular Solutions
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {allProjects.map((project) => {
            const [hovered, setHovered] = useState(false);
            return (
              <motion.div
                key={project.id}
                whileHover={{ y: -8, scale: 1.03, boxShadow: '0 8px 32px 0 rgba(16,185,129,0.25)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <EnhancedCard className="bg-white/10 backdrop-blur-lg border border-emerald-900 shadow-xl">
                  <div className="relative">
                    <img src={project.image} alt={project.title} className="w-full h-40 object-cover rounded-t-xl shadow-md" loading="lazy" />
                    {project.badge && (
                      <span className="absolute top-4 left-4 bg-emerald-600/90 text-white px-3 py-1 rounded-full text-xs font-bold shadow">
                        {project.badge}
                      </span>
                    )}
                    <span className="absolute top-4 right-4">
                      {getAnimatedIcon(project.icon, hovered)}
                    </span>
                  </div>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{project.description}</CardDescription>
                  </CardContent>
                  <CardFooter>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="bg-emerald-900/80 text-emerald-200 px-2 py-1 rounded text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardFooter>
                </EnhancedCard>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        ref={ctaRef}
        className="bg-gradient-to-r from-emerald-700/80 to-teal-800/80 py-16 mt-16 text-center shadow-xl animate-float"
        initial={{ opacity: 0, y: 32 }}
        animate={ctaInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
      >
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-500 bg-clip-text text-transparent animate-gradient-text">Ready to Build the Next Big Thing?</h3>
        <p className="text-lg text-emerald-100 mb-8">Let's turn your vision into reality. Contact us for a free consultation and see why we're the best in the business.</p>
        <a
          href="#contact"
          className="inline-block bg-white text-emerald-700 font-bold px-8 py-4 rounded-full shadow-lg text-xl hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-300 animate-neon"
        >
          Get Started Today
        </a>
      </motion.section>
    </div>
  );
} 