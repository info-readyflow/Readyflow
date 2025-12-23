"use client";

import React, { useState, useEffect } from 'react';
// FIX: Added 'X' to imports
import { 
  ShieldCheck, Code2, Check, Monitor, Smartphone, 
  Lock, Loader2, X 
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useRouter } from 'next/navigation';
import { auth, db } from "@/lib/firebase"; 
import { doc, getDoc, updateDoc, increment } from "firebase/firestore"; 

const RTO_LIST = ["801108","800027","800020","110094","110095","110096","122107","249202"];

export default function RTOShieldBuilder() {
  const router = useRouter(); 
  const [isMounted, setIsMounted] = useState(false);
  
  const [hasPremiumPlan, setHasPremiumPlan] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState(true);
  const [copied, setCopied] = useState(false);
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'mobile'>('desktop');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isPro, setIsPro] = useState(false); 

  // Settings State
  const [settings, setSettings] = useState({
    headline: "Verify delivery",
    subheadline: "SECURE CHECKOUT ENABLED", 
    color: "#6366f1", 
    badgeText: "RF", 
    buttonText: "CONTINUE TO BUY",
    delay: 2, 
  });

  useEffect(() => {
    setIsMounted(true);
    const checkPlan = async () => {
        const user = auth.currentUser;
        if (!user) { setLoadingPlan(false); return; }
        try {
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists() && (userSnap.data().plan === "Premium" || userSnap.data().plan === "Pro")) {
                setHasPremiumPlan(true);
            }
        } catch (err) { console.error(err); }
        setLoadingPlan(false);
    };
    checkPlan();
  }, []);

  // Tracking Function for Dashboard
  const trackToolUsage = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          toolsUsed: increment(1),
          lastToolUsedAt: new Date()
        });
      } catch (err) {
        console.error("Firestore Tracking Error:", err);
      }
    }
  };

  const generateSnippet = () => {
    const watermark = isPro ? "" : `<a href="https://readyflow.in" target="_blank" style="display:block; margin-top:20px; font-size:10px; color:#cbd5e1; text-decoration:none; text-align:center; font-family:sans-serif; font-weight:700; opacity:0.6;">⚡ PROTECTED BY READYFLOW</a>`;
    
    return `<style>
  #rf-shield-wrapper { position: fixed; inset: 0; background: rgba(0,0,0,0.85); display: flex; align-items: center; justify-content: center; z-index: 2147483647; font-family: 'Inter', sans-serif; backdrop-filter: blur(10px); visibility: hidden; opacity: 0; transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
  #rf-shield-wrapper.active { visibility: visible; opacity: 1; }
  .rf-card { width: 420px; max-width: 92%; background: #ffffff; border-radius: 28px; padding: 45px 35px; box-shadow: 0 40px 100px -10px rgba(0,0,0,0.6); color: #111; text-align: center; }
  .rf-badge { width: 65px; height: 65px; background: ${settings.color}; border-radius: 20px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 900; margin: 0 auto 30px; font-size: 26px; box-shadow: 0 20px 40px -8px ${settings.color}66; }
  .rf-title { font-size: 26px; font-weight: 900; margin: 0 0 12px; letter-spacing: -0.04em; color: #111; }
  .rf-sub { font-size: 11px; color: #888; margin-bottom: 35px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.15em; }
  .rf-input { width: 100%; padding: 20px; border: 2px solid #f0f0f0; border-radius: 18px; margin-bottom: 20px; text-align: center; font-size: 22px; font-weight: 900; color: #111; letter-spacing: 0.3em; box-sizing: border-box; }
  .rf-btn { width: 100%; background: ${settings.color}; color: #fff; border: none; padding: 20px; border-radius: 18px; font-weight: 900; cursor: pointer; transition: all 0.3s; text-transform: uppercase; letter-spacing: 0.12em; font-size: 14px; }
  .rf-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  .rf-error { color: #e11d48; font-size: 13px; margin-top: 18px; font-weight: 800; display: none; text-transform: uppercase; }
</style>
<div id="rf-shield-wrapper">
  <div class="rf-card">
    <div class="rf-badge">${settings.badgeText}</div>
    <h3 class="rf-title">${settings.headline}</h3>
    <p class="rf-sub">${settings.subheadline}</p>
    <input id="rf-pin-field" class="rf-input" type="text" inputmode="numeric" maxlength="6" placeholder="000000">
    <button id="rf-verify-btn" class="rf-btn" disabled>${settings.buttonText}</button>
    <div id="rf-error-msg" class="rf-error"></div>
    ${watermark}
  </div>
</div>
<script>
(function(){
  if(localStorage.getItem('rf_shield_verified')) return;
  const RTO_DB = new Set(${JSON.stringify(RTO_LIST)});
  const FAKE_PATTERNS = [/^(\\d)\\1{5}$/, /^123456$/, /^012345$/, /^654321$/, /^111111$/];
  setTimeout(() => {
    const wrap = document.getElementById('rf-shield-wrapper');
    const inp = document.getElementById('rf-pin-field');
    const btn = document.getElementById('rf-verify-btn');
    const err = document.getElementById('rf-error-msg');
    wrap.classList.add('active');
    inp.addEventListener('input', () => { btn.disabled = inp.value.length !== 6; err.style.display = 'none'; });
    btn.addEventListener('click', () => {
      const val = inp.value;
      if(RTO_DB.has(val) || FAKE_PATTERNS.some(p => p.test(val))) {
        err.innerText = '⚠️ DELIVERY BLOCKED FOR THIS PINCODE'; err.style.display = 'block';
      } else {
        btn.innerText = 'VERIFYING...';
        setTimeout(() => { localStorage.setItem('rf_shield_verified', 'true'); wrap.remove(); }, 1200);
      }
    });
  }, ${settings.delay * 1000});
})();
</script>`;
  };

  return (
    <div className="w-full space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* --- CONTROLS PANEL --- */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-[2.5rem] shadow-2xl space-y-8">
            <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-between">
                Shield Settings {loadingPlan && <Loader2 size={12} className="animate-spin text-indigo-500" />}
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-500 px-1">Main Heading</label>
                <input value={settings.headline} onChange={(e) => setSettings({...settings, headline: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-indigo-500 outline-none transition-all" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-500 px-1">Sub-headline</label>
                <input value={settings.subheadline} onChange={(e) => setSettings({...settings, subheadline: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-indigo-500 outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-500 px-1">Badge</label>
                  <input value={settings.badgeText} maxLength={2} onChange={(e) => setSettings({...settings, badgeText: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm font-black text-center" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-500 px-1">Brand Color</label>
                  <input type="color" value={settings.color} onChange={(e) => setSettings({...settings, color: e.target.value})} className="w-full h-12 rounded-2xl cursor-pointer bg-white/[0.03] border border-white/10 p-1" />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between text-[10px] font-black text-gray-500 px-1">
                  <span>Display Delay</span>
                  <span className="text-indigo-400 font-bold">{settings.delay}s</span>
                </div>
                <input type="range" min="0" max="30" value={settings.delay} onChange={(e) => setSettings({...settings, delay: parseInt(e.target.value)})} className="w-full accent-indigo-500" />
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 flex items-center justify-between">
               <div className="flex items-center gap-2 text-blue-400">
                 <ShieldCheck size={18} />
                 <span className="text-[10px] font-black uppercase italic">White Label</span>
               </div>
               <Switch checked={isPro} onCheckedChange={(c) => { if(c && !hasPremiumPlan) setShowUpgradeModal(true); else setIsPro(c); }} className="scale-75" />
            </div>
          </div>

          <button 
            onClick={async () => { 
              await navigator.clipboard.writeText(generateSnippet()); 
              setCopied(true); 
              await trackToolUsage(); 
              setTimeout(()=>setCopied(false), 2000); 
            }} 
            className="w-full bg-indigo-600 text-white font-black py-6 rounded-[2rem] hover:bg-indigo-500 transition-all flex items-center justify-center gap-3 text-sm uppercase tracking-widest shadow-2xl"
          >
            {copied ? <Check size={20}/> : <Code2 size={20}/>} 
            {copied ? 'Code Copied!' : 'Copy Shield Code'}
          </button>
        </div>

        {/* --- LIVE PREVIEW AREA --- */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex justify-end gap-3 px-2">
              <button onClick={() => setDevicePreview('desktop')} className={`p-4 rounded-2xl transition-all ${devicePreview === 'desktop' ? 'bg-white/10 text-white shadow-xl' : 'text-gray-600 hover:text-gray-400'}`}><Monitor size={20} /></button>
              <button onClick={() => setDevicePreview('mobile')} className={`p-4 rounded-2xl transition-all ${devicePreview === 'mobile' ? 'bg-white/10 text-white shadow-xl' : 'text-gray-600 hover:text-gray-400'}`}><Smartphone size={20} /></button>
          </div>

          <div className={`mx-auto transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] bg-white rounded-[4rem] overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.6)] relative border-[14px] border-gray-950 flex items-center justify-center
              ${devicePreview === 'mobile' ? 'w-[375px] h-[667px]' : 'w-full h-[650px]'}`}
          >
              <div className="absolute inset-0 bg-gray-50 bg-[url('https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png')] bg-cover opacity-10 grayscale"></div>
              
              {isMounted && (
                <div className="relative z-30 w-full flex justify-center p-8 animate-in zoom-in duration-700">
                  <div className="bg-white w-full max-w-[360px] p-12 rounded-[3rem] shadow-[0_40px_80px_rgba(0,0,0,0.15)] text-center">
                    <div className="w-16 h-16 rounded-[1.4rem] flex items-center justify-center text-white font-black text-2xl mb-8 mx-auto shadow-2xl" style={{ background: settings.color, boxShadow: `0 20px 40px -10px ${settings.color}88` }}>
                      {settings.badgeText}
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tighter leading-tight mb-3">{settings.headline}</h3>
                    <p className="text-[11px] text-gray-400 font-black uppercase tracking-[0.2em] mb-10">{settings.subheadline}</p>
                    
                    <div className="w-full bg-gray-50 border-2 border-gray-100 rounded-[1.2rem] py-5 mb-5 text-gray-300 font-black tracking-[0.4em] text-xl select-none">
                      000000
                    </div>
                    
                    <button disabled className="w-full py-5 rounded-[1.2rem] text-white font-black text-xs tracking-widest shadow-2xl opacity-90 uppercase" style={{ background: settings.color }}>
                      {settings.buttonText}
                    </button>
                    {!isPro && <div className="mt-8 text-[9px] text-gray-300 font-black uppercase tracking-[0.25em]">⚡ Powered by ReadyFlow</div>}
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
      
       {/* --- UPGRADE MODAL --- */}
       {showUpgradeModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 backdrop-blur-3xl p-6">
            <div className="bg-[#0a0a0a] border border-white/10 p-12 rounded-[4rem] w-full max-w-md text-center animate-in zoom-in-95 duration-500 shadow-[0_0_100px_rgba(59,130,246,0.1)]">
                <button onClick={() => setShowUpgradeModal(false)} className="absolute top-8 right-8 text-gray-600 hover:text-white transition-all"><X size={28}/></button>
                <div className="w-24 h-24 bg-blue-500/10 rounded-[2rem] flex items-center justify-center mx-auto mb-10 rotate-12"><Lock size={45} className="text-blue-500" /></div>
                <h3 className="text-4xl font-black text-white mb-4 tracking-tighter leading-none uppercase">Premium Locked</h3>
                <p className="text-gray-400 mb-12 leading-relaxed text-sm font-medium italic">Advanced white-labeling and high-priority database updates are only for Premium partners.</p>
                <button onClick={() => router.push('/pricing')} className="w-full py-6 bg-orange-500 text-black font-black rounded-3xl hover:bg-orange-400 transition-all shadow-2xl shadow-orange-500/20 uppercase tracking-widest text-xs">Upgrade for ₹29</button>
            </div>
        </div>
      )}
    </div>
  );
}