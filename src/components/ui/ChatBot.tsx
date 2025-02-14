import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { notifications } from '@/lib/notifications';
import { ThinkingMessage } from './ThinkingMessage';

interface Message {
  role: 'assistant' | 'user';
  content: string;
  timestamp: Date;
}

const CHATBOT_CONTEXT = `
You are a helpful AI assistant for ${import.meta.env.VITE_COMPANY_NAME}.
Company Information: ${import.meta.env.VITE_COMPANY_DESCRIPTION}

Key Services:
1. Rapid MVP Development (2-week delivery)
2. Professional Launch Package (4-week delivery)
3. Enterprise Solutions (custom timeline)

Pricing:
- MVP Package: $5,000 - $10,000
- Professional: $10,000 - $25,000
- Enterprise: $25,000+

Please assist customers with their inquiries about our services, pricing, and development process.
Be friendly, professional, and helpful.
`;

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! How can I help you with your app development needs today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [
      ...prev,
      { role: 'user', content: userMessage, timestamp: new Date() },
    ]);

    setIsLoading(true);
    notifications.loading('AI is thinking...');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: CHATBOT_CONTEXT },
            ...messages.map(({ role, content }) => ({ role, content })),
            { role: 'user', content: userMessage },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.content,
          timestamp: new Date(),
        },
      ]);
      notifications.success('Response received');
    } catch (error) {
      console.error('Chat error:', error);
      notifications.error('Failed to get response. Please try again.');
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'I apologize, but I encountered an error. Please try again or contact support if the issue persists.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = () => {
    setIsThinking(true);
    // Your existing message handling logic
    setTimeout(() => {
      setIsThinking(false);
      // Process message response
    }, 3000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-96 h-[600px] bg-white rounded-lg shadow-xl overflow-hidden"
          >
            <div className="bg-emerald-500 p-4 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot className="w-6 h-6" />
                <span className="font-semibold">AppSnap Assistant</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-emerald-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="h-[calc(100%-8rem)] overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === 'assistant' ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === 'assistant'
                        ? 'bg-gray-100'
                        : 'bg-emerald-500 text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      {message.role === 'assistant' ? (
                        <Bot className="w-4 h-4" />
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                      <span className="text-xs opacity-75">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={handleSubmit}
              className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t"
            >
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border rounded-full focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-emerald-500 text-white p-2 rounded-full hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-emerald-500 text-white p-4 rounded-full shadow-lg hover:bg-emerald-600"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      {/* Only show thinking message when ChatBot is processing */}
      {isThinking && (
        <div className="absolute bottom-full right-0 mb-4">
          <ThinkingMessage />
        </div>
      )}
    </div>
  );
} 