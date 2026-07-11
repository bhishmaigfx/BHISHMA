import React, { useState } from 'react';
import { CreditCard, Menu, X, ShieldCheck, ShoppingBag, Eye, LogOut } from 'lucide-react';
import { ActiveTab } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  savedInquiriesCount: number;
  onLogout: () => void;
}

export default function Navbar({ activeTab, setActiveTab, savedInquiriesCount, onLogout }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products & Materials' },
    { id: 'studio', label: 'ID Card Studio' },
    { id: 'calculator', label: 'Price Estimator' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Inquiry Hub' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-brand-200 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo Brand */}
          <div className="flex items-center">
            <button 
              onClick={() => { setActiveTab('home'); setIsOpen(false); }}
              className="flex items-center space-x-3 group cursor-pointer focus:outline-none"
              id="brand-logo-btn"
            >
              <div className="bg-accent-orange text-white w-10 h-10 rounded-lg flex items-center justify-center shadow-md transition-all duration-300 group-hover:-translate-y-0.5 shrink-0">
                <span className="font-bold text-xl font-display">B</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xl font-extrabold tracking-tight text-brand-950 transition-colors">
                  BHISHMA <span className="text-accent-orange">GRAPHICS</span>
                </span>
                <span className="text-[10px] font-mono tracking-widest text-brand-500 uppercase -mt-1 font-bold">
                  Premium ID Solutions
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-brand-950 text-white shadow-sm'
                    : 'text-brand-700 hover:bg-brand-200/60 hover:text-brand-950'
                }`}
              >
                {item.label}
                {item.id === 'contact' && savedInquiriesCount > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.5 bg-accent-orange text-white text-[10px] font-bold rounded-full">
                    {savedInquiriesCount}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-3">
            <div className="flex items-center space-x-1 text-xs text-brand-600 bg-brand-200 py-1.5 px-3 rounded-full border border-brand-300">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span className="font-medium">ISO 9001 Certified</span>
            </div>
            
            <button
              id="cta-nav-quote"
              onClick={() => setActiveTab('calculator')}
              className="bg-accent-orange hover:bg-accent-orange-hover text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center space-x-1.5 cursor-pointer hover:-translate-y-0.5"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Get Free Quote</span>
            </button>

            <button
              id="cta-nav-logout"
              onClick={onLogout}
              className="border border-brand-300 hover:bg-brand-200/50 text-brand-700 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center space-x-1.5 cursor-pointer hover:-translate-y-0.5"
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden xl:inline">Sign Out</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            {savedInquiriesCount > 0 && activeTab !== 'contact' && (
              <span className="mr-2 px-2 py-0.5 bg-accent-orange text-white text-xs font-bold rounded-full">
                {savedInquiriesCount}
              </span>
            )}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-700 hover:text-brand-950 p-2 rounded-lg hover:bg-brand-200 focus:outline-none cursor-pointer"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-brand-200 bg-white shadow-inner animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="px-3 pt-3 pb-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-item-${item.id}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 flex items-center justify-between ${
                  activeTab === item.id
                    ? 'bg-brand-950 text-white'
                    : 'text-brand-700 hover:bg-brand-200/60 hover:text-brand-950'
                }`}
              >
                <span>{item.label}</span>
                {item.id === 'contact' && savedInquiriesCount > 0 && (
                  <span className="px-2 py-0.5 bg-accent-orange text-white text-xs font-bold rounded-full">
                    {savedInquiriesCount} active
                  </span>
                )}
              </button>
            ))}
            <div className="pt-4 pb-2 border-t border-brand-200 px-4 flex flex-col space-y-3">
              <div className="flex items-center justify-center space-x-1.5 text-xs text-brand-600 bg-brand-200 py-2 rounded-lg">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span className="font-semibold">ISO 9001 Quality Standard</span>
              </div>
              <button
                id="mobile-cta-nav-quote"
                onClick={() => {
                  setActiveTab('calculator');
                  setIsOpen(false);
                }}
                className="w-full bg-accent-orange hover:bg-accent-orange-hover text-white text-center py-3 rounded-xl font-bold shadow-md transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Get Instant Estimation</span>
              </button>
              
              <button
                id="mobile-cta-nav-logout"
                onClick={() => {
                  setIsOpen(false);
                  onLogout();
                }}
                className="w-full border border-brand-300 hover:bg-brand-200/50 text-brand-700 text-center py-3 rounded-xl font-bold transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
