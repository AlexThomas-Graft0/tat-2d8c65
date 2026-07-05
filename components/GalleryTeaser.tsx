'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { 
  Sparkles, 
  Check, 
  Clock, 
  X, 
  ArrowRight, 
  Info, 
  Tag, 
  Layers, 
  Compass,
  CheckCircle2
} from 'lucide-react';

interface GalleryItem {
  id: string;
  image_url: string;
  title_cy: string;
  title_en: string;
  category: string;
  is_flash: boolean;
  flash_status: 'available' | 'pending' | 'taken' | null;
  price_estimate: number | null;
}

const DEFAULT_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'default-1',
    image_url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=800',
    title_cy: 'Llawes Geltaidd Gyfoes',
    title_en: 'Modern Celtic Sleeve',
    category: 'Detailed Blackwork',
    is_flash: false,
    flash_status: null,
    price_estimate: null,
  },
  {
    id: 'default-2',
    image_url: 'https://images.unsplash.com/photo-1562962230-16e4623d36e6?auto=format&fit=crop&q=80&w=800',
    title_cy: 'Pabi Cymreig',
    title_en: 'Welsh Poppy',
    category: 'Fine-line Illustrative',
    is_flash: false,
    flash_status: null,
    price_estimate: null,
  },
  {
    id: 'default-3',
    image_url: 'https://images.unsplash.com/photo-1550537687-c91072c4792d?auto=format&fit=crop&q=80&w=800',
    title_cy: '"Hiraeth" mewn Llawysgrif Hynafol',
    title_en: '"Hiraeth" in Ancient Script',
    category: 'Custom Lettering',
    is_flash: false,
    flash_status: null,
    price_estimate: null,
  },
  {
    id: 'default-4',
    image_url: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&q=80&w=800',
    title_cy: 'Dail Derwen Geometrig',
    title_en: 'Geometric Oak Leaves',
    category: 'Contemporary Style',
    is_flash: false,
    flash_status: null,
    price_estimate: null,
  },
  {
    id: 'default-5',
    image_url: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&q=80&w=800',
    title_cy: 'Y Ddraig Fach (Dyluniad Flash)',
    title_en: 'The Little Dragon (Flash Design)',
    category: 'Flash Design',
    is_flash: true,
    flash_status: 'available',
    price_estimate: 120,
  },
  {
    id: 'default-6',
    image_url: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&q=80&w=800',
    title_cy: 'Dail Helyg (Dyluniad Flash)',
    title_en: 'Willow Leaves (Flash Design)',
    category: 'Flash Design',
    is_flash: true,
    flash_status: 'pending',
    price_estimate: 90,
  }
];

