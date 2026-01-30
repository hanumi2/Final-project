import React, { useState } from 'react';
import { Stars, Send, Bot, Sparkles, BrainCircuit } from 'lucide-react';

const AIGuide = () => {
    const [query, setQuery] = useState('');
    const [conversation, setConversation] = useState([
        { role: 'assistant', text: 'Hello! I am your Takamul AI Guide. How can I help you plan your dream project today?' }
    ]);
    const [loading, setLoading] = useState(false);

    const handleAsk = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        const lowQuery = query.toLowerCase();
        setConversation(prev => [...prev, { role: 'user', text: query }]);
        setQuery('');
        setLoading(true);

        // Simple local AI simulation for senior project manual build
        setTimeout(() => {
            let response = "That sounds like a great plan! Based on common architectural standards in Ethiopia, for a family of 4, I recommend at least 3 bedrooms and a spacious living area. Would you like to know more about the permit process?";

            if (lowQuery.includes('cost') || lowQuery.includes('budget')) {
                response = "Budget estimation depends on materials. Currently, G+1 residential buildings in urban areas might range from 15,000 to 25,000 ETB per square meter for finishing. I can help you optimize your design to fit your budget!";
            } else if (lowQuery.includes('commercial')) {
                response = "For commercial buildings, factors like parking space and fire safety are critical. Our Structural and Hydraulic engineers will ensure your project meets all local municipality codes.";
            }

            setConversation(prev => [...prev, { role: 'assistant', text: response }]);
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col h-[600px] animate-in slide-in-from-right-12 duration-500">
            <div className="p-8 bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                        <Stars size={28} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black">AI Project Guide</h3>
                        <p className="text-xs font-bold opacity-80 uppercase tracking-widest flex items-center gap-1">
                            <Sparkles size={12} /> Powered by Gemini
                        </p>
                    </div>
                </div>
                <BrainCircuit size={40} className="opacity-20" />
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6">
                {conversation.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
                        <div className={`max-w-[85%] p-5 rounded-3xl font-medium leading-relaxed ${msg.role === 'assistant'
                                ? 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-bl-none border border-slate-100 dark:border-slate-700'
                                : 'bg-primary text-white rounded-br-none shadow-lg shadow-primary/20'
                            }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl flex gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></div>
                        </div>
                    </div>
                )}
            </div>

            <form onSubmit={handleAsk} className="p-6 bg-slate-50 dark:bg-slate-800 border-t border-slate-100 dark:border-slate-800 flex gap-4">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask about family size, budget, or permits..."
                    className="flex-1 p-4 bg-white dark:bg-slate-900 border-0 rounded-2xl font-bold shadow-inner focus:ring-2 focus:ring-primary dark:text-white"
                />
                <button
                    type="submit"
                    className="p-4 bg-primary text-white rounded-2xl hover:scale-[1.05] transition-all shadow-xl"
                >
                    <Send size={24} />
                </button>
            </form>
        </div>
    );
};

export default AIGuide;
