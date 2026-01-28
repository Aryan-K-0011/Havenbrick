import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, User, Bot } from 'lucide-react';
import { chatWithAgent } from '../services/geminiService';
import { ChatMessage } from '../types';

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Welcome to Havenbrick. I am your private real estate concierge. How may I assist you with our portfolio today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const responseText = await chatWithAgent(userMsg.text, messages);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "I apologize, I am unable to connect to the secure server at this moment.", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl shadow-brand-accent/30 transition-all duration-300 hover:scale-105 ${
          isOpen ? 'bg-brand-primary rotate-90 text-white' : 'bg-brand-accent text-white'
        }`}
        aria-label="Toggle AI Assistant"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 w-[90vw] md:w-[400px] h-[550px] bg-brand-surface rounded-xl border border-brand-border shadow-2xl z-40 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-brand-soft p-5 border-b border-brand-border flex items-center gap-4">
          <div className="p-2.5 bg-white rounded-full border border-brand-border shadow-sm">
            <Sparkles className="text-brand-accent" size={18} />
          </div>
          <div>
            <h3 className="text-brand-primary font-serif text-lg tracking-wide">Concierge</h3>
            <p className="text-brand-accent text-[10px] uppercase tracking-widest font-bold">AI Powered</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-brand-bg/50">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-brand-border shadow-sm ${
                  msg.role === 'user' ? 'bg-brand-primary text-white' : 'bg-white text-brand-accent'
                }`}
              >
                {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div
                className={`max-w-[80%] p-4 text-sm font-light leading-relaxed shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-brand-primary text-white rounded-tr-none rounded-xl rounded-bl-xl'
                    : 'bg-white border border-brand-border text-brand-primary rounded-tl-none rounded-xl rounded-br-xl'
                } ${msg.isError ? 'border-red-200 bg-red-50 text-red-800' : ''}`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-white border border-brand-border flex items-center justify-center shrink-0">
                <Bot size={14} className="text-brand-accent" />
              </div>
              <div className="bg-white border border-brand-border px-4 py-3 rounded-xl rounded-tl-none shadow-sm">
                <div className="flex gap-1.5">
                  <span className="w-1.5 h-1.5 bg-brand-accent/50 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-brand-accent/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                  <span className="w-1.5 h-1.5 bg-brand-accent/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-brand-border">
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Inquire about a residence..."
              disabled={isLoading}
              className="w-full pl-4 pr-12 py-3.5 bg-brand-soft border border-brand-border text-brand-primary placeholder:text-brand-secondary/50 focus:outline-none focus:border-brand-accent focus:bg-white transition-all text-sm font-light tracking-wide rounded-lg"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-brand-secondary hover:text-brand-accent disabled:opacity-30 transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
