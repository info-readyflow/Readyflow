"use client";

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, AlertTriangle, Smartphone, MessageSquare, 
  MapPin, CheckCircle2, TrendingDown, ArrowUpRight, 
  Zap, Info, Youtube, X, Calendar as CalendarIcon, Clock, Sparkles
} from 'lucide-react';
import Link from 'next/link';

export default function RTOReductionGuide() {
  // --- STATES ---
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [showStickyBanner, setShowStickyBanner] = useState(false);
  const [isBannerDismissed, setIsBannerDismissed] = useState(false);
  const [meetingStep, setMeetingStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // --- SCROLL LOGIC ---
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500 && !isBannerDismissed) {
        setShowStickyBanner(true);
      } else {
        setShowStickyBanner(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isBannerDismissed]);

  // --- SEO: SCHEMAS ---
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "How to Reduce RTO in India: The Ultimate Shopify Guide",
    "description": "Learn 2025's best strategies to reduce RTO for Indian e-commerce stores using WhatsApp verification and AI address correction.",
    "author": { "@type": "Person", "name": "Aditya - ReadyFlow" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why is RTO so high in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "RTO in India is high due to non-serious buyers, incorrect addresses, and lack of trust in new brands. Automation and WhatsApp verification can reduce it by 15-20%."
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
    const msg = `Hi ReadyFlow! I'm reading your RTO Guide and want to book the Profit Audit (₹1999) to fix my store's RTO.\n\n*Date:* ${dateStr}\n*Time:* ${selectedTime}`;
    window.open(`https://wa.me/918602555840?text=${encodeURIComponent(msg)}`, '_blank');
    setIsSchedulerOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-24 pb-40 selection:bg-orange-500/30 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      <div className="container mx-auto px-6 max-w-6xl relative">
        
        {/* --- HERO --- */}
        <div className="max-w-4xl mb-24">
          <div className="flex items-center gap-2 text-red-500 font-bold text-sm tracking-[0.2em] uppercase mb-6">
            <AlertTriangle size={16} /> Profit Killer Detected
          </div>
          <h1 className="text-5xl md:text-8xl font-medium tracking-tight mb-8 leading-tight">
            Stop losing money <br />
            <span className="italic font-serif text-gray-500 underline decoration-red-500/30">to RTO & Fake Orders.</span>
          </h1>
          <p className="text-gray-400 text-xl md:text-2xl leading-relaxed max-w-2xl">
            India mein 30% COD orders wapas aa jate hain. It's not a shipping problem, it's a <strong>Trust & Verification</strong> problem.
          </p>
        </div>

        {/* --- THE DATA GRID (BENTO) --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-32">
          <div className="md:col-span-8 bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-10 group">
            <div className="bg-orange-500 w-fit p-3 rounded-2xl mb-12 shadow-[0_0_30px_rgba(249,115,22,0.2)]">
              <TrendingDown size={24} className="text-black" />
            </div>
            <h2 className="text-3xl font-bold mb-6 italic font-serif">The "Verification-First" Framework</h2>
            <p className="text-gray-400 mb-10 leading-relaxed text-lg">
                Hum sirf store nahi banate, hum ek **Automated Filter** lagate hain jo non-serious buyers ko checkout se pehle hi bahar kar deta hai.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <StrategyPoint title="WhatsApp OTP Verification" desc="COD order tabhi confirm hoga jab user WhatsApp pe respond karega." />
              <StrategyPoint title="Address AI Correction" desc="Junk addresses (e.g. 'Near Pipal ka ped') ko automate filter karna." />
              <StrategyPoint title="Prepaid Incentives" desc="Users ko ₹50 discount dena for online payments to avoid COD." />
              <StrategyPoint title="Risk-Based Scoring" desc="Pichle RTO history wale users ka COD option disable karna." />
            </div>
          </div>

          <div className="md:col-span-4 bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 rounded-[2.5rem] p-10 flex flex-col justify-between">
            <div>
              <h3 className="text-6xl font-black text-orange-500 mb-2 tracking-tighter">-15%</h3>
              <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-8">Average RTO Drop</p>
              <p className="text-gray-400 text-sm leading-relaxed italic">
                "Hamare clients ne automated verification ke baad dekha ki unka RTO 35% se gir kar 12% par aa gaya."
              </p>
            </div>
          </div>
        </div>

        {/* --- THE THREE PILLARS --- */}
        <div className="mb-32">
          <h2 className="text-4xl md:text-6xl font-bold mb-16 italic font-serif text-center">3 Pillars of RTO Control</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <Pillar icon={<MessageSquare className="text-blue-400" />} title="Social Confirmation" desc="Jab user ko WhatsApp pe personal message jata hai, wo order ke prati zyada serious feel karta hai." />
            <Pillar icon={<MapPin className="text-green-400" />} title="Address Accuracy" desc="India mein half-written addresses RTO ka sabse bada kaaran hain. Landmarks mandatory karna solution hai." />
            <Pillar icon={<ShieldCheck className="text-purple-400" />} title="Trust Signals" desc="Premium UI aur trust badges se hum order ki 'Perceived Value' badhate hain taaki user cancel na kare." />
          </div>
        </div>

        {/* --- VIDEO BLUEPRINT --- */}
        <div className="bg-white/[0.02] border border-white/10 p-10 rounded-[3rem] mb-32 flex flex-col md:flex-row gap-10 items-center">
            <div className="aspect-video w-full md:w-1/2 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group">
                 <iframe className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="RTO Reduction Strategy" allowFullScreen></iframe>
            </div>
            <div className="flex-1">
                <h4 className="text-2xl font-bold mb-4 flex items-center gap-2"><Youtube className="text-red-500" /> Watch the Blueprint</h4>
                <p className="text-gray-500 leading-relaxed mb-6">"Is video mein maine live dashboard dikhaya hai ki kaise ek simple WhatsApp bot se aap bacha sakte hain."</p>
                <div className="flex items-center gap-3 p-4 bg-orange-500/10 rounded-2xl border border-orange-500/20">
                    <Info className="text-orange-500 shrink-0" size={20} />
                    <p className="text-xs text-orange-200/70 font-medium font-mono italic">Did you know? Weekend nights ke orders ka RTO rate sabse high hota hai.</p>
                </div>
            </div>
        </div>

        {/* --- THE READYFLOW HOOK --- */}
        <div className="bg-white text-black rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <h3 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter leading-tight">Ready to fix your <br /> bottom line?</h3>
          <p className="text-gray-500 font-bold mb-12 max-w-xl mx-auto uppercase text-xs tracking-[0.2em]">RTO Protection is built-in with every ReadyFlow Store Setup.</p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Link href="https://wa.me/918602555840?text=I want to reduce RTO for my store" className="px-10 py-5 bg-black text-white font-black rounded-2xl hover:scale-105 transition-all flex items-center gap-3">
              Book RTO-Safe Setup (₹4,999) <ArrowUpRight size={20}/>
            </Link>
          </div>
        </div>

      </div>

      {/* --- STICKY AUDIT BANNER --- */}
      {showStickyBanner && !isSchedulerOpen && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-[60] animate-in slide-in-from-bottom-10 duration-500">
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-3 md:p-4 rounded-2xl md:rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-3 md:gap-5 max-w-md relative">
                <div className="h-10 w-10 md:h-12 md:w-12 bg-black rounded-xl overflow-hidden flex items-center justify-center shrink-0 border border-white/10">
                    <img src="/logo.png" alt="ReadyFlow" className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                    <p className="text-white font-black text-[11px] md:text-sm leading-tight">RTO still killing profits?</p>
                    <p className="text-gray-400 text-[9px] md:text-[11px] mt-1">Book a Deep-Audit @ ₹1999.</p>
                </div>
                <button onClick={() => setIsSchedulerOpen(true)} className="bg-white text-black px-4 py-2.5 rounded-xl text-[10px] md:text-xs font-black uppercase hover:bg-orange-500 hover:text-white transition-all shadow-lg">Book Now</button>
                <button onClick={handleCloseBanner} className="absolute -top-2 -right-2 bg-gray-900 text-gray-400 rounded-full p-1.5 border border-white/10 shadow-xl"><X size={14} /></button>
            </div>
        </div>
      )}

      {/* --- SCHEDULER MODAL --- */}
      {isSchedulerOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-[#111] border border-white/10 rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl relative">
            <button onClick={() => setIsSchedulerOpen(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"><X size={24} /></button>
            <div className="p-8">
                {meetingStep === 1 ? (
                  <div className="animate-in slide-in-from-right duration-300">
                    <CalendarIcon className="text-orange-500 mb-4" size={32} />
                    <h3 className="text-2xl font-bold mb-2 text-white">Select Audit Date</h3>
                    <p className="text-gray-500 text-xs mb-6 uppercase tracking-widest font-bold italic">Standard Audit Fee: ₹1999</p>
                    <div className="bg-white/5 rounded-2xl p-4 mb-8">
                        <SimpleCalendar selected={selectedDate} onSelect={(d: Date) => {setSelectedDate(d); setMeetingStep(2);}} />
                    </div>
                  </div>
                ) : (
                  <div className="animate-in slide-in-from-right duration-300 text-center text-white">
                    <Clock className="text-blue-500 mb-4 mx-auto" size={32} />
                    <h3 className="text-2xl font-bold mb-6">Select Time</h3>
                    <div className="grid grid-cols-1 gap-2 mb-8">
                        {["10 AM - 12 PM", "02 PM - 04 PM", "06 PM - 08 PM"].map(slot => (
                            <button key={slot} onClick={() => setSelectedTime(slot)} className={`p-4 rounded-xl text-sm font-bold border transition-all ${selectedTime === slot ? 'bg-white text-black' : 'bg-white/5 border-white/10 text-gray-400'}`}>{slot}</button>
                        ))}
                    </div>
                    <button disabled={!selectedTime} onClick={handleScheduleSubmit} className="w-full py-4 bg-orange-600 text-white font-black rounded-2xl shadow-xl hover:bg-orange-500 transition-all text-sm tracking-widest">CONFIRM ON WHATSAPP</button>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// --- SUB-COMPONENTS ---

function StrategyPoint({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-white font-bold text-sm">
        <CheckCircle2 size={16} className="text-orange-500" /> {title}
      </div>
      <p className="text-xs text-gray-500 leading-relaxed pl-6">{desc}</p>
    </div>
  );
}

function Pillar({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] hover:border-white/20 transition-all group">
      <div className="mb-6 group-hover:scale-110 transition-transform duration-500">{icon}</div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function SimpleCalendar({ selected, onSelect }: { selected: Date | null, onSelect: (d: Date) => void }) {
    const days = [];
    const today = new Date();
    for (let i = 1; i < 9; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        days.push(d);
    }
    return (
        <div className="grid grid-cols-4 gap-2">
            {days.map((d, i) => {
                const isSelected = selected && d.toDateString() === selected.toDateString();
                return (
                    <button key={i} type="button" onClick={() => onSelect(d)} className={`flex flex-col items-center p-3 rounded-xl border transition-all ${isSelected ? 'bg-orange-500 border-orange-500 text-white' : 'bg-black/40 border-white/10 text-gray-500 hover:text-white'}`}>
                        <span className="text-[7px] uppercase font-bold mb-1">{d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                        <span className="text-xs font-black">{d.getDate()}</span>
                    </button>
                )
            })}
        </div>
    );
}