'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CONTENT = {
  cy: {
    accent: "Ein Hathroniaeth",
    headline: "Pontio treftadaeth a chelfyddyd fodern.",
    body: "Nid nod nodweddiadol o stiwdios traddodiadol yw ein gofod ni. Rydym wedi creu amgylchedd tawel, dwyieithog lle gallwch gydweithio'n agos â'ch artist. O ddyluniadau Celtaidd cywrain i waith llinell fân cyfoes, rydym yn trin pob tatŵ fel darn o gelf unigryw, parhaol sy'n parchu hanes a hunaniaeth.",
    safetyLabel: "DIOGELWCH A CHYSUR",
    safetyCallout: "Rydym yn dilyn y safonau hylendid clinigol llymaf yn Ewrop. Diogelwch a chysur yw ein blaenoriaethau cyntaf.",
    ctaBook: "Archebwch Eich Sesiwn",
    ctaGallery: "Chwiliwch yr Oriel",
    clinicalTitle: "Safonau Clinigol",
    clinicalDesc: "Stiwdio drwyddedig gan Gyngor Caerdydd. Defnyddir offer un-tro di-haint yn unig.",
    heritageTitle: "Cysylltiad Cymreig",
    heritageDesc: "Dathlu hanes, iaith, a chwedlonoriaeth Cymru trwy gelfyddyd gain ar groen."
  },
  en: {
    accent: "Our Philosophy",
    headline: "Bridging heritage and modern art.",
    body: "Our space is a departure from the intimidating, old-school tattoo parlor. We have built a calm, bilingual environment where you can collaborate closely with your artist. From intricate Celtic knotwork to modern fine-line designs, we treat every tattoo as an individual, permanent piece of art that respects history and personal identity.",
    safetyLabel: "SAFETY & COMFORT",
    safetyCallout: "We operate under the strictest clinical hygiene standards in Europe. Your safety and comfort are our absolute priorities.",
    ctaBook: "Book Your Session",
    ctaGallery: "Explore the Gallery",
    clinicalTitle: "Clinical Standards",
    clinicalDesc: "Fully licensed studio under Cardiff Council. We enforce strict medical-grade sterilization.",
    heritageTitle: "Welsh Connection",
    heritageDesc: "Celebrating Welsh history, language, and mythology through custom fine art on skin."
  }
};

