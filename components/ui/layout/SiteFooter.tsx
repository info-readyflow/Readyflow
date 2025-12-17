"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; 
import { Github, Twitter, Youtube, Mail, Instagram } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8 text-white">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
            {/* BRAND COLUMN */}
            <div className="space-y-4">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative h-10 w-10 flex items-center">
                        <Image 
                            src="/logo.png"
                            alt="ReadyFlow Logo"
                            width={40} 
                            height={40} 
                            className="h-full w-auto object-contain"
                        />
                    </div>
                    <span className="font-bold text-lg tracking-tight text-white">
                        ReadyFlow
                    </span>
                </Link>
                <p className="text-gray-400 text-sm leading-relaxed">
                    The ultimate operating system for Indian Dropshippers. Stop chasing revenue, start scaling <b>Net Profit</b>.
                </p>
                <div className="flex gap-4 pt-2">
                    <Link href="https://twitter.com" target="_blank" className="text-gray-400 hover:text-white transition-colors"><Twitter size={18} /></Link>
                    <Link href="https://instagram.com" target="_blank" className="text-gray-400 hover:text-white transition-colors"><Instagram size={18} /></Link>
                    <Link href="https://youtube.com" target="_blank" className="text-gray-400 hover:text-white transition-colors"><Youtube size={18} /></Link>
                    <Link href="mailto:support@readyflow.in" className="text-gray-400 hover:text-white transition-colors"><Mail size={18} /></Link>
                </div>
            </div>

            {/* TOOLS COLUMN */}
            <div>
                <h4 className="font-bold mb-6 text-white">Core Tools</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                    <li><Link href="/tools/profit-calculator" className="hover:text-orange-500 transition-colors">Profit Calculator</Link></li>
                    <li><Link href="/tools/policy-generator" className="hover:text-orange-500 transition-colors">Policy Generator</Link></li>
                    <li><Link href="/tools/popup-builder" className="hover:text-orange-500 transition-colors">High-Converting Popups</Link></li>
                    <li><Link href="/tools/smart-chatbot" className="hover:text-orange-500 transition-colors">AI Support Chatbot</Link></li>
                </ul>
            </div>

            {/* RESOURCES COLUMN */}
            <div>
                <h4 className="font-bold mb-6 text-white">Explore</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                    <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing Plans</Link></li>
                    <li><Link href="/#how-it-works" className="hover:text-white transition-colors">How it Works</Link></li>
                    <li><Link href="/dashboard" className="hover:text-white transition-colors">User Dashboard</Link></li>
                    <li><Link href="/login" className="hover:text-white transition-colors">Partner Login</Link></li>
                </ul>
            </div>

            {/* LEGAL COLUMN */}
            <div>
                <h4 className="font-bold mb-6 text-white">Legal</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                    <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                    <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                    <li><Link href="/refund" className="hover:text-white transition-colors">Refund Policy</Link></li>
                    <li><Link href="/contact" className="hover:text-white transition-colors">Support</Link></li>
                </ul>
            </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>© 2025 ReadyFlow. All rights reserved.</p>
            <p className="flex items-center gap-1">Developed by <span className="text-white font-medium">Aditya</span> | Made with <span className="text-orange-500">🧡</span> in India.</p>
        </div>

      </div>
    </footer>
  );
}

export default SiteFooter;