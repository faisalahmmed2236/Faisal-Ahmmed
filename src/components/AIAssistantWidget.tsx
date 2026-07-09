import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { triggerVibration, hapticPatterns } from '../lib/haptics';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('faisal_chat_history');
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        role: 'assistant',
        content: "Hi! I'm Faisal's Agent. Ask me anything about his experience, projects, or tech stack!",
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('faisal_chat_history', JSON.stringify(messages));
  }, [messages]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { portfolioData } = useLanguage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          portfolioData
        })
      });

      if (!response.ok) throw new Error('Failed to fetch response');
      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || "Sorry, I couldn't understand that."
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Oops! I encountered an error connecting to my brain. Please try again later."
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.button 
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => { setIsOpen(true); triggerVibration(hapticPatterns.medium); }}
        className="fixed bottom-4 right-[64px] z-40 p-3 rounded-full bg-black/60 border border-white/10 text-slate-300 hover:text-white hover:border-theme-p-500/50 transition-colors backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)] group cursor-pointer"
        aria-label="AI Assistant"
      >
        <MessageSquare size={20} className="transition-transform duration-500 group-hover:scale-110 text-theme-p-400" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-20 md:bottom-24 right-4 left-4 md:left-auto md:right-6 w-auto md:w-96 z-50 bg-[#030305]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{ maxHeight: '550px', height: '70vh' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-theme-p-500/20 flex items-center justify-center text-theme-p-400">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Faisal's Agent</h3>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${isLoading ? 'bg-amber-500 animate-pulse' : 'bg-green-500 animate-pulse'}`}></span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">{isLoading ? 'Thinking' : 'Online'}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setMessages([{ id: '1', role: 'assistant', content: "Hi! I'm Faisal's Agent. Ask me anything about his experience, projects, or tech stack!" }])}
                  className="p-1 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                  title="Clear Chat"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                </button>
                <button 
                  onClick={() => { setIsOpen(false); triggerVibration(hapticPatterns.light); }}
                  className="p-1 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-1">
                      <Bot size={12} className="text-slate-300" />
                    </div>
                  )}
                  
                  <div className={`px-4 py-2.5 rounded-2xl max-w-[80%] text-sm ${
                    msg.role === 'user' 
                      ? 'bg-theme-p-600 text-white rounded-tr-sm' 
                      : 'bg-white/10 text-slate-200 rounded-tl-sm'
                  }`}>
                    {msg.content}
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-6 h-6 rounded-full bg-theme-p-500/20 flex items-center justify-center shrink-0 mt-1">
                      <User size={12} className="text-theme-p-300" />
                    </div>
                  )}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-white/10 bg-white/5">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-center gap-2 bg-black/50 border border-white/10 rounded-xl p-1 pr-2"
              >
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isLoading}
                  placeholder="Ask about my experience..."
                  className="flex-1 bg-transparent border-none outline-none text-sm px-3 py-2 text-white placeholder-slate-500 disabled:opacity-50"
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="w-8 h-8 rounded-lg bg-theme-p-600 flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                >
                  <Send size={14} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