export function PhilosophySection() {
  const [lang, setLang] = useState<'cy' | 'en'>('cy');
  const [isHovered, setIsHovered] = useState(false);

  const activeContent = CONTENT[lang];

  return (
    <section id="philosophy" className="relative bg-[#0F172A] text-[#ffffff] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background ambient glow matching primary token #553F83 */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#553F83]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#D97706]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header with Language Selector */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-8 mb-16 gap-4">
          <div className="space-y-1">
            <span className="font-mono text-xs tracking-widest text-[#D97706] uppercase">
              {lang === 'cy' ? 'Amdanom Ni' : 'About tatŵ'}
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-light tracking-tight text-white">
              tatŵ <span className="text-slate-500">—</span> {lang === 'cy' ? 'Ein Hathroniaeth' : 'Our Philosophy'}
            </h2>
          </div>

          {/* Premium Toggle Switch */}
          <div className="inline-flex items-center bg-slate-900/80 p-1 rounded-full border border-slate-800">
            <button
              onClick={() => setLang('cy')}
              className={`px-4 py-1.5 rounded-full font-mono text-xs tracking-wider transition-all duration-300 ${
                lang === 'cy'
                  ? 'bg-[#D97706] text-white font-medium shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              CY
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-4 py-1.5 rounded-full font-mono text-xs tracking-wider transition-all duration-300 ${
                lang === 'en'
                  ? 'bg-[#D97706] text-white font-medium shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Main Content Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Premium Plant-Filled Studio Image */}
          <div className="lg:col-span-5 space-y-6">
            <div 
              className="relative aspect-[4/5] rounded-lg overflow-hidden border border-slate-800 shadow-2xl group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Main Artistic Image of Plant-filled studio */}
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200"
                alt="tatŵ clean, plant-filled Canton studio space"
                className="w-full h-full object-cover grayscale contrast-115 transition-transform duration-700 ease-out group-hover:scale-105"
              />
              
              {/* Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

              {/* Dynamic Interactive Card on Hover */}
              <motion.div 
                className="absolute bottom-6 left-6 right-6 bg-slate-950/90 backdrop-blur-md p-6 rounded-md border border-[#D97706]/30 shadow-xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] tracking-widest text-[#D97706] uppercase">
                    {lang === 'cy' ? 'GOFOD DWYIEITHOG' : 'BILINGUAL SPACE'}
                  </span>
                  <div className="h-1.5 w-1.5 rounded-full bg-[#16A34A] animate-pulse" />
                </div>
                <h4 className="font-serif text-lg text-white font-medium">
                  {lang === 'cy' ? '74 Heol y Plwyf, Caerdydd' : '74 Church Road, Cardiff'}
                </h4>
                <p className="text-xs text-slate-400 mt-1 font-sans font-light leading-relaxed">
                  {lang === 'cy' 
                    ? 'Wedi’i ddylunio i deimlo fel oriel gelf fodern, ddigynnwrf.' 
                    : 'Designed to feel like a modern, serene art gallery.'}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Editorial Text Block & Values */}
          <div className="lg:col-span-7 space-y-8 lg:pl-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={lang}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <span className="font-mono text-sm tracking-widest text-[#D97706] uppercase block">
                    {activeContent.accent}
                  </span>
                  <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white leading-tight">
                    {activeContent.headline}
                  </h3>
                </div>

                <p className="font-serif text-lg text-slate-300 leading-relaxed font-light">
                  {activeContent.body}
                </p>

                {/* Micro-Features Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800/60">
                  <div className="space-y-2">
                    <h5 className="font-serif text-base text-white font-medium flex items-center gap-2">
                      <span className="text-[#D97706]">✦</span>
                      {activeContent.heritageTitle}
                    </h5>
                    <p className="text-sm text-slate-400 leading-relaxed font-light">
                      {activeContent.heritageDesc}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-serif text-base text-white font-medium flex items-center gap-2">
                      <span className="text-[#D97706]">✦</span>
                      {activeContent.clinicalTitle}
                    </h5>
                    <p className="text-sm text-slate-400 leading-relaxed font-light">
                      {activeContent.clinicalDesc}
                    </p>
                  </div>
                </div>

                {/* Highlighted Safety Callout */}
                <div className="bg-[#553F83]/10 border-l-2 border-[#D97706] p-5 rounded-r-lg mt-8">
                  <span className="font-mono text-xs tracking-widest text-[#D97706] font-semibold uppercase block mb-1">
                    {activeContent.safetyLabel}
                  </span>
                  <p className="text-sm text-slate-200 leading-relaxed italic font-light">
                    {activeContent.safetyCallout}
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <a
                    href="#archebu"
                    className="px-6 py-3 bg-[#D97706] hover:bg-[#b25e03] text-white font-mono text-xs tracking-widest uppercase transition-all duration-300 rounded shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  >
                    {activeContent.ctaBook}
                  </a>
                  <a
                    href="#oriel"
                    className="px-6 py-3 bg-transparent hover:bg-slate-800/50 text-slate-300 hover:text-white border border-slate-700 font-mono text-xs tracking-widest uppercase transition-all duration-300 rounded"
                  >
                    {activeContent.ctaGallery}
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Minimalist Trust Badges / Footer Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-8 border-t border-slate-800/80 text-center md:text-left">
          <div>
            <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">{lang === 'cy' ? 'Lleoliad' : 'Location'}</p>
            <p className="font-serif text-sm text-slate-300 mt-1">Canton, Cardiff</p>
          </div>
          <div>
            <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">{lang === 'cy' ? 'Trwydded' : 'Licensing'}</p>
            <p className="font-serif text-sm text-slate-300 mt-1">Cardiff Council Approved</p>
          </div>
          <div>
            <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">{lang === 'cy' ? 'Iaith' : 'Language'}</p>
            <p className="font-serif text-sm text-slate-300 mt-1">Dwyieithog / Welsh & English</p>
          </div>
          <div>
            <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">{lang === 'cy' ? 'Artist Arweiniol' : 'Lead Artist'}</p>
            <p className="font-serif text-sm text-slate-300 mt-1">Megan Vaughan</p>
          </div>
        </div>

      </div>
    </section>
  );
}