"use client";

import React from 'react';
import { 
  ShieldCheck, AlertTriangle, Smartphone, MessageSquare, 
  MapPin, CheckCircle2, TrendingDown, ArrowUpRight, 
  Zap, Info, Youtube, MessageCircle 
} from 'lucide-react';
import Link from 'next/link';

export default function RTOReductionGuide() {
  
  return (
    <main className="min-h-screen bg-[#050505] text-white pt-24 pb-40 selection:bg-orange-500/30 font-sans">
      
      <div className="container mx-auto px-6 max-w-6xl relative">
        
        {/* --- HERO: BOLD & URGENT --- */}
        <div className="max-w-4xl mb-24">
          <div className="flex items-center gap-2 text-red-500 font-bold text-sm tracking-[0.2em] uppercase mb-6">
            <AlertTriangle size={16} /> Profit Killer Detected
          </div>
          <h1 className="text-5xl md:text-8xl font-medium tracking-tight mb-8">
            Stop losing money <br />
            <span className="italic font-serif text-gray-500 underline decoration-red-500/30">to RTO & Fake Orders.</span>
          </h1>
          <p className="text-gray-400 text-xl md:text-2xl leading-relaxed max-w-2xl">
            India mein 30% COD orders wapas aa jate hain. It's not a shipping problem, it's a <strong>Trust & Verification</strong> problem.
          </p>
        </div>

        {/* --- THE DATA GRID (BENTO) --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-32">
          
          {/* Main Strategy Card */}
          <div className="md:col-span-8 bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-10 group">
            <div className="bg-orange-500 w-fit p-3 rounded-2xl mb-12 shadow-[0_0_30px_rgba(249,115,22,0.2)]">
              <TrendingDown size={24} className="text-black" />
            </div>
            <h2 className="text-3xl font-bold mb-6 italic font-serif">The "Verification-First" Framework</h2>
            <p className="text-gray-400 mb-10 leading-relaxed text-lg">
                Hum sirf store nahi banate, hum ek **Automated Filter** lagate hain jo non-serious buyers ko checkout se pehle hi bahar kar deta hai.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <StrategyPoint 
                title="WhatsApp OTP Verification" 
                desc="COD order tabhi confirm hoga jab user WhatsApp pe respond karega." 
              />
              <StrategyPoint 
                title="Address AI Correction" 
                desc="Junk addresses (e.g. 'Near Pipal ka ped') ko automate filter karna." 
              />
              <StrategyPoint 
                title="Prepaid Incentives" 
                desc="Users ko ₹50 discount dena for online payments to avoid COD." 
              />
              <StrategyPoint 
                title="Risk-Based Scoring" 
                desc="Pichle RTO history wale users ka COD option disable karna." 
              />
            </div>
          </div>

          {/* Sidebar Stat Card */}
          <div className="md:col-span-4 bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 rounded-[2.5rem] p-10 flex flex-col justify-between">
            <div>
              <h3 className="text-6xl font-black text-orange-500 mb-2 tracking-tighter">-15%</h3>
              <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-8">Average RTO Drop</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                "Hamare clients ne automated verification ke baad dekha ki unka RTO 35% se gir kar 12% par aa gaya."
              </p>
            </div>
          </div>
        </div>

        {/* --- THE THREE PILLARS (H2) --- */}
        <div className="mb-32">
          <h2 className="text-4xl md:text-6xl font-bold mb-16 italic font-serif text-center">3 Pillars of RTO Control</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            <Pillar 
              icon={<MessageSquare className="text-blue-400" />} 
              title="Social Confirmation"
              desc="Jab user ko WhatsApp pe personal message jata hai, wo order ke prati zyada serious feel karta hai. Hum ise 100% automate karte hain."
            />
            
            <Pillar 
              icon={<MapPin className="text-green-400" />} 
              title="Address Accuracy"
              desc="India mein half-written addresses RTO ka sabse bada kaaran hain. Hamara system checkout pe hi landmark mandatory karta hai."
            />

            <Pillar 
              icon={<ShieldCheck className="text-purple-400" />} 
              title="Trust Signals"
              desc="Agar user ko site 'Sasti' lagti hai, toh wo use light leta hai. Premium UI aur trust badges se hum order ki 'Perceived Value' badhate hain."
            />

          </div>
        </div>

        {/* --- ACTIONABLE ADVICE (INFO BOX) --- */}
        <div className="bg-white/[0.02] border border-white/10 p-10 rounded-[3rem] mb-32 flex flex-col md:flex-row gap-10 items-center">
            <div className="aspect-video w-full md:w-1/2 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group">
                 <iframe 
                    className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="RTO Reduction Strategy India"
                    allowFullScreen
                ></iframe>
            </div>
            <div className="flex-1">
                <h4 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Youtube className="text-red-500" /> Watch the Blueprint
                </h4>
                <p className="text-gray-500 leading-relaxed mb-6">
                    "Is video mein maine live dashboard dikhaya hai ki kaise ek simple WhatsApp bot se aap lakhon ka RTO loss bacha sakte hain."
                </p>
                <div className="flex items-center gap-3 p-4 bg-orange-500/10 rounded-2xl border border-orange-500/20">
                    <Info className="text-orange-500 shrink-0" size={20} />
                    <p className="text-xs text-orange-200/70 font-medium">
                        Did you know? Monday morning ke COD orders ka RTO rate sabse low hota hai, jabki Weekend nights ka sabse high.
                    </p>
                </div>
            </div>
        </div>

        {/* --- THE READYFLOW HOOK --- */}
        <div className="bg-white text-black rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <h3 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter leading-tight">
            Ready to fix your <br /> bottom line?
          </h3>
          <p className="text-gray-500 font-bold mb-12 max-w-xl mx-auto uppercase text-xs tracking-[0.2em]">
            RTO Protection is built-in with every ReadyFlow Store Setup.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Link href="https://wa.me/918602555840?text=I want to reduce RTO for my store" className="px-10 py-5 bg-black text-white font-black rounded-2xl hover:scale-105 transition-all flex items-center gap-3">
              Book RTO-Safe Setup (₹4,999) <ArrowUpRight size={20}/>
            </Link>
            <Link href="/portfolio" className="px-10 py-5 bg-transparent border-2 border-black/10 text-black font-black rounded-2xl hover:bg-black/5 transition-all">
              View Success Stories
            </Link>
          </div>
        </div>

      </div>
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