'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';

export function ContactSection() {
  const [lang, setLang] = useState<'CY' | 'EN'>('CY');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const content = {
    CY: {
      sectionTitle: "Cysylltu",
      sectionSubtitle: "Cysylltwyr & Lleoliad",
      headline: "Dewch i ymweld â ni yn Nhreganna.",
      addressLabel: "Lleoliad",
      address: "74 Heol y Plwyf, Treganna, Caerdydd, CF11 8NX",
      hoursLabel: "Oriau Agor",
      hours: [
        { days: "Dydd Mawrth – Dydd Sadwrn", hours: "10:00 – 18:00" },
        { days: "Dydd Sul & Dydd Llun", hours: "Ar gau" }
      ],
      hygieneBadge: "Cofrestredig a chymeradwywyd gan Gyngor Caerdydd dros Arferion Hylendid ac Iechyd yr Amgylchedd.",
      formTitle: "Ymholiadau Cyffredinol",
      formSubtitle: "Ar gyfer cwestiynau cyffredinol, cydweithrediadau neu ymholiadau gan y wasg.",
      labelName: "Enw Llawn",
      labelEmail: "E-bost",
      labelMessage: "Neges",
      placeholderName: "Eich enw...",
      placeholderEmail: "enw@enghraifft.cymru",
      placeholderMessage: "Sut gallwn ni eich helpu chi?",
      submitBtn: "Anfon Neges",
      successTitle: "Diolch yn fawr!",
      successMsg: "Mae eich neges wedi'i hanfon yn llwyddiannus. Byddwn yn cysylltu â chi cyn gynted â phosibl.",
      errorMsg: "Ops! Aeth rhywbeth o'i le. Rhowch gynnig arall arni neu anfonwch e-bost i info@tatw.cymru.",
    },
    EN: {
      sectionTitle: "Contact",
      sectionSubtitle: "Location & Enquiries",
      headline: "Visit us in Canton.",
      addressLabel: "Address",
      address: "74 Church Road, Canton, Cardiff, CF11 8NX",
      hoursLabel: "Opening Hours",
      hours: [
        { days: "Tuesday – Saturday", hours: "10:00 AM – 6:00 PM" },
        { days: "Sunday & Monday", hours: "Closed" }
      ],
      hygieneBadge: "Registered and approved by Cardiff Council for Environmental Health and Clinical Hygiene standards.",
      formTitle: "General Enquiries",
      formSubtitle: "For general questions, collaborations, or press enquiries.",
      labelName: "Full Name",
      labelEmail: "Email",
      labelMessage: "Message",
      placeholderName: "Your name...",
      placeholderEmail: "name@example.com",
      placeholderMessage: "How can we help you?",
      submitBtn: "Send Message",
      successTitle: "Thank you!",
      successMsg: "Your message has been successfully sent. We will get back to you as soon as possible.",
      errorMsg: "Oops! Something went wrong. Please try again or email us directly at info@tatw.cymru.",
    }
  };

  const t = content[lang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // General enquiries are routed to the bookings table as a custom-type enquiry
      // with details in the description, keeping with the database design.
      const { error } = await supabase
        .from('bookings')
        .insert({
          client_name: formData.name,
          client_email: formData.email,
          description: `[General Enquiry] ${formData.message}`,
          preferred_language: lang.toLowerCase() as 'cy' | 'en',
          tattoo_type: 'custom',
          status: 'new'
        });

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative min-h-screen bg-[#111111] text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Language Toggle & Section Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end border-b border-white/10 pb-8 mb-16 gap-6">
          <div>
            <span className="font-mono text-xs tracking-widest text-[#D97706] uppercase block mb-2">
              {t.sectionSubtitle}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-light tracking-tight">
              {t.sectionTitle}
            </h2>
          </div>

          {/* Bilingual Toggle */}
          <div className="flex items-center self-start md:self-auto bg-white/5 p-1 rounded border border-white/10 font-mono text-sm">
            <button
              onClick={() => setLang('CY')}
              className={`px-4 py-1.5 rounded transition-all duration-300 ${
                lang === 'CY' 
                  ? 'bg-[#D97706] text-white font-medium shadow-lg shadow-[#D97706]/20' 
                  : 'text-white/60 hover:text-white'
              }`}
            >
              CY
            </button>
            <div className="w-px h-4 bg-white/10" />
            <button
              onClick={() => setLang('EN')}
              className={`px-4 py-1.5 rounded transition-all duration-300 ${
                lang === 'EN' 
                  ? 'bg-[#D97706] text-white font-medium shadow-lg shadow-[#D97706]/20' 
                  : 'text-white/60 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Main Split Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Side: Studio Details & Map Visual */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
              <h3 className="text-3xl font-serif text-[#D97706] font-light">
                {t.headline}
              </h3>
              <p className="text-white/60 font-mono text-sm">
                tatŵ — Cardiff's premier bilingual bespoke tattoo studio.
              </p>
            </div>

            {/* Aesthetic Studio Map Visual / Image Overlay */}
            <div className="relative h-64 md:h-80 w-full rounded-lg overflow-hidden group border border-white/10 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1598257006458-087169a1f08d?auto=format&fit=crop&q=80&w=1200" 
                alt="tatŵ Studio Canton Cardiff" 
                className="w-full h-full object-cover grayscale contrast-125 brightness-50 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-90" />
              
              {/* Fake Map Pin Info Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/80 backdrop-blur-md rounded border border-white/10 flex items-start gap-4">
                <div className="p-2 bg-[#D97706]/20 rounded text-[#D97706] shrink-0 mt-0.5">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-white">tatŵ Studio</h4>
                  <p className="text-xs text-white/70 font-mono mt-1">{t.address}</p>
                </div>
              </div>
            </div>

            {/* Address & Hours */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
              <div className="space-y-3">
                <span className="font-mono text-xs tracking-wider text-[#D97706] uppercase block">
                  {t.addressLabel}
                </span>
                <p className="text-white/80 font-serif leading-relaxed text-sm">
                  {t.address}
                </p>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#D97706] hover:underline"
                >
                  Open in Google Maps 
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              <div className="space-y-3">
                <span className="font-mono text-xs tracking-wider text-[#D97706] uppercase block">
                  {t.hoursLabel}
                </span>
                <div className="space-y-2 font-mono text-sm text-white/80">
                  {t.hours.map((item, idx) => (
                    <div key={idx} className="flex justify-between gap-4 border-b border-white/5 pb-1.5 last:border-0">
                      <span className="text-white/60 text-xs">{item.days}</span>
                      <span className="text-white font-medium text-xs">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Hygiene Badge */}
            <div className="bg-[#1e293b]/30 border border-white/5 p-5 rounded-lg flex items-start gap-4">
              <div className="p-2.5 bg-emerald-500/10 rounded-full text-emerald-400 shrink-0 mt-0.5">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <span className="text-xs font-mono font-semibold text-emerald-400 tracking-wider uppercase block mb-1">
                  Hygiene Standard
                </span>
                <p className="text-xs text-white/70 leading-relaxed italic">
                  {t.hygieneBadge}
                </p>
              </div>
            </div>

          </div>

          {/* Right Side: General Contact Form */}
          <div className="lg:col-span-7 bg-white/[0.02] border border-white/10 rounded-xl p-8 lg:p-10 shadow-2xl relative">
            <div className="mb-8">
              <h3 className="text-2xl font-serif text-white mb-2">
                {t.formTitle}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {t.formSubtitle}
              </p>
            </div>

            <AnimatePresence mode="wait">
              {submitStatus === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-emerald-500/10 border border-emerald-500/30 p-8 rounded-lg text-center space-y-4 my-8"
                >
                  <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-serif font-semibold text-white">
                    {t.successTitle}
                  </h4>
                  <p className="text-sm text-white/80 max-w-md mx-auto leading-relaxed">
                    {t.successMsg}
                  </p>
                  <button 
                    onClick={() => setSubmitStatus('idle')}
                    className="mt-4 text-xs font-mono text-[#D97706] hover:underline"
                  >
                    {lang === 'CY' ? 'Anfon neges arall' : 'Send another message'}
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded text-xs leading-relaxed font-mono">
                      {t.errorMsg}
                    </div>
                  )}

                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono tracking-wider text-white/60 uppercase">
                      {t.labelName} <span className="text-[#D97706]">*</span>
                    </label>
                    <input 
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder={t.placeholderName}
                      className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#D97706] focus:border-[#D97706] transition-all font-serif"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono tracking-wider text-white/60 uppercase">
                      {t.labelEmail} <span className="text-[#D97706]">*</span>
                    </label>
                    <input 
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder={t.placeholderEmail}
                      className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#D97706] focus:border-[#D97706] transition-all font-serif"
                    />
                  </div>

                  {/* Message Input */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono tracking-wider text-white/60 uppercase">
                      {t.labelMessage} <span className="text-[#D97706]">*</span>
                    </label>
                    <textarea 
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder={t.placeholderMessage}
                      className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#D97706] focus:border-[#D97706] transition-all font-serif resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full relative group overflow-hidden bg-[#D97706] text-white font-mono text-xs uppercase tracking-widest py-4 px-6 rounded transition-all duration-300 hover:bg-[#b86205] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-[#D97706]/10"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        {lang === 'CY' ? 'Yn anfon...' : 'Sending...'}
                      </span>
                    ) : (
                      <>
                        {t.submitBtn} <span className="transition-transform group-hover:translate-x-1">→</span>
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}