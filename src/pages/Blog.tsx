import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Share2, MessageCircle, BookmarkPlus, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { BlogPost, trendingPosts } from '@/data/blog-posts';
import { NewsletterForm } from '@/components/blog/NewsletterForm';
import { ShareModal } from '@/components/blog/ShareModal';
import { Comments } from '@/components/blog/Comments';
import { BlogFilter } from '@/components/blog/BlogFilter';
import { ArticleModal } from '@/components/blog/ArticleModal';

export function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showArticle, setShowArticle] = useState(false);

  const filteredPosts = trendingPosts.filter(post => {
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleShare = (post: BlogPost) => {
    setSelectedPost(post);
    setShowShareModal(true);
  };

  const handleBookmark = (post: BlogPost) => {
    // Implement bookmark functionality
    toast.success('Post saved to bookmarks');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            AppsoluteAI Blog
          </h1>
          <p className="text-xl text-emerald-50 max-w-2xl">
            Insights, tutorials, and trends in app development, AI, and technology
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <BlogFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <motion.article
              key={post.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-2xl shadow-depth overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm">
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
                    <p className="font-medium">{post.author.name}</p>
                    <p className="text-gray-500">
                      {format(post.date, 'MMM d, yyyy')} • {post.readTime} min read
                    </p>
                  </div>
                </div>

                <h2 className="text-xl font-bold mb-3 hover:text-emerald-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="mb-6 text-gray-600 text-sm border-l-4 border-emerald-500 pl-4 py-2 bg-gray-50">
                  {post.snippet}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleShare(post)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      aria-label="Share article"
                    >
                      <Share2 className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedPost(post);
                        setShowComments(true);
                      }}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      aria-label="View comments"
                    >
                      <MessageCircle className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleBookmark(post)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      aria-label="Bookmark article"
                    >
                      <BookmarkPlus className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedPost(post);
                      setShowArticle(true);
                    }}
                    className="text-emerald-500 hover:text-emerald-600 font-medium text-sm flex items-center"
                  >
                    Read More <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      {filteredPosts.map((post) => (
        <div key={`newsletter-${post.id}`} className="col-span-full">
          <div className="bg-emerald-50 rounded-2xl p-8 mt-8">
            <NewsletterForm />
          </div>
        </div>
      ))}

      {/* Modals */}
      <AnimatePresence>
        {showShareModal && selectedPost && (
          <ShareModal
            post={selectedPost}
            onClose={() => setShowShareModal(false)}
          />
        )}
        {showComments && selectedPost && (
          <Comments
            post={selectedPost}
            onClose={() => setShowComments(false)}
          />
        )}
        {showArticle && selectedPost && (
          <ArticleModal
            post={selectedPost}
            onClose={() => setShowArticle(false)}
            onShare={() => {
              setShowShareModal(true);
              setShowArticle(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
} 