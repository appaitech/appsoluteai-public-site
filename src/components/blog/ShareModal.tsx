import { motion } from 'framer-motion';
import { X, Twitter, Facebook, LinkedIn, Link } from 'lucide-react';
import { BlogPost } from '@/data/blog-posts';
import { toast } from 'sonner';

interface ShareModalProps {
  post: BlogPost;
  onClose: () => void;
}

export function ShareModal({ post, onClose }: ShareModalProps) {
  const shareUrl = `https://appsoluteai.dev/blog/${post.id}`;

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Link copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-white rounded-xl max-w-md w-full p-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Share Article</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleShare('twitter')}
            className="btn-base flex items-center space-x-3 w-full"
          >
            <Twitter className="w-6 h-6" />
            <span>Share on Twitter</span>
          </button>

          <button
            onClick={() => handleShare('facebook')}
            className="btn-base flex items-center space-x-3 w-full"
          >
            <Facebook className="w-6 h-6" />
            <span>Share on Facebook</span>
          </button>

          <button
            onClick={() => handleShare('linkedin')}
            className="btn-base flex items-center space-x-3 w-full"
          >
            <LinkedIn className="w-6 h-6" />
            <span>Share on LinkedIn</span>
          </button>

          <button
            onClick={copyLink}
            className="btn-base flex items-center space-x-3 w-full"
          >
            <Link className="w-6 h-6" />
            <span>Copy Link</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
} 