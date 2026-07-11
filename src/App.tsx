import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCatalog from './components/ProductCatalog';
import InteractiveBuilder from './components/InteractiveBuilder';
import QuoteCalculator from './components/QuoteCalculator';
import AboutUs from './components/AboutUs';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AuthScreen from './components/AuthScreen';
import { auth } from './firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { ActiveTab, SavedInquiry, CardDesignData } from './types';
import { ShieldCheck, Cpu, CreditCard, Sparkles, Phone, HelpCircle } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedMaterial, setSelectedMaterial] = useState<'pvc_premium' | 'pvc_eco' | 'rfid_smart' | 'magnetic_stripe' | 'wooden_eco'>('pvc_premium');
  const [savedCustomDesign, setSavedCustomDesign] = useState<CardDesignData | null>(null);
  const [savedInquiries, setSavedInquiries] = useState<SavedInquiry[]>([]);

  // Load inquiries from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('bhishma_graphics_inquiries');
      if (stored) {
        setSavedInquiries(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Error loading inquiry history from localStorage:', e);
    }
  }, []);

  // Listen for Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setActiveTab('home');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Save inquiries helper
  const handleInquirySubmitted = (newInquiry: SavedInquiry) => {
    const updated = [newInquiry, ...savedInquiries];
    setSavedInquiries(updated);
    try {
      localStorage.setItem('bhishma_graphics_inquiries', JSON.stringify(updated));
    } catch (e) {
      console.error('Error storing inquiry to localStorage:', e);
    }
  };

  const handleClearInquiries = () => {
    setSavedInquiries([]);
    try {
      localStorage.removeItem('bhishma_graphics_inquiries');
    } catch (e) {
      console.error('Error removing inquiries from localStorage:', e);
    }
  };

  // Connects Card Studio -> Calculator
  const handleAddDesignToQuote = (design: CardDesignData) => {
    setSavedCustomDesign(design);
    
    // Map design's selected template / category to a matching calculator material
    if (design.showChip) {
      setSelectedMaterial('rfid_smart');
    } else {
      setSelectedMaterial('pvc_premium');
    }

    // Direct user straight to Estimator to see pricing
    setActiveTab('calculator');
  };

  const renderActiveContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-0 animate-in fade-in duration-300">
            {/* Main Hero Banner with Generated Image */}
            <Hero setActiveTab={setActiveTab} />

            {/* Premium Client Sector logos banner */}
            <div className="bg-white border-y border-brand-200 py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-xs font-mono tracking-widest text-brand-500 font-bold uppercase mb-6">
                  Providing Identity Solutions for Key Industries Worldwide
                </p>
                <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
                  <div className="flex items-center space-x-1 font-display font-black text-brand-700 text-sm">
                    <ShieldCheck className="h-4 w-4 text-accent-orange" />
                    <span>DEFENSE SECURITY</span>
                  </div>
                  <div className="flex items-center space-x-1 font-display font-black text-brand-700 text-sm">
                    <Cpu className="h-4 w-4 text-accent-orange" />
                    <span>TECH CONGLOMERATE</span>
                  </div>
                  <div className="flex items-center space-x-1 font-display font-black text-brand-700 text-sm">
                    <CreditCard className="h-4 w-4 text-accent-orange" />
                    <span>METROPOLITAN TRANSIT</span>
                  </div>
                  <div className="flex items-center space-x-1 font-display font-black text-brand-700 text-sm">
                    <Sparkles className="h-4 w-4 text-accent-orange" />
                    <span>NATIONAL UNIVERSITY</span>
                  </div>
                </div>
              </div>
            </div>

            {/* High-Fidelity Quick Features explanation section */}
            <div className="bg-brand-100 py-16 text-left">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-8">
                  
                  <div className="bg-white p-6 sm:p-8 rounded-2xl border border-brand-200 shadow-premium">
                    <div className="w-10 h-10 bg-accent-orange/10 rounded-xl flex items-center justify-center text-accent-orange mb-5 font-bold">
                      1
                    </div>
                    <h3 className="text-lg font-bold text-brand-950">Pick Material Stock</h3>
                    <p className="text-xs sm:text-sm text-brand-700 mt-2.5 leading-relaxed">
                      Choose from heavy gloss PVC, bio-compostable eco plastic, dual-frequency RFID chips, or premium sustainable wooden cards.
                    </p>
                  </div>

                  <div className="bg-white p-6 sm:p-8 rounded-2xl border border-brand-200 shadow-premium">
                    <div className="w-10 h-10 bg-accent-orange/10 rounded-xl flex items-center justify-center text-accent-orange mb-5 font-bold">
                      2
                    </div>
                    <h3 className="text-lg font-bold text-brand-950">Design Interactive Samples</h3>
                    <p className="text-xs sm:text-sm text-brand-700 mt-2.5 leading-relaxed">
                      Input employee names, roles, custom corporate headers, and upload employee photos inside our live Studio WYSIWYG cardbuilder.
                    </p>
                  </div>

                  <div className="bg-white p-6 sm:p-8 rounded-2xl border border-brand-200 shadow-premium">
                    <div className="w-10 h-10 bg-accent-orange/10 rounded-xl flex items-center justify-center text-accent-orange mb-5 font-bold">
                      3
                    </div>
                    <h3 className="text-lg font-bold text-brand-950">Calculate Tier Estimates</h3>
                    <p className="text-xs sm:text-sm text-brand-700 mt-2.5 leading-relaxed">
                      Slide to your required quantity, add customized satin logo lanyards, clear badges, and request an official PDF quotation instantly.
                    </p>
                  </div>

                </div>
              </div>
            </div>

            {/* Dynamic Banner to Studio Builder */}
            <div className="bg-brand-950 text-white py-16 relative overflow-hidden text-center sm:text-left">
              <div className="absolute top-[-50%] right-[-10%] w-[400px] h-[400px] rounded-full bg-accent-orange/10 blur-[100px]" />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="md:flex md:items-center md:justify-between">
                  <div className="max-w-2xl">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      Ready to customize corporate ID badges?
                    </h3>
                    <p className="text-sm text-brand-400 mt-2.5 leading-relaxed">
                      Try our interactive card studio. Switch layout orientations, toggle digital barcodes, toggle smart microchips, and see live high-fidelity previews instantly.
                    </p>
                  </div>
                  <div className="mt-8 md:mt-0">
                    <button
                      onClick={() => setActiveTab('studio')}
                      className="bg-accent-orange hover:bg-accent-orange-hover text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer inline-flex items-center space-x-2"
                    >
                      <span>Open Interactive Studio</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        );
      case 'products':
        return <ProductCatalog setActiveTab={setActiveTab} setSelectedMaterial={setSelectedMaterial} />;
      case 'studio':
        return <InteractiveBuilder onAddDesignToQuote={handleAddDesignToQuote} />;
      case 'calculator':
        return (
          <QuoteCalculator
            selectedMaterial={selectedMaterial}
            setSelectedMaterial={setSelectedMaterial}
            savedCustomDesign={savedCustomDesign}
            onInquirySubmitted={handleInquirySubmitted}
          />
        );
      case 'about':
        return <AboutUs />;
      case 'contact':
        return (
          <ContactForm 
            savedInquiries={savedInquiries} 
            onInquirySubmitted={handleInquirySubmitted}
            onClearInquiries={handleClearInquiries}
          />
        );
      default:
        return null;
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-brand-100 flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-flex bg-accent-orange text-white w-14 h-14 rounded-2xl items-center justify-center shadow-lg animate-pulse mb-4">
            <span className="font-bold text-3xl font-display">B</span>
          </div>
          <h2 className="text-xl font-black text-brand-950 tracking-tight">BHISHMA GRAPHICS</h2>
          <div className="mt-4 flex items-center justify-center space-x-2">
            <div className="w-2.5 h-2.5 bg-accent-orange rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2.5 h-2.5 bg-accent-orange rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2.5 h-2.5 bg-accent-orange rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <p className="text-xs font-mono text-brand-500 uppercase tracking-widest mt-4">Initializing Secure Workspace</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen onSuccess={() => setActiveTab('home')} />;
  }

  return (
    <div className="min-h-screen bg-brand-100 flex flex-col justify-between animate-in fade-in duration-300">
      {/* Scroll to top anchor */}
      <div id="top-anchor" />

      {/* Persistent Brand Header */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          // Auto-scroll to top smoothly upon tab change
          document.getElementById('top-anchor')?.scrollIntoView({ behavior: 'smooth' });
        }}
        savedInquiriesCount={savedInquiries.length}
        onLogout={handleLogout}
      />

      {/* Central Screen Panel Layout */}
      <main className="flex-grow">
        {renderActiveContent()}
      </main>

      {/* Persistent Footer */}
      <Footer 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          document.getElementById('top-anchor')?.scrollIntoView({ behavior: 'smooth' });
        }} 
      />
    </div>
  );
}
