import React, { useState } from 'react';
import { ShieldAlert, Cpu, Award, Zap, CheckCircle2, CreditCard, ChevronRight } from 'lucide-react';
import { ActiveTab } from '../types';

interface ProductCatalogProps {
  setActiveTab: (tab: ActiveTab) => void;
  setSelectedMaterial: (material: any) => void;
}

interface Product {
  id: string;
  name: string;
  category: 'smart' | 'corporate' | 'school' | 'accessory';
  material: string;
  calcMaterialId: 'pvc_premium' | 'pvc_eco' | 'rfid_smart' | 'magnetic_stripe' | 'wooden_eco';
  thickness: string;
  printTech: string;
  description: string;
  features: string[];
  specs: { [key: string]: string };
  imagePlaceholder: string;
}

export default function ProductCatalog({ setActiveTab, setSelectedMaterial }: ProductCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'smart' | 'corporate' | 'school' | 'accessory'>('all');

  const products: Product[] = [
    {
      id: 'prod-rfid-smart',
      name: 'UltraSecure RFID & NFC Smart Cards',
      category: 'smart',
      material: 'NXP Mifare EV1 / DESFire Chip Embedded PVC',
      calcMaterialId: 'rfid_smart',
      thickness: '0.82mm (Standard ISO Card)',
      printTech: 'Re-transfer High Definition Color + Scratch Guard',
      description: 'Engineered for seamless integration with secure physical access, attendance terminals, and cash-free cafeterias.',
      features: ['13.56 MHz High-Frequency Protocol', 'AES & DES encrypted data protection', 'Sleek gloss or velvet matte finishing options', 'Optional custom magnetic stripe pairing'],
      specs: {
        'Frequency': '13.56 MHz / 125 kHz Dual-Band',
        'Data Retention': '10 Years Minimum',
        'Print Surface': 'High Gloss Overlaid Finish',
        'Standards': 'ISO/IEC 14443 Type A'
      },
      imagePlaceholder: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'prod-corporate-pvc',
      name: 'Executive Corporate PVC ID Cards',
      category: 'corporate',
      material: 'Prime Solid White Virgin PVC (100% Recyclable)',
      calcMaterialId: 'pvc_premium',
      thickness: '0.76mm (30 Mil)',
      printTech: 'UltraFine Dye Sublimation Retransfer',
      description: 'Stunning high-fidelity printing with rich, accurate brand colors. Features signature double-sided edge-to-edge printing with crisp vector portraits.',
      features: ['Zero bleeding or ghosting on text lines', 'Super-durable UV protective top overlay', 'Supports signature panels, barcode overlays, or holograms', 'Pre-punched slot options (round/oval)'],
      specs: {
        'Dimensions': '85.6mm x 54mm (CR-80)',
        'Durability': 'Up to 5 Years Scratch Resistance',
        'Chemical Resistance': 'Excellent against water, alcohol & oil',
        'Surface finish': 'Mirror Premium Gloss'
      },
      imagePlaceholder: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'prod-lanyards',
      name: 'Multi-Color Dye Sublimated Lanyards',
      category: 'accessory',
      material: 'Ultra-Soft Premium Polyester Ribbon',
      calcMaterialId: 'pvc_premium', // fallback
      thickness: '12mm / 16mm / 20mm custom widths',
      printTech: 'High-Temperature Heat-Transfer Sublimation',
      description: 'Silky smooth ribbon lanyards custom printed with your exact brand name, logo vectors, and colors. Available with deluxe safe-break safety clips.',
      features: ['HD continuous printing on both sides', 'Tear-resistant stitching with premium thread', 'Durable trigger hook or multi-use alligator clip', 'Quick-release safety breakaway system'],
      specs: {
        'Length': '900mm Standard Flat Length',
        'Attachment': 'Zinc Alloy swivel fish hooks / keyrings',
        'Safety': 'Optional dual-rear breakaway clips',
        'Washability': 'Waterproof, non-fading print'
      },
      imagePlaceholder: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'prod-school-pvc',
      name: 'High-Durability Student ID Cards',
      category: 'school',
      material: 'Super-Flex Impact Resistant PVC (Tear-Proof)',
      calcMaterialId: 'pvc_eco',
      thickness: '0.76mm (30 Mil)',
      printTech: 'Direct-to-Card Thermal Transfer with holographic coat',
      description: 'Specially engineered for rough school and university environments. Features an impact-absorbing polymer layer to prevent cracking.',
      features: ['Shatter-proof formulation prevents snapping', 'Crisp QR Codes / High-contrast Barcodes', 'High-volume batch discount packaging', 'Custom student details database mapping'],
      specs: {
        'Flexibility': 'High Flex-Rating (Over 100,000 bends)',
        'Technology': 'Secure Barcodes & 2D QR mapping',
        'Integration': 'Compatible with popular school portals',
        'Color Stability': 'Excellent UV stability, stays vibrant'
      },
      imagePlaceholder: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'prod-eco-wooden',
      name: 'Biodegradable Eco-Friendly Wooden Cards',
      category: 'smart',
      material: 'Premium Sourced Sustainable Bamboo / Cherry Wood',
      calcMaterialId: 'wooden_eco',
      thickness: '1.2mm Rigid Premium Profile',
      printTech: 'Precision Laser Etching or UV Digital Flatbed Printing',
      description: 'Stunning premium wooden smart cards with embedded NFC chip. Makes an unforgettable statement about your company’s eco-sustainability goals.',
      features: ['100% plastic-free, organic compostable wood shell', 'Fully functional NTAG213 / RFID chip integrated', 'Each card has a completely unique natural grain', 'Waterproof sealed satin varnish coating'],
      specs: {
        'Material': 'Bamboo, Birch, Cherry or Walnut Wood',
        'RFID chip': 'Fully functional passive HF/NFC chip',
        'Eco-Benefit': 'Negative Carbon Footprint packaging',
        'Finish': 'Polished Organic Wax coat'
      },
      imagePlaceholder: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800'
    }
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const categories: { id: typeof activeCategory; label: string }[] = [
    { id: 'all', label: 'All Products' },
    { id: 'smart', label: 'RFID & Eco Smart' },
    { id: 'corporate', label: 'Corporate PVC' },
    { id: 'school', label: 'Student IDs' },
    { id: 'accessory', label: 'Lanyards & Accessories' },
  ];

  const handleQuoteRedirect = (product: Product) => {
    setSelectedMaterial(product.calcMaterialId);
    setActiveTab('calculator');
  };

  return (
    <div className="bg-brand-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-950 tracking-tight">
            Premium Card Materials & Custom Accessories
          </h2>
          <p className="mt-4 text-base text-brand-700">
            Every product manufactured by Bhishma Graphics undergoes strenuous thermal, mechanical, and RFID performance tests to ensure absolute compliance with enterprise standards.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide uppercase transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-brand-950 text-white shadow-md'
                  : 'bg-white text-brand-700 hover:bg-brand-200 hover:text-brand-950 border border-brand-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid of Products */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 items-stretch">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-2xl border border-brand-200 overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col"
            >
              {/* Product Header / Image Background */}
              <div className="relative h-60 bg-brand-900 overflow-hidden">
                <img 
                  src={product.imagePlaceholder} 
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/20 to-transparent" />
                
                {/* Floating badge */}
                <div className="absolute top-4 left-4 bg-accent-orange text-white text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-md shadow-sm">
                  {product.category}
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xs text-brand-300 font-mono tracking-wide">{product.material}</p>
                  <h3 className="text-lg sm:text-xl font-bold text-white leading-tight mt-1">
                    {product.name}
                  </h3>
                </div>
              </div>

              {/* Product Info Body */}
              <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                
                {/* Specs list & description */}
                <div>
                  <p className="text-sm text-brand-700 leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6 bg-brand-100 p-4 rounded-xl border border-brand-200">
                    <div>
                      <span className="text-[10px] font-bold text-brand-500 uppercase tracking-wider block">Standard Thickness</span>
                      <span className="text-xs font-bold text-brand-950 mt-0.5 block">{product.thickness}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-brand-500 uppercase tracking-wider block">Print Technology</span>
                      <span className="text-xs font-bold text-brand-950 mt-0.5 block line-clamp-1">{product.printTech}</span>
                    </div>
                  </div>

                  {/* Features Bullets */}
                  <div className="space-y-2 mb-6">
                    <span className="text-xs font-bold text-brand-800 uppercase tracking-wider block mb-3">Key Advantages</span>
                    {product.features.map((feat, index) => (
                      <div key={index} className="flex items-start space-x-2 text-xs text-brand-700 font-medium">
                        <CheckCircle2 className="h-4 w-4 text-accent-orange shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specs list for nerd specs + Quote Button */}
                <div className="border-t border-brand-200 pt-6 mt-auto">
                  <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6 text-xs font-mono text-brand-600">
                    {Object.entries(product.specs).map(([key, val]) => (
                      <div key={key} className="flex items-center space-x-1">
                        <span className="font-bold text-brand-500">{key}:</span>
                        <span>{val}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <button
                      id={`calc-direct-${product.id}`}
                      onClick={() => handleQuoteRedirect(product)}
                      className="flex-1 bg-brand-950 hover:bg-brand-900 text-white font-bold py-3 px-4 rounded-xl text-xs transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer shadow-sm hover:shadow-md"
                    >
                      <span>Configure & Get Price</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                    
                    <button
                      id={`builder-direct-${product.id}`}
                      onClick={() => setActiveTab('studio')}
                      className="bg-brand-200 hover:bg-brand-300 text-brand-900 font-bold py-3 px-5 rounded-xl text-xs transition-all duration-200 cursor-pointer"
                    >
                      Design Card
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Quality Standard Badges banner */}
        <div className="mt-16 bg-brand-950 text-white p-8 rounded-2xl border border-brand-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-[-40%] right-[-10%] w-80 h-80 rounded-full bg-accent-orange/10 blur-[80px]" />
          
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 relative z-10 text-center sm:text-left">
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <Cpu className="h-8 w-8 text-accent-orange mb-3" />
              <h4 className="font-bold text-base">RFID Verified</h4>
              <p className="text-xs text-brand-400 mt-1">100% matching of response codes with ISO scanners.</p>
            </div>

            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <Award className="h-8 w-8 text-accent-orange mb-3" />
              <h4 className="font-bold text-base">Color Accuracy</h4>
              <p className="text-xs text-brand-400 mt-1">Pantone color calibration matching guarantee.</p>
            </div>

            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <Zap className="h-8 w-8 text-accent-orange mb-3" />
              <h4 className="font-bold text-base">Shatter-proof</h4>
              <p className="text-xs text-brand-400 mt-1">Industrial grade PVC formulations that won&apos;t crack.</p>
            </div>

            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <ShieldAlert className="h-8 w-8 text-accent-orange mb-3" />
              <h4 className="font-bold text-base">Eco Commitment</h4>
              <p className="text-xs text-brand-400 mt-1">Recycled PVC and zero hazardous chlorine compounds.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
