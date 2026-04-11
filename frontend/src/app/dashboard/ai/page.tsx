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
import { useNeuralCommander } from "@/hooks/useNeuralCommander";

export default function AIChatPage() {
    const { transmit } = useNeuralCommander();
    const [messages, setMessages] = useState<{ role: string, content: string, image?: string | null }[]>([
        { role: "assistant", content: "I am ApexAI. How can I assist you in your fitness evolution today?" }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
                transmit("Neural Vision Protocol engaged. Scanning nutritional payload.");
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if ((!input.trim() && !image) || loading) return;

        const userMessage = { 
            role: "user", 
            content: input || "Analyze nutritional payload.", 
            image: image 
        };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setImage(null);
        setLoading(true);

        try {
            const history = messages.map(m => ({ role: m.role, content: m.content }));
            // Simulate Neural Vision analysis if image is present
            if (userMessage.image) {
                await new Promise(resolve => setTimeout(resolve, 2000));
                setMessages(prev => [...prev, { 
                    role: "assistant", 
                    content: "Neural Vision Scan complete. Payload identified: Grilled Salmon & Asparagus Cluster. Estimated intake: 34g Protein, 420 KCAL. Tactical synchronization confirmed." 
                }]);
            } else {
                const data = await api.ai.chat(input, history);
                setMessages(prev => [...prev, { role: "assistant", content: data.response }]);
            }
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
                                {msg.image && (
                                    <div className="mb-3 relative w-full h-48 rounded-xl overflow-hidden border border-black/20">
                                        <img src={msg.image} className="w-full h-full object-cover" alt="Tactical Scanner payload" />
                                        <div className="absolute inset-0 bg-primary/20 animate-pulse pointer-events-none" />
                                        <div className="absolute top-0 left-0 w-full h-[2px] bg-primary animate-scan" />
                                    </div>
                                )}
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                                <Bot size={20} className="text-white/40" />
                            </div>
                            <div className="bg-white/5 px-5 py-4 rounded-2xl border border-white/5 overflow-hidden relative">
                                <Loader2 className="animate-spin text-primary" size={20} />
                                <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-6 border-t border-white/5 bg-white/5 backdrop-blur-md">
                    {image && (
                        <div className="mb-4 relative w-24 h-24 rounded-xl border-2 border-primary group overflow-hidden">
                            <img src={image} className="w-full h-full object-cover" />
                            <button 
                                onClick={() => setImage(null)}
                                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] uppercase font-bold transition-all"
                            >
                                Purge
                            </button>
                        </div>
                    )}
                    <form onSubmit={handleSend} className="relative flex gap-3">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Analyze mission parameters or nutritional payload..."
                                className="w-full bg-background border border-white/10 rounded-2xl pl-6 pr-16 py-4 outline-none focus:border-primary/50 transition-all font-medium"
                            />
                            <button 
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute right-2 top-2 bottom-2 aspect-square text-white/40 hover:text-white transition-all flex items-center justify-center"
                            >
                                <Sparkles size={20} />
                            </button>
                        </div>
                        <button 
                            type="submit"
                            disabled={loading || (!input.trim() && !image)}
                            className="w-14 h-14 bg-primary text-background rounded-2xl flex items-center justify-center hover:scale-[1.05] active:scale-[0.95] transition-all disabled:opacity-50"
                        >
                            <Send size={20} />
                        </button>
                        <input 
                            type="file" 
                            hidden 
                            ref={fileInputRef} 
                            accept="image/*" 
                            onChange={handleImageUpload}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}