export function GalleryTeaser() {
  const [lang, setLang] = useState<'cy' | 'en'>('cy');
  const [filter, setFilter] = useState<'all' | 'custom' | 'flash'>('all');
  const [items, setItems] = useState<GalleryItem[]>(DEFAULT_GALLERY_ITEMS);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGallery() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('gallery_items')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          const formatted: GalleryItem[] = data.map((item: any) => ({
            id: item.id,
            image_url: item.image_url,
            title_cy: item.title_cy || '',
            title_en: item.title_en || '',
            category: item.category || 'Tattoo Art',
            is_flash: item.is_flash ?? false,
            flash_status: item.flash_status || null,
            price_estimate: item.price_estimate ? Number(item.price_estimate) : null,
          }));
          setItems(formatted);
        }
      } catch (err) {
        console.warn('Supabase fetch failed or table missing, using high-quality defaults:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchGallery();
  }, []);

  const filteredItems = items.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'custom') return !item.is_flash;
    if (filter === 'flash') return item.is_flash;
    return true;
  });

  return (
    <section id="gallery" className="relative bg-[#111111] text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(85,63,131,0.15),transparent_50%)] pointer-events-none" />
      <div className="absolute -left-48 top-1/3 w-96 h-96 bg-[#D97706]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#553F83]/30 border border-[#553F83]/50 text-purple-300 text-xs font-mono mb-4 tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
              {lang === 'cy' ? 'Oriel Guradu' : 'Curated Gallery'}
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-semibold tracking-tight text-white mb-4">
              {lang === 'cy' ? 'Yr Oriel a Dyluniadau Flash' : 'Gallery & Flash Designs'}
            </h2>
            <p className="text-gray-400 max-w-2xl text-lg font-light leading-relaxed">
              {lang === 'cy' 
                ? 'Porwch ein gwaith diweddar neu dewiswch un o\'n dyluniadau \'flash\' unigryw sy\'n barod i gael eu tatŵio.'
                : 'Browse our recent custom portfolios or select one of our unique, pre-drawn flash designs ready to be tattooed.'}
            </p>
          </div>

          {/* Interactive Controls Panel */}
          <div className="flex flex-wrap items-center gap-4 shrink-0">
            {/* Language Toggle */}
            <div className="inline-flex items-center bg-black/40 p-1 rounded-lg border border-white/10">
              <button
                onClick={() => setLang('cy')}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-all duration-200 ${
                  lang === 'cy' 
                    ? 'bg-[#D97706] text-white font-bold shadow-md' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                CY
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-all duration-200 ${
                  lang === 'en' 
                    ? 'bg-[#D97706] text-white font-bold shadow-md' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', cy: 'Pob Gwaith', en: 'All Work' },
              { id: 'custom', cy: 'Celf Custom', en: 'Custom Portfolio' },
              { id: 'flash', cy: 'Flash ar Gael', en: 'Available Flash' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === tab.id
                    ? 'bg-[#553F83] text-white shadow-lg shadow-[#553F83]/20 ring-1 ring-[#553F83]'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {lang === 'cy' ? tab.cy : tab.en}
              </button>
            ))}
          </div>

          <div className="text-xs font-mono text-gray-500">
            {lang === 'cy' ? `Yn dangos ${filteredItems.length} o ddyluniadau` : `Showing ${filteredItems.length} designs`}
          </div>
        </div>

        {/* Dynamic Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                onClick={() => setSelectedItem(item)}
                className="group relative bg-[#1c1c1c] rounded-xl overflow-hidden border border-white/5 cursor-pointer hover:border-white/20 transition-all duration-300 shadow-xl"
              >
                {/* Image Wrap */}
                <div className="aspect-[4/5] relative overflow-hidden bg-neutral-900">
                  <img
                    src={item.image_url}
                    alt={lang === 'cy' ? item.title_cy : item.title_en}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                  
                  {/* Welsh Copper Hover Overlay */}
                  <div className="absolute inset-0 bg-[#D97706]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Status Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {item.is_flash ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-black/70 backdrop-blur-md border border-[#D97706] text-[#D97706]">
                        Flash
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-black/70 backdrop-blur-md border border-purple-500/50 text-purple-300">
                        {lang === 'cy' ? 'Custom' : 'Custom'}
                      </span>
                    )}

                    {item.is_flash && item.flash_status && (
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase ${
                        item.flash_status === 'available' 
                          ? 'bg-[#16A34A] text-white' 
                          : item.flash_status === 'pending'
                          ? 'bg-[#D97706] text-white'
                          : 'bg-neutral-700 text-neutral-300'
                      }`}>
                        {item.flash_status === 'available' && (lang === 'cy' ? 'AR GAEL' : 'AVAILABLE')}
                        {item.flash_status === 'pending' && (lang === 'cy' ? 'YN ARFAETH' : 'PENDING')}
                        {item.flash_status === 'taken' && (lang === 'cy' ? 'WEDI\'I GYMRYD' : 'TAKEN')}
                      </span>
                    )}
                  </div>

                  {/* Bottom Text Content inside image block */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <p className="text-[#D97706] text-xs font-mono tracking-wider uppercase mb-1">
                      {item.category}
                    </p>
                    <h3 className="text-xl font-serif font-medium text-white tracking-wide group-hover:text-[#D97706] transition-colors duration-300">
                      {lang === 'cy' ? item.title_cy : item.title_en}
                    </h3>
                    
                    {item.price_estimate && (
                      <p className="text-gray-300 text-sm font-mono mt-2">
                        {lang === 'cy' ? `Pris Gosod: £${item.price_estimate}` : `Set Price: £${item.price_estimate}`}
                      </p>
                    )}

                    <div className="mt-4 flex items-center gap-2 text-xs font-mono text-white/50 group-hover:text-white transition-colors duration-300">
                      <span>{lang === 'cy' ? 'Gweld manylion' : 'View details'}</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Global CTA */}
        <div className="mt-20 text-center">
          <a
            href="#booking"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#553F83] to-[#45326b] hover:from-[#5e4791] hover:to-[#4e3a7a] text-white font-medium rounded-lg shadow-xl shadow-[#553F83]/10 hover:shadow-[#553F83]/20 transition-all duration-300 group"
          >
            <span className="font-serif tracking-wide">
              {lang === 'cy' ? 'Gweld yr Oriel Gyfan & Flash ar Gael' : 'View Full Gallery & Available Flash'}
            </span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
          </a>
        </div>

        {/* Clean, Modern Hygiene Callout */}
        <div className="mt-16 bg-gradient-to-r from-neutral-900 via-neutral-900 to-[#553F83]/10 border border-white/5 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#D97706]/10 rounded-xl border border-[#D97706]/20 shrink-0">
              <CheckCircle2 className="w-6 h-6 text-[#D97706]" />
            </div>
            <div>
              <p className="text-sm font-mono text-[#D97706] uppercase tracking-widest mb-1">
                {lang === 'cy' ? 'DIOGELWCH AC HYLIENID' : 'SAFETY & HYGIENE'}
              </p>
              <h4 className="text-white font-serif font-medium text-lg">
                {lang === 'cy' ? 'Stiwdio drwyddedig gan Gyngor Caerdydd.' : 'Fully licensed studio under Cardiff Council.'}
              </h4>
              <p className="text-sm text-gray-400 mt-1">
                {lang === 'cy' 
                  ? 'Rydym yn dilyn y safonau hylendid clinigol llymaf yn Ewrop.' 
                  : 'We operate under the strictest clinical hygiene standards in Europe.'}
              </p>
            </div>
          </div>
          <div className="shrink-0 font-mono text-xs text-gray-500 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
            {lang === 'cy' ? 'Safonau hylendid clinigol, modern.' : 'Modern, clinical hygiene standards.'}
          </div>
        </div>

      </div>

      {/* Item Details Overlay Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-[#1c1c1c] w-full max-w-4xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/60 text-gray-400 hover:text-white hover:bg-black/80 transition-all duration-200"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left: Image */}
                <div className="aspect-[4/5] md:aspect-auto md:h-[550px] relative bg-neutral-900">
                  <img
                    src={selectedItem.image_url}
                    alt={lang === 'cy' ? selectedItem.title_cy : selectedItem.title_en}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Right: Info */}
                <div className="p-8 flex flex-col justify-between h-full bg-[#1c1c1c]">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs font-mono text-[#D97706] tracking-widest uppercase bg-[#D97706]/10 px-2.5 py-1 rounded">
                        {selectedItem.category}
                      </span>
                      {selectedItem.is_flash && (
                        <span className="text-xs font-mono text-purple-300 tracking-widest uppercase bg-purple-900/30 px-2.5 py-1 rounded border border-purple-500/30">
                          Flash Design
                        </span>
                      )}
                    </div>

                    <h3 className="text-3xl font-serif font-semibold text-white mb-2">
                      {lang === 'cy' ? selectedItem.title_cy : selectedItem.title_en}
                    </h3>

                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                      {selectedItem.is_flash 
                        ? (lang === 'cy' 
                            ? 'Dyluniad flash unigryw wedi\'i baratoi gan Megan Vaughan. Unwaith y caiff hwn ei hawlio, ni fydd ar gael i unrhyw un arall.' 
                            : 'A unique flash design hand-drawn by Megan Vaughan. Once claimed, this specific design will not be tattooed again.')
                        : (lang === 'cy' 
                            ? 'Dyluniad unigryw wedi\'i deilwra ar gyfer sesiwn bersonol. Defnyddiwch hwn fel ysbrydoliaeth ar gyfer eich prosiect eich hun.' 
                            : 'A custom, tailor-made tattoo built around a client\'s personal story. Use this as inspiration for your own customized session.')}
                    </p>

                    {/* Specifications list */}
                    <div className="space-y-3 border-t border-white/5 pt-6">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 font-mono">{lang === 'cy' ? 'Arddull:' : 'Style:'}</span>
                        <span className="text-gray-200 font-medium">{selectedItem.category}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 font-mono">{lang === 'cy' ? 'Math:' : 'Type:'}</span>
                        <span className="text-gray-200 font-medium">
                          {selectedItem.is_flash 
                            ? (lang === 'cy' ? 'Flash Cyfyngedig' : 'Limited Flash') 
                            : (lang === 'cy' ? 'Comisiwn Custom' : 'Custom Commission')}
                        </span>
                      </div>
                      {selectedItem.is_flash && (
                        <>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 font-mono">{lang === 'cy' ? 'Statws:' : 'Status:'}</span>
                            <span className={`font-mono font-bold uppercase ${
                              selectedItem.flash_status === 'available' ? 'text-[#16A34A]' : 'text-[#D97706]'
                            }`}>
                              {selectedItem.flash_status === 'available' && (lang === 'cy' ? 'Ar Gael' : 'Available')}
                              {selectedItem.flash_status === 'pending' && (lang === 'cy' ? 'Arfaeth / Pending' : 'Pending')}
                              {selectedItem.flash_status === 'taken' && (lang === 'cy' ? 'Wedi\'i gymryd' : 'Taken')}
                            </span>
                          </div>
                          {selectedItem.price_estimate && (
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-gray-500 font-mono">{lang === 'cy' ? 'Pris Sefydlog:' : 'Set Price:'}</span>
                              <span className="text-[#D97706] font-mono font-semibold text-lg">£{selectedItem.price_estimate}</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Actions inside Modal */}
                  <div className="mt-8 pt-6 border-t border-white/5">
                    {selectedItem.is_flash && selectedItem.flash_status === 'available' ? (
                      <a
                        href="#booking"
                        onClick={() => setSelectedItem(null)}
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#D97706] hover:bg-[#c26a05] text-white font-medium rounded-lg transition-colors duration-200 font-serif"
                      >
                        {lang === 'cy' ? 'Hawliwch y Flash Hwn' : 'Claim this Flash'}
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    ) : selectedItem.is_flash && selectedItem.flash_status === 'pending' ? (
                      <div className="w-full text-center p-3 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-xs font-mono">
                        {lang === 'cy' 
                          ? 'Mae\'r dyluniad hwn wedi\'i gadw dros dro' 
                          : 'This design is temporarily reserved'}
                      </div>
                    ) : (
                      <a
                        href="#booking"
                        onClick={() => setSelectedItem(null)}
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#553F83] hover:bg-[#47346f] text-white font-medium rounded-lg transition-colors duration-200 font-serif"
                      >
                        {lang === 'cy' ? 'Cymryd Ysbrydoliaeth i Brosiect Custom' : 'Use as Custom Inspiration'}
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    )}
                    
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="w-full text-center text-xs text-gray-500 hover:text-white mt-4 font-mono transition-colors duration-200"
                    >
                      {lang === 'cy' ? 'Yn ôl i\'r oriel' : 'Back to gallery'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}