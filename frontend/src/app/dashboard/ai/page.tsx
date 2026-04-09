"use client";

import { useState, useRef, useEffect } from "react";
import { api } from "@/lib/api";
import { 
  Send, 
  Bot, 
  User, 
  Sparkles,
  Loader2
} from "lucide-react";

export default function AIChatPage() {
  const [messages, setMessages] = useState<any[]>([
    { role: "assistant", content: "I am ApexAI. How can I assist you in your fitness evolution today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
        const history = messages.map(m => ({ role: m.role, content: m.content }));
        const data = await api.ai.chat(input, history);
        setMessages(prev => [...prev, { role: "assistant", content: data.response }]);
    } catch (err) {
        setMessages(prev => [...prev, { role: "assistant", content: "I encountered a communication error. Please try again." }]);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] max-w-4xl mx-auto">
      <header className="mb-6">
        <h1 className="text-4xl font-black brand-tracking mb-1 uppercase tracking-tight">
          Neural Interface
        </h1>
        <p className="text-white/20 font-bold uppercase text-[10px] tracking-widest">Authorized guidance system // Active</p>
      </header>

      {/* Chat Container */}
      <div className="flex-1 surface-card p-0 flex flex-col overflow-hidden border border-white/5">
        <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
        >
          {messages.map((msg, idx) => (
            <div 
                key={idx} 
                className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                msg.role === 'user' ? 'bg-primary/20 text-primary' : 'bg-white/10 text-white/40'
              }`}>
                {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>
              <div className={`max-w-[80%] px-5 py-3 rounded-2xl whitespace-pre-wrap leading-relaxed ${
                msg.role === 'user' ? 'bg-primary text-background font-bold' : 'bg-white/5 text-white/80 border border-white/5'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Bot size={20} className="text-white/40" />
              </div>
              <div className="bg-white/5 px-5 py-4 rounded-2xl border border-white/5">
                <Loader2 className="animate-spin text-primary" size={20} />
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-white/5 bg-white/5 backdrop-blur-md">
          <form onSubmit={handleSend} className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask ApexAI..."
              className="w-full bg-background border border-white/10 rounded-2xl pl-6 pr-16 py-4 outline-none focus:border-primary/50 transition-all font-medium"
            />
            <button 
                type="submit"
                disabled={loading || !input.trim()}
                className="absolute right-2 top-2 bottom-2 aspect-square bg-primary text-background rounded-xl flex items-center justify-center hover:scale-[1.05] active:scale-[0.95] transition-all disabled:opacity-50"
            >
                <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
