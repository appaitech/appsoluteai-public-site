import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Send, ThumbsUp } from 'lucide-react';
import { format } from 'date-fns';
import { BlogPost } from '@/data/blog-posts';
import { toast } from 'sonner';

interface CommentsProps {
  post: BlogPost;
  onClose: () => void;
}

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  date: Date;
  likes: number;
  liked: boolean;
}

export function Comments({ post, onClose }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: {
        name: 'John Doe',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
      },
      content: 'Great article! Very insightful.',
      date: new Date('2024-03-15'),
      likes: 5,
      liked: false
    }
  ]);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: {
        name: 'You',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
      },
      content: newComment,
      date: new Date(),
      likes: 0,
      liked: false
    };

    setComments([comment, ...comments]);
    setNewComment('');
    toast.success('Comment posted successfully!');
  };

  const toggleLike = (commentId: string) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
          liked: !comment.liked
        };
      }
      return comment;
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] flex flex-col"
      >
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Comments</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="flex space-x-4">
              <img
                src={comment.author.avatar}
                alt={comment.author.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{comment.author.name}</p>
                    <p className="text-sm text-gray-500">
                      {format(comment.date, 'MMM d, yyyy')}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleLike(comment.id)}
                    className={`flex items-center space-x-1 text-sm ${
                      comment.liked ? 'text-emerald-500' : 'text-gray-500'
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{comment.likes}</span>
                  </button>
                </div>
                <p className="mt-2 text-gray-600">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 border-t">
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 
                       transition-colors flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Post</span>
            </button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
} 