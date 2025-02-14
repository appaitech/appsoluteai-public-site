import { motion, AnimatePresence } from 'framer-motion';
import { Share2, X, Twitter, Facebook, Linkedin, Link } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface FloatingShareButtonProps {
  url: string;
  title: string;
}

export function FloatingShareButton({ url, title }: FloatingShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-16 right-0 space-y-3"
          >
            <button 
              onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank')}
              className="flex items-center bg-white text-[#1DA1F2] px-4 py-2 rounded-full shadow-lg hover:bg-blue-50"
            >
              <Twitter className="w-4 h-4 mr-2" />
              Twitter
            </button>
            <button 
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')}
              className="flex items-center bg-white text-[#4267B2] px-4 py-2 rounded-full shadow-lg hover:bg-blue-50"
            >
              <Facebook className="w-4 h-4 mr-2" />
              Facebook
            </button>
            <button 
              onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')}
              className="flex items-center bg-white text-[#0077B5] px-4 py-2 rounded-full shadow-lg hover:bg-blue-50"
            >
              <Linkedin className="w-4 h-4 mr-2" />
              LinkedIn
            </button>
            <button 
              onClick={handleCopyLink}
              className="flex items-center bg-white text-gray-600 px-4 py-2 rounded-full shadow-lg hover:bg-gray-50"
            >
              <Link className="w-4 h-4 mr-2" />
              Copy Link
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-emerald-500 text-white p-4 rounded-full shadow-lg hover:bg-emerald-600"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Share2 className="w-6 h-6" />}
      </motion.button>
    </div>
  );
} 