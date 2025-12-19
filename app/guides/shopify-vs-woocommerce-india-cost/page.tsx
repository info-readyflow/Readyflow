"use client";

import React from 'react';
import { 
  Check, X, IndianRupee, Zap, 
  ShieldCheck, BarChart3, MessageCircle, 
  ArrowUpRight, Layers, MousePointerClick, TrendingUp 
} from 'lucide-react';
import Link from 'next/link';

export default function ShopifyVsWooCommerce() {
  
  return (
    <main className="min-h-screen bg-[#050505] text-white pt-24 pb-40 selection:bg-orange-500/30 font-sans">
      <div className="container mx-auto px-6 max-w-6xl relative">
        
        {/* --- HERO: CLEAN & BOLD --- */}
        <div className="max-w-4xl mb-24">
          <div className="flex items-center gap-2 text-orange-500 font-bold text-sm tracking-[0.2em] uppercase mb-6">
            <Layers size={16} /> 2024 Platform Wars
          </div>
          <h1 className="text-5xl md:text-8xl font-medium tracking-tight mb-8">
            Shopify vs <span className="text-gray-500">WordPress.</span> <br />
            <span className="italic font-serif">The real cost of scale.</span>
          </h1>
          <p className="text-gray-400 text-xl md:text-2xl leading-relaxed max-w-2xl">
            Sasta hosting setup aksar long-term mein mehenga padta hai. Let's break down the math for Indian D2C brands.
          </p>
        </div>

        {/* --- COMPARISON BENTO GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-32">
          
          {/* Shopify Card */}
          <div className="md:col-span-7 bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-10 hover:bg-white/[0.05] transition-all duration-500 group">
            <div className="flex justify-between items-start mb-12">
              <div className="bg-orange-500 p-3 rounded-2xl shadow-[0_0_30px_rgba(249,115,22,0.3)]">
                <Zap size={24} className="text-black" fill="black"/>
              </div>
              <span className="text-orange-500 font-bold text-xs border border-orange-500/30 px-3 py-1 rounded-full uppercase">Recommended</span>
            </div>
            <h2 className="text-3xl font-bold mb-4 italic font-serif">Shopify: "Dhande pe focus karo"</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Designed for merchants, not developers. Aapko server, security, ya performance ki tension nahi leni. 
              <strong> 99.9% Uptime</strong> matlab viral hone par bhi site crash nahi hogi.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Point text="Built-in RTO Protection" type="pos" />
              <Point text="Fast One-Page Checkout" type="pos" />
              <Point text="Automated Backups" type="pos" />
              <Point text="Zero Server Management" type="pos" />
            </div>
          </div>

          {/* WordPress Card */}
          <div className="md:col-span-5 bg-white/[0.01] border border-white/5 rounded-[2.5rem] p-10 hover:border-white/20 transition-all duration-300">
            <div className="bg-white/10 w-fit p-3 rounded-2xl mb-12">
              <ShieldCheck size={24} className="text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-gray-300 italic font-serif">WooCommerce</h2>
            <p className="text-gray-500 mb-8 leading-relaxed text-sm">
              Lagta sasta hai, par hidden apps aur maintenance cost aapka budget duba deti hain. Sirf hobbyists ke liye sahi hai.
            </p>
            <div className="space-y-4">
              <Point text="Heavy Server Maintenance" type="neg" />
              <Point text="Plugin Conflict Risks" type="neg" />
              <Point text="Hidden Monthly Fees" type="neg" />
            </div>
          </div>
        </div>

        {/* --- THE COST MATH: MODERN TABLE --- */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 italic font-serif">The Hidden Math.</h2>
            <p className="text-gray-500 font-medium tracking-widest uppercase text-xs">Monthly estimated breakdown for an Indian brand</p>
          </div>
          
          <div className="bg-white/[0.02] border border-white/10 rounded-[3rem] overflow-hidden backdrop-blur-sm">
            <div className="grid grid-cols-3 p-8 border-b border-white/10 bg-white/[0.02] text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500">
              <div>Expense Type</div>
              <div className="text-orange-500">Shopify</div>
              <div>WordPress</div>
            </div>
            <Row label="Server & Security" val1="₹0 (Included)" val2="₹800 - ₹2500" />
            <Row label="Premium UI/UX" val1="₹0 (Free Setup)" val2="₹5,000 (Plugin Fee)" />
            <Row label="Compliance Apps" val1="₹0 (ReadyFlow)" val2="₹1,500/mo" />
            <Row label="Your Time Cost" val1="Zero Effort" val2="15+ Hours/mo" last />
          </div>
        </div>

        {/* --- PORTFOLIO PREVIEW --- */}
        <div className="mb-32">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold mb-4 italic font-serif">Evidence of Scale.</h2>
              <p className="text-gray-500">In brands ne scalability choose ki aur aaj India ke leading D2C players hain.</p>
            </div>
            <Link href="/portfolio" className="flex items-center gap-2 text-white font-bold border-b-2 border-orange-500 pb-1 hover:text-orange-500 transition-colors">
              View All Creations <ArrowUpRight size={18}/>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProjectCard name="Mimito" category="Fashion" />
            <ProjectCard name="Magic Popz" category="Snacks" />
            <ProjectCard name="Truly Eco" category="Lifestyle" />
          </div>
        </div>

        {/* --- FINAL CTA --- */}
        <div className="bg-orange-500 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-full bg-black/5 opacity-50"></div>
          <div className="relative z-10">
            <h3 className="text-4xl md:text-7xl font-black text-black mb-8 leading-tight">
              Don't build a website. <br /> Build a Business.
            </h3>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <Link href="https://wa.me/918602555840?text=I'm ready for a Shopify Setup" className="px-10 py-5 bg-black text-white font-bold rounded-2xl hover:scale-105 transition-all flex items-center gap-3">
                Launch My Store (₹4,999) <ArrowUpRight size={20}/>
              </Link>
              <p className="text-black/60 font-black text-xs uppercase tracking-widest">Only 2 slots left this week</p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}

// --- SUB-COMPONENTS ---

function Point({ text, type }: { text: string, type: 'pos' | 'neg' }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${type === 'pos' ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
        {type === 'pos' ? <Check size={10} className="text-green-500" /> : <X size={10} className="text-red-500" />}
      </div>
      <span className="text-sm font-medium text-gray-300">{text}</span>
    </div>
  );
}

function Row({ label, val1, val2, last = false }: any) {
  return (
    <div className={`grid grid-cols-3 p-8 ${!last ? 'border-b border-white/5' : ''} hover:bg-white/[0.01] transition-colors`}>
      <div className="font-medium text-gray-400 text-sm">{label}</div>
      <div className="font-bold text-white text-sm">{val1}</div>
      <div className="font-medium text-gray-600 text-sm">{val2}</div>
    </div>
  );
}

function ProjectCard({ name, category }: any) {
  return (
    <div className="bg-white/[0.03] border border-white/10 p-10 rounded-[2.5rem] group hover:border-orange-500/50 transition-all cursor-pointer">
      <div className="bg-white/5 w-12 h-12 rounded-2xl mb-8 flex items-center justify-center text-gray-400 group-hover:text-orange-500 group-hover:bg-orange-500/10 transition-all">
        <MousePointerClick size={20} />
      </div>
      <p className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.2em] mb-3">{category}</p>
      <h4 className="text-2xl font-bold text-white group-hover:translate-x-2 transition-transform duration-500">{name}</h4>
    </div>
  );
}