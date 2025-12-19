"use client";

import React, { useState } from 'react';
import PolicyGenerator from '../PolicyGenerator'; 
import { 
  ArrowLeft, ShieldCheck, BookOpen, Settings, 
  Zap, ArrowRight, Calendar as CalendarIcon, Clock, X 
} from 'lucide-react';
import Link from 'next/link';

export default function PolicyPage() {
  // --- SCHEDULER STATE ---
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [meetingStep, setMeetingStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // --- SEO SCHEMAS ---
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ReadyFlow Razorpay Approved Policy Generator",
    "operatingSystem": "All",
    "applicationCategory": "BusinessApplication",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "342" },
    "description": "Create Indian payment gateway compliant Privacy Policy and Refund Terms in 2 minutes."
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Are these policies valid for Razorpay approval?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, these templates include mandatory clauses like Grievance Officer details and physical address requirements that Indian payment gateways demand for KYC."
        }
      }
    ]
  };

  // --- HANDLER: WHATSAPP SCHEDULING ---
  const handleScheduleSubmit = () => {
    if (!selectedDate || !selectedTime) return;
    const dateStr = selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const msg = `Hi ReadyFlow! I used the Policy Generator and I'd like to schedule a meeting to discuss my Shopify store setup.\n\n*Date:* ${dateStr}\n*Time Slot:* ${selectedTime}\n*Topic:* Full Store Setup & RTO Strategy`;
    
    window.open(`https://wa.me/918602555840?text=${encodeURIComponent(msg)}`, '_blank');
    setIsSchedulerOpen(false);
  };

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-40 overflow-x-hidden font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-white mb-8 transition-colors text-sm font-bold uppercase tracking-widest">
            <ArrowLeft size={14} /> Back to Toolkit
        </Link>

        {/* HERO SECTION */}
        <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 leading-[1.1]">
                Razorpay Approved <br /> Policy Generator
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                India ke top Shopify stores isi tool ka use karte hain KYC approval ke liye. 
                <span className="text-white font-bold"> Simple. Fast. Free.</span>
            </p>
        </div>

        {/* THE ACTUAL TOOL COMPONENT */}
        <div className="relative z-20">
            <PolicyGenerator />
        </div>

        {/* --- SEO CONTENT WING --- */}
        <div className="mt-32 max-w-4xl mx-auto border-t border-white/10 pt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                <div>
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-white">
                        <BookOpen className="text-orange-500" /> How to use?
                    </h2>
                    <ul className="space-y-4">
                        <StepItem step="1" text="Enter your Official Business Name and Email." />
                        <StepItem step="2" text="Add your registered physical address (Mandatory for KYC)." />
                        <StepItem step="3" text="Click 'Generate' and copy the text to your Shopify Settings." />
                    </ul>
                </div>
                <div>
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-white">
                        <Zap className="text-blue-500" /> Why this tool?
                    </h2>
                    <p className="text-gray-400 leading-relaxed text-sm">
                        Standard Shopify templates mein "Indian Grievance Officer" ki details nahi hoti. 
                        Aapka <strong className="text-white">Razorpay ya Paytm</strong> approval tabhi hota hai jab aapke paas localized Indian clauses hon. 
                        ReadyFlow ye sab automate kar deta hai.
                    </p>
                </div>
            </div>

            {/* --- GENERALIZED INTERNAL LINKING BLOCK --- */}
            <div className="bg-gradient-to-br from-orange-600 to-red-600 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                    <Settings size={120} />
                </div>
                <div className="relative z-10">
                    <h3 className="text-3xl font-black text-white mb-4 italic leading-tight">Bhai, itna manual <br/> setup kyun?</h3>
                    <p className="text-white/80 font-bold mb-8 max-w-xl">
                        Policies generate karna toh bas shuruat hai. Hum aapka poora store configure kar sakte hain with RTO protection and premium design.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button 
                            onClick={() => setIsSchedulerOpen(true)}
                            className="px-8 py-4 bg-black text-white font-black rounded-2xl flex items-center gap-2 hover:scale-105 transition-all shadow-xl"
                        >
                            Book a Strategy Call <ArrowRight size={18} />
                        </button>
                        <Link href="/portfolio" className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 font-black rounded-2xl hover:bg-white/20 transition-all">
                            View Our Work
                        </Link>
                    </div>
                </div>
            </div>

            {/* FAQ SECTION */}
            <div className="mt-32">
                <h2 className="text-3xl font-bold mb-10 text-center text-white">Common Doubts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FaqBox q="Is it really free?" a="Yes, zero hidden charges. We built this to help the Indian D2C community grow." />
                    <FaqBox q="Will it work for WooCommerce?" a="Absolutely. The text is platform-independent. Just copy and paste." />
                </div>
            </div>
        </div>
      </div>

      {/* --- SCHEDULER MODAL --- */}
      {isSchedulerOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-[#111] border border-white/10 rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl relative">
            <button onClick={() => setIsSchedulerOpen(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">
              <X size={24} />
            </button>
            <div className="p-8">
                {meetingStep === 1 ? (
                  <div className="animate-in slide-in-from-right duration-300">
                    <CalendarIcon className="text-orange-500 mb-4" size={40} />
                    <h3 className="text-2xl font-bold mb-6 text-white">Choose a Date</h3>
                    <div className="bg-white/5 rounded-2xl p-4 mb-8">
                        <SimpleCalendar selected={selectedDate} onSelect={(d) => {setSelectedDate(d); setMeetingStep(2);}} />
                    </div>
                  </div>
                ) : (
                  <div className="animate-in slide-in-from-right duration-300 text-center">
                    <Clock className="text-blue-500 mb-4 mx-auto" size={40} />
                    <h3 className="text-2xl font-bold mb-6 text-white">Select a Time Slot</h3>
                    <div className="grid grid-cols-1 gap-2 mb-8">
                        {["10 AM - 12 PM", "12 PM - 02 PM", "02 PM - 04 PM", "04 PM - 06 PM", "06 PM - 08 PM"].map(slot => (
                            <button 
                                key={slot}
                                onClick={() => setSelectedTime(slot)}
                                className={`p-4 rounded-xl text-sm font-bold border transition-all ${selectedTime === slot ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 text-gray-400'}`}
                            >
                                {slot}
                            </button>
                        ))}
                    </div>
                    <button 
                        disabled={!selectedTime}
                        onClick={handleScheduleSubmit} 
                        className="w-full py-4 bg-orange-600 text-white font-bold rounded-2xl shadow-xl hover:bg-orange-500 transition-all disabled:opacity-50"
                    >
                        CONFIRM ON WHATSAPP
                    </button>
                    <button onClick={() => setMeetingStep(1)} className="mt-4 text-xs text-gray-500 underline block mx-auto">Change Date</button>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// --- HELPER COMPONENTS ---

function StepItem({ step, text }: { step: string, text: string }) {
    return (
        <li className="flex items-start gap-4">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 text-orange-500 flex items-center justify-center text-xs font-bold border border-white/10">{step}</span>
            <span className="text-gray-400 text-sm leading-relaxed">{text}</span>
        </li>
    );
}

function FaqBox({ q, a }: { q: string, a: string }) {
    return (
        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-white/20 transition-colors">
            <h4 className="font-bold text-white mb-2 text-sm">{q}</h4>
            <p className="text-gray-500 text-xs leading-relaxed">{a}</p>
        </div>
    );
}

function SimpleCalendar({ selected, onSelect }: { selected: Date | null, onSelect: (d: Date) => void }) {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        days.push(d);
    }
    return (
        <div className="grid grid-cols-4 gap-2">
            {days.map((d, i) => {
                const isSelected = selected && d.toDateString() === selected.toDateString();
                return (
                    <button key={i} onClick={() => onSelect(d)} className={`flex flex-col items-center p-3 rounded-xl border transition-all ${isSelected ? 'bg-orange-500 border-orange-500 text-white' : 'bg-black/40 border-white/10 text-gray-500 hover:text-white'}`}>
                        <span className="text-[8px] uppercase font-bold">{d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                        <span className="text-sm font-black">{d.getDate()}</span>
                    </button>
                )
            })}
        </div>
    );
}