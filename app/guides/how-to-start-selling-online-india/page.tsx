"use client";

import React, { useState } from 'react';
import { 
  Rocket, ShoppingBag, IndianRupee, ShieldCheck, 
  ArrowRight, CheckCircle2, ChevronRight, Zap, 
  Calculator, FileText, MessageCircle, Youtube, Star, X, Info
} from 'lucide-react';
import Link from 'next/link';

// NOTE: Metadata for Client Components in Next.js 13+ is usually handled in a layout or 
// by exporting generateMetadata from a parent Server Component. 
// However, for this guide, we will focus on the On-Page SEO elements and Schema.

export default function SellingOnlineGuide() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedNiche, setSelectedNiche] = useState('');

  const steps = [
    { id: 1, title: "Niche Select Karo", desc: "Aap kya bechna chahte hain?" },
    { id: 2, title: "Marketplace vs Brand", desc: "Amazon bechein ya apni site?" },
    { id: 3, title: "Profit Reality Check", desc: "Kharcha kitna hoga?" },
    { id: 4, title: "Compliance & Safety", desc: "Legal aur RTO ka kya?" },
    { id: 5, title: "The ReadyFlow Shortcut", desc: "Paanch din mein launch." }
  ];

  // --- SEO: HOW-TO SCHEMA MARKUP ---
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Start an Online Selling Business in India",
    "description": "A complete step-by-step guide to launching your D2C brand in India using Shopify, covering niche selection, profit calculation, and legal compliance.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Select your Niche",
        "text": "Choose a product category like Fashion, Food, or Tech that has high demand in the Indian market."
      },
      {
        "@type": "HowToStep",
        "name": "Choose Sales Channel",
        "text": "Decide between selling on marketplaces like Amazon or building your own brand on Shopify for long-term growth."
      },
      {
        "@type": "HowToStep",
        "name": "Calculate Profitability",
        "text": "Analyze product costs, marketing expenses, shipping fees, and RTO losses to ensure a healthy margin."
      }
    ]
  };

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-40 overflow-x-hidden font-sans">
      {/* --- SEO: JSON-LD Injection --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        
        {/* --- SECTION 1: HERO (H1 for SEO) --- */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-4 py-2 rounded-full text-orange-500 text-xs font-bold uppercase tracking-widest mb-6">
            <Rocket size={14} /> 2024 E-commerce Roadmap
          </div>
          <h1 className="text-4xl md:text-7xl font-black mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
            How to Start Selling <br/> Online in India
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium">
            Step-by-Step Guide: Apna Online Dhanda Kaise Shuru Karein?
          </h2>
        </div>

        {/* --- INTERACTIVE PROGRESS BAR --- */}
        <div className="flex justify-between mb-20 relative max-w-3xl mx-auto">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 z-0"></div>
          {steps.map((s) => (
            <div 
              key={s.id} 
              className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-500 ${currentStep >= s.id ? 'bg-orange-500 border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]' : 'bg-black border-white/20 text-gray-500'}`}
            >
              <span className="font-bold text-sm text-white">{s.id}</span>
              <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold uppercase tracking-tighter transition-colors ${currentStep === s.id ? 'text-orange-500' : 'text-gray-600'}`}>
                {s.title}
              </div>
            </div>
          ))}
        </div>

        {/* --- MAIN CONTENT (H2/H3 for SEO) --- */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative mb-20">
          
          {currentStep === 1 && (
            <section className="animate-in fade-in slide-in-from-right duration-500">
              <h2 className="text-3xl font-bold mb-4 italic">01. Product Selection & Market Demand</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                India mein online bechna shuru karne ka pehla step hai right niche chunna. 
                <strong> Trending category</strong> jaise Home Decor ya Apparel mein competition zyada hai par volume bhi high hai.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <NicheCard icon={<ShoppingBag />} title="Fashion" active={selectedNiche === 'fashion'} onClick={() => setSelectedNiche('fashion')} />
                <NicheCard icon={<IndianRupee />} title="Food & Snacks" active={selectedNiche === 'food'} onClick={() => setSelectedNiche('food')} />
                <NicheCard icon={<Zap />} title="Custom Gadgets" active={selectedNiche === 'tech'} onClick={() => setSelectedNiche('tech')} />
              </div>
              <button onClick={() => setCurrentStep(2)} disabled={!selectedNiche} className="mt-12 flex items-center gap-2 bg-white text-black px-8 py-4 rounded-2xl font-black hover:bg-gray-200 disabled:opacity-50">
                Next: Business Model <ArrowRight size={18} />
              </button>
            </section>
          )}

          {currentStep === 2 && (
            <section className="animate-in fade-in slide-in-from-right duration-300">
              <h2 className="text-3xl font-bold mb-6 italic">02. Own Brand vs Marketplace</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 text-gray-400 leading-relaxed">
                <div>
                  <h3 className="text-white font-bold mb-3 flex items-center gap-2"><X className="text-red-500" size={18}/> Marketplaces</h3>
                  <p>Amazon/Flipkart par customer aapka nahi hota. High commission (up to 30%) aur strict rules aapke margin ko khaa jate hain.</p>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-3 flex items-center gap-2"><CheckCircle2 className="text-green-500" size={18}/> D2C (Shopify)</h3>
                  <p>Jab aap apni website banate hain, toh aapka brand banta hai. Aap customer data ko marketing ke liye use kar sakte hain.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setCurrentStep(1)} className="px-8 py-4 border border-white/10 rounded-2xl text-gray-500">Back</button>
                <button onClick={() => setCurrentStep(3)} className="flex-1 flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-2xl font-black">
                   Profit Check <ArrowRight size={18} />
                </button>
              </div>
            </section>
          )}

          {/* ... Remaining steps with similar H2/H3 structure ... */}
          {currentStep === 3 && (
            <section className="animate-in fade-in slide-in-from-right duration-300">
              <h2 className="text-3xl font-bold mb-4 italic">03. Margin aur Profitability</h2>
              <p className="text-gray-400 mb-8">
                Adheen log sirf turnover dekhte hain, par asli khel **Net Profit** ka hai. FB ads aur shipping cost ke baad kitna bachega?
              </p>
              <div className="bg-orange-500/5 border border-orange-500/20 p-6 rounded-2xl mb-8 flex items-start gap-4">
                <div className="bg-orange-500/20 p-3 rounded-xl text-orange-500"><Calculator size={24}/></div>
                <div>
                    <p className="text-sm text-gray-300 mb-3">Profitability calculate karne ke liye humara expert tool use karein:</p>
                    <Link href="/tools/profit-calculator" className="text-orange-500 font-bold hover:underline flex items-center gap-1">
                        Go to Profit Calculator <ChevronRight size={14}/>
                    </Link>
                </div>
              </div>
              <button onClick={() => setCurrentStep(4)} className="w-full flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-2xl font-black">
                Compliance & Legal <ArrowRight size={18} />
              </button>
            </section>
          )}

          {currentStep === 4 && (
            <section className="animate-in fade-in slide-in-from-right duration-300">
              <h2 className="text-3xl font-bold mb-4 italic">04. Legal Pages aur Policy Generator</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Payment Gateways (Razorpay, Cashfree) tab tak active nahi hote jab tak apki site pe standard legal pages na hon. 
              </p>
              <div className="bg-blue-500/5 border border-blue-500/20 p-6 rounded-2xl mb-8 flex items-start gap-4">
                <div className="bg-blue-500/20 p-3 rounded-xl text-blue-500"><FileText size={24}/></div>
                <div>
                    <p className="text-sm text-gray-300 mb-3">Humara auto-generator use karein aur policies taiyar karein:</p>
                    <Link href="/tools/policy-generator" className="text-blue-500 font-bold hover:underline flex items-center gap-1">
                        Generate Legal Pages <ChevronRight size={14}/>
                    </Link>
                </div>
              </div>
              <button onClick={() => setCurrentStep(5)} className="w-full flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-2xl font-black">
                Final Step: Launch <ArrowRight size={18} />
              </button>
            </section>
          )}

          {currentStep === 5 && (
            <section className="animate-in fade-in slide-in-from-right duration-300 text-center">
              <h2 className="text-4xl font-black mb-6">Tayyar hain? Let's Build Your Empire.</h2>
              <p className="text-gray-400 max-w-xl mx-auto mb-10">
                Aap ye roadmap khud follow karke 1 mahina laga sakte hain, ya phir **ReadyFlow** ko hire karke 5 din mein setup complete kar sakte hain.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Link href="/locations/shopify-developer-near-me" className="px-8 py-4 bg-white text-black font-black rounded-2xl hover:scale-105 transition-all">
                  VIEW SETUP PLAN (₹4,999)
                </Link>
                <Link href="https://wa.me/918602555840?text=I need a professional Shopify setup" className="px-8 py-4 bg-green-600 text-white font-black rounded-2xl flex items-center justify-center gap-2 shadow-lg">
                  CONSULT ON WHATSAPP <MessageCircle size={18}/>
                </Link>
              </div>
            </section>
          )}
        </div>

        {/* --- SECTION 3: VIDEO AUTHORITY --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32 items-center">
            <div>
                <h3 className="text-3xl font-bold mb-6 italic text-orange-500">Expert Tips for Selling in India</h3>
                <ul className="space-y-4 text-gray-400">
                    <li className="flex items-start gap-2"><CheckCircle2 className="text-green-500 mt-1" size={18}/> Manage RTO with WhatsApp verification</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="text-green-500 mt-1" size={18}/> Use localized landing pages for ads</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="text-green-500 mt-1" size={18}/> Optimize for mobile (90% traffic is mobile)</li>
                </ul>
            </div>
            <div className="aspect-video bg-[#0a0a0a] rounded-3xl border border-white/10 overflow-hidden shadow-2xl relative group">
                <iframe 
                    className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Start Online Selling Guide"
                    allowFullScreen
                ></iframe>
            </div>
        </div>

        {/* --- SECTION 4: INFO BOX (Semantic SEO) --- */}
        <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] flex flex-col md:flex-row gap-6 items-center">
            <div className="bg-orange-500/20 p-4 rounded-full text-orange-500 shrink-0"><Info size={32}/></div>
            <div>
                <h4 className="text-xl font-bold mb-2">Pro Tip for New Sellers</h4>
                <p className="text-sm text-gray-500 leading-relaxed">
                    India mein 70% log COD mangte hain. RTO (Return to Origin) loss se bachne ke liye hamesha delivery se pehle WhatsApp par order confirm karein. ReadyFlow setup mein ye automated system pehle se include hota hai.
                </p>
            </div>
        </div>

      </div>
    </main>
  );
}

function NicheCard({ icon, title, active, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className={`p-6 rounded-2xl border-2 transition-all cursor-pointer ${active ? 'bg-orange-500/10 border-orange-500 text-white' : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/20'}`}
    >
      <div className={`mb-4 ${active ? 'text-orange-500' : 'text-gray-600'}`}>{React.cloneElement(icon, { size: 32 })}</div>
      <h4 className="font-bold text-sm">{title}</h4>
    </div>
  );
}