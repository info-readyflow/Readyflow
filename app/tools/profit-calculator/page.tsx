"use client";

import React, { useState } from 'react';
import ProfitCalculator from '../ProfitCalculator';
import { 
  ArrowLeft, TrendingUp, Zap, 
  BarChart3, ArrowRight, Calendar as CalendarIcon, 
  Clock, X, ShieldAlert 
} from 'lucide-react';
import Link from 'next/link';

export default function CalculatorPage() {
  // --- SCHEDULER STATE ---
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [meetingStep, setMeetingStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // --- SEO: SOFTWARE APPLICATION SCHEMA ---
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ReadyFlow India-Specific Profit & RTO Calculator",
    "operatingSystem": "All",
    "applicationCategory": "FinanceApplication",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "188" },
    "description": "Calculate true net profit for Indian E-commerce accounting for RTO losses, shipping, and ad spends."
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a safe RTO percentage in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For most D2C brands, an RTO of 15-20% is manageable. Anything above 25% requires immediate intervention via automated verification tools."
        }
      }
    ]
  };

  // --- HANDLER: WHATSAPP SCHEDULING ---
  const handleScheduleSubmit = () => {
    if (!selectedDate || !selectedTime) return;
    const dateStr = selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const msg = `Hi ReadyFlow! I used your Profit Calculator and realized my margins are tight. I'd like to discuss a strategy to reduce RTO and scale.\n\n*Preferred Date:* ${dateStr}\n*Time Slot:* ${selectedTime}`;
    
    window.open(`https://wa.me/918602555840?text=${encodeURIComponent(msg)}`, '_blank');
    setIsSchedulerOpen(false);
  };

  return (
    <main className="min-h-screen bg-black text-white pt-16 md:pt-24 pb-24 md:pb-40 overflow-x-hidden font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-white mb-6 md:mb-8 transition-colors text-[10px] md:text-sm font-bold uppercase tracking-widest">
            <ArrowLeft size={14} /> Back to Toolkit
        </Link>

        {/* HERO SECTION */}
        <div className="text-center mb-10 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-teal-500 text-[10px] md:text-xs font-bold mb-4 md:mb-6 uppercase tracking-tight">
                <BarChart3 size={14} /> Stop Guessing, Start Scaling
            </div>
            
            <h1 className="text-4xl md:text-7xl font-black mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 leading-tight md:leading-[1.1] tracking-tight">
                Net Profit & <br /> <span className="text-teal-500">ROI Calculator</span>
            </h1>
            
            <p className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto leading-relaxed px-2">
                India mein dhanda sales se nahi, <span className="text-white font-bold">Net Profit</span> se chalta hai. Account for RTO, Ads, aur Shipping in one click.
            </p>
        </div>

        {/* THE CALCULATOR TOOL */}
        <div className="relative z-20 px-2 md:px-0">
            <ProfitCalculator />
        </div>

        {/* --- DETAILED STRATEGY CONTENT --- */}
        <div className="mt-20 md:mt-32 max-w-5xl mx-auto px-2">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-16 md:mb-24">
                <div className="bg-white/[0.02] border border-white/10 p-6 md:p-8 rounded-3xl md:rounded-[2.5rem]">
                    <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-3">
                        <ShieldAlert className="text-red-500" /> The RTO Trap
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        Aksar log sirf Facebook Ads ki ROAS dekhte hain. Lekin agar aapka <strong className="text-white">RTO 30%</strong> hai, toh aapka real profit minus mein ja sakta hai. 
                        Humara calculator aapko batata hai ki har wapas aane wala parcel aapki pocket se kitne paise nikaal raha hai.
                    </p>
                    <div className="p-4 bg-red-500/5 rounded-2xl border border-red-500/10 text-[11px] md:text-xs text-red-200/60">
                        <strong>Pro Tip:</strong> Har RTO parcel pe aapka forward aur reverse dono shipping charge lagta hai.
                    </div>
                </div>
                <div className="bg-white/[0.02] border border-white/10 p-6 md:p-8 rounded-3xl md:rounded-[2.5rem]">
                    <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-3">
                        <TrendingUp className="text-teal-500" /> Scalability Math
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        Scale karne ke liye aapko pata hona chahiye ki aapka <strong className="text-white">Break-even ROAS</strong> kya hai. 
                        Is calculator se aap simulate kar sakte hain ki agar aap marketing budget 2x karte hain, toh bottom line par kya asar padega.
                    </p>
                    <div className="p-4 bg-teal-500/5 rounded-2xl border border-teal-500/10 text-[11px] md:text-xs text-teal-200/60">
                        <strong>Aim for:</strong> India mein 20-25% net margin ko healthy mana jata hai.
                    </div>
                </div>
            </div>

            {/* --- GENERALIZED CTA BLOCK --- */}
            <div className="bg-gradient-to-br from-teal-600 to-emerald-900 p-8 md:p-16 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl relative overflow-hidden group mb-20 md:mb-32">
                <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-700 hidden md:block">
                    <TrendingUp size={300} />
                </div>
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <div>
                        <h3 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
                            Numbers dekh ke <br className="hidden md:block" /> tension ho rahi hai?
                        </h3>
                        <p className="bg-white/10 backdrop-blur-sm p-2 rounded-lg inline-block text-white text-xs md:text-sm font-bold mb-6">
                            Don't worry, hum margins theek kar denge.
                        </p>
                        <p className="text-teal-50/80 text-base md:text-lg mb-8 leading-relaxed">
                            Agar aapka RTO high hai ya ad spend waste ho raha hai, toh hamare saath ek <strong className="text-white">Profitability Audit</strong> book karein.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button 
                                onClick={() => setIsSchedulerOpen(true)}
                                className="px-8 py-4 bg-white text-teal-900 font-black rounded-2xl flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-xl text-sm"
                            >
                                Book Profit Audit <ArrowRight size={18} />
                            </button>
                            <Link href="/portfolio" className="px-8 py-4 bg-teal-500/20 backdrop-blur-md text-white border border-teal-400/30 font-black rounded-2xl hover:bg-teal-500/40 transition-all text-sm text-center">
                                See Success Stories
                            </Link>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <CheckItem text="Custom RTO Reduction Scripts" />
                        <CheckItem text="High-Conversion Landing Pages" />
                        <CheckItem text="Ad Creative Strategy" />
                        <CheckItem text="Backend Ops Optimization" />
                    </div>
                </div>
            </div>

            {/* VIDEO SECTION */}
            <div className="mb-20 md:mb-32 px-2">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10 text-center">Video: Calculating Real ROI</h2>
                <div className="aspect-video w-full max-w-4xl mx-auto rounded-3xl md:rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl relative group">
                    <iframe className="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Profit Guide" allowFullScreen></iframe>
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
                    <CalendarIcon className="text-teal-500 mb-4" size={32} />
                    <h3 className="text-xl md:text-2xl font-bold mb-6 text-white">Select Audit Date</h3>
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
                        className="w-full py-4 bg-teal-600 text-white font-bold rounded-2xl shadow-xl hover:bg-teal-500 transition-all disabled:opacity-50 text-sm"
                    >
                        SCHEDULE VIA WHATSAPP
                    </button>
                    <button onClick={() => setMeetingStep(1)} className="mt-4 text-[10px] text-gray-500 underline block mx-auto uppercase tracking-widest font-bold">Change Date</button>
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
        <div className="flex items-center gap-3 text-teal-100/70">
            <Zap size={16} className="text-teal-400 shrink-0" />
            <span className="text-xs md:text-sm font-medium">{text}</span>
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
                    <button key={i} onClick={() => onSelect(d)} className={`flex flex-col items-center p-3 rounded-xl border transition-all ${isSelected ? 'bg-teal-500 border-teal-500 text-white' : 'bg-black/40 border-white/10 text-gray-500 hover:text-white'}`}>
                        <span className="text-[7px] uppercase font-bold mb-1">{d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                        <span className="text-xs font-black">{d.getDate()}</span>
                    </button>
                )
            })}
        </div>
    );
}