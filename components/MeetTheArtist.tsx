'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';

interface GalleryItem {
  id: string;
  image_url: string;
  title_cy: string;
  title_en: string;
  category: string;
  is_flash: boolean;
}

export function MeetTheArtist() {
  const [lang, setLang] = useState<'cy' | 'en'>('cy');
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMeganWorks() {
      try {
        const { data, error } = await supabase
          .from('gallery_items')
          .select('id, image_url, title_cy, title_en, category, is_flash')
          .eq('is_flash', false)
          .limit(3);

        if (error) throw error;
        if (data && data.length > 0) {
          setGalleryItems(data as GalleryItem[]);
        }
      } catch (err) {
        console.error('Error fetching gallery items:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchMeganWorks();
  }, []);

  // Premium fallback items using Section 1.3 curated gallery copy
  const fallbackItems: GalleryItem[] = [
    {
      id: 'fallback-1',
      image_url: 'https://images.unsplash.com/photo-1590246814883-57c511e76523?auto=format&fit=crop&w=800&q=80',
      title_cy: 'Llawes Geltaidd Gyfoes',
      title_en: 'Modern Celtic Sleeve',
      category: 'Detailed Blackwork',
      is_flash: false,
    },
    {
      id: 'fallback-2',
      image_url: 'https://images.unsplash.com/photo-1560707303-4e980c87f846?auto=format&fit=crop&w=800&q=80',
      title_cy: 'Pabi Cymreig',
      title_en: 'Welsh Poppy',
      category: 'Fine-line Illustrative',
      is_flash: false,
    },
    {
      id: 'fallback-3',
      image_url: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=800&q=80',
      title_cy: 'Dail Derwen Geometrig',
      title_en: 'Geometric Oak Leaves',
      category: 'Contemporary Style',
      is_flash: false,
    },
  ];

  const displayedItems = galleryItems.length > 0 ? galleryItems : fallbackItems;

  const specialties = {
    cy: ['Llinell Fân', 'Dotwork', 'Celtaidd Cyfoes', 'Botanegol'],
    en: ['Fine Line', 'Dotwork', 'Contemporary Celtic', 'Botanical'],
  };

  const content = {
    cy: {
      sectionTitle: 'Yr Artist',
      storyHeadline: 'Sefydlu tatŵ: Gweledigaeth newydd ar gyfer celf ar groen.',
      storyBody1:
        'Sefydlwyd tatŵ yng Nghaerdydd gyda nod syml ond pwerus: dathlu treftadaeth gyfoethog a dyluniadau eiconig Cymru trwy gyfrwng celfyddyd tatŵio fodern, fanwl gywir. Roeddem am symud i ffwrdd o\'r stiwdios tywyll, brawychus o\'r gorffennol a chreu gofod agored, golau sy\'n teimlo\'n fwy fel oriel gelf nag unrhyw pryd o\'r blaen.',
      storyBody2:
        'Mae ein stiwdio yn gwbl ddwyieithog. P\'un a ydych am drafod ystyr y gair "Hiraeth" neu gynllunio darn Celtaidd cymhleth, mae eich iaith a\'ch stori yn ddiogel yn ein dwylo ni.',
      artistName: 'Megan Vaughan',
      artistRole: 'Sefydlydd & Prif Artist',
      artistBio:
        'Gyda dros ddegawd o brofiad ym myd darlunio a thatŵio, mae Megan yn arbenigo mewn gwaith llinell fân, celf Celtaidd ddeniadol, a dyluniadau botanegol sy\'n dathlu natur Cymru. Cafodd ei geni a\'i magu yn Eryri, ac mae ei chysylltiad â thirlun a chwedlonoriaeth Cymru yn dylanwadu ar bob llinell y mae\'n ei thynnu.',
      specialtiesHeader: 'Arbenigeddau Arddull',
      galleryHeader: 'Gwaith Nodedig gan Megan',
      gallerySub: 'Ysbrydolwyd gan dreftadaeth, tirluniau, a chwedloniaeth Cymru.',
      contactBtn: 'Archebwch Sesiwn gyda Megan',
    },
    en: {
      sectionTitle: 'The Artist',
      storyHeadline: 'Founding tatŵ: A new vision for skin art.',
      storyBody1:
        'tatŵ was founded in Cardiff with a simple but powerful goal: to celebrate Wales\' rich heritage and iconic iconography through the medium of modern, high-precision tattooing. We wanted to move away from the dark, intimidating studios of the past and design a bright, open space that feels more like an art gallery than a traditional shop.',
      storyBody2:
        'Our studio is fully bilingual. Whether you want to discuss the deep cultural meaning of "Hiraeth" or map out an intricate geometric Celtic sleeve, your language and your story are safe with us.',
      artistName: 'Megan Vaughan',
      artistRole: 'Founder & Lead Artist',
      artistBio:
        'With over a decade of experience in fine illustration and tattooing, Megan specializes in high-precision fine line, intricate Celtic blackwork, and botanical designs celebrating Welsh flora. Born and raised in Eryri (Snowdonia), her connection to Welsh landscapes and mythology influences every single line she draws.',
      specialtiesHeader: 'Style Specialties',
      galleryHeader: 'Signature Works by Megan',
      gallerySub: 'Inspired by Welsh heritage, landscapes, and mythology.',
      contactBtn: 'Book a Session with Megan',
    },
  };

  const current = content[lang];

  return (
    <section id="about" className="relative min-h-screen bg-[#111111] text-[#ffffff] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(85,63,131,0.15),transparent_45%)]" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#553F83]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Language & Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 mb-16">
          <div>
            <span className="font-mono text-xs tracking-widest text-[#D97706] uppercase block mb-2">
              {current.sectionTitle}
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-light tracking-tight">
              {current.artistName}
            </h2>
            <p className="font-mono text-sm text-white/60 mt-2">
              {current.artistRole}
            </p>
          </div>

          {/* Elegant Bilingual Switcher */}
          <div className="mt-6 md:mt-0 flex items-center space-x-2 bg-white/5 p-1 rounded-full border border-white/10 self-start">
            <button
              onClick={() => setLang('cy')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                lang === 'cy'
                  ? 'bg-[#D97706] text-white shadow-md'
                  : 'text-white/60 hover:text-white'
              }`}
              aria-label="Switch interface to Welsh"
            >
              CY
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                lang === 'en'
                  ? 'bg-[#D97706] text-white shadow-md'
                  : 'text-white/60 hover:text-white'
              }`}
              aria-label="Switch interface to English"
            >
              EN
            </button>
          </div>
        </div>

        {/* Main Content Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-24">
          
          {/* Left Column: Portrait & Credentials */}
          <div className="lg:col-span-5 space-y-8">
            <div className="relative group">
              {/* Artistic border frame */}
              <div className="absolute -inset-3 border border-[#D97706]/30 rounded-lg pointer-events-none transition-transform duration-500 group-hover:scale-[1.02]" />
              
              {/* Main Portrait */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-zinc-900 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1000&q=80"
                  alt="Megan Vaughan portrait in her studio"
                  className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700 ease-out scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-60" />
                
                {/* Embedded Floating Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/80 backdrop-blur-md border border-white/10 rounded">
                  <p className="font-serif text-sm italic text-white/90">
                    &ldquo;Celf ar groen, wedi’i hysbrydoli gan Gymru.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Specialties & Clinical Standards Accent */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
              <h4 className="font-mono text-xs uppercase tracking-wider text-[#D97706]">
                {current.specialtiesHeader}
              </h4>
              <div className="flex flex-wrap gap-2">
                {specialties[lang].map((spec, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-light text-white/80"
                  >
                    {spec}
                  </span>
                ))}
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs text-white/50 leading-relaxed italic">
                  {lang === 'cy' 
                    ? 'Stiwdio drwyddedig gan Gyngor Caerdydd. Safonau hylendid clinigol, modern.'
                    : 'Fully licensed studio under Cardiff Council. Modern, clinical hygiene standards.'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Biography */}
          <div className="lg:col-span-7 space-y-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={lang}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                {/* Studio Vision / Founding */}
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl sm:text-3xl text-white font-light leading-snug">
                    {current.storyHeadline}
                  </h3>
                  <p className="text-white/75 leading-relaxed text-base font-light">
                    {current.storyBody1}
                  </p>
                  <p className="text-white/75 leading-relaxed text-base font-light">
                    {current.storyBody2}
                  </p>
                </div>

                {/* Artist Bio */}
                <div className="pt-8 border-t border-white/10 space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="h-px w-8 bg-[#D97706]" />
                    <span className="font-mono text-xs uppercase tracking-widest text-[#D97706]">
                      {lang === 'cy' ? 'Amdanom Megan' : 'About Megan'}
                    </span>
                  </div>
                  <p className="text-white/80 leading-relaxed text-base font-light">
                    {current.artistBio}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Call to Action */}
            <div className="pt-4">
              <a
                href="#booking"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#D97706] hover:bg-[#c26a05] text-white font-mono text-xs tracking-widest uppercase rounded transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:ring-offset-2 focus:ring-offset-[#111111]"
              >
                {current.contactBtn} <span className="ml-2">→</span>
              </a>
            </div>
          </div>

        </div>

        {/* Featured Work Showcase */}
        <div className="pt-16 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <h3 className="font-serif text-2xl font-light text-white">
                {current.galleryHeader}
              </h3>
              <p className="text-xs text-white/50 font-mono mt-1">
                {current.gallerySub}
              </p>
            </div>
            <a
              href="#gallery"
              className="text-xs font-mono text-[#D97706] hover:text-white transition-colors duration-300 mt-4 md:mt-0 flex items-center"
            >
              {lang === 'cy' ? 'Gweld yr Oriel Gyfan' : 'View Full Gallery'} <span className="ml-1">→</span>
            </a>
          </div>

          {/* Grid of Megan's Works */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayedItems.map((item, idx) => (
              <div
                key={item.id}
                className="group relative bg-[#1c1c1c] rounded-lg overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={lang === 'cy' ? item.title_cy : item.title_en}
                    className="object-cover w-full h-full scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#D97706] mb-1">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-lg text-white">
                    {lang === 'cy' ? item.title_cy : item.title_en}
                  </h4>
                </div>
                {/* Static Minimal Mobile Label */}
                <div className="p-4 md:hidden flex justify-between items-center bg-[#181818]">
                  <div>
                    <h4 className="font-serif text-sm text-white">
                      {lang === 'cy' ? item.title_cy : item.title_en}
                    </h4>
                    <p className="font-mono text-[9px] text-white/40 uppercase tracking-wider">
                      {item.category}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}