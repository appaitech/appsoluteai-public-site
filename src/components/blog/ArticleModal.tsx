import { motion } from 'framer-motion';
import { 
  X, Clock, User, Calendar, Share2, ArrowLeft, 
  BookmarkPlus, ThumbsUp, MessageCircle, Eye, Send
} from 'lucide-react';
import { format } from 'date-fns';
import { useState } from 'react';
import { 
  TwitterShareButton, 
  LinkedinShareButton, 
  FacebookShareButton,
  TwitterIcon,
  LinkedinIcon,
  FacebookIcon
} from 'react-share';
import { toast } from 'sonner';
import { BlogPost } from '@/data/blog-posts';
import { NewsletterForm } from './NewsletterForm';
import { CommentSection } from './CommentSection';
import { ReadingProgress } from '@/components/ui/ReadingProgress';

interface ArticleModalProps {
  post: BlogPost;
  onClose: () => void;
  onShare: () => void;
}

export function ArticleModal({ post, onClose, onShare }: ArticleModalProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const shareUrl = `https://yourwebsite.com/blog/${post.id}`;

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
  };

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
      toast.success('Thanks for the appreciation!');
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Link copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  const handleComment = () => {
    // Implementation of handleComment
  };

  const handleSubscribe = () => {
    // Implementation of handleSubscribe
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="min-h-screen py-10 px-4 sm:px-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="max-w-4xl mx-auto">
          <ReadingProgress />
          {/* Floating Action Bar */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="sticky top-4 z-10 flex items-center justify-between 
                       bg-white/90 dark:bg-gray-900/90 backdrop-blur-md 
                       rounded-full shadow-lg px-4 py-2 mb-6
                       border border-gray-100 dark:border-gray-800"
          >
            {/* Back button */}
            <button
              onClick={onClose}
              className="btn-base flex items-center space-x-2 px-3 py-1.5 rounded-full
                         text-gray-700 dark:text-gray-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>

            <div className="flex items-center space-x-2">
              {/* Like button */}
              <button
                onClick={handleLike}
                className={`btn-base flex items-center space-x-1 px-3 py-1.5 rounded-full
                          ${hasLiked 
                            ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30' 
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              >
                <ThumbsUp className={`w-5 h-5 ${hasLiked ? 'fill-current' : ''}`} />
                <span>{likes}</span>
              </button>

              {/* Bookmark button */}
              <button
                onClick={handleBookmark}
                className={`btn-base p-2 rounded-full
                          ${isBookmarked 
                            ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30' 
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              >
                <BookmarkPlus className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>

              <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />

              {/* Share buttons */}
              <div className="flex items-center space-x-2">
                <TwitterShareButton url={shareUrl} title={post.title}>
                  <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                    <TwitterIcon size={24} round />
                  </div>
                </TwitterShareButton>
                
                <LinkedinShareButton url={shareUrl} title={post.title}>
                  <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                    <LinkedinIcon size={24} round />
                  </div>
                </LinkedinShareButton>
                
                <FacebookShareButton url={shareUrl} quote={post.title}>
                  <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                    <FacebookIcon size={24} round />
                  </div>
                </FacebookShareButton>

                <button
                  onClick={handleCopyLink}
                  className="btn-base p-2 rounded-full text-gray-700 dark:text-gray-300"
                  aria-label="Copy link"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Main Content Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden 
                       max-w-4xl w-full mx-auto relative
                       border border-gray-100 dark:border-gray-800"
          >
            {/* Hero Section */}
            <div className="relative h-[400px]">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t 
                              from-gray-900/80 via-gray-900/50 to-transparent" />
              
              {/* Title Section */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full border-2 border-white/50"
                  />
                  <div>
                    <p className="font-medium">{post.author.name}</p>
                    <div className="flex items-center text-sm text-gray-200">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{format(post.date, 'MMMM d, yyyy')}</span>
                      <span className="mx-2">•</span>
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{post.readTime} minute read</span>
                    </div>
                  </div>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-shadow-sm">{post.title}</h1>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8">
              <div className="prose prose-lg dark:prose-invert prose-emerald max-w-none">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {post.title}
                </h1>
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-8">
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    <span>1.2k views</span>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    <span>8 comments</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{post.readTime} min read</span>
                  </div>
                </div>

                {/* Table of Contents */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 mb-8
                                border border-gray-100 dark:border-gray-800">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                    Table of Contents
                  </h3>
                  <nav className="space-y-2">
                    {post.content.split('\n\n')
                      .filter(p => p.startsWith('#'))
                      .map((heading, index) => {
                        const level = heading.match(/^#{1,3}/)[0].length;
                        const text = heading.replace(/^#{1,3}\s/, '');
                        return (
                          <a
                            key={index}
                            href={`#${text.toLowerCase().replace(/\s+/g, '-')}`}
                            className={`block text-gray-600 hover:text-emerald-600 transition-colors
                                      ${level === 1 ? 'font-medium' : 'pl-4'}`}
                          >
                            {text}
                          </a>
                        );
                      })}
                  </nav>
                </div>

                {/* Article Content */}
                <article className="prose prose-lg prose-emerald dark:prose-invert max-w-none">
                  {/* Lead paragraph */}
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed font-medium not-prose">
                    {post.excerpt}
                  </p>

                  {/* Main content with enhanced typography */}
                  <div className="prose-headings:font-bold 
                                  prose-h1:text-3xl prose-h1:mb-8
                                  prose-h2:text-2xl prose-h2:mb-6
                                  prose-h3:text-xl prose-h3:mb-4
                                  prose-p:text-gray-600 prose-p:leading-relaxed
                                  prose-li:text-gray-600
                                  prose-code:text-emerald-600 prose-code:bg-emerald-50
                                  prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200
                                  prose-blockquote:border-l-emerald-500 prose-blockquote:bg-emerald-50
                                  prose-blockquote:py-2 prose-blockquote:px-4
                                  prose-img:rounded-xl prose-img:shadow-lg">
                    {/* Your content rendering logic */}
                    {post.content.split('\n\n').map((paragraph, index) => {
                      // Clean up the content by removing markdown symbols
                      const cleanParagraph = paragraph
                        .replace(/^#{1,3}\s/, '') // Remove heading markers
                        .replace(/`{3}[\s\S]*`{3}/g, '') // Remove code block markers
                        .replace(/^-\s/, '') // Remove list markers
                        .replace(/^\d+\.\s/, '') // Remove numbered list markers
                        .trim();

                      if (!cleanParagraph) return null;

                      // Determine the type of content and style accordingly
                      if (paragraph.startsWith('#')) {
                        const level = paragraph.match(/^#{1,3}/)[0].length;
                        const className = level === 1 
                          ? "text-3xl font-bold text-gray-900 mt-12 mb-6"
                          : level === 2
                          ? "text-2xl font-bold text-gray-900 mt-10 mb-4"
                          : "text-xl font-bold text-gray-800 mt-8 mb-4";
                        
                        return (
                          <h2 key={index} className={className}>
                            {cleanParagraph}
                          </h2>
                        );
                      }

                      if (paragraph.includes('```')) {
                        const code = paragraph.match(/```[\s\S]*```/)[0]
                          .replace(/```\w*\n?/g, '');
                        return (
                          <div key={index} className="bg-gray-50 rounded-xl p-6 font-mono text-sm overflow-x-auto">
                            <pre>{code}</pre>
                          </div>
                        );
                      }

                      return (
                        <p key={index} className="text-gray-700 leading-relaxed">
                          {cleanParagraph}
                        </p>
                      );
                    })}
                  </div>
                </article>

                {/* Author Bio */}
                <div className="mt-12 border-t pt-8">
                  <div className="flex items-start space-x-4">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
                      <p className="text-gray-600 mt-1">
                        Technical writer and software developer with a passion for creating 
                        user-friendly content about complex technical topics.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="mt-12 border-t pt-8">
                  <h3 className="text-xl font-bold mb-6 flex items-center justify-between">
                    <span>Comments</span>
                    <span className="text-sm font-normal text-gray-500">8 comments</span>
                  </h3>
                  <CommentSection
                    comments={[
                      {
                        id: '1',
                        author: {
                          name: 'John Doe',
                          avatar: 'https://ui-avatars.com/api/?name=John+Doe',
                        },
                        content: 'Great article! The insights about AI development are spot on.',
                        likes: 5,
                        timestamp: new Date('2024-03-15T10:00:00'),
                        replies: [
                          {
                            id: '2',
                            author: {
                              name: 'Jane Smith',
                              avatar: 'https://ui-avatars.com/api/?name=Jane+Smith',
                            },
                            content: 'Totally agree! Especially about the automated testing part.',
                            likes: 2,
                            timestamp: new Date('2024-03-15T11:30:00'),
                          },
                        ],
                      },
                      // Add more sample comments as needed
                    ]}
                  />
                </div>

                {/* Related Articles */}
                <div className="mt-12 border-t pt-8">
                  <h3 className="text-xl font-bold mb-6">Related Articles</h3>
                  <div className="grid grid-cols-2 gap-6">
                    {/* Add related articles here */}
                  </div>
                </div>

                {/* Newsletter Section with enhanced styling */}
                <div className="mt-16">
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 
                                dark:from-emerald-900/20 dark:to-emerald-800/10
                                rounded-2xl p-8 shadow-inner relative overflow-hidden
                                border border-emerald-100/50 dark:border-emerald-800/50">
                    <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                    <div className="relative">
                      <NewsletterForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
} 