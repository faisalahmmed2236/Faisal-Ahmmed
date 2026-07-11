import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, Sparkles, RefreshCw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { triggerVibration, hapticPatterns } from '../lib/haptics';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTIONS = [
  { 
    label: "💼 Hire Faisal", 
    prompt: "I am looking to hire Faisal Ahmmed. Can you tell me about his experience, availability, and how to get in touch?" 
  },
  { 
    label: "🧠 Explainable AI", 
    prompt: "Tell me about Faisal's expertise in Explainable AI (XAI) and Deep Learning." 
  },
  { 
    label: "⚡ Free Tech Consultation", 
    prompt: "I have an app/system idea and want a free technical consultation. How can we schedule it?" 
  },
  { 
    label: "📞 Direct Contact Info", 
    prompt: "Can you provide Faisal's direct email, phone, and WhatsApp numbers?" 
  }
];

// High-performance lightweight Markdown parser to avoid package bloat and render rich text perfectly
function parseMarkdown(text: string) {
  const lines = text.split('\n');
  return lines.map((line, index) => {
    if (!line.trim()) {
      return <div key={index} className="h-2" />;
    }

    // Headers
    if (line.startsWith('### ')) {
      return <h4 key={index} className="text-sm font-bold text-white mt-2 mb-1">{parseInlineStyles(line.slice(4))}</h4>;
    }
    if (line.startsWith('## ')) {
      return <h3 key={index} className="text-base font-bold text-white mt-3 mb-1.5">{parseInlineStyles(line.slice(3))}</h3>;
    }
    if (line.startsWith('# ')) {
      return <h2 key={index} className="text-lg font-bold text-white mt-3 mb-1.5">{parseInlineStyles(line.slice(2))}</h2>;
    }

    // Bullet points
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      return (
        <ul key={index} className="list-disc pl-5 my-1 text-slate-200">
          <li className="leading-relaxed">{parseInlineStyles(line.trim().slice(2))}</li>
        </ul>
      );
    }

    // Numbered points
    const numMatch = line.trim().match(/^(\d+)\.\s(.*)/);
    if (numMatch) {
      return (
        <ol key={index} className="list-decimal pl-5 my-1 text-slate-200">
          <li value={parseInt(numMatch[1], 10)} className="leading-relaxed">{parseInlineStyles(numMatch[2])}</li>
        </ol>
      );
    }

    // Regular paragraphs
    return <p key={index} className="leading-relaxed mb-2 text-slate-200">{parseInlineStyles(line)}</p>;
  });
}

function parseInlineStyles(text: string) {
  const parts = [];
  let currentIndex = 0;
  const regex = /\*\*(.*?)\*\*/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const matchIndex = match.index;
    if (matchIndex > currentIndex) {
      parts.push(text.slice(currentIndex, matchIndex));
    }
    parts.push(<strong key={matchIndex} className="font-bold text-theme-p-300 glow-sm">{match[1]}</strong>);
    currentIndex = regex.lastIndex;
  }

  if (currentIndex < text.length) {
    parts.push(text.slice(currentIndex));
  }

  return parts.length > 0 ? parts : text;
}

