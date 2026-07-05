'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Footer() {
  const [lang, setLang] = useState<'cy' | 'en'>('cy');

  const navigationLinks = {
    cy: [
      { label: 'Cartref', href: '#home' },
      { label: 'Oriel', href: '#gallery' },
      { label: 'Amdanom Ni', href: '#about' },
      { label: 'Cysylltu', href: '#contact' },
      { label: 'Cwestiynau Cyffredin', href: '#faq' },
    ],
    en: [
      { label: 'Home', href: '#home' },
      { label: 'Gallery', href: '#gallery' },
      { label: 'About', href: '#about' },
      { label: 'Contact', href: '#contact' },
      { label: 'FAQs', href: '#faq' },
    ],
  };

  const taglines = {
    cy: {
      bold: 'Celfyddyd barhaol yn y brifddinas.',
      sub: 'Celf ar groen, wedi’i hysbrydoli gan Gymru.',
    },
    en: {
      bold: 'Permanent artistry in the capital.',
      sub: 'Art on skin, inspired by Wales.',
    },
  };

  const studioDetails = {
    cy: {
      title: 'Y Stiwdio',
      address: '74 Heol y Plwyf, Treganna, Caerdydd, CF11 8NX',
      hoursTitle: 'Oriau Agor',
      hours: 'Dydd Mawrth – Dydd Sadwrn: 10:00 – 18:00',
      closed: 'Dydd Sul & Dydd Llun: Ar gau',
      hygiene: 'Stiwdio drwyddedig gan Gyngor Caerdydd. Safonau hylendid clinigol, modern.',
    },
    en: {
      title: 'The Studio',
      address: '74 Church Road, Canton, Cardiff, CF11 8NX',
      hoursTitle: 'Opening Hours',
      hours: 'Tuesday – Saturday: 10:00 AM – 6:00 PM',
      closed: 'Sunday & Monday: Closed',
      hygiene: 'Fully licensed studio under Cardiff Council. Modern, clinical hygiene standards.',
    },
  };

  const contactActions = {
    cy: {
      title: 'Cysylltu ac Archebu',
      cta: 'Archebwch Eich Sesiwn',
      subtext: 'Dechreuwch eich stori tatŵ nesaf gyda ni.',
    },
    en: {
      title: 'Connect & Book',
      cta: 'Book Your Session',
      subtext: 'Begin your next tattoo journey with us.',
    },
  };

  return (
    <footer className="relative bg-[#111111] text-white overflow-hidden border-t border-neutral-800 font-sans selection:bg-[#D97706] selection:text-black">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#553F83]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#D97706]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 relative z-10">
        
        {/* Upper Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-neutral-800">
          
          {/* Brand & Language Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              <div className="flex items-center space-x-6">
                <span className="font-serif text-4xl font-semibold tracking-wide text-white">
                  tatŵ
                </span>
                
                {/* Language Toggle */}
                <div className="inline-flex p-1 bg-neutral-900 border border-neutral-800 rounded-full text-xs font-mono">
                  <button
                    onClick={() => setLang('cy')}
                    className={`px-3 py-1.5 rounded-full transition-all duration-200 ${
                      lang === 'cy'
                        ? 'bg-[#D97706] text-black font-semibold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    CY
                  </button>
                  <button
                    onClick={() => setLang('en')}
                    className={`px-3 py-1.5 rounded-full transition-all duration-200 ${
                      lang === 'en'
                        ? 'bg-[#D97706] text-black font-semibold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>

              {/* Dynamic Tagline Display */}
              <div className="mt-6 h-[72px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={lang}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2"
                  >
                    <p className="text-xl font-serif text-neutral-100 leading-snug">
                      {taglines[lang].bold}
                    </p>
                    <p className="text-sm text-neutral-400 font-mono tracking-tight">
                      {taglines[lang].sub}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Social Channels */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                {lang === 'cy' ? 'Dilynwch Ni' : 'Follow Us'}
              </span>
              <div className="flex items-center space-x-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-400 hover:text-[#D97706] hover:border-[#D97706]/40 transition-all duration-300 group"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-400 hover:text-[#D97706] hover:border-[#D97706]/40 transition-all duration-300 group"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-400 hover:text-[#D97706] hover:border-[#D97706]/40 transition-all duration-300 group"
                  aria-label="Pinterest"
                >
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <path d="M5 12h14"></path>
                    <circle cx="12" cy="12" r="9"></circle>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500">
              {lang === 'cy' ? 'Llywio' : 'Navigation'}
            </h3>
            <ul className="space-y-3">
              {navigationLinks[lang].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group flex items-center text-sm text-neutral-300 hover:text-[#D97706] transition-colors duration-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] mr-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio & Hours Column */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500">
              {studioDetails[lang].title}
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-sm text-neutral-300">
                <svg className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>{studioDetails[lang].address}</span>
              </div>

              <div className="pt-2 border-t border-neutral-800/60 space-y-1">
                <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                  {studioDetails[lang].hoursTitle}
                </p>
                <p className="text-sm text-neutral-300">{studioDetails[lang].hours}</p>
                <p className="text-xs text-neutral-500 italic">{studioDetails[lang].closed}</p>
              </div>

              {/* Direct email links */}
              <div className="pt-2 space-y-1">
                <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Email</p>
                <div className="flex flex-col space-y-1 text-sm font-mono text-[#D97706]">
                  <a href="mailto:post@tatw.cymru" className="hover:underline">post@tatw.cymru</a>
                  <a href="mailto:info@tatw.cymru" className="hover:underline">info@tatw.cymru</a>
                </div>
              </div>
            </div>
          </div>

          {/* Connect & Call to Action */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500">
              {contactActions[lang].title}
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              {contactActions[lang].subtext}
            </p>
            <a
              href="#booking"
              className="inline-flex w-full justify-center items-center px-4 py-3 bg-[#D97706] text-black font-semibold rounded-lg hover:bg-amber-500 transition-all duration-300 hover:shadow-[0_0_20px_rgba(217,119,6,0.3)] text-sm group"
            >
              <span>{contactActions[lang].cta}</span>
              <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          
          {/* Licenses & Standards */}
          <div className="flex items-center space-x-4 max-w-xl">
            <div className="p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-[#D97706]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <p className="text-xs text-neutral-400 leading-normal">
              {studioDetails[lang].hygiene}
            </p>
          </div>

          {/* Copyright & Branding Tag */}
          <div className="flex flex-col items-start md:items-end space-y-1">
            <p className="text-xs text-neutral-500 font-mono">
              &copy; 2026 tatŵ. All rights reserved.
            </p>
            <p className="text-[10px] text-neutral-600 font-mono">
              Designed & developed with pride in Cymru
            </p>
          </div>

        </div>

      </div>
    </footer>
  );
}