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
- All packages are priced on request after a discovery call.
- Provide high-level investment guidance, but never quote numbers.

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
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[350px] sm:w-[400px] 
                       bg-white dark:bg-gray-900 rounded-2xl shadow-2xl 
                       border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-800 
                         bg-gradient-to-r from-emerald-500 to-teal-600">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Chat Support</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          <div className="h-[400px] overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-[80%] rounded-2xl px-4 py-2 
                                ${message.role === 'assistant' 
                                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100' 
                                  : 'bg-emerald-500 text-white'}`}
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

          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                         placeholder-gray-500 dark:placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button 
                type="submit"
                className="p-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 
                         text-white transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 rounded-full bg-emerald-500 hover:bg-emerald-600 
                   text-white shadow-lg hover:shadow-xl transition-all
                   transform hover:scale-105"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* Only show thinking message when ChatBot is processing */}
      {isThinking && (
        <div className="absolute bottom-full right-0 mb-4">
          <ThinkingMessage />
        </div>
      )}
    </div>
  );
} 