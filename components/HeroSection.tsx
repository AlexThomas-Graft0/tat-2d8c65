'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabaseClient'

type Language = 'cy' | 'en'

export function HeroSection() {
  const [lang, setLang] = useState<Language>('cy')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [flashCount, setFlashCount] = useState<number | null>(null)

  useEffect(() => {
    async function fetchAvailableFlash() {
      try {
        const { count, error } = await supabase
          .from('gallery_items')
          .select('*', { count: 'exact', head: true })
          .eq('is_flash', true)
          .eq('flash_status', 'available')

        if (!error && count !== null) {
          setFlashCount(count)
        }
      } catch (e) {
        // Fallback gracefully without throwing errors
      }
    }
    fetchAvailableFlash()
  }, [])

  const content = {
    cy: {
      logo: 'tatŵ',
      nav: [
        { name: 'Cartref', href: '#home' },
        { name: 'Oriel', href: '#gallery' },
        { name: 'Amdanom Ni', href: '#about' },
        { name: 'Cysylltu', href: '#contact' },
      ],
      bookBtn: 'Archebu',
      headline: 'Celf ar groen, wedi’i hysbrydoli gan Gymru.',
      subheadline: 'Stiwdio tatŵ bwtîg, broffesiynol yng nghalonnau Caerdydd. Rydym yn cyfuno dyluniadau Celtaidd hanesyddol a chelfyddyd gyfoes mewn awyrgylch glân, croesawgar a dwyieithog.',
      primaryCta: 'Archebwch Eich Sesiwn',
      secondaryCta: 'Chwiliwch yr Oriel',
      scrollDown: 'Sgroliwch i lawr',
      hygieneNotice: 'Stiwdio drwyddedig gan Gyngor Caerdydd • Safonau Hylendid Clinigol',
      flashBadge: 'Dyluniadau Flash ar gael nawr'
    },
    en: {
      logo: 'tatŵ',
      nav: [
        { name: 'Home', href: '#home' },
        { name: 'Gallery', href: '#gallery' },
        { name: 'About', href: '#about' },
        { name: 'Contact', href: '#contact' },
      ],
      bookBtn: 'Book Now',
      headline: 'Art on skin, inspired by Wales.',
      subheadline: 'A boutique, professional tattoo studio in the heart of Cardiff. We merge historic Celtic designs and contemporary fine art in a clean, welcoming, fully bilingual environment.',
      primaryCta: 'Book Your Session',
      secondaryCta: 'Explore the Gallery',
      scrollDown: 'Scroll down',
      hygieneNotice: 'Fully licensed by Cardiff Council • Clinical Hygiene Standards',
      flashBadge: 'Flash designs available now'
    }
  }

  const current = content[lang]

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#0F172A] text-white selection:bg-[#D97706]/30 selection:text-[#D97706]">
      {/* Background Cinematic Asset */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/90 via-[#0F172A]/70 to-[#0F172A] z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/80 via-transparent to-[#0F172A]/80 z-10" />
        <motion.img
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1.05, opacity: 0.45 }}
          transition={{ duration: 12, ease: 'easeOut' }}
          src="https://images.unsplash.com/photo-1598257006458-087169a1f08d?auto=format&fit=crop&q=80&w=2200"
          alt="Atmospheric boutique tattoo studio background"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Global Navigation Header */}
      <header className="relative z-50 w-full border-b border-white/5 bg-[#0F172A]/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group focus:outline-none">
            <span className="text-2xl md:text-3xl font-serif tracking-widest text-white group-hover:text-[#D97706] transition-colors duration-300">
              tatŵ
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {current.nav.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm tracking-wider uppercase font-mono text-gray-300 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#D97706]/40 rounded-sm px-2 py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Area (Language Toggle & CTA) */}
          <div className="hidden md:flex items-center gap-6">
            {/* Bilingual Switcher */}
            <div className="flex items-center bg-black/30 rounded-full p-1 border border-white/10 font-mono text-xs">
              <button
                onClick={() => setLang('cy')}
                className={`px-3 py-1 rounded-full transition-all duration-300 ${
                  lang === 'cy'
                    ? 'bg-[#D97706] text-white shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
                aria-label="Newid i'r Gymraeg"
              >
                CY
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded-full transition-all duration-300 ${
                  lang === 'en'
                    ? 'bg-[#D97706] text-white shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
                aria-label="Switch to English"
              >
                EN
              </button>
            </div>

            {/* Book Button */}
            <a
              href="#booking"
              className="relative inline-flex items-center justify-center px-5 py-2.5 rounded-sm overflow-hidden group border border-[#D97706] bg-transparent text-sm font-mono tracking-wider uppercase transition-all duration-300 hover:bg-[#D97706] text-white"
            >
              <span className="relative z-10">{current.bookBtn}</span>
            </a>
          </div>

          {/* Mobile Menu & Lang Toggle Container */}
          <div className="flex md:hidden items-center gap-4">
            {/* Quick Lang Toggle on Mobile */}
            <button
              onClick={() => setLang(lang === 'cy' ? 'en' : 'cy')}
              className="text-xs font-mono bg-black/30 border border-white/10 px-2.5 py-1.5 rounded text-white active:bg-[#D97706] transition-colors"
            >
              {lang === 'cy' ? 'EN' : 'CY'}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-[#D97706] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 left-0 w-full bg-[#0F172A] border-b border-white/10 p-6 flex flex-col gap-4 z-40"
            >
              {current.nav.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg tracking-wider uppercase font-mono text-gray-200 hover:text-[#D97706] transition-colors py-2 border-b border-white/5"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#booking"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 w-full text-center py-3 bg-[#D97706] text-white uppercase font-mono tracking-wider text-sm rounded hover:bg-[#b86405] transition-colors"
              >
                {current.bookBtn}
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Content Area */}
      <div className="relative z-20 flex-grow flex items-center justify-center px-6 py-12 md:py-24">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          
          {/* Supabase Dynamic Flash Availability Badge */}
          <AnimatePresence mode="wait">
            {flashCount !== null && flashCount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D97706]/15 border border-[#D97706]/40 text-[#D97706] text-xs font-mono tracking-widest uppercase"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D97706] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D97706]"></span>
                </span>
                <span>
                  {flashCount} {current.flashBadge}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Headline Translation Transition Container */}
          <div className="min-h-[140px] md:min-h-[180px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.h1
                key={lang}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="text-4xl md:text-6xl lg:text-7xl font-serif font-light tracking-tight text-white leading-tight"
              >
                {current.headline}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Subheadline Translation Transition */}
          <div className="min-h-[90px] md:min-h-[70px] max-w-2xl mt-6 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={lang}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-gray-300 text-sm md:text-base leading-relaxed tracking-wide"
              >
                {current.subheadline}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center"
          >
            <a
              href="#booking"
              className="px-8 py-4 bg-[#D97706] text-white font-mono uppercase tracking-wider text-sm rounded-sm hover:bg-[#c26a05] active:translate-y-0.5 transition-all shadow-lg shadow-[#D97706]/10 hover:shadow-[#D97706]/20 focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:ring-offset-2 focus:ring-offset-[#0F172A]"
            >
              {current.primaryCta}
            </a>
            <a
              href="#gallery"
              className="px-8 py-4 bg-white/5 border border-white/10 hover:border-white/30 text-white font-mono uppercase tracking-wider text-sm rounded-sm hover:bg-white/10 active:translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              {current.secondaryCta}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Footer / Info Bar of Hero */}
      <div className="relative z-20 w-full border-t border-white/5 bg-black/20 backdrop-blur-sm py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-400">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{current.hygieneNotice}</span>
          </div>
          
          <a
            href="#philosophy"
            className="group flex items-center gap-2 text-[#D97706] hover:text-white transition-colors duration-200"
          >
            <span>{current.scrollDown}</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-y-0.5 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}