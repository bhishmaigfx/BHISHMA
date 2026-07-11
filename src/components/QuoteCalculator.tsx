import React, { useState, useEffect } from 'react';
import { Calculator, Sparkles, Check, ChevronRight, HelpCircle, FileText, TrendingDown } from 'lucide-react';
import { QuoteEstimation, CardDesignData, SavedInquiry } from '../types';

interface QuoteCalculatorProps {
  selectedMaterial: 'pvc_premium' | 'pvc_eco' | 'rfid_smart' | 'magnetic_stripe' | 'wooden_eco';
  setSelectedMaterial: (mat: any) => void;
  savedCustomDesign: CardDesignData | null;
  onInquirySubmitted: (inquiry: SavedInquiry) => void;
}

const MATERIAL_BASE_PRICES = {
  pvc_premium: { label: 'Premium Heavy Gloss PVC (ISO Grade)', price: 1.25 },
  pvc_eco: { label: 'Biodegradable Eco-PVC', price: 1.55 },
  rfid_smart: { label: 'UltraSecure RFID Smart Card (13.56MHz)', price: 3.90 },
  magnetic_stripe: { label: 'Magnetic Stripe Card (Hi-Co / Lo-Co)', price: 1.85 },
  wooden_eco: { label: 'Sustainable Wooden Smart Card (Compostable)', price: 4.80 },
};

