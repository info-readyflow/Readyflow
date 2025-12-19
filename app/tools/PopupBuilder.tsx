"use client";

import React, { useState, useEffect } from 'react';
import { 
  Type, MessageCircle, Bell, 
  Disc, Cookie, Lock, Copy, Check, ThumbsUp, X, Smartphone, 
  MapPin, ShoppingBag, Loader2, 
  Palette, Clock, TrendingUp, 
  Shield, Code2, Monitor, ImageIcon
} from 'lucide-react';
import { Switch } from '@/components/ui/switch'; 
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

// --- FIREBASE IMPORTS ---
import { auth, db } from "@/lib/firebase"; 
import { trackToolUsage } from "@/lib/db"; 
import { doc, getDoc } from "firebase/firestore"; 

// --- TYPES ---
type TemplateType = 'simple' | 'image' | 'whatsapp' | 'sales' | 'spin' | 'cookie' | 'countdown' | 'exit';

export default function PopupBuilder() {
  const router = useRouter();

  // --- STATE ---
  const [activeTemplate, setActiveTemplate] = useState<TemplateType>('simple');
  
  // Logic State
  const [hasPremiumPlan, setHasPremiumPlan] = useState(false); 
  const [isPro, setIsPro] = useState(false); 
  const [loadingPlan, setLoadingPlan] = useState(true);

  // UI State
  const [copied, setCopied] = useState(false);
  const [voteStatus, setVoteStatus] = useState<'idle' | 'loading' | 'voted'>('idle');
  const [spinRotation, setSpinRotation] = useState(0);
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'mobile'>('desktop');
  
  // Custom Modal State
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Timer Logic
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 30, seconds: 45 });
  
  // --- 1. SECURE SUBSCRIPTION CHECK ---
  useEffect(() => {
    const checkPlan = async () => {
        if (!auth.currentUser) {
            setLoadingPlan(false);
            return;
        }
        try {
            const userRef = doc(db, "users", auth.currentUser.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                const data = userSnap.data();
                if (data.plan === "Premium") {
                    let expiryTime = 0;
                    if (data.premiumUntil) {
                        if (typeof data.premiumUntil === 'string') {
                            expiryTime = new Date(data.premiumUntil).getTime();
                        } else if (data.premiumUntil.seconds) {
                            expiryTime = data.premiumUntil.seconds * 1000;
                        }
                    } else if (data.updatedAt?.seconds) {
                        const updatedTime = data.updatedAt.seconds * 1000;
                        expiryTime = updatedTime + (28 * 24 * 60 * 60 * 1000); 
                    }
                    if (expiryTime > Date.now()) {
                        setHasPremiumPlan(true);
                    } else {
                        setHasPremiumPlan(false);
                    }
                }
            }
        } catch (error) {
            console.error("Error fetching plan:", error);
        }
        setLoadingPlan(false);
    };
    checkPlan();
  }, []);

  useEffect(() => {
    if (activeTemplate === 'countdown') {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
          if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
          if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
          return prev;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [activeTemplate]);
  
  const [content, setContent] = useState({
    headline: "Unlock 15% Off",
    subheadline: "Join our VIP list and get a special discount code instantly.",
    color: "#FF6B6B",
    delay: 2,
    buttonText: "GET CODE",
    couponCode: "SAVE15",
    imageUrl: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=2070&auto=format&fit=crop",
    whatsappNumber: "919876543210",
    customerName: "Amit",
    customerLocation: "Delhi",
    productName: "Smart Watch",
    timeAgo: "2 minutes ago",
    segments: ["10% OFF", "Try Again", "Free Ship", "20% OFF", "No Luck", "Jackpot"],
    winChance: 50,
    countdownTitle: "Flash Sale Ends In:",
    countdownOffer: "50% OFF Everything",
    exitHeadline: "Wait! Don't Miss Out",
    exitOffer: "Get 20% off your first order",
  });

  const templates = [
    { id: 'simple', name: 'Simple Text', icon: Type, status: 'live', color: 'text-blue-400' },
    { id: 'image', name: 'Image Modal', icon: ImageIcon, status: 'live', color: 'text-purple-400' },
    { id: 'whatsapp', name: 'WhatsApp Bot', icon: MessageCircle, status: 'soon', color: 'text-green-400' },
    { id: 'sales', name: 'Sales Pop', icon: Bell, status: 'soon', color: 'text-orange-400' },
    { id: 'spin', name: 'Spin Wheel', icon: Disc, status: 'soon', color: 'text-pink-400' },
    { id: 'cookie', name: 'Cookie Bar', icon: Cookie, status: 'soon', color: 'text-yellow-400' },
    { id: 'countdown', name: 'Countdown', icon: Clock, status: 'soon', color: 'text-red-400' },
    { id: 'exit', name: 'Exit Intent', icon: TrendingUp, status: 'soon', color: 'text-cyan-400' },
  ];

  const currentTemplateStatus = templates.find(t => t.id === activeTemplate)?.status;
  const isLive = currentTemplateStatus === 'live';

  const handleSpin = () => {
    const newRotation = spinRotation + 1080 + Math.random() * 360;
    setSpinRotation(newRotation);
  };

  const handleVote = () => {
    setVoteStatus('loading');
    setTimeout(() => {
      setVoteStatus('voted');
    }, 1500);
  };

  const handleProSwitch = (checked: boolean) => {
      if (checked && !hasPremiumPlan) {
          setShowUpgradeModal(true);
          return; 
      }
      setIsPro(checked);
  };

  const copyToClipboardFallback = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed"; 
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Fallback copy failed', err);
    }
    document.body.removeChild(textArea);
  };

  const handleCopy = async () => {
    if (isPro && !hasPremiumPlan) {
        setShowUpgradeModal(true);
        return;
    }

    const code = generateCode();
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(code).then(async () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        if (auth.currentUser) {
            await trackToolUsage(auth.currentUser.uid, 'popupBuilder');
        }
      }).catch(() => copyToClipboardFallback(code));
    } else {
      copyToClipboardFallback(code);
    }
  };

  const generateCode = () => {
    // FIX: Removed hidden link for Pro users. Only render visible link for Free users.
    const watermarkHTML = isPro 
      ? "" 
      : `
    <a href="https://readyflow.in" target="_blank" style="display:block; margin-top:15px; font-size:11px; color:#cbd5e1; text-decoration:none; font-weight:500; font-family:sans-serif;">
      ⚡ Powered by ReadyFlow
    </a>`;

    if (activeTemplate === 'simple') {
      return `<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
  #rf-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 9999999; display: flex; align-items: center; justify-content: center; opacity: 0; visibility: hidden; transition: opacity 0.3s ease; backdrop-filter: blur(3px); font-family: 'Inter', sans-serif; }
  #rf-box { background: #fff; width: 90%; max-width: 380px; padding: 40px 30px 20px 30px; border-radius: 16px; text-align: center; position: relative; border-top: 6px solid ${content.color}; box-shadow: 0 20px 60px rgba(0,0,0,0.15); transform: scale(0.9); transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
  #rf-overlay.show { opacity: 1; visibility: visible; }
  #rf-overlay.show #rf-box { transform: scale(1); }
  .rf-close { position: absolute; top: 10px; right: 15px; background: none; border: none; font-size: 28px; color: #999; cursor: pointer; }
  .rf-title { font-size: 26px; font-weight: 800; color: #1a1a1a; margin: 0 0 10px 0; letter-spacing: -1px; }
  .rf-text { font-size: 16px; color: #666; line-height: 1.5; margin: 0 0 25px 0; }
  .rf-btn { display: block; width: 100%; background: ${content.color}; color: white; padding: 14px; border: none; border-radius: 8px; font-size: 16px; font-weight: 700; cursor: pointer; transition: opacity 0.2s; text-transform: uppercase; }
  .rf-btn:hover { opacity: 0.9; }
</style>
<div id="rf-overlay">
  <div id="rf-box">
    <button class="rf-close" onclick="document.getElementById('rf-overlay').classList.remove('show')">×</button>
    <span style="font-size:40px; display:block; margin-bottom:15px;">🎁</span>
    <h2 class="rf-title">${content.headline}</h2>
    <p class="rf-text">${content.subheadline}</p>
    <button class="rf-btn" onclick="alert('Code: ${content.couponCode}')">${content.buttonText}</button>
    ${watermarkHTML}
  </div>
</div>
<script>
  setTimeout(() => { document.getElementById('rf-overlay').classList.add('show'); }, ${content.delay * 1000});
</script>`;
    }

    if (activeTemplate === 'image') {
      return `<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
  #rf-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.75); z-index: 9999999; display: flex; align-items: center; justify-content: center; opacity: 0; visibility: hidden; transition: all 0.3s; backdrop-filter: blur(4px); font-family: 'Inter', sans-serif; }
  #rf-box { background: #fff; width: 90%; max-width: 400px; padding: 0; border-radius: 20px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); text-align: center; position: relative; overflow: hidden; transform: scale(0.95); transition: all 0.3s; }
  #rf-overlay.show { opacity: 1; visibility: visible; }
  #rf-overlay.show #rf-box { transform: scale(1); }
  .rf-close { position: absolute; top: 12px; right: 12px; width: 32px; height: 32px; background: rgba(255,255,255,0.9); border-radius: 50%; border: none; font-size: 20px; cursor: pointer; z-index: 10; display: flex; align-items: center; justify-content: center; }
  .rf-img { width: 100%; height: 220px; object-fit: cover; display: block; }
  .rf-content { padding: 24px 28px 32px; }
  .rf-title { margin: 0 0 8px 0; font-size: 24px; font-weight: 800; color: #111; }
  .rf-sub { margin: 0 0 24px 0; font-size: 15px; color: #555; line-height: 1.6; }
  .rf-coupon { background: #F3F4F6; border: 1px dashed #CBD5E1; border-radius: 12px; padding: 8px 12px; display: flex; align-items: center; justify-content: space-between; }
  .rf-code { font-family: monospace; font-size: 18px; font-weight: 700; color: #111; }
  .rf-copy { background: #111; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; }
</style>
<div id="rf-overlay">
  <div id="rf-box">
    <button class="rf-close" onclick="document.getElementById('rf-overlay').classList.remove('show')">×</button>
    <img src="${content.imageUrl}" class="rf-img" alt="Offer">
    <div class="rf-content">
      <h2 class="rf-title">${content.headline}</h2>
      <p class="rf-sub">${content.subheadline}</p>
      <div class="rf-coupon">
        <span class="rf-code">${content.couponCode}</span>
        <button class="rf-copy" onclick="navigator.clipboard.writeText('${content.couponCode}');this.innerText='COPIED!'">${content.buttonText}</button>
      </div>
      ${watermarkHTML}
    </div>
  </div>
</div>
<script>
  setTimeout(() => { document.getElementById('rf-overlay').classList.add('show'); }, ${content.delay * 1000});
</script>`;
    }

    return "";
  };

  const updateSegment = (index: number, value: string) => {
    const newSegments = [...content.segments];
    newSegments[index] = value;
    setContent({ ...content, segments: newSegments });
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 pb-1">
            Build High-Converting Popups
          </h1>
          <p className="text-gray-400">No coding required. Customize, preview, and deploy in minutes.</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* --- LEFT SIDEBAR (Templates) --- */}
          <div className="w-full lg:w-72 shrink-0 space-y-6">
            
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-4">
              <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4 px-2">Template Library</h3>
              <div className="space-y-2">
                {templates.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => { 
                      setActiveTemplate(t.id as TemplateType); 
                      setVoteStatus('idle');
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-sm transition-all group ${
                      activeTemplate === t.id 
                        ? 'bg-orange-500/10 border-orange-500 text-orange-500' 
                        : 'bg-[#111] border-white/5 text-gray-400 hover:bg-white/5 hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors ${activeTemplate === t.id ? 'bg-orange-500/20' : ''}`}>
                        <t.icon size={16} className={activeTemplate === t.id ? 'text-orange-500' : t.color} />
                      </div>
                      <span className="font-medium">{t.name}</span>
                    </div>
                    {t.status === 'soon' && (
                      <div className="flex items-center gap-1">
                        <Lock size={12} className="opacity-50" />
                        <span className="text-[10px] text-gray-600 uppercase font-bold">Soon</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-2xl p-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-bold text-blue-400">Pro Mode</span>
                  </div>
                  <Switch checked={isPro} onCheckedChange={handleProSwitch} className="scale-75" />
                </div>
                <p className="text-[10px] text-gray-400 leading-relaxed">
                  Remove watermarks and unlock advanced features
                </p>
              </div>
            </div>
          </div>

          {/* --- MIDDLE & RIGHT COLUMN --- */}
          <div className="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-8 w-full">
            
            {/* 1. EDITOR */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Customize Design</h2>
                <p className="text-gray-400 text-sm">Tailor every detail to match your brand</p>
              </div>

              <div className="space-y-5 bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl">
                
                {activeTemplate !== 'whatsapp' && (
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400 font-bold uppercase tracking-wide flex items-center gap-2">
                      <Type size={12} />
                      Headline
                    </label>
                    <input 
                      value={activeTemplate === 'countdown' ? content.countdownTitle : activeTemplate === 'exit' ? content.exitHeadline : content.headline}
                      onChange={(e) => {
                          if(activeTemplate === 'countdown') setContent({...content, countdownTitle: e.target.value});
                          else if(activeTemplate === 'exit') setContent({...content, exitHeadline: e.target.value});
                          else setContent({...content, headline: e.target.value});
                      }}
                      className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:border-orange-500 outline-none transition-all hover:border-white/30"
                    />
                  </div>
                )}

                {(activeTemplate === 'simple' || activeTemplate === 'image' || activeTemplate === 'cookie' || activeTemplate === 'exit') && (
                  <>
                    <div className="space-y-2">
                      <label className="text-xs text-gray-400 font-bold uppercase tracking-wide">Description</label>
                      <textarea 
                        value={activeTemplate === 'exit' ? content.exitOffer : content.subheadline}
                        onChange={(e) => activeTemplate === 'exit' ? setContent({...content, exitOffer: e.target.value}) : setContent({...content, subheadline: e.target.value})}
                        className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:border-orange-500 outline-none min-h-[80px] transition-all hover:border-white/30"
                        placeholder="Add compelling copy..."
                      />
                    </div>
                    
                    {activeTemplate === 'image' && (
                      <div className="space-y-2">
                        <label className="text-xs text-gray-400 font-bold uppercase tracking-wide flex items-center gap-2">
                          <ImageIcon size={12} />
                          Image URL
                        </label>
                        <input 
                          value={content.imageUrl} 
                          onChange={(e) => setContent({...content, imageUrl: e.target.value})} 
                          className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:border-orange-500 outline-none transition-all hover:border-white/30" 
                          placeholder="https://..."
                        />
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs text-gray-400 font-bold uppercase tracking-wide">Button Text</label>
                        <input 
                          value={content.buttonText} 
                          onChange={(e) => setContent({...content, buttonText: e.target.value})} 
                          className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:border-orange-500 outline-none transition-all hover:border-white/30" 
                        />
                      </div>
                      {activeTemplate !== 'cookie' && activeTemplate !== 'exit' && (
                        <div className="space-y-2">
                          <label className="text-xs text-gray-400 font-bold uppercase tracking-wide">Coupon Code</label>
                          <input 
                            value={content.couponCode} 
                            onChange={(e) => setContent({...content, couponCode: e.target.value})} 
                            className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-sm text-white font-mono focus:border-orange-500 outline-none transition-all hover:border-white/30" 
                          />
                        </div>
                      )}
                    </div>
                  </>
                )}

                {activeTemplate === 'whatsapp' && (
                  <>
                    <div className="space-y-2">
                      <label className="text-xs text-gray-400 font-bold uppercase tracking-wide flex items-center gap-2">
                        <Smartphone size={12} className="text-green-500" />
                        WhatsApp Number
                      </label>
                      <input 
                        value={content.whatsappNumber} 
                        onChange={(e) => setContent({...content, whatsappNumber: e.target.value})} 
                        className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:border-green-500 outline-none transition-all hover:border-white/30" 
                        placeholder="919876543210" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-gray-400 font-bold uppercase tracking-wide">Welcome Message</label>
                      <textarea 
                        value={content.subheadline} 
                        onChange={(e) => setContent({...content, subheadline: e.target.value})} 
                        className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:border-green-500 outline-none min-h-[80px] transition-all hover:border-white/30" 
                      />
                    </div>
                  </>
                )}

                {activeTemplate === 'sales' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 col-span-2">
                      <label className="text-xs text-gray-400 font-bold uppercase tracking-wide flex items-center gap-2">
                        <ShoppingBag size={12} />
                        Product Name
                      </label>
                      <input 
                        value={content.productName} 
                        onChange={(e) => setContent({...content, productName: e.target.value})} 
                        className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none transition-all hover:border-white/30" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-gray-400 font-bold uppercase tracking-wide">Customer Name</label>
                      <input 
                        value={content.customerName} 
                        onChange={(e) => setContent({...content, customerName: e.target.value})} 
                        className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none transition-all hover:border-white/30" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-gray-400 font-bold uppercase tracking-wide flex items-center gap-2">
                        <MapPin size={12} />
                        City
                      </label>
                      <input 
                        value={content.customerLocation} 
                        onChange={(e) => setContent({...content, customerLocation: e.target.value})} 
                        className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none transition-all hover:border-white/30" 
                      />
                    </div>
                  </div>
                )}

                {activeTemplate === 'spin' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      {content.segments.map((seg, idx) => (
                        <div key={idx} className="space-y-1">
                          <label className="text-[10px] text-gray-500 uppercase font-bold">Segment {idx + 1}</label>
                          <input 
                            value={seg} 
                            onChange={(e) => updateSegment(idx, e.target.value)}
                            className="w-full bg-black border border-white/20 rounded-lg p-2.5 text-xs text-white focus:border-orange-500 outline-none transition-all hover:border-white/30"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTemplate === 'countdown' && (
                  <>
                    <div className="space-y-2">
                      <label className="text-xs text-gray-400 font-bold uppercase tracking-wide">Special Offer Text</label>
                      <input 
                        value={content.countdownOffer} 
                        onChange={(e) => setContent({...content, countdownOffer: e.target.value})} 
                        className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:border-red-500 outline-none transition-all hover:border-white/30" 
                      />
                    </div>
                  </>
                )}

                {activeTemplate !== 'whatsapp' && (
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400 font-bold uppercase tracking-wide flex items-center gap-2">
                      <Palette size={12} />
                      Brand Color
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="relative overflow-hidden w-12 h-12 rounded-xl border-2 border-white/20 cursor-pointer hover:scale-110 transition-transform">
                        <input 
                          type="color" 
                          value={content.color} 
                          onChange={(e) => setContent({...content, color: e.target.value})} 
                          className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer border-none"
                        />
                      </div>
                      <input 
                        value={content.color} 
                        onChange={(e) => setContent({...content, color: e.target.value})} 
                        className="flex-1 bg-black border border-white/20 rounded-xl px-4 py-3 text-sm text-white font-mono uppercase focus:border-orange-500 outline-none transition-all hover:border-white/30"
                      />
                    </div>
                  </div>
                )}

                {activeTemplate !== 'exit' && activeTemplate !== 'whatsapp' && (
                    <div className="space-y-2 pt-2 border-t border-white/5">
                        <label className="text-xs text-gray-400 font-bold uppercase tracking-wide flex items-center gap-2">
                            <Clock size={12} />
                            Display Delay ({content.delay}s)
                        </label>
                        <input 
                            type="range"
                            min="0"
                            max="15"
                            value={content.delay}
                            onChange={(e) => setContent({...content, delay: parseInt(e.target.value)})}
                            className="w-full accent-orange-500"
                        />
                        <div className="flex justify-between text-[10px] text-gray-600">
                            <span>Instant</span>
                            <span>15 seconds</span>
                        </div>
                    </div>
                )}

              </div>

              {/* ACTION: GENERATE OR VOTE */}
              {isLive ? (
                <div className="p-6 bg-gradient-to-br from-[#0a0a0a] to-[#050505] border border-white/10 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-white flex items-center gap-2">
                      <Code2 size={16} className="text-orange-500" />
                      Installation Code
                    </h3>
                    {isPro && (
                      <div className="flex items-center gap-1.5 text-xs bg-green-500/10 text-green-500 px-2.5 py-1 rounded-full">
                        <Check size={12} />
                        No Watermark
                      </div>
                    )}
                  </div>
                  <div className="bg-black p-4 rounded-xl border border-white/5 font-mono text-xs text-gray-500 max-h-32 overflow-y-auto mb-4">
                    {generateCode()}
                  </div>
                  <button
                    onClick={handleCopy}
                    className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:from-orange-500 hover:to-orange-400 font-bold py-3 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    {copied ? <><Check size={16}/> Copied!</> : <><Copy size={16}/> Copy Code</>}
                  </button>
                </div>
              ) : (
                <div className="p-8 bg-[#0a0a0a] border border-orange-500/20 rounded-2xl text-center relative overflow-hidden min-h-[220px] flex flex-col justify-center items-center">
                  <div className="absolute inset-0 bg-orange-500/5"></div>
                  
                  {voteStatus === 'voted' ? (
                    <div className="animate-in fade-in zoom-in duration-300 flex flex-col items-center">
                      <div className="h-14 w-14 bg-green-500/20 rounded-full flex items-center justify-center mb-3 text-green-500">
                        <Check size={28} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1">Response Recorded</h3>
                      <p className="text-gray-400 text-sm">Thanks! We'll notify you when this drops.</p>
                    </div>
                  ) : voteStatus === 'loading' ? (
                    <div className="animate-in fade-in duration-300 flex flex-col items-center">
                      <Loader2 size={32} className="text-orange-500 animate-spin mb-3" />
                      <h3 className="text-lg font-bold text-white">Registering Vote...</h3>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center w-full relative z-10">
                      <Lock size={32} className="text-orange-500 mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2">Code Locked</h3>
                      <p className="text-gray-400 text-sm mb-6 max-w-xs mx-auto">
                        Customize the preview, then vote to unlock this tool.
                      </p>
                      <Button 
                        onClick={handleVote}
                        className="bg-orange-600 hover:bg-orange-500 text-white font-bold w-full transition-all active:scale-95"
                      >
                        <ThumbsUp size={16} className="mr-2"/> Vote to Unlock
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 2. PREVIEW AREA */}
            <div className="relative flex flex-col gap-4">
                <div className="flex justify-end gap-2">
                    <button 
                        onClick={() => setDevicePreview('desktop')}
                        className={`p-2 rounded-lg transition-colors ${devicePreview === 'desktop' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}
                    >
                        <Monitor size={18} />
                    </button>
                    <button 
                        onClick={() => setDevicePreview('mobile')}
                        className={`p-2 rounded-lg transition-colors ${devicePreview === 'mobile' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}
                    >
                        <Smartphone size={18} />
                    </button>
                </div>

                <div className="flex justify-center">
                    <div className={`transition-all duration-500 ease-in-out bg-white rounded-xl overflow-hidden shadow-2xl relative border border-gray-800 flex items-center justify-center
                        ${devicePreview === 'mobile' ? 'w-[375px] h-[667px]' : 'w-full h-[600px]'}`}
                    >
                        {!isLive && (
                            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                                <div className="w-full bg-orange-500/90 py-3 text-center transform -rotate-3 shadow-xl backdrop-blur-md">
                                    <p className="text-white font-black text-xl uppercase tracking-widest drop-shadow-md">Coming Soon</p>
                                </div>
                            </div>
                        )}

                        <div className="absolute inset-0 bg-gray-100 opacity-100 bg-[url('https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png')] bg-cover bg-center grayscale opacity-10"></div>
                        
                        {activeTemplate === 'simple' && (
                            <div className="relative bg-white w-[85%] max-w-[320px] p-6 rounded-xl text-center shadow-xl border-t-4 animate-in fade-in duration-500" style={{ borderColor: content.color }}>
                                <div className="absolute top-2 right-3 text-gray-400 cursor-pointer"><X size={18}/></div>
                                <div className="text-4xl mb-3">🎁</div>
                                <h2 className="text-xl font-bold text-gray-900">{content.headline}</h2>
                                <p className="text-xs text-gray-500 my-2">{content.subheadline}</p>
                                <button className="w-full py-2 rounded text-white font-bold text-xs mt-2" style={{ background: content.color }}>{content.buttonText}</button>
                                {!isPro && <div className="mt-3 text-[9px] text-gray-300">⚡ Powered by ReadyFlow</div>}
                            </div>
                        )}

                        {activeTemplate === 'image' && (
                             <div className="relative bg-white w-[90%] max-w-[340px] rounded-xl text-center shadow-xl overflow-hidden animate-in fade-in duration-500">
                                <div className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center text-gray-600 shadow-sm z-10 pb-1 cursor-pointer">×</div>
                                {content.imageUrl ? <img src={content.imageUrl} className="w-full h-40 object-cover" alt="Preview"/> : <div className="h-40 bg-gray-200 flex items-center justify-center text-xs text-gray-500">Image Area</div>}
                                <div className="p-5">
                                    <h2 className="text-lg font-bold text-gray-900">{content.headline}</h2>
                                    <p className="text-xs text-gray-500 my-2">{content.subheadline}</p>
                                    <div className="bg-gray-100 border border-dashed border-gray-300 rounded p-2 flex justify-between">
                                        <span className="font-mono font-bold text-gray-800 text-sm">{content.couponCode}</span>
                                        <button className="bg-black text-white text-[10px] px-2 rounded">COPY</button>
                                    </div>
                                    {!isPro && <div className="mt-3 text-[9px] text-gray-300">⚡ Powered by ReadyFlow</div>}
                                </div>
                            </div>
                        )}

                        {activeTemplate === 'spin' && (
                            <div className="relative animate-in zoom-in fade-in duration-500 flex flex-col items-center">
                                <h3 className="mb-6 text-2xl font-black text-gray-800 drop-shadow-sm uppercase tracking-tight">{content.headline}</h3>
                                <div className="relative">
                                    <div className="w-80 h-80 rounded-full border-8 border-white shadow-2xl relative overflow-hidden transition-transform duration-[3000ms] cubic-bezier(0.15, 0, 0.15, 1)"
                                        style={{ transform: `rotate(${spinRotation}deg)` }}>
                                        {content.segments.map((seg, i) => {
                                            const rotateAngle = i * (360 / content.segments.length);
                                            const isEven = i % 2 === 0;
                                            return (
                                                <div key={i} className="absolute w-full h-full top-0 left-0" style={{ transform: `rotate(${rotateAngle}deg)` }}>
                                                    <div className="absolute w-full h-1/2 top-0 left-0 origin-bottom"
                                                         style={{ 
                                                              backgroundColor: isEven ? content.color : '#f3f4f6',
                                                              transform: `rotate(${360 / content.segments.length}deg) skewY(-${90 - (360/content.segments.length)}deg)`
                                                         }}>
                                                    </div>
                                                    <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center" style={{ transform: `rotate(${360/content.segments.length/2}deg)`, width: '80px' }}>
                                                        <span className={`text-[11px] font-bold uppercase tracking-wider block ${isEven ? 'text-white' : 'text-gray-800'}`}>{seg}</span>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div onClick={handleSpin} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-lg z-20 flex items-center justify-center font-black text-xs text-gray-800 cursor-pointer hover:scale-110 active:scale-95 transition-transform select-none border-4 border-gray-100">SPIN</div>
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[25px] border-t-gray-800 z-30 drop-shadow-lg"></div>
                                </div>
                                {!isPro && <div className="mt-8 text-[10px] text-gray-400 bg-white/80 px-3 py-1 rounded-full shadow-sm border">⚡ Powered by ReadyFlow</div>}
                            </div>
                        )}

                    </div>
                </div>
            </div>

          </div>
        </div>
      </div>

      {showUpgradeModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-[#111] border border-gray-700 p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-sm text-center relative animate-in zoom-in-95 duration-200">
                <button onClick={() => setShowUpgradeModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X size={20}/></button>
                
                <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock size={32} className="text-orange-500" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">Premium Feature Locked</h3>
                <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                    Advanced features like <strong>No Watermark</strong>, <strong>Pro Templates</strong>, and <strong>Custom Branding</strong> are only available on the Pro Plan.
                </p>

                <div className="flex flex-col gap-3">
                    <button 
                        onClick={() => router.push('/pricing')} 
                        className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-orange-500/20"
                    >
                        Upgrade Now - ₹29
                    </button>
                    <button 
                        onClick={() => setShowUpgradeModal(false)}
                        className="w-full py-3 text-gray-400 hover:text-white text-sm font-medium transition-colors"
                    >
                        Maybe Later
                    </button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
}