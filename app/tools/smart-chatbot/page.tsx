"use client";

import React, { useState } from 'react';
import SmartChatbot from '../SmartChatbot'; 
import { 
  ArrowLeft, PlayCircle, BookOpen, 
  ArrowRight, CheckCircle2, Settings, Rocket, 
  Calendar as CalendarIcon, Clock, X 
} from 'lucide-react';
import Link from 'next/link';

export default function SmartBotPage() {
  // --- SCHEDULER STATE ---
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [meetingStep, setMeetingStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // --- SEO SCHEMAS ---
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ReadyFlow Free WhatsApp Chatbot for Shopify",
    "operatingSystem": "All",
    "applicationCategory": "BusinessApplication",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "342" },
    "description": "Automate your Shopify store's customer support with our free WhatsApp chatbot script."
  };

  const handleScheduleSubmit = () => {
    if (!selectedDate || !selectedTime) return;
    const dateStr = selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const msg = `Hi ReadyFlow! I'm using your WhatsApp Chatbot and I'd like to discuss custom automation.\n\n*Date:* ${dateStr}\n*Slot:* ${selectedTime}`;
    window.open(`https://wa.me/918602555840?text=${encodeURIComponent(msg)}`, '_blank');
    setIsSchedulerOpen(false);
  };

  return (
    /* Spacing Fixed: pt-24 md:pt-32 adds more gap from header */
    <main className="min-h-screen bg-black text-white pt-24 md:pt-32 pb-24 md:pb-40 overflow-x-hidden font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        
        {/* Back to Toolkit: Added mt-4 to push it down further */}
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-white mt-4 mb-10 md:mb-12 transition-colors text-[10px] md:text-sm font-bold uppercase tracking-widest">
            <ArrowLeft size={14} /> Back to Toolkit
        </Link>

        {/* HERO SECTION: PILL REMOVED, HEADING FIXED */}
        <div className="text-center mb-12 md:mb-20">
            <h1 className="text-4xl md:text-6xl font-black mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 leading-tight tracking-tight px-2">
                WhatsApp Chatbot — Auto-Reply & Lead Capture
            </h1>
            <p className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto leading-relaxed px-2">
                Indian customers expect instant replies. Use this tool to automate FAQs, look professional 24/7, and grow your contact list.
            </p>
        </div>

        {/* THE ACTUAL TOOL */}
        <div className="relative z-20 px-2 md:px-0">
            <SmartChatbot />
        </div>

        {/* --- DETAILED CONTENT SECTION --- */}
        <div className="mt-20 md:mt-32 max-w-5xl mx-auto px-2">
            
            {/* INSTALLATION GUIDE: FIXED ALIGNMENT */}
            <div className="mb-20 md:mb-32 border-t border-white/10 pt-16 md:pt-20">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10 text-white text-left">How to install?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
                    <div className="space-y-8">
                        <div className="flex gap-4">
                            <span className="text-green-500 font-black text-lg leading-none">01.</span>
                            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                Enter your <strong className="text-white font-bold">WhatsApp Number</strong> and customize your welcome message above.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <span className="text-green-500 font-black text-lg leading-none">02.</span>
                            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                Copy the generated script and go to <strong className="text-white font-bold whitespace-nowrap">Online Store &gt; Themes &gt; Edit Code</strong> in Shopify.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <span className="text-green-500 font-black text-lg leading-none">03.</span>
                            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                Open <strong className="text-white font-bold">theme.liquid</strong> and paste the code right before the <code className="bg-white/10 px-1.5 py-0.5 rounded text-green-400 font-mono text-xs md:text-sm">&lt;/body&gt;</code> tag.
                            </p>
                        </div>
                    </div>
                    
                    <div className="space-y-6">
                        <div className="aspect-video rounded-3xl overflow-hidden border border-white/10 bg-[#111] shadow-2xl">
                            <iframe className="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Chatbot Tutorial" allowFullScreen></iframe>
                        </div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold text-center">Watch 2-Min Setup Video</p>
                    </div>
                </div>
            </div>

            {/* --- CTA BLOCK: FIXED BOLDING --- */}
            <div className="bg-gradient-to-br from-green-600 to-emerald-900 p-8 md:p-16 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl relative overflow-hidden group mb-20 md:mb-32">
                <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-700 hidden md:block">
                    <Rocket size={300} />
                </div>
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <div>
                        <h3 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight text-left">
                            Want a "Smart" <br className="hidden md:block" /> AI Chatbot?
                        </h3>
                        <p className="text-green-50/80 text-base md:text-lg mb-8 leading-relaxed font-medium text-left">
                            Agar aapko automated order tracking aur AI-driven sales bot chahiye, toh hamara <strong className="text-white font-bold">Expert Setup</strong> package dekhein. Hum sab automate kar dete hain.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button 
                                onClick={() => setIsSchedulerOpen(true)}
                                className="px-8 py-4 bg-white text-green-900 font-black rounded-2xl flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-xl text-sm"
                            >
                                Book Automation Audit <ArrowRight size={18} />
                            </button>
                            <Link href="/portfolio" className="px-8 py-4 bg-green-500/20 backdrop-blur-md text-white border border-green-400/30 font-black rounded-2xl hover:bg-green-500/40 transition-all text-sm text-center">
                                View Success Stories
                            </Link>
                        </div>
                    </div>
                    <div className="bg-black/20 backdrop-blur-sm p-6 md:p-8 rounded-3xl border border-white/10">
                        <ul className="space-y-4">
                            <CheckItem text="Automated Order Tracking" />
                            <CheckItem text="AI Product Recommendations" />
                            <CheckItem text="Abandoned Cart Recovery" />
                            <CheckItem text="RTO Safety Verification" />
                        </ul>
                    </div>
                </div>
            </div>

            {/* FAQ SECTION */}
            <div className="mt-20 md:mt-32 px-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <FaqBox q="Will it slow down my site?" a="Zero impact. Our script loads asynchronously after your main content, ensuring 90+ Lighthouse speed scores." />
                    <FaqBox q="Can I add multiple questions?" a="Yes, the tool allows you to pre-fill common customer queries to make interaction faster." />
                </div>
            </div>

        </div>
      </div>

      {/* --- SCHEDULER MODAL --- */}
      {isSchedulerOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-[#111] border border-white/10 rounded-[2rem] md:rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl relative">
            <button onClick={() => setIsSchedulerOpen(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">
              <X size={24} />
            </button>
            <div className="p-6 md:p-8">
                {meetingStep === 1 ? (
                  <div className="animate-in slide-in-from-right duration-300">
                    <CalendarIcon className="text-green-500 mb-4" size={32} />
                    <h3 className="text-xl md:text-2xl font-bold mb-6 text-white text-left">Choose a Date</h3>
                    <div className="bg-white/5 rounded-2xl p-4 mb-8">
                        <SimpleCalendar selected={selectedDate} onSelect={(d) => {setSelectedDate(d); setMeetingStep(2);}} />
                    </div>
                  </div>
                ) : (
                  <div className="animate-in slide-in-from-right duration-300 text-center text-white">
                    <Clock className="text-blue-500 mb-4 mx-auto" size={32} />
                    <h3 className="text-xl md:text-2xl font-bold mb-6">Select a Time Slot</h3>
                    <div className="grid grid-cols-1 gap-2 mb-8">
                        {["10 AM - 12 PM", "12 PM - 02 PM", "02 PM - 04 PM", "04 PM - 06 PM", "06 PM - 08 PM"].map(slot => (
                            <button 
                                key={slot}
                                onClick={() => setSelectedTime(slot)}
                                className={`p-4 rounded-xl text-xs md:text-sm font-bold border transition-all ${selectedTime === slot ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 text-gray-400'}`}
                            >
                                {slot}
                            </button>
                        ))}
                    </div>
                    <button 
                        disabled={!selectedTime}
                        onClick={handleScheduleSubmit} 
                        className="w-full py-4 bg-green-600 text-white font-bold rounded-2xl shadow-xl hover:bg-green-500 transition-all disabled:opacity-50 text-sm"
                    >
                        CONFIRM ON WHATSAPP
                    </button>
                    <button onClick={() => setMeetingStep(1)} className="mt-4 text-[10px] text-gray-500 underline block mx-auto font-bold uppercase tracking-widest">Change Date</button>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// --- HELPERS ---

function CheckItem({ text }: { text: string }) {
    return (
        <li className="flex items-center gap-3 text-xs md:text-sm text-green-100/70 text-left">
            <CheckCircle2 size={16} className="text-green-400 shrink-0" /> {text}
        </li>
    );
}

function FaqBox({ q, a }: { q: string, a: string }) {
    return (
        <div className="p-5 md:p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-white/20 transition-colors">
            <h4 className="font-bold text-white mb-2 text-xs md:text-sm text-left">{q}</h4>
            <p className="text-gray-500 text-[11px] md:text-xs leading-relaxed text-left">{a}</p>
        </div>
    );
}

function SimpleCalendar({ selected, onSelect }: { selected: Date | null, onSelect: (d: Date) => void }) {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 8; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        days.push(d);
    }
    return (
        <div className="grid grid-cols-4 gap-2">
            {days.map((d, i) => {
                const isSelected = selected && d.toDateString() === selected.toDateString();
                return (
                    <button key={i} onClick={() => onSelect(d)} className={`flex flex-col items-center p-3 rounded-xl border transition-all ${isSelected ? 'bg-green-500 border-green-500 text-white' : 'bg-black/40 border-white/10 text-gray-500 hover:text-white'}`}>
                        <span className="text-[7px] uppercase font-bold mb-1">{d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                        <span className="text-xs font-black">{d.getDate()}</span>
                    </button>
                )
            })}
        </div>
    );
}