"use client";

import React, { useState, useEffect } from 'react';
import ProfitCalculator from '../ProfitCalculator';
import { 
  ArrowLeft, TrendingUp, Zap, 
  BarChart3, ArrowRight, Calendar as CalendarIcon, 
  Clock, X, ShieldAlert 
} from 'lucide-react';
import Link from 'next/link';

export default function CalculatorPage() {
  // --- STATES ---
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [showStickyBanner, setShowStickyBanner] = useState(false);
  const [isBannerDismissed, setIsBannerDismissed] = useState(false); // Reload tak hide rahega
  const [meetingStep, setMeetingStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // --- SHOW BANNER ON SCROLL ---
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400 && !isBannerDismissed) {
        setShowStickyBanner(true);
      } else {
        setShowStickyBanner(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isBannerDismissed]);

  // --- SEO: SOFTWARE APPLICATION SCHEMA ---
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ReadyFlow India-Specific Profit & RTO Calculator",
    "operatingSystem": "All",
    "applicationCategory": "FinanceApplication",
    "offers": { "@type": "Offer", "price": "1999", "priceCurrency": "INR" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "188" },
    "description": "Calculate true net profit for Indian Shopify & E-commerce stores. Accurate RTO loss estimation, shipping costs, and Meta ads ROI analysis."
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

  // --- HANDLERS ---
  const handleCloseBanner = () => {
    setIsBannerDismissed(true);
    setShowStickyBanner(false);
  };

  const handleScheduleSubmit = () => {
    if (!selectedDate || !selectedTime) return;
    const dateStr = selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const msg = `Hi ReadyFlow! I'm interested in the Profitability Audit (₹1999). I used your calculator and want to fix my margins.\n\n*Preferred Date:* ${dateStr}\n*Time Slot:* ${selectedTime}`;
    
    window.open(`https://wa.me/918602555840?text=${encodeURIComponent(msg)}`, '_blank');
    setIsSchedulerOpen(false);
  };

  return (
    <main className="min-h-screen bg-black text-white pt-16 md:pt-24 pb-24 md:pb-40 overflow-x-hidden font-sans">
      {/* SEO SCRIPTS RESTORED */}
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
                    </p>
                    <div className="p-4 bg-red-500/5 rounded-2xl border border-red-500/10 text-[11px] md:text-xs text-red-200/60">
                        <strong>Pro Tip:</strong> Har RTO parcel pe aapka forward aur reverse dono shipping charge lagta.
                    </div>
                </div>
                <div className="bg-white/[0.02] border border-white/10 p-6 md:p-8 rounded-3xl md:rounded-[2.5rem]">
                    <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-3">
                        <TrendingUp className="text-teal-500" /> Scalability Math
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        Scale karne ke liye aapko pata hona chahiye ki aapka <strong className="text-white">Break-even ROAS</strong> kya hai. 
                    </p>
                    <div className="p-4 bg-teal-500/5 rounded-2xl border border-teal-500/10 text-[11px] md:text-xs text-teal-200/60">
                        <strong>Aim for:</strong> India mein 20-25% net margin ko healthy mana jata hai.
                    </div>
                </div>
            </div>

            {/* --- MAIN CTA BLOCK --- */}
            <div className="bg-gradient-to-br from-teal-600 to-emerald-900 p-8 md:p-16 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl relative overflow-hidden group mb-20 md:mb-32">
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <div>
                        <h3 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
                            Numbers dekh ke <br className="hidden md:block" /> tension ho rahi hai?
                        </h3>
                        <button 
                            onClick={() => setIsSchedulerOpen(true)}
                            className="px-8 py-4 bg-white text-teal-900 font-black rounded-2xl flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-xl text-sm"
                        >
                            Book Profit Audit <ArrowRight size={18} />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <CheckItem text="Custom RTO Reduction Scripts" />
                        <CheckItem text="High-Conversion Landing Pages" />
                        <CheckItem text="Ad Creative Strategy" />
                        <CheckItem text="Backend Ops Optimization" />
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* --- STICKY AUDIT BANNER --- */}
      {showStickyBanner && !isSchedulerOpen && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-[60] animate-in slide-in-from-bottom-10 duration-500">
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-3 md:p-4 rounded-2xl md:rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-3 md:gap-5 max-w-md relative">
                
                {/* LOGO.PNG RENDER */}
                <div className="h-10 w-10 md:h-12 md:w-12 bg-black rounded-xl overflow-hidden flex items-center justify-center shrink-0 border border-white/10 shadow-lg">
                    <img src="/logo.png" alt="ReadyFlow" className="w-full h-full object-cover" />
                </div>

                <div className="flex-grow">
                    <p className="text-white font-black text-[11px] md:text-sm leading-tight flex items-center gap-1.5">
                       Audit Your Store <span className="text-teal-400">@ ₹1999</span>
                    </p>
                    <p className="text-gray-400 text-[9px] md:text-[11px] mt-1">Fix RTO & Increase Net Margins.</p>
                </div>

                <button 
                    onClick={() => setIsSchedulerOpen(true)}
                    className="bg-white text-black px-4 py-2.5 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-tighter hover:bg-teal-500 hover:text-white transition-all shadow-lg active:scale-95"
                >
                    Book Now
                </button>

                {/* CLOSE BUTTON - PERMANENT UNTIL RELOAD */}
                <button 
                    onClick={handleCloseBanner}
                    className="absolute -top-2 -right-2 bg-gray-900 text-gray-400 rounded-full p-1.5 hover:text-white border border-white/10 shadow-xl transition-colors"
                >
                    <X size={14} />
                </button>
            </div>
        </div>
      )}

      {/* --- SCHEDULER MODAL --- */}
      {isSchedulerOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-[#111] border border-white/10 rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl relative">
            <button onClick={() => setIsSchedulerOpen(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">
              <X size={24} />
            </button>
            <div className="p-8">
                {meetingStep === 1 ? (
                  <div className="animate-in slide-in-from-right duration-300">
                    <CalendarIcon className="text-teal-500 mb-4" size={32} />
                    <h3 className="text-2xl font-bold mb-2 text-white">Select Audit Date</h3>
                    <p className="text-gray-500 text-xs mb-6 uppercase tracking-widest font-bold italic">Standard Audit Fee: ₹1999</p>
                    <div className="bg-white/5 rounded-2xl p-4 mb-8">
                        <SimpleCalendar selected={selectedDate} onSelect={(d: Date) => {setSelectedDate(d); setMeetingStep(2);}} />
                    </div>
                  </div>
                ) : (
                  <div className="animate-in slide-in-from-right duration-300 text-center text-white">
                    <Clock className="text-blue-500 mb-4 mx-auto" size={32} />
                    <h3 className="text-2xl font-bold mb-6">Select a Time Slot</h3>
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
                        className="w-full py-4 bg-teal-600 text-white font-black rounded-2xl shadow-xl hover:bg-teal-500 transition-all disabled:opacity-50 text-sm tracking-widest"
                    >
                        CONFIRM ON WHATSAPP
                    </button>
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
                    <button 
                        key={i} 
                        type="button"
                        onClick={() => onSelect(d)} 
                        className={`flex flex-col items-center p-3 rounded-xl border transition-all ${
                            isSelected 
                            ? 'bg-teal-500 border-teal-500 text-white shadow-[0_0_15px_rgba(20,184,166,0.4)]' 
                            : 'bg-black/40 border-white/10 text-gray-500 hover:text-white hover:border-white/30'
                        }`}
                    >
                        <span className="text-[7px] uppercase font-bold mb-1">{d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                        <span className="text-xs font-black">{d.getDate()}</span>
                    </button>
                )
            })}
        </div>
    );
}