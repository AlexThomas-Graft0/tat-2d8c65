'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  Clock, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  Droplets,
  Languages,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

// Copy structures mapping exactly to the provided copy deck
const CONTENT = {
  cy: {
    sectionTitle: 'Cwestiynau Cyffredin & Gofal',
    sectionSubtitle: 'Atebion i’ch cwestiynau a chanllawiau gofal awdurdodol i ddiogelu eich iechyd a’ch tatŵ.',
    faqTab: 'Cwestiynau Cyffredin',
    aftercareTab: 'Gofalu am Eich Tatŵ',
    aftercareSubtitle: 'Dilynwch y camau hyn yn fanwl er mwyn sicrhau bod eich tatŵ yn gwella’n berffaith.',
    faqs: [
      {
        q: 'Faint mae tatŵ yn ei gostio?',
        a: 'Mae ein prisiau yn dibynnu ar faint, cymhlethdod y dyluniad, a\'r lleoliad ar y corff. Ein lleiafswm pris stiwdio yw £70 (i dalu am offer di-haint un-tro). Ar gyfer prosiectau mawr neu custom, rydym yn dyfynnu pris sefydlog ymlaen llaw fel nad oes unrhyw syrpreisys i chi ar y diwrnod.'
      },
      {
        q: 'A yw\'n brifo? Sut ddylwn i baratoi?',
        a: 'Mae pob tatŵ yn teimlo fel crafiad poeth, ond mae pawb yn ymdopi\'n dda iawn! I baratoi: sicrhewch eich bod yn cael noson dda o gysgu, bwyta pryd o fwyd mwy nag arfer 2 awr cyn eich sesiwn, a dewch â diod siwgrus gyda chi. Peidiwch ag yfed alcohol y noson gynt.'
      },
      {
        q: 'Oes rhaid i mi allu siarad Cymraeg i archebu?',
        a: 'Dim o gwbl! Mae tatŵ yn stiwdio gwbl gynhwysol. Rydym yn croesawu siaradwyr Cymraeg, dysgwyr, a phobl nad ydynt yn siarad yr iaith o gwbl. Gallwn gynnal eich sesiwn yn gyfan gwbl yn Gymraeg, yn Saesneg, neu\'n gymysgedd o\'r ddwy!'
      }
    ],
    aftercareStages: [
      {
        title: 'Y 2-4 Awr Gyntaf',
        timeframe: 'Cam 1: Syth ar ôl y sesiwn',
        points: [
          'Cadwch y lapio diogelwch ymlaen am o leiaf 2 awr.',
          'Ar ôl tynnu\'r lapio, golchwch y tatŵ yn ysgafn â dŵr cynnes a sebon gwrth-facterol di-arogl gan ddefnyddio eich dwylo glân yn unig.',
          'Sychwch y tatŵ trwy dapio\'n ysgafn â tywel papur glân. Peidiwch â rhwbio.'
        ]
      },
      {
        title: 'Dyddiau 1-5',
        timeframe: 'Cam 2: Y dyddiau cyntaf',
        points: [
          'Golchwch y tatŵ ddwywaith y dydd (bore a nos).',
          'Ar ôl i\'r tatŵ sychu, rhowch haen denau iawn o eli aftercare a argymhellir (fel Easytattoo neu Bepanthen eli tatŵ).',
          'Cadwch y tatŵ yn agored i\'r awyr cyn riced ag sy\'n bosibl. Gwisgwch ddillad rhydd, glân.'
        ]
      },
      {
        title: 'Wythnosau 2-4',
        timeframe: 'Cam 3: Gwella hirdymor',
        points: [
          'Bydd eich tatŵ yn dechrau pilio ac efallai y bydd yn cosi. Mae hyn yn hollol arferol. Peidiwch â phlicio na chrafu\'r croen.',
          'Parhewch i ddefnyddio lleithydd di-arogl syml nes bod y croen yn llyfn eto.',
          'Gwaharddiadau: Dim nofio, dim baddonau poeth, a dim datguddio\'r tatŵ i olau haul cryf am o leiaf 3 wythnos.'
        ]
      }
    ],
    warningsTitle: 'Gwaharddiadau Pwysig',
    warnings: [
      'Dim crafu neu blicio\'r croen sy\'n sychu',
      'Dim nofio mewn pyllau neu\'r môr (3 wythnos)',
      'Dim baddonau poeth hir neu saunas',
      'Cadwch allan o olau haul uniongyrchol'
    ]
  },
  en: {
    sectionTitle: 'FAQ & Aftercare',
    sectionSubtitle: 'Authoritative answers to pre-booking questions and structured aftercare instructions to protect your health and ink.',
    faqTab: 'Frequently Asked Questions',
    aftercareTab: 'Tattoo Aftercare',
    aftercareSubtitle: 'Follow these stages precisely to guarantee your piece heals cleanly and retains its high-precision detail.',
    faqs: [
      {
        q: 'How much does a tattoo cost?',
        a: 'Our pricing depends on the size, design complexity, and placement on the body. Our minimum studio charge is £70 (to cover single-use sterile setup costs). For larger or custom pieces, we provide a flat price estimate upfront so there are no surprises on the day.'
      },
      {
        q: 'Does it hurt? How should I prepare?',
        a: 'Every tattoo feels like a hot scratch, but everyone copes incredibly well! To prepare: make sure you get a good night\'s sleep, eat a substantial meal 2 hours before your session, and bring a sugary drink with you. Do not drink alcohol the night before.'
      },
      {
        q: 'Do I need to speak Welsh to book with you?',
        a: 'Not at all! tatŵ is a fully inclusive studio. We welcome fluent Welsh speakers, learners, and non-speakers alike. We can conduct your session entirely in Welsh, English, or a comfortable mixture of both!'
      }
    ],
    aftercareStages: [
      {
        title: 'The First 2-4 Hours',
        timeframe: 'Stage 1: Initial Protection',
        points: [
          'Keep the protective cling film or second skin wrap on for at least 2 hours.',
          'After removal, gently wash the tattoo with lukewarm water and unscented anti-bacterial soap using only your clean hands.',
          'Pat dry gently with a clean paper towel. Never rub the fresh tattoo.'
        ]
      },
      {
        title: 'Days 1-5',
        timeframe: 'Stage 2: Early Healing',
        points: [
          'Wash the tattoo twice daily (morning and night).',
          'Once dry, apply a very thin layer of recommended aftercare ointment (such as Easytattoo or specialized Bepanthen tattoo formula).',
          'Keep the tattoo exposed to clean air as much as possible. Wear loose, clean cotton clothing over it.'
        ]
      },
      {
        title: 'Weeks 2-4',
        timeframe: 'Stage 3: Setting the Ink',
        points: [
          'Your tattoo will begin to flake and may itch. This is completely normal. Do not pick, scratch, or peel the skin.',
          'Switch to a simple, fragrance-free body lotion until the skin is completely smooth again.',
          'Strictly Avoid: No swimming, no long baths, and no direct sunlight exposure for at least 3 weeks.'
        ]
      }
    ],
    warningsTitle: 'Strictly Avoid',
    warnings: [
      'Do not scratch, pick, or peel flaking skin',
      'No swimming in pools, lakes, or the ocean (3 weeks)',
      'No long hot baths, saunas, or steam rooms',
      'No direct sunlight exposure or tanning beds'
    ]
  }
};

