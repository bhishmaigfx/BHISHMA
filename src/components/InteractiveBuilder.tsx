import React, { useState, useRef } from 'react';
import { Upload, HelpCircle, User, Cpu, Download, Sparkles, Check, RefreshCw, Layers } from 'lucide-react';
import { CardDesignData } from '../types';

interface InteractiveBuilderProps {
  onAddDesignToQuote: (design: CardDesignData) => void;
}

const PRESET_TEMPLATES = [
  { id: 'onyx', name: 'Corporate Onyx', primary: '#0f172a', secondary: '#4f46e5', category: 'Corporate' },
  { id: 'emerald', name: 'Academic Emerald', primary: '#064e3b', secondary: '#10b981', category: 'Education' },
  { id: 'cobalt', name: 'Tech Cobalt', primary: '#1e3a8a', secondary: '#3b82f6', category: 'Technology' },
  { id: 'crimson', name: 'Hospital Crimson', primary: '#7f1d1d', secondary: '#f43f5e', category: 'Medical' },
];

const DEFAULT_AVATARS = [
  { id: 'avatar1', name: 'Male Executive', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' },
  { id: 'avatar2', name: 'Female Professional', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200' },
  { id: 'avatar3', name: 'Creative Designer', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200' },
];

export default function InteractiveBuilder({ onAddDesignToQuote }: InteractiveBuilderProps) {
  const [design, setDesign] = useState<CardDesignData>({
    fullName: 'Arjun Bhardwaj',
    jobTitle: 'Senior Infrastructure Lead',
    department: 'DevOps & CyberSecurity',
    employeeId: 'BG-2026-9482',
    avatarUrl: DEFAULT_AVATARS[1].url,
    logoText: 'BHISHMA CORP',
    primaryColor: PRESET_TEMPLATES[0].primary,
    secondaryColor: PRESET_TEMPLATES[0].secondary,
    templateId: 'onyx',
    layout: 'vertical',
    showBarcode: true,
    showChip: true,
    lanyardColor: '#4f46e5',
    customLanyardText: 'SECURE INFRASTRUCTURE SERVICES'
  });

  const [dragActive, setDragActive] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDesign(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: 'showBarcode' | 'showChip') => {
    setDesign(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const selectPreset = (preset: typeof PRESET_TEMPLATES[0]) => {
    setDesign(prev => ({
      ...prev,
      templateId: preset.id,
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
      lanyardColor: preset.secondary
    }));
  };

  // Drag and Drop portait uploading
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setDesign(prev => ({ ...prev, avatarUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setDesign(prev => ({ ...prev, avatarUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleMockDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleQuoteDispatch = () => {
    onAddDesignToQuote(design);
    setQuoteSuccess(true);
    setTimeout(() => setQuoteSuccess(false), 3000);
  };

  return (
    <div className="bg-brand-100 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-950 tracking-tight">
            Interactive ID Card Studio
          </h2>
          <p className="mt-4 text-base text-brand-700">
            Customize layouts, pick premium colors, insert credentials, and verify live. Design high-fidelity PVC and smart card samples in seconds.
          </p>
        </div>

        {/* Builder Panel */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Controls */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-brand-200 shadow-premium">
            <h3 className="text-lg font-bold text-brand-950 mb-6 flex items-center space-x-2">
              <Layers className="h-5 w-5 text-accent-orange" />
              <span>Card Parameters</span>
            </h3>

            {/* Template Presets */}
            <div className="mb-6">
              <label className="text-xs font-bold text-brand-700 uppercase tracking-wider block mb-3">
                1. Select Preset Theme Template
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PRESET_TEMPLATES.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => selectPreset(preset)}
                    className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                      design.templateId === preset.id
                        ? 'border-brand-950 bg-brand-100 shadow-sm font-bold ring-2 ring-brand-950/20'
                        : 'border-brand-200 hover:border-brand-400 bg-white'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: preset.primary }} />
                      <div className="w-2.5 h-2.5 rounded-full -ml-1" style={{ backgroundColor: preset.secondary }} />
                    </div>
                    <p className="text-xs text-brand-950 mt-2 font-semibold">{preset.name}</p>
                    <span className="text-[9px] text-brand-500 block font-mono">{preset.category}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Layout Options */}
            <div className="mb-6">
              <label className="text-xs font-bold text-brand-700 uppercase tracking-wider block mb-3">
                2. Card Layout Orientation
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setDesign(prev => ({ ...prev, layout: 'vertical' }))}
                  className={`py-3 rounded-xl border font-bold text-xs flex items-center justify-center space-x-2 cursor-pointer ${
                    design.layout === 'vertical'
                      ? 'bg-brand-950 text-white border-brand-950 shadow-md'
                      : 'bg-white text-brand-700 border-brand-200 hover:border-brand-400'
                  }`}
                >
                  <span>Vertical (CR-80)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDesign(prev => ({ ...prev, layout: 'horizontal' }))}
                  className={`py-3 rounded-xl border font-bold text-xs flex items-center justify-center space-x-2 cursor-pointer ${
                    design.layout === 'horizontal'
                      ? 'bg-brand-950 text-white border-brand-950 shadow-md'
                      : 'bg-white text-brand-700 border-brand-200 hover:border-brand-400'
                  }`}
                >
                  <span>Horizontal (CR-80 Landscape)</span>
                </button>
              </div>
            </div>

            {/* Input Details */}
            <div className="space-y-4 mb-6">
              <span className="text-xs font-bold text-brand-700 uppercase tracking-wider block mb-1">
                3. Cardholder & Organization Details
              </span>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-brand-600 block mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={design.fullName}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-accent-orange/20 focus:border-accent-orange"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-brand-600 block mb-1">Job Designation</label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={design.jobTitle}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-accent-orange/20 focus:border-accent-orange"
                    placeholder="General Manager"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-brand-600 block mb-1">Department</label>
                  <input
                    type="text"
                    name="department"
                    value={design.department}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-accent-orange/20 focus:border-accent-orange"
                    placeholder="Operations"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-brand-600 block mb-1">Employee / Student ID</label>
                  <input
                    type="text"
                    name="employeeId"
                    value={design.employeeId}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-accent-orange/20 focus:border-accent-orange"
                    placeholder="E-10029"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-brand-600 block mb-1">Organization Header</label>
                  <input
                    type="text"
                    name="logoText"
                    value={design.logoText}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-200 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-accent-orange/20 focus:border-accent-orange"
                    placeholder="COMPAY LOGO"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-brand-600 block mb-1">Lanyard Text Annotation</label>
                  <input
                    type="text"
                    name="customLanyardText"
                    value={design.customLanyardText}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-200 text-sm font-bold uppercase focus:outline-none focus:ring-2 focus:ring-accent-orange/20 focus:border-accent-orange"
                    placeholder="STAFF MEMBER"
                  />
                </div>
              </div>
            </div>

            {/* Custom Palette Color picker */}
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="text-[11px] font-bold text-brand-600 block mb-1.5">Primary Branding Color</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    name="primaryColor"
                    value={design.primaryColor}
                    onChange={handleInputChange}
                    className="w-10 h-10 border-0 rounded-lg cursor-pointer"
                  />
                  <span className="text-xs font-mono text-brand-800 uppercase font-semibold">{design.primaryColor}</span>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-brand-600 block mb-1.5">Secondary Accent Color</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    name="secondaryColor"
                    value={design.secondaryColor}
                    onChange={handleInputChange}
                    className="w-10 h-10 border-0 rounded-lg cursor-pointer"
                  />
                  <span className="text-xs font-mono text-brand-800 uppercase font-semibold">{design.secondaryColor}</span>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-brand-600 block mb-1.5">Lanyard Color</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    name="lanyardColor"
                    value={design.lanyardColor}
                    onChange={handleInputChange}
                    className="w-10 h-10 border-0 rounded-lg cursor-pointer"
                  />
                  <span className="text-xs font-mono text-brand-800 uppercase font-semibold">{design.lanyardColor}</span>
                </div>
              </div>
            </div>

            {/* Quick pre-seeded Avatar picker & Dual Upload */}
            <div className="mb-6">
              <label className="text-xs font-bold text-brand-700 uppercase tracking-wider block mb-3">
                4. Select Photo or Upload Custom Image
              </label>
              
              {/* Predefined selection */}
              <div className="flex items-center space-x-4 mb-4">
                {DEFAULT_AVATARS.map((av) => (
                  <button
                    key={av.id}
                    type="button"
                    onClick={() => setDesign(prev => ({ ...prev, avatarUrl: av.url }))}
                    className={`relative p-0.5 rounded-full border-2 transition-all ${
                      design.avatarUrl === av.url ? 'border-accent-orange scale-105 shadow-md' : 'border-transparent'
                    } cursor-pointer`}
                  >
                    <img
                      src={av.url}
                      alt={av.name}
                      referrerPolicy="no-referrer"
                      className="w-11 h-11 rounded-full object-cover"
                    />
                    {design.avatarUrl === av.url && (
                      <span className="absolute bottom-0 right-0 bg-accent-orange text-white p-0.5 rounded-full">
                        <Check className="h-2 w-2 stroke-[3]" />
                      </span>
                    )}
                  </button>
                ))}
                
                <span className="text-xs text-brand-500 font-medium font-mono">or upload below:</span>
              </div>

              {/* Dual upload area (supports drag and drop & file selector) */}
              <div 
                className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                  dragActive ? 'border-accent-orange bg-accent-orange-light/10' : 'border-brand-300 hover:border-brand-500'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={triggerFileInput}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Upload className="h-6 w-6 text-brand-500 mx-auto mb-2" />
                <p className="text-xs font-bold text-brand-800">
                  Drag & drop profile picture, or <span className="text-accent-orange">browse files</span>
                </p>
                <p className="text-[10px] text-brand-500 mt-1 font-mono">Supports PNG, JPG, JPEG (Max 4MB)</p>
              </div>
            </div>

            {/* Smart Hardware Switches */}
            <div className="grid sm:grid-cols-2 gap-4 border-t border-brand-200 pt-5">
              <div className="flex items-center justify-between p-3 bg-brand-100 rounded-xl border border-brand-200">
                <div className="flex items-center space-x-2">
                  <Cpu className="h-4 w-4 text-brand-600" />
                  <div>
                    <span className="text-xs font-bold text-brand-950 block">Embed Smart NFC Chip</span>
                    <span className="text-[10px] text-brand-500 block font-mono">Simulates RFID metal contact</span>
                  </div>
                </div>
                <button
                  type="button"
                  id="toggle-chip"
                  onClick={() => handleCheckboxChange('showChip')}
                  className={`w-10 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none ${
                    design.showChip ? 'bg-accent-orange' : 'bg-brand-400'
                  }`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                    design.showChip ? 'translate-x-4' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-brand-100 rounded-xl border border-brand-200">
                <div className="flex items-center space-x-2">
                  <Cpu className="h-4 w-4 text-brand-600" />
                  <div>
                    <span className="text-xs font-bold text-brand-950 block">Include Security Barcode</span>
                    <span className="text-[10px] text-brand-500 block font-mono">Adds PDF-417 barcode rendering</span>
                  </div>
                </div>
                <button
                  type="button"
                  id="toggle-barcode"
                  onClick={() => handleCheckboxChange('showBarcode')}
                  className={`w-10 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none ${
                    design.showBarcode ? 'bg-accent-orange' : 'bg-brand-400'
                  }`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                    design.showBarcode ? 'translate-x-4' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Visualizer Live Preview */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            {/* Real-time Indicator banner */}
            <div className="mb-4 flex items-center space-x-1.5 text-xs text-emerald-600 bg-emerald-50 py-1.5 px-3 rounded-full border border-emerald-200 font-semibold shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Real-Time WYSIWYG Rendering Active</span>
            </div>

            {/* Visual card holder simulator */}
            <div className="w-full flex flex-col items-center p-8 bg-brand-900 border border-brand-850 rounded-2xl relative shadow-xl overflow-hidden min-h-[540px] justify-center">
              
              {/* Backlight elements matching colors */}
              <div 
                className="absolute w-60 h-60 rounded-full blur-[100px] opacity-20 -top-10 transition-all duration-500"
                style={{ backgroundColor: design.primaryColor }}
              />
              <div 
                className="absolute w-40 h-40 rounded-full blur-[80px] opacity-20 -bottom-10 transition-all duration-500"
                style={{ backgroundColor: design.secondaryColor }}
              />

              {/* Lanyard Strap Representation at top (Vertical layout only) */}
              {design.layout === 'vertical' && (
                <div className="flex flex-col items-center w-full mb-[-16px] relative z-20">
                  {/* Neck loop simulation */}
                  <div 
                    className="w-16 h-28 border-x-[14px] border-t-[14px] rounded-t-3xl border-b-0 -mt-24 transition-all duration-500 opacity-80 flex items-center justify-center relative"
                    style={{ borderColor: design.lanyardColor }}
                  >
                    <div className="absolute top-2 left-0 right-0 text-center text-[5px] text-white/50 font-bold tracking-widest leading-none rotate-90 select-none">
                      {design.customLanyardText.slice(0, 15)}
                    </div>
                  </div>
                  {/* Metal Lobster Claw Hook */}
                  <div className="w-4 h-6 bg-gradient-to-r from-slate-400 to-slate-200 rounded-sm shadow-md border-t border-slate-300 relative z-30" />
                  <div className="w-6 h-1.5 bg-slate-500 rounded-full shadow-sm -mt-1.5 relative z-30" />
                </div>
              )}

              {/* Landscape lanyard hook slot at top */}
              {design.layout === 'horizontal' && (
                <div className="flex flex-col items-center w-full mb-2 relative z-20">
                  <div className="w-12 h-3.5 bg-slate-800 rounded-full border border-slate-700 flex items-center justify-center">
                    <div className="w-6 h-1 bg-slate-950 rounded-full" />
                  </div>
                </div>
              )}

              {/* Actual ID Card Body */}
              <div 
                className={`bg-white border text-brand-950 relative overflow-hidden flex flex-col justify-between transition-all duration-500 shadow-2xl ${
                  design.layout === 'vertical' 
                    ? 'w-72 h-[420px] rounded-2xl p-6 border-slate-200' 
                    : 'w-96 h-64 rounded-xl p-5 border-slate-200'
                }`}
              >
                {/* Shiny gloss overlay overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none z-20" />
                
                {/* Visual Accent header curves based on primary brand color */}
                <div 
                  className="absolute top-0 left-0 right-0 h-24 opacity-15 transition-colors duration-500" 
                  style={{ backgroundColor: design.primaryColor }} 
                />
                <div 
                  className="absolute -top-12 -left-12 w-32 h-32 rounded-full opacity-10 transition-colors duration-500" 
                  style={{ backgroundColor: design.secondaryColor }} 
                />

                {/* Vertical Layout styling */}
                {design.layout === 'vertical' ? (
                  <>
                    {/* Header: Company and Chip */}
                    <div className="flex items-center justify-between relative z-10">
                      <div className="text-left">
                        <span className="text-[10px] font-mono tracking-widest text-brand-500 font-bold">BHISHMA CLIENT</span>
                        <h4 className="text-sm font-black tracking-tight leading-none" style={{ color: design.primaryColor }}>
                          {design.logoText || 'ORGANIZATION'}
                        </h4>
                      </div>
                      
                      {design.showChip && (
                        <div className="w-8 h-6 bg-gradient-to-br from-amber-200 via-yellow-100 to-amber-300 rounded-md border border-amber-300 shadow-inner flex flex-col justify-around p-0.5 shrink-0">
                          <div className="h-px bg-amber-400 opacity-50" />
                          <div className="h-px bg-amber-400 opacity-50" />
                          <div className="h-px bg-amber-400 opacity-50" />
                        </div>
                      )}
                    </div>

                    {/* Middle: Portrait */}
                    <div className="flex flex-col items-center text-center mt-6 relative z-10">
                      <div className="relative">
                        {/* Premium photo frame */}
                        <div 
                          className="absolute inset-[-4px] rounded-full p-0.5 animate-pulse"
                          style={{ backgroundColor: design.secondaryColor }}
                        />
                        <img 
                          src={design.avatarUrl} 
                          alt="ID holder profile"
                          referrerPolicy="no-referrer"
                          className="w-24 h-24 rounded-full object-cover border-2 border-white relative z-10 shadow-md bg-brand-200"
                        />
                      </div>

                      <h3 className="text-lg font-extrabold text-brand-950 mt-4 leading-tight">
                        {design.fullName || 'Full Name'}
                      </h3>
                      <p className="text-xs font-bold font-mono tracking-wide mt-1 uppercase" style={{ color: design.secondaryColor }}>
                        {design.jobTitle || 'Job Designation'}
                      </p>
                    </div>

                    {/* Bottom: ID Credentials & Barcode */}
                    <div className="mt-auto relative z-10">
                      <div className="flex justify-between items-end border-t border-brand-200/60 pt-4 pb-2">
                        <div className="text-left">
                          <span className="text-[8px] font-bold text-brand-500 uppercase tracking-widest block">Department</span>
                          <span className="text-xs font-bold text-brand-950 block">{design.department || 'General'}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[8px] font-bold text-brand-500 uppercase tracking-widest block">System ID</span>
                          <span className="text-xs font-mono font-bold text-brand-950 block">{design.employeeId || 'E-0000'}</span>
                        </div>
                      </div>

                      {/* Barcode Render */}
                      {design.showBarcode ? (
                        <div className="h-8 bg-slate-100 border border-slate-200/80 rounded mt-1 p-1 flex items-center justify-center overflow-hidden">
                          {/* Fake barcode lines */}
                          <div className="flex items-stretch justify-around h-full w-full opacity-80">
                            {[1,4,2,1,3,1,2,4,1,2,3,1,4,1,2,2,3,1,2,4,1,3,1,1].map((weight, i) => (
                              <div 
                                key={i} 
                                className="bg-brand-950 h-full" 
                                style={{ width: `${weight}px`, opacity: i % 3 === 0 ? 0.3 : 1 }} 
                              />
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="h-2" />
                      )}
                    </div>
                  </>
                ) : (
                  /* Horizontal / Landscape Layout styling */
                  <div className="flex flex-col h-full justify-between">
                    {/* Header row */}
                    <div className="flex justify-between items-start relative z-10">
                      <div>
                        <span className="text-[9px] font-mono tracking-widest text-brand-500 font-bold">BHISHMA CLIENT</span>
                        <h4 className="text-sm font-black tracking-tight leading-none mt-0.5" style={{ color: design.primaryColor }}>
                          {design.logoText || 'ORGANIZATION'}
                        </h4>
                      </div>
                      
                      {design.showChip && (
                        <div className="w-8 h-6 bg-gradient-to-br from-amber-200 via-yellow-100 to-amber-300 rounded-md border border-amber-300 shadow-inner flex flex-col justify-around p-0.5 shrink-0">
                          <div className="h-px bg-amber-400 opacity-50" />
                          <div className="h-px bg-amber-400 opacity-50" />
                          <div className="h-px bg-amber-400 opacity-50" />
                        </div>
                      )}
                    </div>

                    {/* Middle split section */}
                    <div className="flex items-center space-x-4 my-auto relative z-10">
                      <div className="relative shrink-0">
                        <div 
                          className="absolute inset-[-3px] rounded-full p-0.5"
                          style={{ backgroundColor: design.secondaryColor }}
                        />
                        <img 
                          src={design.avatarUrl} 
                          alt="ID holder profile"
                          referrerPolicy="no-referrer"
                          className="w-16 h-16 rounded-full object-cover border-2 border-white relative z-10 shadow bg-brand-200"
                        />
                      </div>

                      <div className="text-left flex-grow">
                        <h3 className="text-base font-extrabold text-brand-950 leading-tight">
                          {design.fullName || 'Full Name'}
                        </h3>
                        <p className="text-xs font-bold font-mono tracking-wide mt-0.5 uppercase" style={{ color: design.secondaryColor }}>
                          {design.jobTitle || 'Job Designation'}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 border-t border-brand-200/50 pt-2">
                          <div>
                            <span className="text-[7px] font-bold text-brand-500 uppercase tracking-widest block leading-none">Dept</span>
                            <span className="text-[10px] font-bold text-brand-800 block line-clamp-1">{design.department || 'General'}</span>
                          </div>
                          <div>
                            <span className="text-[7px] font-bold text-brand-500 uppercase tracking-widest block leading-none">ID Number</span>
                            <span className="text-[10px] font-mono font-bold text-brand-800 block">{design.employeeId || 'E-0000'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Barcode */}
                    {design.showBarcode && (
                      <div className="h-6 bg-slate-100 border border-slate-200/80 rounded p-1 flex items-center justify-center overflow-hidden relative z-10">
                        <div className="flex items-stretch justify-around h-full w-full opacity-80">
                          {[1,3,1,1,2,4,2,1,3,1,2,4,1,2,3,1,4,1,2,2,3,1,2,4,1,3,1,1,2,2,4,1].map((weight, i) => (
                            <div 
                              key={i} 
                              className="bg-brand-950 h-full" 
                              style={{ width: `${weight}px`, opacity: i % 4 === 0 ? 0.35 : 1 }} 
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Studio Bottom Quick Actions */}
            <div className="w-full grid grid-cols-2 gap-4 mt-6">
              <button
                type="button"
                id="btn-download-studio"
                onClick={handleMockDownload}
                className="flex items-center justify-center space-x-2 bg-brand-950 hover:bg-brand-900 text-white font-bold py-3 px-4 rounded-xl text-xs transition-all duration-200 cursor-pointer shadow"
              >
                {downloadSuccess ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span>Card Exported!</span>
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    <span>Download Live Spec</span>
                  </>
                )}
              </button>

              <button
                type="button"
                id="btn-quote-studio"
                onClick={handleQuoteDispatch}
                className="flex items-center justify-center space-x-2 bg-accent-orange hover:bg-accent-orange-hover text-white font-bold py-3 px-4 rounded-xl text-xs transition-all duration-200 cursor-pointer shadow"
              >
                {quoteSuccess ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Specs Saved!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    <span>Save Custom Spec</span>
                  </>
                )}
              </button>
            </div>

            {quoteSuccess && (
              <p className="text-xs text-emerald-600 font-semibold mt-3 text-center animate-bounce">
                ✓ Spec saved! Go to &quot;Price Estimator&quot; or &quot;Inquiry Hub&quot; to review quotes.
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
