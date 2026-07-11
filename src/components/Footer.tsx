import React from 'react';
import { CreditCard, ShieldAlert, Award, ShieldCheck } from 'lucide-react';
import { ActiveTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const currentYear = 2026; // Static fixed based on target current local year metadata.

  return (
    <footer className="bg-brand-950 text-white border-t border-brand-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-brand-900 pb-12 text-left">
          
          {/* Col 1: Brand details */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-accent-orange text-white w-9 h-9 rounded-lg flex items-center justify-center shadow-md shrink-0">
                <span className="font-bold text-base font-display">B</span>
              </div>
              <span className="text-lg font-black tracking-tight uppercase">
                BHISHMA <span className="text-accent-orange">GRAPHICS</span>
              </span>
            </div>
            <p className="text-xs text-brand-400 leading-relaxed font-medium">
              Bhishma Graphics is an industry-leading manufacturer of high-security identification badges, RFID proximity cards, customized dye-sublimation lanyards, and premium badge holders.
            </p>
            
            <div className="flex items-center space-x-2 text-[10px] font-mono text-brand-500 font-bold bg-brand-900/50 p-2 rounded border border-brand-800 w-fit">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
              <span>SGS certified PVC & RFID Smart Cards</span>
            </div>
          </div>

          {/* Col 2: Navigation links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-brand-300 mb-4 font-mono">
              Secure Solutions
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-brand-400">
              <li>
                <button 
                  onClick={() => setActiveTab('home')} 
                  className="hover:text-accent-orange transition-colors cursor-pointer"
                >
                  Homepage Portal
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('products')} 
                  className="hover:text-accent-orange transition-colors cursor-pointer"
                >
                  Products & Materials Showcase
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('studio')} 
                  className="hover:text-accent-orange transition-colors cursor-pointer"
                >
                  Interactive ID Studio Builder
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('calculator')} 
                  className="hover:text-accent-orange transition-colors cursor-pointer"
                >
                  Volume Pricing Estimator
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('about')} 
                  className="hover:text-accent-orange transition-colors cursor-pointer"
                >
                  Corporate Legacy & Accordions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('contact')} 
                  className="hover:text-accent-orange transition-colors cursor-pointer"
                >
                  Inquiry Ticket Registry
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Materials Index */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-brand-300 mb-4 font-mono">
              Engineered Materials
            </h4>
            <ul className="space-y-2 text-xs font-medium text-brand-400">
              <li>• Premium Pure PVC (CR-80 size)</li>
              <li>• Sustainable Bamboo & Wood</li>
              <li>• Recyclable Eco-Friendly Polycarbonate</li>
              <li>• MIFARE DESFire EV1 Chips</li>
              <li>• Satin Smooth & Ribbed Polyester Lanyards</li>
              <li>• Rigid Polycarbonate Holder Pockets</li>
            </ul>
          </div>

          {/* Col 4: Address Details */}
          <div className="flex flex-col space-y-3.5">
            <h4 className="text-sm font-bold uppercase tracking-wider text-brand-300 mb-2 font-mono">
              Contact Desk
            </h4>
            
            <p className="text-xs text-brand-400 leading-relaxed font-medium">
              Plot No. 12, Industrial Area Phase II, Near High-Resolution Card Hub, Delhi, India
            </p>
            
            <div className="text-xs font-mono font-bold text-brand-300">
              <span className="block text-[10px] text-brand-500 font-bold uppercase">Phone Hotline:</span>
              <span className="text-white">+91 99990 01122</span>
            </div>

            <div className="text-xs font-mono font-bold text-brand-300">
              <span className="block text-[10px] text-brand-500 font-bold uppercase">Support Email:</span>
              <span className="text-white">bhishmaid@gmail.com</span>
            </div>
          </div>

        </div>

        {/* Brand bottom footer trademark */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-500 font-medium">
          <p>
            © {currentYear} BHISHMA GRAPHICS. All Rights Reserved. Identity Systems engineered for physical security.
          </p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <span className="hover:text-brand-300 transition-colors">Privacy Charter</span>
            <span>•</span>
            <span className="hover:text-brand-300 transition-colors">Anti-Counterfeiting Terms</span>
            <span>•</span>
            <span className="hover:text-brand-300 transition-colors">ISO Quality Standard</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
