import React, { useState } from 'react';
import { Mail, Phone, MapPin, Check, Trash2, Send, Clock, FileText, HelpCircle } from 'lucide-react';
import { SavedInquiry } from '../types';

interface ContactFormProps {
  savedInquiries: SavedInquiry[];
  onInquirySubmitted: (inquiry: SavedInquiry) => void;
  onClearInquiries: () => void;
}

export default function ContactForm({ savedInquiries, onInquirySubmitted, onClearInquiries }: ContactFormProps) {
  // General query form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Bulk ID Card Corporate Pricing');
  const [msg, setMsg] = useState('');
  const [formDone, setFormDone] = useState(false);

  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert('Please fill out name, email, and phone number.');
      return;
    }

    const newInquiry: SavedInquiry = {
      id: 'bg-gen-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      clientName: name,
      clientEmail: email,
      clientPhone: phone,
      clientCompany: 'Independent Business',
      notes: `Subject: ${subject}\n\nMessage:\n${msg}`,
      status: 'pending',
      type: 'general_query'
    };

    onInquirySubmitted(newInquiry);
    setFormDone(true);
    
    // reset
    setName('');
    setEmail('');
    setPhone('');
    setMsg('');

    setTimeout(() => {
      setFormDone(false);
    }, 4000);
  };

  return (
    <div className="bg-brand-100 py-12 lg:py-16 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Head */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-950 tracking-tight">
            Inquiry & Spec Tracking Hub
          </h2>
          <p className="mt-4 text-base text-brand-700">
            Submit a query, trace your configured smart card designs, and manage active price estimates with our instant ticketing client.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Block: Contact Info & Inquiry Form */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Quick Contact Cards */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-brand-200 shadow-premium">
              <h3 className="text-lg font-bold text-brand-950 mb-6">Bhishma Graphics HQ</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3.5">
                  <MapPin className="h-5 w-5 text-accent-orange shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-brand-950">Industrial Factory Address</h4>
                    <p className="text-xs text-brand-700 mt-1 leading-normal">
                      Bhishma Graphics, Plot No. 12, Industrial Area Phase II, Near High-Resolution Card Hub, Delhi, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 border-t border-brand-200 pt-4">
                  <Mail className="h-5 w-5 text-accent-orange shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-brand-950">E-mail Correspondence</h4>
                    <p className="text-xs text-brand-900 mt-0.5 font-mono">bhishmaid@gmail.com</p>
                    <p className="text-[10px] text-brand-500 font-medium">Responses usually within 2 business hours.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 border-t border-brand-200 pt-4">
                  <Phone className="h-5 w-5 text-accent-orange shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-brand-950">Phone Hotline & support</h4>
                    <p className="text-xs text-brand-900 mt-0.5 font-mono">+91 99990 01122</p>
                    <p className="text-[10px] text-brand-500 font-medium">Monday to Saturday: 10:00 AM - 7:00 PM IST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick message form */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-brand-200 shadow-premium">
              <h3 className="text-base font-bold text-brand-950 mb-4">Send a General Inquiry</h3>
              
              {formDone ? (
                <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl text-center">
                  <span className="inline-flex p-2 bg-emerald-100 rounded-full text-emerald-600 mb-3">
                    <Check className="h-5 w-5 stroke-[3]" />
                  </span>
                  <h4 className="font-bold text-brand-950 text-sm">Message Received!</h4>
                  <p className="text-xs text-brand-700 mt-1">
                    Your inquiry ticket was registered. It is also displayed in your active track log on the right side.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleGeneralSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-brand-600 block mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-brand-200 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-accent-orange focus:border-accent-orange"
                        placeholder="Arjun"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-brand-600 block mb-1">Contact Email *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-brand-200 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-accent-orange focus:border-accent-orange"
                        placeholder="arjun@gmail.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-brand-600 block mb-1">Phone *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-brand-200 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-accent-orange focus:border-accent-orange"
                        placeholder="+91..."
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-brand-600 block mb-1">Inquiry Subject</label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-brand-200 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-accent-orange focus:border-accent-orange bg-white"
                      >
                        <option value="Bulk ID Card Corporate Pricing">Bulk ID Corporate Printing</option>
                        <option value="Lanyard Sublimation customization">Lanyard Customization</option>
                        <option value="RFID Chip Compatibility inquiry">RFID Smart Chip Spec</option>
                        <option value="Requesting Sample ID Badge pack">Request Physical Samples</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-brand-600 block mb-1">Describe Requirements</label>
                    <textarea
                      required
                      value={msg}
                      onChange={(e) => setMsg(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-brand-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-accent-orange focus:border-accent-orange h-24 resize-none"
                      placeholder="Specify material preference, volume timeline, lanyard widths, chip types..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-950 hover:bg-brand-900 text-white py-3 rounded-xl font-bold text-xs shadow-md transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer hover:-translate-y-0.5"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Send Message Ticket</span>
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* Right Block: Active Inquiry Logs / Saved Specifications */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-brand-200 shadow-premium">
            <div className="flex items-center justify-between mb-6 border-b border-brand-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-brand-950">Active Spec & Estimate Tickets</h3>
                <p className="text-[11px] text-brand-500 font-medium">Persistent log saved locally on your browser.</p>
              </div>
              
              {savedInquiries.length > 0 && (
                <button
                  type="button"
                  id="btn-clear-all-inq"
                  onClick={onClearInquiries}
                  className="text-xs text-rose-600 hover:text-rose-800 font-bold flex items-center space-x-1 hover:bg-rose-50 px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Clear Log</span>
                </button>
              )}
            </div>

            {savedInquiries.length === 0 ? (
              <div className="text-center py-16 px-4 bg-brand-100/50 rounded-2xl border border-dashed border-brand-300">
                <Clock className="h-10 w-10 text-brand-400 mx-auto mb-3" />
                <h4 className="font-bold text-sm text-brand-950">No active inquiry tickets found</h4>
                <p className="text-xs text-brand-600 mt-1 max-w-xs mx-auto leading-relaxed">
                  Design a card in the <span className="font-bold text-accent-orange">ID Card Studio</span>, or estimate bulk setups in the <span className="font-bold text-accent-orange">Price Estimator</span> to populate logs.
                </p>
              </div>
            ) : (
              <div className="space-y-6 max-h-[560px] overflow-y-auto pr-1">
                {savedInquiries.map((inq) => (
                  <div 
                    key={inq.id}
                    className="p-4 rounded-xl border border-brand-200 bg-brand-100/40 shadow-sm relative text-xs flex flex-col justify-between"
                  >
                    {/* Ticket Header */}
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-brand-200 text-brand-800 rounded">
                          {inq.id}
                        </span>
                        <span className="text-[10px] text-brand-500 ml-2 font-mono">{inq.date}</span>
                      </div>
                      
                      <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 uppercase">
                        <span>●</span>
                        <span>{inq.status}</span>
                      </span>
                    </div>

                    {/* Client overview */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-3.5 font-medium text-brand-800 bg-white p-2.5 rounded border border-brand-200/60">
                      <div>
                        <span className="text-[8px] text-brand-500 uppercase block font-bold leading-none">Applicant Name</span>
                        <span className="text-[11px] font-bold text-brand-950 mt-0.5 block">{inq.clientName}</span>
                      </div>
                      <div>
                        <span className="text-[8px] text-brand-500 uppercase block font-bold leading-none">Email Profile</span>
                        <span className="text-[11px] font-mono text-brand-900 mt-0.5 block truncate">{inq.clientEmail}</span>
                      </div>
                    </div>

                    {/* Specifications details (Design Spec) */}
                    {inq.designData && (
                      <div className="mb-3 p-3 bg-amber-50/75 border border-amber-200/60 rounded-lg text-[11px]">
                        <p className="font-bold text-brand-900 flex items-center mb-2">
                          <FileText className="h-3 w-3 mr-1 text-accent-orange" />
                          <span>Custom ID Design Layout Spec:</span>
                        </p>
                        <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-brand-700 font-medium">
                          <span>Name: <strong className="text-brand-950">{inq.designData.fullName}</strong></span>
                          <span>Role: <strong className="text-brand-950">{inq.designData.jobTitle}</strong></span>
                          <span>Company: <strong className="text-brand-950">{inq.designData.logoText}</strong></span>
                          <span>RFID Chip: <strong className="text-brand-950">{inq.designData.showChip ? 'Embedded' : 'None'}</strong></span>
                        </div>
                      </div>
                    )}

                    {/* Pricing details (Quote Spec) */}
                    {inq.quoteData && (
                      <div className="mb-3 p-3 bg-brand-900 text-white rounded-lg text-[11px]">
                        <p className="font-bold text-brand-400 flex items-center mb-2">
                          <Send className="h-3 w-3 mr-1 text-accent-orange" />
                          <span>Configured Bulk Pricing estimate:</span>
                        </p>
                        <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-brand-300 font-semibold font-mono">
                          <span>Material: <strong className="text-white">{inq.quoteData.cardMaterial.replace('_', ' ').toUpperCase()}</strong></span>
                          <span>Quantity: <strong className="text-white">{inq.quoteData.quantity} Units</strong></span>
                          <span>Lanyards: <strong className="text-white">{inq.quoteData.includeLanyards ? 'Custom Sublimated' : 'None'}</strong></span>
                          <span>Total Est: <strong className="text-accent-orange font-bold font-mono">${inq.quoteData.estimatedTotal}</strong></span>
                        </div>
                      </div>
                    )}

                    {/* General message info */}
                    {!inq.quoteData && !inq.designData && (
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded text-brand-700 leading-normal font-medium italic">
                        {inq.notes}
                      </div>
                    )}

                    <div className="text-[10px] text-brand-500 mt-2 font-medium flex items-center">
                      <Clock className="h-3 w-3 mr-1 text-brand-400" />
                      <span>Specialist auto-reply dispatch queued. Ref ID valid for 60 days.</span>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