export function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('faisal_chat_history');
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        role: 'assistant',
        content: "Hi there! I'm **Faisal's Elite AI Agent**. Ask me about my experience, system architectures, full-stack dev services, or deep learning projects. I am ready to schedule consultations and outline software blueprints for you!",
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('faisal_chat_history', JSON.stringify(messages));
  }, [messages]);

  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { portfolioData } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  const sendMessageToAPI = async (userMsg: Message, currentHistory: Message[]) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...currentHistory, userMsg],
          portfolioData
        })
      });

      if (!response.ok) throw new Error('Failed to fetch response');
      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || "I apologize, but I encountered an issue processing that. Please ask again."
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Oops! I encountered an error connecting to my brain. Please check your internet connection and try again."
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    triggerVibration(hapticPatterns.light);
    
    await sendMessageToAPI(userMessage, messages);
  };

  const handleSuggestionClick = async (prompt: string) => {
    if (isLoading) return;
    triggerVibration(hapticPatterns.medium);

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: prompt
    };

    setMessages(prev => [...prev, userMessage]);
    
    await sendMessageToAPI(userMessage, messages);
  };

  return (
    <>
      <motion.button 
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => { setIsOpen(true); triggerVibration(hapticPatterns.medium); }}
        className="fixed bottom-4 right-[64px] z-40 p-3.5 rounded-full bg-black/70 border border-white/10 text-slate-300 hover:text-white hover:border-theme-p-500/50 transition-colors backdrop-blur-md shadow-[0_0_30px_rgba(236,72,153,0.15)] group cursor-pointer"
        aria-label="AI Assistant"
      >
        <div className="relative">
          <MessageSquare size={20} className="transition-transform duration-500 group-hover:scale-110 text-theme-p-400" />
          <span className="absolute -top-1 -right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-theme-p-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-theme-p-500"></span>
          </span>
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 350, damping: 26 }}
            className="fixed bottom-20 md:bottom-24 right-4 left-4 md:left-auto md:right-6 w-auto md:w-[410px] z-50 bg-[#040407]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{ maxHeight: '600px', height: '75vh' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-theme-p-950/20 to-black/10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-theme-p-500/20 border border-theme-p-500/30 flex items-center justify-center text-theme-p-400 shadow-[0_0_15px_rgba(236,72,153,0.2)]">
                    <Bot size={19} />
                  </div>
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-[#040407]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm tracking-wide text-white">Faisal's Agent</h3>
                    <span className="px-1.5 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">Premium</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Sparkles size={10} className="text-theme-p-400 animate-pulse" />
                    <span className="text-[10px] text-slate-400 font-medium tracking-wide">Pro Advanced Level Brain</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => {
                    triggerVibration(hapticPatterns.light);
                    setMessages([{ id: '1', role: 'assistant', content: "Hi there! I'm **Faisal's Agent**. Ask me about my experience, system architectures, full-stack dev services, or deep learning projects. I am ready to schedule consultations and outline software blueprints for you!" }]);
                  }}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  title="Reset Conversation"
                >
                  <RefreshCw size={15} />
                </button>
                <button 
                  onClick={() => { setIsOpen(false); triggerVibration(hapticPatterns.light); }}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              {messages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-1 shadow-sm">
                      <Bot size={12} className="text-theme-p-400" />
                    </div>
                  )}
                  
                  <div className={`px-4 py-3 rounded-2xl max-w-[85%] text-xs md:text-sm shadow-md font-sans ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-br from-theme-p-600 to-theme-p-700 text-white rounded-tr-sm border border-theme-p-500/20' 
                      : 'bg-white/5 text-slate-200 rounded-tl-sm border border-white/5'
                  }`}>
                    {msg.role === 'assistant' ? parseMarkdown(msg.content) : msg.content}
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-6 h-6 rounded-full bg-theme-p-500/20 border border-theme-p-500/30 flex items-center justify-center shrink-0 mt-1 shadow-sm">
                      <User size={12} className="text-theme-p-300" />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Suggestions chips at the start or end of chat */}
              {messages.length <= 1 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="pt-2 space-y-2"
                >
                  <p className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-widest px-1">Suggested Quick Actions:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {SUGGESTIONS.map((sug, i) => (
                      <button
                        key={i}
                        onClick={() => handleSuggestionClick(sug.prompt)}
                        className="text-left px-3 py-2 text-xs rounded-xl bg-white/5 border border-white/10 hover:border-theme-p-500/30 text-slate-300 hover:text-white transition-all hover:bg-theme-p-500/10 hover:shadow-[0_0_10px_rgba(236,72,153,0.1)] cursor-pointer font-medium"
                      >
                        {sug.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Thinking Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 justify-start"
                >
                  <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-1">
                    <Bot size={12} className="text-theme-p-400 animate-pulse" />
                  </div>
                  
                  <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/5 rounded-tl-sm flex flex-col gap-1.5 max-w-[85%]">
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-theme-p-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-1.5 h-1.5 bg-theme-p-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-1.5 h-1.5 bg-theme-p-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono tracking-wide uppercase">Faisal's Agent is formulating blueprint...</span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-white/10 bg-white/5">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-xl p-1 pr-2 focus-within:border-theme-p-500/40 focus-within:shadow-[0_0_15px_rgba(236,72,153,0.05)] transition-all"
              >
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isLoading}
                  placeholder="Ask for high-performance software blueprints..."
                  className="flex-1 bg-transparent border-none outline-none text-xs md:text-sm px-3 py-2 text-white placeholder-slate-500 disabled:opacity-50"
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="w-8 h-8 rounded-lg bg-theme-p-600 hover:bg-theme-p-500 flex items-center justify-center text-white disabled:opacity-30 disabled:hover:bg-theme-p-600 disabled:cursor-not-allowed transition-all"
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
