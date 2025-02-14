import { useState } from 'react';
import { motion, useAnimation, PanInfo } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, User, Tag, Share2, MessageCircle, BookmarkPlus, Cloud, Shield, BarChart } from 'lucide-react';
import { format } from 'date-fns';
import { useMediaQuery } from '@/hooks/use-media-query';
import { SwipeIndicator } from '@/components/ui/SwipeIndicator';
import { SwipeHint } from '@/components/ui/SwipeHint';
import { HeartsAnimation } from '@/components/ui/HeartsAnimation';
import { ArticleModal } from '@/components/blog/ArticleModal';
import { toast } from 'sonner';
import { ReadingProgress } from '@/components/ui/ReadingProgress';
import { FloatingShareButton } from '@/components/ui/FloatingShareButton';
import { AnimatedHeading } from '@/components/ui/AnimatedHeading';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  date: Date;
  readTime: number;
  category: string;
  image: string;
  tags: string[];
}

const trendingPosts: BlogPost[] = [
  {
    id: '1',
    title: "The Rise of AI-Powered App Development: Revolutionizing How We Build Software",
    excerpt: "Explore how artificial intelligence is transforming the app development landscape, from code generation to testing.",
    content: `
      Artificial Intelligence is revolutionizing the way we approach software development. With the advent of powerful AI tools and platforms, developers are experiencing a paradigm shift in how applications are built, tested, and deployed.

      ## The Impact of AI on Development
      
      Modern AI tools like GitHub Copilot and ChatGPT are transforming the development workflow in several ways:
      
      1. **Code Generation**: AI can now generate boilerplate code, suggest completions, and even implement entire functions based on natural language descriptions.
      
      2. **Bug Detection**: Machine learning models can identify potential bugs and security vulnerabilities before they make it to production.
      
      3. **Testing Automation**: AI-powered testing tools can generate test cases, identify edge cases, and maintain test suites with minimal human intervention.
      
      ## Practical Applications
      
      Here are some real-world examples of AI in app development:
      
      - **Automated Code Review**: AI systems can analyze code quality, suggest improvements, and ensure consistency across large codebases.
      
      - **Natural Language Processing**: Developers can now describe features in plain English and receive suggested implementations.
      
      - **Performance Optimization**: AI algorithms can analyze application performance and suggest optimizations automatically.
      
      ## The Future of AI in Development
      
      As AI technology continues to evolve, we can expect even more revolutionary changes in how we build software. The future might include:
      
      - Fully automated development pipelines
      - AI-driven architecture decisions
      - Real-time code optimization
      - Predictive maintenance and scaling
      
      ## Conclusion
      
      The integration of AI into app development is not just a trend—it's a fundamental shift in how we approach software creation. As these tools become more sophisticated, developers who embrace AI will have a significant advantage in building better applications faster.
    `,
    author: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
    },
    date: new Date('2024-03-15'),
    readTime: 5,
    category: "Artificial Intelligence",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200",
    tags: ["AI", "Development", "Future Tech"]
  },
  {
    id: '2',
    title: "No-Code Revolution: Building Enterprise Apps Without Traditional Programming",
    excerpt: "Discover how no-code platforms are enabling businesses to create sophisticated applications faster than ever.",
    content: `
      The no-code movement is transforming how businesses approach application development, making it accessible to a broader audience while maintaining enterprise-grade quality.

      ## Understanding No-Code Development

      No-code platforms provide visual development environments where users can:
      
      1. **Drag-and-Drop Interface**: Create complex user interfaces without writing HTML or CSS
      2. **Visual Logic Builder**: Define business logic through flowcharts and decision trees
      3. **Automated Database Management**: Handle data without SQL knowledge
      
      ## Benefits for Enterprise
      
      No-code development offers several advantages for businesses:
      
      - **Rapid Development**: Build and deploy applications in days instead of months
      - **Cost Efficiency**: Reduce development costs and technical debt
      - **Business Agility**: Quickly adapt applications to changing needs
      - **Empowered Teams**: Enable business users to create their solutions
      
      ## Real-World Applications
      
      Companies are using no-code platforms to build:
      
      - Customer portals
      - Internal tools
      - Workflow automation systems
      - Data collection and analysis tools
      
      ## Best Practices
      
      To succeed with no-code development:
      
      1. Start with clear requirements
      2. Focus on user experience
      3. Plan for scalability
      4. Maintain proper documentation
      
      ## Looking Ahead
      
      The future of no-code development includes:
      
      - AI-powered suggestions
      - Advanced customization options
      - Better enterprise integration
      - Enhanced security features
    `,
    author: {
      name: "Michael Rodriguez",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
    },
    date: new Date('2024-03-14'),
    readTime: 4,
    category: "No-Code Development",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200",
    tags: ["No-Code", "Enterprise", "Innovation"]
  },
  {
    id: '3',
    title: "The Future of App Security: Implementing Zero Trust Architecture",
    excerpt: "Learn why zero trust security is becoming essential for modern applications and how to implement it effectively.",
    content: `
      As cyber threats evolve, traditional security perimeters are no longer sufficient. Zero Trust Architecture (ZTA) is emerging as the new standard for application security.

      ## What is Zero Trust?

      Zero Trust operates on the principle of "never trust, always verify." Key components include:
      
      1. **Identity Verification**: Continuous authentication of all users and devices
      2. **Micro-segmentation**: Isolating resources and limiting access points
      3. **Least Privilege**: Providing minimal necessary access rights
      
      ## Implementation Strategies
      
      Successfully implementing ZTA requires:
      
      ### 1. Identity and Access Management
      - Multi-factor authentication
      - Biometric verification
      - Context-based access controls
      
      ### 2. Network Security
      - Micro-segmentation
      - Encrypted communications
      - Network monitoring
      
      ### 3. Data Protection
      - Data classification
      - Encryption at rest and in transit
      - Access logging and auditing
      
      ## Benefits of Zero Trust
      
      Organizations implementing ZTA experience:
      
      - Reduced breach impact
      - Better compliance adherence
      - Improved visibility
      - Enhanced user experience
      
      ## Common Challenges
      
      Watch out for these implementation challenges:
      
      1. Legacy system integration
      2. User resistance
      3. Performance impacts
      4. Initial complexity
      
      ## Best Practices
      
      To succeed with Zero Trust:
      
      - Start with critical assets
      - Implement gradually
      - Train users effectively
      - Monitor and adjust
    `,
    author: {
      name: "Alex Thompson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"
    },
    date: new Date('2024-03-13'),
    readTime: 6,
    category: "Security",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200",
    tags: ["Security", "Zero Trust", "Best Practices"]
  }
];

