import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Heart, Reply, MoreHorizontal, Send } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  likes: number;
  timestamp: Date;
  replies?: Comment[];
}

interface CommentSectionProps {
  comments: Comment[];
}

export function CommentSection({ comments: initialComments }: CommentSectionProps) {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: {
        name: 'Current User',
        avatar: 'https://ui-avatars.com/api/?name=Current+User',
      },
      content: newComment,
      likes: 0,
      timestamp: new Date(),
      replies: [],
    };

    setComments(prev => [comment, ...prev]);
    setNewComment('');
    toast.success('Comment added successfully!');
  };

  const handleAddReply = (commentId: string) => {
    if (!replyContent.trim()) return;

    const reply: Comment = {
      id: Date.now().toString(),
      author: {
        name: 'Current User',
        avatar: 'https://ui-avatars.com/api/?name=Current+User',
      },
      content: replyContent,
      likes: 0,
      timestamp: new Date(),
    };

    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply],
        };
      }
      return comment;
    }));

    setReplyingTo(null);
    setReplyContent('');
    toast.success('Reply added successfully!');
  };

  const handleLike = (commentId: string) => {
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, likes: comment.likes + 1 };
      }
      return comment;
    }));
  };

  return (
    <div className="space-y-8">
      {/* Add new comment */}
      <div className="flex items-start space-x-4">
        <img
          src="https://ui-avatars.com/api/?name=Current+User"
          alt="Current User"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 
                     focus:border-emerald-500 resize-none h-24"
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={handleAddComment}
              className="bg-emerald-500 text-white px-4 py-2 rounded-full hover:bg-emerald-600 
                       transition-colors flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Post Comment</span>
            </button>
          </div>
        </div>
      </div>

      {/* Comments list */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-start space-x-4">
              <img
                src={comment.author.avatar}
                alt={comment.author.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{comment.author.name}</h4>
                    <p className="text-sm text-gray-500">
                      {format(comment.timestamp, 'MMM d, yyyy • h:mm a')}
                    </p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
                <p className="mt-2 text-gray-700">{comment.content}</p>
                <div className="flex items-center space-x-4 mt-4">
                  <button
                    onClick={() => handleLike(comment.id)}
                    className="flex items-center space-x-1 text-gray-500 hover:text-emerald-500"
                  >
                    <Heart className="w-4 h-4" />
                    <span>{comment.likes}</span>
                  </button>
                  <button
                    onClick={() => setReplyingTo(comment.id)}
                    className="flex items-center space-x-1 text-gray-500 hover:text-emerald-500"
                  >
                    <Reply className="w-4 h-4" />
                    <span>Reply</span>
                  </button>
                </div>

                {/* Reply input */}
                {replyingTo === comment.id && (
                  <div className="mt-4 flex items-start space-x-4">
                    <img
                      src="https://ui-avatars.com/api/?name=Current+User"
                      alt="Current User"
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1">
                      <textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Write a reply..."
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 
                                 focus:ring-emerald-500 focus:border-emerald-500 
                                 resize-none h-20"
                      />
                      <div className="flex justify-end space-x-2 mt-2">
                        <button
                          onClick={() => setReplyingTo(null)}
                          className="px-4 py-2 text-gray-500 hover:text-gray-700"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleAddReply(comment.id)}
                          className="bg-emerald-500 text-white px-4 py-2 rounded-full 
                                   hover:bg-emerald-600 transition-colors"
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-4 space-y-4 pl-8 border-l-2 border-gray-100">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex items-start space-x-4">
                        <img
                          src={reply.author.avatar}
                          alt={reply.author.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold">{reply.author.name}</h4>
                            <span className="text-sm text-gray-500">
                              {format(reply.timestamp, 'MMM d, yyyy • h:mm a')}
                            </span>
                          </div>
                          <p className="mt-1 text-gray-700">{reply.content}</p>
                          <button
                            onClick={() => handleLike(reply.id)}
                            className="flex items-center space-x-1 text-gray-500 
                                     hover:text-emerald-500 mt-2"
                          >
                            <Heart className="w-4 h-4" />
                            <span>{reply.likes}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 