
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Minimize2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { getClarityResponse } from '../services/geminiService';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I'm Clarity AI. I've analyzed your recurring payments. You have 2 low-usage subscriptions costing you $59.98/mo. Would you like to review them?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');
    setIsTyping(true);

    const responseText = await getClarityResponse(newHistory);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 md:bottom-8 right-4 md:right-8 w-14 h-14 md:w-16 md:h-16 bg-blue-600 rounded-2xl shadow-2xl shadow-blue-300 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all z-40 group"
      >
        <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 md:inset-auto md:bottom-8 md:right-8 md:w-[380px] md:h-[550px] bg-white md:rounded-3xl shadow-2xl border border-slate-100 flex flex-col z-[60] md:z-50 animate-in slide-in-from-bottom-8 duration-300">
      <div className="p-5 border-b border-slate-50 flex items-center justify-between bg-blue-600 md:rounded-t-3xl text-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <Sparkles size={18} />
          </div>
          <div>
            <h3 className="text-sm font-bold">Clarity AI</h3>
            <p className="text-[10px] text-blue-100 font-medium">Financial Intelligence Active</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1.5 rounded-lg">
            <Minimize2 size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar" ref={scrollRef}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-slate-100 text-slate-800 rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-none flex gap-1">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-50 pb-8 md:pb-4">
        <div className="relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about your subscriptions..."
            className="w-full bg-slate-50 border-none rounded-2xl pl-4 pr-12 py-3 text-sm focus:ring-2 focus:ring-blue-100 transition-all outline-none"
          />
          <button 
            onClick={handleSend}
            className="absolute right-2 top-1.5 w-9 h-9 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
        <p className="text-[10px] text-center text-slate-400 mt-3 font-medium">
          Powered by Gemini 3 Predictive Engine
        </p>
      </div>
    </div>
  );
};

export default AIChat;