export function FaqAftercare() {
  const [lang, setLang] = useState<'cy' | 'en'>('cy');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeStage, setActiveStage] = useState<number>(0);

  const current = CONTENT[lang];

  return (
    <section id="faq-gofal" className="relative py-24 bg-[#111111] text-white overflow-hidden selection:bg-[#D97706]/30 selection:text-white">
      {/* Editorial Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#553F83]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#D97706]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#553F83]/20 pb-12 mb-16 gap-8">
          <div className="max-w-2xl">
            {/* Lang Label Indicator in JetBrains Mono */}
            <span className="text-xs font-mono tracking-widest text-[#D97706] uppercase mb-3 block">
              {lang === 'cy' ? 'Cwestiynau & Canllawiau' : 'Questions & Guidelines'}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight font-light text-white mb-4">
              {current.sectionTitle}
            </h2>
            <p className="text-base text-gray-400 font-light leading-relaxed">
              {current.sectionSubtitle}
            </p>
          </div>

          {/* Premium Bilingual Toggle Control */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-[#1a1625] border border-[#553F83]/30 p-1.5 rounded-full shadow-inner">
            <button
              onClick={() => setLang('cy')}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                lang === 'cy'
                  ? 'bg-[#D97706] text-black font-semibold shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Languages className="w-3.5 h-3.5" />
              CYMRU
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                lang === 'en'
                  ? 'bg-[#D97706] text-black font-semibold shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Languages className="w-3.5 h-3.5" />
              ENGLISH
            </button>
          </div>
        </div>

        {/* Main Content Layout: Split Accordion & Aftercare Stages */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Frequently Asked Questions (Accordion) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="p-2 rounded-lg bg-[#553F83]/20 text-[#D97706]">
                  <Sparkles className="w-5 h-5" />
                </span>
                <h3 className="text-xl font-serif tracking-wide text-white">
                  {current.faqTab}
                </h3>
              </div>

              <div className="space-y-4">
                {current.faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div 
                      key={index}
                      className={`border transition-all duration-300 rounded-xl overflow-hidden ${
                        isOpen 
                          ? 'border-[#D97706] bg-[#1c1829]/70 shadow-lg' 
                          : 'border-[#553F83]/20 bg-[#161220]/40 hover:border-[#553F83]/50'
                      }`}
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full text-left px-6 py-5 flex justify-between items-center gap-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D97706]"
                        aria-expanded={isOpen}
                      >
                        <span className={`font-serif text-base md:text-lg transition-colors duration-200 ${
                          isOpen ? 'text-[#D97706] font-medium' : 'text-gray-200 group-hover:text-white'
                        }`}>
                          {faq.q}
                        </span>
                        <ChevronDown 
                          className={`w-5 h-5 text-gray-400 transition-transform duration-300 shrink-0 ${
                            isOpen ? 'transform rotate-180 text-[#D97706]' : ''
                          }`} 
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                          >
                            <div className="px-6 pb-6 pt-1 text-sm md:text-base text-gray-300 leading-relaxed border-t border-[#553F83]/10 font-light">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Aesthetic Quote / Studio Trust Callout */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1c1829] to-[#120f1a] border border-[#553F83]/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#D97706]/5 rounded-full blur-xl pointer-events-none" />
              <div className="flex gap-4 items-start relative z-10">
                <ShieldCheck className="w-6 h-6 text-[#D97706] shrink-0 mt-1" />
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-1">
                    {lang === 'cy' ? 'Safonau Clinigol' : 'Clinical Standards'}
                  </p>
                  <p className="text-sm text-gray-300 italic leading-relaxed font-light">
                    {lang === 'cy' 
                      ? '“Rydym yn dilyn y safonau hylendid clinigol llymaf yn Ewrop. Diogelwch a chysur yw ein blaenoriaethau cyntaf.”'
                      : '“We operate under the strictest clinical hygiene standards in Europe. Your safety and comfort are our absolute priorities.”'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Aftercare Instructions (Stage Tabs) */}
          <div className="lg:col-span-7 space-y-8 bg-[#161322]/50 border border-[#553F83]/15 p-6 md:p-8 rounded-3xl backdrop-blur-sm">
            <div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-lg bg-[#D97706]/10 text-[#D97706]">
                    <Droplets className="w-5 h-5" />
                  </span>
                  <h3 className="text-xl font-serif tracking-wide text-white">
                    {current.aftercareTab}
                  </h3>
                </div>
                <span className="text-xs font-mono text-gray-400 tracking-wider bg-[#553F83]/20 px-3 py-1 rounded-full border border-[#553F83]/20">
                  {lang === 'cy' ? 'CANLLAW ARBENIGOL' : 'EXPERT GUIDE'}
                </span>
              </div>
              <p className="text-sm text-gray-400 font-light mb-8 max-w-xl">
                {current.aftercareSubtitle}
              </p>

              {/* Progress Flow Tab Indicators */}
              <div className="grid grid-cols-3 gap-2 md:gap-4 mb-8">
                {current.aftercareStages.map((stage, idx) => {
                  const isActive = activeStage === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveStage(idx)}
                      className={`relative py-3.5 px-2 md:px-4 rounded-xl flex flex-col items-center justify-center text-center transition-all duration-300 border focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D97706] ${
                        isActive
                          ? 'bg-[#1c1829] border-[#D97706] shadow-lg text-[#D97706]'
                          : 'bg-[#110e1a]/60 border-[#553F83]/10 text-gray-400 hover:border-[#553F83]/30 hover:text-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        {idx === 0 && <Clock className="w-3.5 h-3.5 shrink-0" />}
                        {idx === 1 && <Calendar className="w-3.5 h-3.5 shrink-0" />}
                        {idx === 2 && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
                        <span className="text-[10px] font-mono tracking-wider uppercase hidden sm:inline">
                          {lang === 'cy' ? `Cam ${idx + 1}` : `Stage ${idx + 1}`}
                        </span>
                      </div>
                      <span className="text-xs md:text-sm font-serif font-medium whitespace-nowrap">
                        {stage.title}
                      </span>
                      {isActive && (
                        <motion.div 
                          layoutId="activeIndicator"
                          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-[2px] bg-[#D97706] rounded-full"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Active Stage Content Card */}
              <div className="bg-[#110e1a]/80 border border-[#553F83]/25 p-6 md:p-8 rounded-2xl relative min-h-[280px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStage}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div>
                      <span className="text-xs font-mono text-[#D97706] tracking-widest uppercase">
                        {current.aftercareStages[activeStage].timeframe}
                      </span>
                      <h4 className="text-lg font-serif text-white mt-1">
                        {current.aftercareStages[activeStage].title}
                      </h4>
                    </div>

                    <ul className="space-y-4">
                      {current.aftercareStages[activeStage].points.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-3 text-sm md:text-base leading-relaxed text-gray-300">
                          <span className="w-5 h-5 rounded-full bg-[#D97706]/10 text-[#D97706] flex items-center justify-center text-xs font-mono shrink-0 mt-0.5 border border-[#D97706]/20">
                            {pIdx + 1}
                          </span>
                          <span className="font-light">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>

                {/* Healing Warning Flag */}
                <div className="mt-8 pt-6 border-t border-[#553F83]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-[#D97706] shrink-0" />
                    <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                      {lang === 'cy' ? 'Rheol Euraidd' : 'Golden Rule'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 font-light max-w-sm">
                    {lang === 'cy' 
                      ? 'Nid yw tatŵ yn unig yn gelf; mae’n glwyf agored sydd angen gofal clinigol i ddechrau.'
                      : 'A tattoo is not just art; it is a fresh surface wound that requires strict clinical discipline.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Prohibitions / Strict Avoid Section */}
            <div className="border border-red-950/40 bg-red-950/10 p-5 rounded-2xl">
              <h4 className="text-sm font-mono tracking-wider uppercase text-[#DC2626] mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] animate-pulse" />
                {current.warningsTitle}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {current.warnings.map((warning, wIdx) => (
                  <div key={wIdx} className="flex items-center gap-2 text-xs text-gray-300 font-light">
                    <span className="w-1 h-1 rounded-full bg-gray-500" />
                    <span>{warning}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Bottom CTA to Book */}
        <div className="mt-20 pt-12 border-t border-[#553F83]/10 text-center">
          <p className="text-sm text-gray-400 font-light mb-4">
            {lang === 'cy' 
              ? 'Yn barod i ddechrau ar eich prosiect unigryw?' 
              : 'Ready to begin mapping out your next piece?'}
          </p>
          <a
            href="#archebu"
            className="inline-flex items-center gap-2 bg-[#D97706] hover:bg-[#b86405] text-black font-serif font-medium tracking-wide px-8 py-4 rounded-full transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-[#D97706]/10"
          >
            <span>{lang === 'cy' ? 'Archebwch Eich Sesiwn' : 'Book Your Session'}</span>
            <span className="text-xs font-mono">→</span>
          </a>
        </div>

      </div>
    </section>
  );
}