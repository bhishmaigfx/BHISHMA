import React from 'react';
import { CreditCard, Shield, Zap, Sparkles, Award, ArrowRight } from 'lucide-react';
import { ActiveTab } from '../types';

interface HeroProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export default function Hero({ setActiveTab }: HeroProps) {
  // Path to the high-fidelity 16:9 product render we generated
  const heroImageSrc = "/src/assets/images/premium_id_cards_1783786505624.jpg";

  return (
    <div className="relative overflow-hidden bg-brand-100 py-12 lg:py-20">
      {/* Background elegant abstract shapes */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-accent-orange/5 blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-950/5 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* Tagline */}
            <div className="inline-flex items-center space-x-2 bg-accent-orange/10 border border-accent-orange/20 px-3.5 py-1.5 rounded-full text-accent-orange text-xs font-bold tracking-wide uppercase mb-6 w-fit">
              <span className="flex h-2 w-2 rounded-full bg-accent-orange animate-pulse"></span>
              <span>Industry Leading Identity Solutions</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-950 tracking-tight leading-tight mb-6">
              Premium Identity <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-violet-600 italic">Reimagined.</span>
            </h1>
            
            {/* Sub-headline */}
            <p className="text-lg text-brand-700 font-normal leading-relaxed mb-8 max-w-2xl">
              Bhishma Graphics provides end-to-end ID card solutions for corporates, schools, and events. High-durability materials meets cutting-edge design for a secure and professional finish.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-10">
              <button
                id="hero-cta-studio"
                onClick={() => setActiveTab('studio')}
                className="bg-accent-orange hover:bg-accent-orange-hover text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl shadow-indigo-200 transition-all duration-200 flex items-center justify-center space-x-2.5 cursor-pointer transform hover:-translate-y-0.5 group"
              >
                <CreditCard className="h-5 w-5" />
                <span>Launch ID Studio Builder</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                id="hero-cta-estimator"
                onClick={() => setActiveTab('calculator')}
                className="bg-white hover:bg-brand-200 border border-brand-300 text-brand-900 font-bold px-8 py-4 rounded-xl shadow-sm transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer transform hover:-translate-y-0.5"
              >
                <span>Calculate Pricing</span>
              </button>
            </div>

            {/* Key Value Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-brand-200/80 pt-8">
              
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600 shrink-0 mt-0.5">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-950">Scratch-Proof Overlays</h4>
                  <p className="text-xs text-brand-600 mt-0.5 font-medium">Extra protective coating prevents fading for up to 5 years.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 bg-amber-100 rounded-lg text-amber-600 shrink-0 mt-0.5">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-950">48-Hr Rapid Delivery</h4>
                  <p className="text-xs text-brand-600 mt-0.5 font-medium">Fast tracked prototyping and priority dispatch available.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600 shrink-0 mt-0.5">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-950">100% Quality Inspected</h4>
                  <p className="text-xs text-brand-600 mt-0.5 font-medium">Each RFID card verified and fully chip-tested.</p>
                </div>
              </div>

            </div>

          </div>

          {/* Hero Right Media */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-full">
              
              {/* Backlight glow effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-accent-orange to-brand-950 rounded-2xl filter blur-xl opacity-15 transform rotate-2 translate-y-3" />

              {/* Main image container */}
              <div className="relative bg-white p-3 rounded-2xl shadow-xl border border-brand-200 transform hover:rotate-1 transition-transform duration-500 overflow-hidden">
                <img
                  src={heroImageSrc}
                  alt="Bhishma Graphics Premium Smart ID Cards & Lanyards"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto rounded-xl object-cover"
                />
                
                {/* Premium floating badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-brand-950/95 backdrop-blur-md text-white p-4 rounded-xl border border-brand-800 shadow-lg flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-mono tracking-widest text-brand-400 uppercase font-semibold">Featured Solutions</p>
                    <h3 className="text-sm font-bold mt-0.5">Secure Retransfer Smart Cards</h3>
                  </div>
                  <div className="bg-accent-orange text-white text-xs font-bold px-2.5 py-1 rounded-md">
                    HD PRINT
                  </div>
                </div>
              </div>

              {/* Floating micro stat badges to make it super interactive */}
              <div className="absolute top-6 -left-6 bg-white py-2.5 px-4 rounded-xl shadow-md border border-brand-200 flex items-center space-x-2.5 transform -rotate-2">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-bold text-brand-950">50K+ Cards Delivered</span>
              </div>

              <div className="absolute bottom-12 -right-4 bg-white py-2.5 px-4 rounded-xl shadow-md border border-brand-200 flex items-center space-x-2 transform rotate-3">
                <span className="text-amber-500 text-sm">★★★★★</span>
                <span className="text-xs font-bold text-brand-900">4.9/5 Client Rating</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