export function Blog() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [dragStart, setDragStart] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragDirection, setDragDirection] = useState<'left' | 'right' | null>(null);
  const [showHearts, setShowHearts] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [showArticle, setShowArticle] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<string[]>([]);

  const nextSlide = () => {
    if (currentIndex < trendingPosts.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setCurrentIndex(trendingPosts.length - 1);
    }
  };

  const handleDragStart = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isMobile) return;
    setIsDragging(true);
    setDragStart(currentIndex);
  };

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isMobile) return;
    setDragDirection(info.offset.x > 0 ? 'right' : 'left');
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isMobile) return;

    const swipeThreshold = 50;
    const swipe = info.offset.x;
    
    if (Math.abs(swipe) > swipeThreshold) {
      if (swipe > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    } else {
      controls.start({ x: `-${currentIndex * 100}%` });
    }

    setIsDragging(false);
    setDragDirection(null);
  };

  const handleReadMore = (post: BlogPost) => {
    setShowHearts(post.id);
    setTimeout(() => {
      setSelectedPost(post);
      setShowArticle(true);
    }, 300);
    setTimeout(() => setShowHearts(null), 2000);
  };

  const handleBookmark = (post: BlogPost) => {
    const isBookmarked = bookmarkedPosts.includes(post.id);
    if (isBookmarked) {
      setBookmarkedPosts(prev => prev.filter(id => id !== post.id));
      toast.success('Removed from bookmarks');
    } else {
      setBookmarkedPosts(prev => [...prev, post.id]);
      toast.success('Added to bookmarks');
    }
  };

  return (
    <section id="blog" className="py-24 bg-gradient-to-b from-white via-emerald-50/50 to-white 
                                 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {isMobile && (
        <>
          <SwipeIndicator 
            direction="left" 
            isVisible={isDragging && dragDirection === 'left'} 
          />
          <SwipeIndicator 
            direction="right" 
            isVisible={isDragging && dragDirection === 'right'} 
          />
        </>
      )}

      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Trending in Tech
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Stay updated with the latest trends and insights in app development, AI, and technology
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden relative">
            {isMobile && <SwipeHint />}
            <motion.div
              className="flex"
              initial={false}
              animate={controls}
              drag={isMobile ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragStart={handleDragStart}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              dragMomentum={false}
              style={{
                x: `-${currentIndex * 100}%`,
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 25,
                mass: 0.8
              }}
            >
              {trendingPosts.map((post) => (
                <motion.article
                  key={post.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-depth overflow-hidden 
                                 hover:shadow-xl transition-shadow relative border border-gray-100 
                                 dark:border-gray-700">
                    <div className="relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                      <span className="absolute top-4 right-4 bg-emerald-500 dark:bg-emerald-600 
                                     text-white px-3 py-1 rounded-full text-sm">
                        {post.category}
                      </span>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="text-sm">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {post.author.name}
                          </p>
                          <p className="text-gray-500 dark:text-gray-400">
                            {format(post.date, 'MMM d, yyyy')} • {post.readTime} min read
                          </p>
                        </div>
                      </div>

                      <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white 
                                   hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-2">
                        {post.excerpt}
                      </p>

                      <div className="flex flex-col space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 
                                       dark:text-emerald-400 px-3 py-1 rounded-full text-sm"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t 
                                      border-gray-100 dark:border-gray-700 relative">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setSelectedPost(post);
                                setShowComments(true);
                              }}
                              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 
                                       rounded-full transition-colors"
                              aria-label="View comments"
                            >
                              <MessageCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </button>
                            <button
                              onClick={() => handleBookmark(post)}
                              className={`p-2 hover:bg-gray-100 dark:hover:bg-gray-700 
                                       rounded-full transition-colors ${
                                         bookmarkedPosts.includes(post.id) ? 'text-emerald-500' : ''
                                       }`}
                              aria-label="Bookmark article"
                            >
                              <BookmarkPlus 
                                className={`w-5 h-5 ${
                                  bookmarkedPosts.includes(post.id) 
                                    ? 'text-emerald-500 fill-emerald-500' 
                                    : 'text-gray-600 dark:text-gray-400'
                                }`} 
                              />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedPost(post);
                                setShowShareModal(true);
                              }}
                              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 
                                       rounded-full transition-colors"
                              aria-label="Share article"
                            >
                              <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </button>
                          </div>

                          <button
                            onClick={() => handleReadMore(post)}
                            className="btn-base flex items-center space-x-2 group relative overflow-hidden"
                          >
                            <span className="relative z-10">Read More</span>
                            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                            <motion.div
                              className="absolute inset-0 bg-white/20"
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: [0, 1.5, 1], opacity: [0, 0.2, 0] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            />
                          </button>
                          {showHearts === post.id && <HeartsAnimation />}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>

          {/* Navigation buttons */}
          {!isMobile && (
            <>
              <button
                onClick={prevSlide}
                className="btn-base absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 
                         p-3 rounded-full z-10 hidden md:flex items-center justify-center"
                aria-label="Previous article"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextSlide}
                className="btn-base absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 
                         p-3 rounded-full z-10 hidden md:flex items-center justify-center"
                aria-label="Next article"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {trendingPosts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex 
                    ? 'bg-emerald-500 dark:bg-emerald-400' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`Go to article ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {showArticle && selectedPost && (
        <>
          <ReadingProgress />
          <FloatingShareButton 
            url={`https://yourwebsite.com/blog/${selectedPost.id}`}
            title={selectedPost.title}
          />
          <ArticleModal
            post={selectedPost}
            onClose={() => setShowArticle(false)}
            onShare={() => {
              setShowShareModal(true);
              setShowArticle(false);
            }}
          />
        </>
      )}
    </section>
  );
} 