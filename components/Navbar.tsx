'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';

export function Navbar() {
  const [lang, setLang] = useState<'cy' | 'en'>('cy');
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Sync language with a global event so other components on the page can adapt
  useEffect(() => {
    const savedLang = localStorage.getItem('tatw-lang') as 'cy' | 'en' | null;
    if (savedLang) {
      setLang(savedLang);
      window.dispatchEvent(new CustomEvent('tatw-lang-change', { detail: savedLang }));
    } else {
      localStorage.setItem('tatw-lang', 'cy');
    }

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLanguageToggle = (newLang: 'cy' | 'en') => {
    setLang(newLang);
    localStorage.setItem('tatw-lang', newLang);
    window.dispatchEvent(new CustomEvent('tatw-lang-change', { detail: newLang }));
  };

  const navLinks = {
    cy: [
      { name: 'Cartref', href: '#home' },
      { name: 'Oriel', href: '#gallery' },
      { name: 'Amdanom Ni', href: '#about' },
      { name: 'Cysylltu', href: '#contact' },
    ],
    en: [
      { name: 'Home', href: '#home' },
      { name: 'Gallery', href: '#gallery' },
      { name: 'About', href: '#about' },
      { name: 'Contact', href: '#contact' },
    ],
  };

  const ctaText = {
    cy: 'Archebu',
    en: 'Book Now',
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0F172A]/90 backdrop-blur-md border-b border-white/5 py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="#home"
              className="font-serif text-3xl font-light tracking-widest text-white hover:text-[#D97706] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97706] rounded-md px-2 py-1"
            >
              tatŵ
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks[lang].map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-serif text-[15px] font-medium tracking-wide text-white/80 hover:text-white transition-colors relative py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97706] rounded"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D97706] transition-all duration-300 hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Action Area: Language Toggle & CTA */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Language Switcher */}
            <div className="flex items-center space-x-2 bg-black/20 p-1 rounded-full border border-white/5">
              <button
                onClick={() => handleLanguageToggle('cy')}
                className={`font-mono text-xs px-3 py-1.5 rounded-full transition-all duration-200 ${
                  lang === 'cy'
                    ? 'bg-[#D97706] text-white font-semibold shadow-sm'
                    : 'text-white/60 hover:text-white'
                }`}
                aria-label="Newid i'r Gymraeg"
              >
                CY
              </button>
              <button
                onClick={() => handleLanguageToggle('en')}
                className={`font-mono text-xs px-3 py-1.5 rounded-full transition-all duration-200 ${
                  lang === 'en'
                    ? 'bg-[#D97706] text-white font-semibold shadow-sm'
                    : 'text-white/60 hover:text-white'
                }`}
                aria-label="Switch to English"
              >
                EN
              </button>
            </div>

            {/* Book Now CTA */}
            <a
              href="#booking"
              className="inline-flex items-center justify-center bg-[#D97706] hover:bg-amber-700 text-white font-serif text-[15px] font-medium tracking-wide px-5 py-2.5 rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-amber-900/20 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A] focus-visible:ring-[#D97706]"
            >
              {ctaText[lang]}
            </a>
          </div>

          {/* Mobile menu button & Language Toggle */}
          <div className="flex md:hidden items-center space-x-4">
            {/* Quick Language Toggle for Mobile */}
            <button
              onClick={() => handleLanguageToggle(lang === 'cy' ? 'en' : 'cy')}
              className="flex items-center space-x-1 font-mono text-xs text-white/80 bg-white/5 border border-white/10 px-2.5 py-1.5 rounded"
              aria-label="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#D97706]" />
              <span>{lang === 'cy' ? 'EN' : 'CY'}</span>
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white/80 hover:text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#D97706]"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden bg-[#0F172A] border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-3">
              {navLinks[lang].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block font-serif text-lg text-white/90 hover:text-white hover:bg-white/5 px-3 py-2 rounded-md transition-colors"
                >
                  {link.name}
                </a>
              ))}
              
              <div className="pt-4 border-t border-white/5">
                {/* Mobile Language Toggle */}
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="font-serif text-sm text-white/60">Iaith / Language</span>
                  <div className="flex items-center space-x-1 bg-black/30 p-1 rounded-full border border-white/5">
                    <button
                      onClick={() => handleLanguageToggle('cy')}
                      className={`font-mono text-xs px-3 py-1 rounded-full transition-all ${
                        lang === 'cy' ? 'bg-[#D97706] text-white' : 'text-white/50'
                      }`}
                    >
                      CY
                    </button>
                    <button
                      onClick={() => handleLanguageToggle('en')}
                      className={`font-mono text-xs px-3 py-1 rounded-full transition-all ${
                        lang === 'en' ? 'bg-[#D97706] text-white' : 'text-white/50'
                      }`}
                    >
                      EN
                    </button>
                  </div>
                </div>

                {/* Mobile CTA */}
                <div className="mt-4 px-3">
                  <a
                    href="#booking"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center bg-[#D97706] hover:bg-amber-700 text-white font-serif font-medium tracking-wide py-3 rounded-md transition-colors"
                  >
                    {ctaText[lang]}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}