export default function QuoteCalculator({ 
  selectedMaterial, 
  setSelectedMaterial, 
  savedCustomDesign, 
  onInquirySubmitted 
}: QuoteCalculatorProps) {
  const [quantity, setQuantity] = useState<number>(250);
  const [printType, setPrintType] = useState<'single_side' | 'double_side'>('double_side');
  
  const [includeLanyards, setIncludeLanyards] = useState<boolean>(true);
  const [lanyardType, setLanyardType] = useState<'standard_plain' | 'custom_printed' | 'premium_satin'>('custom_printed');
  
  const [includeHolders, setIncludeHolders] = useState<boolean>(true);
  const [holderType, setHolderType] = useState<'clear_vinyl' | 'rigid_plastic' | 'premium_yoyo'>('rigid_plastic');

  // Contact Details for submission
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [notes, setNotes] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [estimation, setEstimation] = useState<QuoteEstimation>({
    cardMaterial: selectedMaterial,
    printType: printType,
    quantity: quantity,
    includeLanyards: includeLanyards,
    lanyardType: lanyardType,
    includeHolders: includeHolders,
    holderType: holderType,
    estimatedUnitPrice: 0,
    estimatedTotal: 0,
    deliveryDays: 5
  });

  // Recalculate estimates when parameters change
  useEffect(() => {
    let materialCost = MATERIAL_BASE_PRICES[selectedMaterial]?.price || 1.25;
    let printPremium = printType === 'double_side' ? 0.45 : 0.0;
    
    let baseUnit = materialCost + printPremium;
    
    // Quantity Tier discounts
    let discountPercent = 0;
    if (quantity >= 50 && quantity < 150) {
      discountPercent = 10; // 10% off
    } else if (quantity >= 150 && quantity < 500) {
      discountPercent = 20; // 20% off
    } else if (quantity >= 500 && quantity < 1000) {
      discountPercent = 30; // 30% off
    } else if (quantity >= 1000) {
      discountPercent = 45; // 45% bulk discount!
    }

    let discountedBaseUnit = baseUnit * (1 - discountPercent / 100);

    // Accessory additionals
    let lanyardCost = 0;
    if (includeLanyards) {
      if (lanyardType === 'standard_plain') lanyardCost = 0.65;
      else if (lanyardType === 'custom_printed') lanyardCost = 1.35;
      else if (lanyardType === 'premium_satin') lanyardCost = 1.95;
    }

    let holderCost = 0;
    if (includeHolders) {
      if (holderType === 'clear_vinyl') holderCost = 0.25;
      else if (holderType === 'rigid_plastic') holderCost = 0.55;
      else if (holderType === 'premium_yoyo') lanyardCost = 1.20;
    }

    let totalUnit = discountedBaseUnit + lanyardCost + holderCost;
    let grandTotal = totalUnit * quantity;

    // Delivery speed mapping
    let days = 4;
    if (quantity >= 500 && quantity < 2000) days = 6;
    else if (quantity >= 2000) days = 8;

    setEstimation({
      cardMaterial: selectedMaterial,
      printType: printType,
      quantity: quantity,
      includeLanyards: includeLanyards,
      lanyardType: lanyardType,
      includeHolders: includeHolders,
      holderType: holderType,
      estimatedUnitPrice: parseFloat(totalUnit.toFixed(2)),
      estimatedTotal: parseFloat(grandTotal.toFixed(2)),
      deliveryDays: days
    });
  }, [selectedMaterial, quantity, printType, includeLanyards, lanyardType, includeHolders, holderType]);

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone) {
      alert('Please fill in your name, email, and phone number.');
      return;
    }

    const newInquiry: SavedInquiry = {
      id: 'bg-inq-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      clientName,
      clientEmail,
      clientPhone,
      clientCompany: clientCompany || 'Independent Business',
      notes: notes || 'No extra notes provided.',
      status: 'pending',
      type: savedCustomDesign ? 'design_quote' : 'bulk_quote',
      designData: savedCustomDesign || undefined,
      quoteData: estimation
    };

    onInquirySubmitted(newInquiry);
    setFormSubmitted(true);
    
    // Clear inputs
    setClientName('');
    setClientEmail('');
    setClientPhone('');
    setClientCompany('');
    setNotes('');

    setTimeout(() => {
      setFormSubmitted(false);
    }, 4000);
  };

  const getDiscountBadge = () => {
    if (quantity >= 50 && quantity < 150) return '10% Tier Discount';
    if (quantity >= 150 && quantity < 500) return '20% Mid-Tier Discount';
    if (quantity >= 500 && quantity < 1000) return '30% Enterprise Discount';
    if (quantity >= 1000) return '45% Super-Bulk Discount!';
    return 'Base Tier Pricing';
  };

  return (
    <div className="bg-brand-100 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-950 tracking-tight">
            Instant Order & Pricing Estimator
          </h2>
          <p className="mt-4 text-base text-brand-700">
            Configure raw materials, specify accessory details, and slide to your target volume. Experience complete tier pricing transparency with zero hidden charges.
          </p>
        </div>

        {/* Custom Design Warning / Sticky Notification */}
        {savedCustomDesign && (
          <div className="mb-8 max-w-4xl mx-auto bg-amber-50 border-l-4 border-accent-orange p-4 rounded-r-xl shadow-sm flex items-center justify-between">
            <div className="flex items-center space-x-3 text-left">
              <span className="p-2 bg-accent-orange/10 rounded-full text-accent-orange">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-bold text-brand-950">Linked Custom ID Card Design Detected</p>
                <p className="text-xs text-brand-700 mt-0.5">Your layout &quot;{savedCustomDesign.fullName}&quot; ({savedCustomDesign.logoText}) will be attached automatically when submitting this inquiry.</p>
              </div>
            </div>
            <div className="bg-brand-950 text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded">
              SPEC ATTACHED
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Cost Configurations */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-brand-200 shadow-premium text-left">
            <h3 className="text-lg font-bold text-brand-950 mb-6 flex items-center space-x-2">
              <Calculator className="h-5 w-5 text-accent-orange" />
              <span>Configure Print Specifications</span>
            </h3>

            {/* Quantity Slider */}
            <div className="mb-8 bg-brand-100/50 p-5 rounded-xl border border-brand-200">
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-bold text-brand-700 uppercase tracking-wider block">
                  1. Order Volume (Quantity)
                </label>
                <span className="text-lg font-mono font-black text-accent-orange bg-white border border-brand-200 px-3 py-1 rounded-lg">
                  {quantity} Cards
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="5000"
                step="10"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-full h-2 bg-brand-300 rounded-lg appearance-none cursor-pointer accent-accent-orange"
              />
              <div className="flex justify-between text-[10px] font-bold text-brand-600 mt-2">
                <span>Min: 10</span>
                <span>50 (10% Off)</span>
                <span>150 (20% Off)</span>
                <span>500 (30% Off)</span>
                <span>1000+ (45% Off)</span>
              </div>
            </div>

            {/* Material Selections */}
            <div className="mb-6">
              <label className="text-xs font-bold text-brand-700 uppercase tracking-wider block mb-3">
                2. Base Card Material Technology
              </label>
              <div className="space-y-3">
                {Object.entries(MATERIAL_BASE_PRICES).map(([key, item]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedMaterial(key as any)}
                    className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all duration-200 cursor-pointer ${
                      selectedMaterial === key
                        ? 'border-brand-950 bg-brand-100 ring-2 ring-brand-950/15'
                        : 'border-brand-200 bg-white hover:border-brand-400'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-bold text-brand-950">{item.label}</p>
                      <span className="text-xs text-brand-500 font-mono">Premium raw stock base</span>
                    </div>
                    <span className="text-sm font-mono font-bold text-brand-800">${item.price.toFixed(2)}/ea</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Print Type options */}
            <div className="mb-8 grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-brand-700 uppercase tracking-wider block mb-2.5">
                  3. Front/Back Sides Printing
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPrintType('single_side')}
                    className={`py-3 rounded-lg border font-semibold text-xs cursor-pointer ${
                      printType === 'single_side'
                        ? 'bg-brand-950 text-white border-brand-950 shadow'
                        : 'bg-white text-brand-700 border-brand-200 hover:border-brand-400'
                    }`}
                  >
                    Single-Side
                  </button>
                  <button
                    type="button"
                    onClick={() => setPrintType('double_side')}
                    className={`py-3 rounded-lg border font-semibold text-xs cursor-pointer ${
                      printType === 'double_side'
                        ? 'bg-brand-950 text-white border-brand-950 shadow'
                        : 'bg-white text-brand-700 border-brand-200 hover:border-brand-400'
                    }`}
                  >
                    Double-Side
                  </button>
                </div>
              </div>

              {/* Delivery Speed Highlight */}
              <div>
                <label className="text-xs font-bold text-brand-700 uppercase tracking-wider block mb-2.5">
                  Est. Dispatch Timeline
                </label>
                <div className="bg-brand-100 border border-brand-200 p-3 rounded-lg flex items-center justify-between">
                  <span className="text-xs text-brand-700 font-medium">Standard Ground</span>
                  <span className="text-xs font-bold font-mono text-brand-950">{estimation.deliveryDays} Business Days</span>
                </div>
              </div>
            </div>

            {/* Lanyard customization options */}
            <div className="mb-6 border-t border-brand-200/80 pt-6">
              <div className="flex items-center justify-between mb-4">
                <label className="text-xs font-bold text-brand-700 uppercase tracking-wider block">
                  4. Customized Printed Lanyards Add-on
                </label>
                <button
                  type="button"
                  id="toggle-lanyards"
                  onClick={() => setIncludeLanyards(!includeLanyards)}
                  className={`w-10 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${
                    includeLanyards ? 'bg-accent-orange' : 'bg-brand-400'
                  } cursor-pointer`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform ${
                    includeLanyards ? 'translate-x-4' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {includeLanyards && (
                <div className="grid sm:grid-cols-3 gap-3 animate-in fade-in slide-in-from-top-1 duration-200">
                  {[
                    { id: 'standard_plain', label: '12mm Solid Color Ribbon', price: '+$0.65' },
                    { id: 'custom_printed', label: '16mm Sublimated Logo', price: '+$1.35' },
                    { id: 'premium_satin', label: '20mm Smooth Satin Deluxe', price: '+$1.95' },
                  ].map((lan) => (
                    <button
                      key={lan.id}
                      type="button"
                      onClick={() => setLanyardType(lan.id as any)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        lanyardType === lan.id
                          ? 'border-brand-950 bg-brand-100 font-bold'
                          : 'border-brand-200 bg-white hover:border-brand-400'
                      }`}
                    >
                      <p className="text-xs text-brand-950 font-bold leading-tight">{lan.label}</p>
                      <span className="text-[10px] font-mono text-brand-600 block mt-1.5">{lan.price} per item</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Holder accessory options */}
            <div className="mb-6 border-t border-brand-200/80 pt-6">
              <div className="flex items-center justify-between mb-4">
                <label className="text-xs font-bold text-brand-700 uppercase tracking-wider block">
                  5. Badge Holders & Accessories Add-on
                </label>
                <button
                  type="button"
                  id="toggle-holders"
                  onClick={() => setIncludeHolders(!includeHolders)}
                  className={`w-10 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${
                    includeHolders ? 'bg-accent-orange' : 'bg-brand-400'
                  } cursor-pointer`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform ${
                    includeHolders ? 'translate-x-4' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {includeHolders && (
                <div className="grid sm:grid-cols-3 gap-3 animate-in fade-in slide-in-from-top-1 duration-200">
                  {[
                    { id: 'clear_vinyl', label: 'Soft Clear Vinyl Pocket', price: '+$0.25' },
                    { id: 'rigid_plastic', label: 'Heavy Rigid Protective Case', price: '+$0.55' },
                    { id: 'premium_yoyo', label: 'Retractable Deluxe Badge Reel', price: '+$1.20' },
                  ].map((hold) => (
                    <button
                      key={hold.id}
                      type="button"
                      onClick={() => setHolderType(hold.id as any)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        holderType === hold.id
                          ? 'border-brand-950 bg-brand-100 font-bold'
                          : 'border-brand-200 bg-white hover:border-brand-400'
                      }`}
                    >
                      <p className="text-xs text-brand-950 font-bold leading-tight">{hold.label}</p>
                      <span className="text-[10px] font-mono text-brand-600 block mt-1.5">{hold.price} per item</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Calculations & Quote Request Submission */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Real-time Math Summary Card */}
            <div className="bg-brand-950 text-white p-6 sm:p-8 rounded-2xl border border-brand-800 shadow-xl relative overflow-hidden text-left">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-orange/10 rounded-full blur-2xl" />
              
              <h3 className="text-base font-bold font-mono tracking-wider text-brand-400 uppercase">
                Estimator Summary
              </h3>

              {/* Discount Indicator */}
              <div className="flex items-center space-x-2 bg-accent-orange/25 border border-accent-orange/30 px-3 py-1 rounded-lg text-accent-orange text-[10px] font-bold uppercase tracking-wider mt-4 w-fit">
                <TrendingDown className="h-3 w-3" />
                <span>{getDiscountBadge()}</span>
              </div>

              {/* Calculations Block */}
              <div className="mt-6 space-y-3.5 border-b border-brand-800 pb-5">
                <div className="flex justify-between text-xs text-brand-300">
                  <span>Base stock material & print:</span>
                  <span className="font-mono font-bold">
                    ${((MATERIAL_BASE_PRICES[selectedMaterial]?.price || 1.25) + (printType === 'double_side' ? 0.45 : 0.0)).toFixed(2)}/card
                  </span>
                </div>

                {quantity >= 50 && (
                  <div className="flex justify-between text-xs text-emerald-400 font-semibold">
                    <span>Bulk discount applied:</span>
                    <span className="font-mono">
                      -{quantity >= 1000 ? '45%' : quantity >= 500 ? '30%' : quantity >= 150 ? '20%' : '10%'}
                    </span>
                  </div>
                )}

                {includeLanyards && (
                  <div className="flex justify-between text-xs text-brand-300">
                    <span>Lanyards ({lanyardType.replace('_', ' ')}):</span>
                    <span className="font-mono font-semibold">
                      +${lanyardType === 'standard_plain' ? '0.65' : lanyardType === 'custom_printed' ? '1.35' : '1.95'}/card
                    </span>
                  </div>
                )}

                {includeHolders && (
                  <div className="flex justify-between text-xs text-brand-300">
                    <span>Accessories ({holderType.replace('_', ' ')}):</span>
                    <span className="font-mono font-semibold">
                      +${holderType === 'clear_vinyl' ? '0.25' : holderType === 'rigid_plastic' ? '0.55' : '1.20'}/card
                    </span>
                  </div>
                )}
              </div>

              {/* Grand totals */}
              <div className="pt-5 flex justify-between items-baseline">
                <div>
                  <span className="text-xs text-brand-400 font-medium">Estimated Unit Cost:</span>
                  <p className="text-2xl font-bold font-mono text-white mt-1">
                    ${estimation.estimatedUnitPrice.toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-brand-400 font-medium">Total Estimate:</span>
                  <p className="text-3xl font-extrabold font-mono text-accent-orange mt-1">
                    ${estimation.estimatedTotal.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Protip */}
              <div className="bg-brand-900 border border-brand-800 p-3.5 rounded-xl text-xs text-brand-400 mt-6 font-medium leading-normal">
                💡 Prices include custom color calibration and setup fees. Volume tiers above 1,000+ qualify for customized dispatch cargo transport.
              </div>
            </div>

            {/* Consultation Inquiry Form */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-brand-200 shadow-premium text-left">
              <h3 className="text-base font-bold text-brand-950 mb-4 flex items-center space-x-1.5">
                <FileText className="h-4 w-4 text-accent-orange" />
                <span>Request Formal PDF Quotation</span>
              </h3>
              <p className="text-xs text-brand-600 mb-5 leading-normal">
                Submit this estimate configuration. Our print specialists will compile a formal quote PDF and mail it within 2 business hours.
              </p>

              {formSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl text-center">
                  <span className="inline-flex p-2 bg-emerald-100 rounded-full text-emerald-600 mb-3 animate-bounce">
                    <Check className="h-5 w-5 stroke-[3]" />
                  </span>
                  <h4 className="font-bold text-brand-950 text-sm">Quote Request Saved!</h4>
                  <p className="text-xs text-brand-700 mt-1">
                    We have successfully captured your card configurations. You can track this inquiry inside the <span className="font-bold">Inquiry Hub</span> tab at any time.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitInquiry} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-brand-600 block mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full px-3 py-2 border border-brand-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-accent-orange focus:border-accent-orange"
                        placeholder="Arjun Dev"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-brand-600 block mb-1">Business Email *</label>
                      <input
                        type="email"
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-brand-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-accent-orange focus:border-accent-orange"
                        placeholder="arjun@company.co"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-brand-600 block mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full px-3 py-2 border border-brand-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-accent-orange focus:border-accent-orange"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-brand-600 block mb-1">Company Name</label>
                      <input
                        type="text"
                        value={clientCompany}
                        onChange={(e) => setClientCompany(e.target.value)}
                        className="w-full px-3 py-2 border border-brand-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-accent-orange focus:border-accent-orange"
                        placeholder="Acme Enterprise"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-brand-600 block mb-1">Project Notes / Instructions</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3 py-2 border border-brand-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-accent-orange focus:border-accent-orange h-16 resize-none"
                      placeholder="Special barcode standards, security hologram required..."
                    />
                  </div>

                  <button
                    type="submit"
                    id="submit-formal-quote"
                    className="w-full bg-accent-orange hover:bg-accent-orange-hover text-white py-3 rounded-xl font-bold text-xs shadow-md transition-all duration-200 flex items-center justify-center space-x-1.5 cursor-pointer hover:-translate-y-0.5"
                  >
                    <span>Submit Setup Configuration</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
