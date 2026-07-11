import React, { useState } from 'react';
import { ShieldCheck, Award, Users, RefreshCcw, Landmark, HardDrive } from 'lucide-react';

export default function AboutUs() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const stats = [
    { label: 'Corporate Clients', value: '180+' },
    { label: 'Cards Printed Yearly', value: '420,000+' },
    { label: 'Defect Rate', value: '< 0.02%' },
    { label: 'Dispatch Guarantee', value: '100%' },
  ];

  const milestones = [
    {
      year: '2016',
      title: 'Company Foundation',
      desc: 'Started as a specialty boutique vector design agency focusing on high-resolution corporate vector layouts in India.'
    },
    {
      year: '2019',
      title: 'Dye-Sublimation Integration',
      desc: 'Invested in high-temperature Japanese printing machinery, pioneering direct-to-card and lanyard printing.'
    },
    {
      year: '2022',
      title: 'Secure Smart Division',
      desc: 'Introduced security smart card division, embedding 13.56MHz RFID / NFC chips inside bio-based compostable wood shells.'
    },
    {
      year: '2025',
      title: 'ISO 9001 and Green Certification',
      desc: 'Successfully certified for ISO 9001 quality management and introduced 100% recyclable lead-free PVC cards.'
    }
  ];

  const faqs = [
    {
      q: 'What is the minimum order volume for custom printing?',
      a: 'We support small corporate orders starting from 10 cards for prototyping or small offices. Discount tiers kick in at volumes of 50, 150, 500, and 1000+ cards respectively.'
    },
    {
      q: 'What is the difference between Direct-to-Card and Retransfer printing?',
      a: 'Direct-to-Card prints directly onto the PVC card surface, which may leave a tiny unprinted white border. Retransfer printing prints onto a clear transfer film which is then thermally bonded to the card. This results in superior color saturation, high scratch resistance, and true edge-to-edge printing with zero borders.'
    },
    {
      q: 'Are your RFID smart cards compatible with our existing door readers?',
      a: 'Yes! We configure dual-band chips supporting both 125kHz Proximity (for older legacy systems) and 13.56MHz Mifare / NFC (for secure modern access controllers, cafeteria terminals, and smart systems). We provide prototype testing chips for your verification before full bulk dispatch.'
    },
    {
      q: 'How long do the printed lanyards take to manufacture?',
      a: 'Standard ribbon custom lanyards with single-color screen print dispatch within 3 business days. Dye-sublimated multi-color ribbon lanyards take approximately 4-5 business days for precision calibration.'
    },
  ];

  return (
    <div className="bg-brand-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Legacy Segment */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20 text-left">
          <div>
            <div className="inline-flex items-center space-x-1 bg-accent-orange/10 px-3 py-1 rounded-full text-accent-orange text-xs font-bold tracking-wider uppercase mb-5">
              <Landmark className="h-3.5 w-3.5" />
              <span>Our Industrial Legacy</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-950 tracking-tight leading-tight">
              Crafting Durable Identity Systems With Absolute Precision
            </h2>
            
            <p className="mt-5 text-base text-brand-700 leading-relaxed">
              At Bhishma Graphics, we believe that an identification card is not just a plastic credential—it is the physical gateway to your brand, security architecture, and staff culture. We operate state-of-the-art Japanese dye-sublimation and German thermal retransfer machinery to print high-definition products with unrivaled lifespan.
            </p>
            <p className="mt-4 text-base text-brand-700 leading-relaxed">
              Our core competency lies in complex multi-tech smart cards combining RFID microchips, custom magnetic strips, and tactile security holograms. Based in our premium manufacturing facility, we manage end-to-end prototyping, high-volume batch printing, and secure data programming.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="flex items-start space-x-3">
                <ShieldCheck className="h-5 w-5 text-accent-orange shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-brand-950">Strict Quality Checks</h4>
                  <p className="text-xs text-brand-600 mt-0.5">Every card is mechanically checked and microchip read-tested before sealing.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <HardDrive className="h-5 w-5 text-accent-orange shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-brand-950">Industrial Machinery</h4>
                  <p className="text-xs text-brand-600 mt-0.5">Dual-roller thermal lamination prevents edge peeling or color fading.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Legacy Visual Showcase */}
          <div className="relative">
            {/* Backglow decoration */}
            <div className="absolute inset-0 bg-accent-orange/5 rounded-3xl filter blur-2xl transform rotate-3" />
            
            <div className="relative bg-white border border-brand-200 p-8 rounded-3xl shadow-premium">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((st, i) => (
                  <div key={i} className="bg-brand-100 p-6 rounded-2xl border border-brand-200 text-center">
                    <p className="text-3xl sm:text-4xl font-black text-brand-950 font-display">
                      {st.value}
                    </p>
                    <p className="text-xs text-brand-600 font-bold tracking-wider uppercase mt-2">
                      {st.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-brand-200/80 pt-6 text-center">
                <p className="text-xs text-brand-500 font-medium font-mono">
                  ✨ Trusted by Government Bodies, Universities, and Fortune-500 Clients
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Milestone Timeline */}
        <div className="mb-20">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-950 tracking-tight">
              Bhishma Journey & Milestones
            </h3>
            <p className="text-sm text-brand-600 mt-2">
              A decade of engineering, evolving printing technologies, and setting brand trust standards.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {milestones.map((mil, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-brand-200 shadow-sm relative flex flex-col justify-between">
                <div>
                  <span className="text-2xl font-black text-accent-orange font-mono">
                    {mil.year}
                  </span>
                  <h4 className="font-bold text-base text-brand-950 mt-3">
                    {mil.title}
                  </h4>
                  <p className="text-xs text-brand-700 mt-2 leading-relaxed">
                    {mil.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordions */}
        <div className="max-w-4xl mx-auto text-left">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-950 tracking-tight">
              Frequently Answered Questions
            </h3>
            <p className="text-sm text-brand-600 mt-2">
              Everything you need to know about material types, secure RFID chips, and shipping speeds.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-brand-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  id={`faq-btn-${idx}`}
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 text-left font-bold text-sm sm:text-base text-brand-950 flex justify-between items-center cursor-pointer hover:bg-brand-100/50"
                >
                  <span>{faq.q}</span>
                  <span className="text-accent-orange text-lg ml-4 font-mono font-black shrink-0">
                    {activeFaq === idx ? '−' : '+'}
                  </span>
                </button>
                
                {activeFaq === idx && (
                  <div className="px-6 pb-5 text-xs sm:text-sm text-brand-700 leading-relaxed border-t border-brand-100 pt-3 bg-brand-100/25 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
