"use client";

import React, { useState } from 'react';
import PopupBuilder from '../PopupBuilder';
import { 
  Zap, MousePointer2, ArrowRight, CheckCircle2, 
  Code2, Rocket, Calendar as CalendarIcon, Clock, X 
} from 'lucide-react';
import Link from 'next/link';

export default function PopupBuilderPage() {
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [meetingStep, setMeetingStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleScheduleSubmit = () => {
    if (!selectedDate || !selectedTime) return;
    const dateStr = selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const msg = `Hi ReadyFlow! I'm using your Popup Builder and I'd like to discuss a custom Shopify setup.\n\n*Meeting Date:* ${dateStr}\n*Time Slot:* ${selectedTime}`;
    window.open(`https://wa.me/918602555840?text=${encodeURIComponent(msg)}`, '_blank');
    setIsSchedulerOpen(false);
  };

  return (
    <main className="min-h-screen bg-black text-white pt-10 md:pt-16 pb-24 md:pb-40 overflow-x-hidden font-sans">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        
        {/* UPPER SECTION */}
        <div className="relative z-20 px-2 md:px-0">
            <PopupBuilder />
        </div>

        {/* --- DETAILED CONTENT SECTION --- */}
        <div className="mt-20 md:mt-32 max-w-5xl mx-auto px-2">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24">
                <FeatureCard 
                    icon={<Zap size={24} className="text-orange-500" />} 
                    title="Zero Speed Impact" 
                    desc="Vanilla JS setup ensures your Core Web Vitals stay green." 
                />
                <FeatureCard 
                    icon={<MousePointer2 size={24} className="text-blue-500" />} 
                    title="Exit Intent Logic" 
                    desc="Trigger popups exactly when a user is about to leave your site." 
                />
                <FeatureCard 
                    icon={<Code2 size={24} className="text-green-500" />} 
                    title="No App Required" 
                    desc="Pure code snippet. No monthly database calls or server delays." 
                />
            </div>

            {/* CTA BLOCK */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-900 p-8 md:p-16 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl relative overflow-hidden group mb-20 md:mb-32">
                <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-700 hidden md:block">
                    <Rocket size={300} />
                </div>
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <div>
                        <h3 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight text-left">
                            Bhai, itna manual <br className="hidden md:block" /> setup kyun?
                        </h3>
                        <p className="text-blue-50/80 text-base md:text-lg mb-8 leading-relaxed font-medium text-left">
                            Agar aap popup ya store khud configure nahi kar paa rahe, toh hamara <strong className="text-white font-bold">Expert Setup</strong> package dekhein. Hum sab automate kar dete hain.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button 
                                onClick={() => setIsSchedulerOpen(true)}
                                className="px-8 py-4 bg-white text-blue-900 font-black rounded-2xl flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-xl text-sm"
                            >
                                Book a Strategy Call <ArrowRight size={18} />
                            </button>
                            <Link href="/portfolio" className="px-8 py-4 bg-blue-500/20 backdrop-blur-md text-white border border-blue-400/30 font-black rounded-2xl hover:bg-blue-500/40 transition-all text-sm text-center">
                                View Portfolio
                            </Link>
                        </div>
                    </div>
                    <div className="bg-black/20 backdrop-blur-sm p-6 md:p-8 rounded-3xl border border-white/10">
                        <ul className="space-y-4">
                            <CheckItem text="WhatsApp Order Verification" />
                            <CheckItem text="RTO Safety Filter" />
                            <CheckItem text="Custom Hero & UI Design" />
                            <CheckItem text="Full Shopify Optimization" />
                        </ul>
                    </div>
                </div>
            </div>

            {/* INSTALLATION GUIDE - FIXED LAYOUT & BOLDING */}
            <div className="mb-20 md:mb-32 border-t border-white/10 pt-16 md:pt-20 px-2">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10 text-white text-left">How to install?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
                    <div className="space-y-8">
                        {/* Step 01 */}
                        <div className="flex gap-4">
                            <span className="text-orange-500 font-black text-lg leading-none">01.</span>
                            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                Generate your custom popup code using the builder above.
                            </p>
                        </div>
                        {/* Step 02 */}
                        <div className="flex gap-4">
                            <span className="text-orange-500 font-black text-lg leading-none">02.</span>
                            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                Go to <strong className="text-white font-bold whitespace-nowrap">Online Store &gt; Themes</strong> and click <strong className="text-white font-bold whitespace-nowrap">Edit Code</strong> in Shopify.
                            </p>
                        </div>
                        {/* Step 03 */}
                        <div className="flex gap-4">
                            <span className="text-orange-500 font-black text-lg leading-none">03.</span>
                            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                Open <strong className="text-white font-bold">theme.liquid</strong> and paste the code right before the <code className="bg-white/10 px-1.5 py-0.5 rounded text-orange-400 font-mono text-xs md:text-sm">&lt;/body&gt;</code> tag.
                            </p>
                        </div>
                    </div>
                    
                    <div className="p-6 md:p-8 bg-white/5 border border-white/10 rounded-3xl italic text-gray-500 text-xs md:text-sm leading-relaxed self-start">
                        "Unlike heavy apps that load 2MB of JS, this script is only 5KB. It ensures your store remains fast while still capturing every lead." 
                        <br className="mb-2" /> 
                        — <strong className="text-white font-bold not-italic">Aditya, ReadyFlow Founder</strong>
                    </div>
                </div>
            </div>

            {/* FAQ SECTION */}
            <div className="mt-20 md:mt-32 px-2">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10 text-center text-white">Common Doubts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <FaqBox q="Will it work on mobile?" a="Yes, our popups are 100% responsive and tested on all major mobile browsers used in India." />
                    <FaqBox q="Can I customize the colors?" a="Absolutely. The builder allows you to match the popup exactly with your brand identity." />
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
                    <CalendarIcon className="text-orange-500 mb-4" size={32} />
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
                        className="w-full py-4 bg-orange-600 text-white font-bold rounded-2xl shadow-xl hover:bg-orange-500 transition-all disabled:opacity-50 text-sm"
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

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="p-6 md:p-8 bg-white/[0.02] border border-white/10 rounded-3xl md:rounded-[2.5rem] hover:bg-white/[0.04] transition-all group">
            <div className="mb-4 md:mb-6 group-hover:scale-110 transition-transform">{icon}</div>
            <h4 className="font-bold text-base md:text-lg mb-2 text-white text-left">{title}</h4>
            <p className="text-[11px] md:text-xs text-gray-500 leading-relaxed text-left">{desc}</p>
        </div>
    );
}

function CheckItem({ text }: { text: string }) {
    return (
        <li className="flex items-center gap-3 text-xs md:text-sm text-blue-100/70">
            <CheckCircle2 size={16} className="text-blue-400 shrink-0" /> {text}
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
                    <button key={i} onClick={() => onSelect(d)} className={`flex flex-col items-center p-3 rounded-xl border transition-all ${isSelected ? 'bg-orange-500 border-orange-500 text-white' : 'bg-black/40 border-white/10 text-gray-500 hover:text-white'}`}>
                        <span className="text-[7px] uppercase font-bold mb-1">{d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                        <span className="text-xs font-black">{d.getDate()}</span>
                    </button>
                )
            })}
        </div>
    );
}