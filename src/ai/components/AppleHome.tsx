import React, { useRef, useEffect } from 'react';
import { 
  Apple, Search, ShoppingBag, ChevronRight, ArrowRight, 
  PlayCircle, BarChart2, Globe, ArrowUpRight 
} from 'lucide-react';
import { 
  HERO_FEATURE, 
  TRENDING_ARTICLES, 
  CONTENT_SECTIONS, 
  FOUNDER_CORNER,
  CULTURAL_STORIES,
  UNEXPECTED_IMPACT,
  FICTIONAL_STORIES,
  IMPACT_STORIES,
  LOWER_SECTIONS,
  EXPLORE_SERIES,
  NAV_STRUCTURE
} from '../constants';

// --- Apple UI Primitives ---

const AppleButton: React.FC<{ 
  children: React.ReactNode; 
  variant?: 'primary' | 'secondary' | 'link'; 
  className?: string 
}> = ({ children, variant = 'primary', className = '' }) => {
  const base = "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 text-sm";
  const variants = {
    primary: "bg-[#0071e3] text-white hover:bg-[#0077ed] px-5 py-2",
    secondary: "bg-stone-100 text-stone-900 hover:bg-stone-200 px-5 py-2",
    link: "text-[#0066cc] hover:underline px-0 py-0 flex items-center gap-1 group"
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`}>
      {children}
      {variant === 'link' && <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />}
    </button>
  );
};

const SectionHeader: React.FC<{ title: string; subtitle?: string; dark?: boolean }> = ({ title, subtitle, dark = false }) => (
  <div className="mb-10 text-center md:text-left">
    <h2 className={`text-3xl md:text-5xl font-heading font-bold tracking-tight mb-3 ${dark ? 'text-white' : 'text-[#1d1d1f]'}`}>
      {title}
    </h2>
    {subtitle && (
      <p className={`text-lg md:text-xl font-body max-w-2xl ${dark ? 'text-stone-400' : 'text-stone-500'}`}>
        {subtitle}
      </p>
    )}
  </div>
);

// --- Apple Layout Components ---

const AppleNav: React.FC = () => {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-xl border-b border-stone-200/50 transition-all duration-300">
      <div className="max-w-[1024px] mx-auto px-4 h-12 flex items-center justify-between text-xs font-body text-[#1d1d1f]/80">
        <div className="flex-1 flex justify-start">
           <a href="#" className="hover:opacity-60 transition-opacity">
              {/* Apple-esque text logo since we don't have the apple icon */}
              <span className="font-heading font-bold text-lg text-black tracking-tighter">Susinsight</span>
           </a>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          {['Store', 'Mac', 'iPad', 'iPhone', 'Watch', 'Vision', 'AirPods', 'TV & Home', 'Entertainment'].map((item, i) => {
             // Map standard Apple links to Susinsight structure for demo
             const labels = ['Regions', 'Signals', 'Stories', 'Trending', 'Series', 'Data', 'Resources', 'Info', 'Contact'];
             return (
               <a key={item} href="#" className="hover:text-black transition-colors cursor-pointer">
                 {labels[i] || item}
               </a>
             )
          })}
        </div>

        <div className="flex-1 flex justify-end gap-6">
          <Search className="w-4 h-4 cursor-pointer hover:text-black hover:opacity-100 opacity-80" />
          <ShoppingBag className="w-4 h-4 cursor-pointer hover:text-black hover:opacity-100 opacity-80" />
        </div>
      </div>
    </nav>
  );
};

const HeroProduct: React.FC = () => (
  <section className="pt-12 pb-16 md:pt-24 md:pb-24 bg-[#f5f5f7] overflow-hidden">
    <div className="flex flex-col items-center text-center px-6 max-w-[1440px] mx-auto">
      <h2 className="text-sm md:text-base font-bold text-[#f56300] mb-2 uppercase tracking-wide">
        {HERO_FEATURE.category}
      </h2>
      <h1 className="text-4xl md:text-7xl font-heading font-bold text-[#1d1d1f] tracking-tight mb-4 max-w-4xl leading-tight">
        {HERO_FEATURE.title}
      </h1>
      <p className="text-xl md:text-2xl text-[#1d1d1f] font-body max-w-2xl mb-8 leading-relaxed">
        {HERO_FEATURE.excerpt}
      </p>
      <div className="flex items-center gap-6 mb-16">
        <AppleButton>Read Story</AppleButton>
        <AppleButton variant="link">Learn more about the author</AppleButton>
      </div>
      
      <div className="w-full max-w-[1200px] aspect-[16/9] md:aspect-[21/9] rounded-[30px] overflow-hidden shadow-2xl relative group cursor-pointer">
        <img 
          src="https://picsum.photos/seed/applehero/1600/900" 
          alt="Hero" 
          className="w-full h-full object-cover transform transition-transform duration-[1.5s] ease-out group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
    </div>
  </section>
);

const BentoGrid: React.FC<{ title: string; items: any[] }> = ({ title, items }) => (
  <section className="py-20 px-4 bg-white">
    <div className="max-w-[1200px] mx-auto">
      <SectionHeader title={title} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[400px]">
        {/* First item - Large Span */}
        <div className="md:col-span-2 row-span-1 rounded-[30px] overflow-hidden relative group bg-[#f5f5f7] cursor-pointer">
          <div className="absolute inset-0 p-10 z-10 flex flex-col justify-start items-start text-left">
             <span className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">{items[0].category || 'Featured'}</span>
             <h3 className="text-3xl font-heading font-bold text-[#1d1d1f] max-w-sm mb-4">{items[0].title}</h3>
             <p className="text-[#1d1d1f]/70 font-body max-w-sm line-clamp-3">{items[0].excerpt}</p>
          </div>
          <img 
            src={`https://picsum.photos/seed/apple1/800/600`} 
            className="absolute bottom-0 right-0 w-2/3 h-2/3 object-cover rounded-tl-[30px] shadow-xl transform translate-y-4 translate-x-4 transition-transform duration-700 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:scale-105" 
            alt=""
          />
        </div>

        {/* Second Item - Tall */}
        <div className="row-span-1 md:row-span-2 rounded-[30px] overflow-hidden relative group bg-black text-white cursor-pointer">
           <img 
            src={`https://picsum.photos/seed/apple2/600/800`} 
            className="absolute inset-0 w-full h-full object-cover opacity-60 transition-opacity group-hover:opacity-40" 
            alt=""
          />
          <div className="absolute inset-0 p-8 flex flex-col justify-end">
             <h3 className="text-2xl font-heading font-bold mb-2">{items[1].title}</h3>
             <AppleButton variant="link" className="text-white hover:text-white/80 self-start">Read Now</AppleButton>
          </div>
        </div>

        {/* Third Item - Standard */}
        <div className="rounded-[30px] overflow-hidden relative group bg-[#f5f5f7] cursor-pointer p-8 flex flex-col">
           <h3 className="text-xl font-heading font-bold text-[#1d1d1f] mb-4">{items[2].title}</h3>
           <p className="text-sm text-stone-600 mb-6 flex-1">{items[2].excerpt}</p>
           <div className="w-full h-40 rounded-2xl overflow-hidden shadow-inner">
             <img src={`https://picsum.photos/seed/apple3/400/300`} className="w-full h-full object-cover" alt="" />
           </div>
        </div>

        {/* Fourth Item - Standard */}
        <div className="rounded-[30px] overflow-hidden relative group bg-white border border-stone-200 cursor-pointer p-8 flex flex-col justify-center items-center text-center hover:shadow-lg transition-shadow duration-300">
           <div className="w-16 h-16 bg-[#0071e3] text-white rounded-full flex items-center justify-center mb-6">
              <span className="font-heading font-bold text-2xl">Aa</span>
           </div>
           <h3 className="text-xl font-heading font-bold text-[#1d1d1f] mb-2">{items[3].title}</h3>
           <AppleButton variant="link">Read Article</AppleButton>
        </div>
      </div>
    </div>
  </section>
);

const FeatureRow: React.FC<{ 
  item: any; 
  align: 'left' | 'right';
  theme: 'light' | 'dark';
}> = ({ item, align, theme }) => {
  const isDark = theme === 'dark';
  const bgClass = isDark ? 'bg-black' : 'bg-[#f5f5f7]';
  const textClass = isDark ? 'text-white' : 'text-[#1d1d1f]';
  
  return (
    <section className={`py-24 ${bgClass}`}>
       <div className="max-w-[1200px] mx-auto px-6">
          <div className={`flex flex-col ${align === 'right' ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24`}>
             <div className="flex-1 min-w-0">
                <div className="aspect-[4/3] rounded-[24px] overflow-hidden shadow-2xl">
                   <img 
                    src={`https://picsum.photos/seed/${item.title.length}/800/600`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                    alt={item.title} 
                   />
                </div>
             </div>
             <div className="flex-1 text-center md:text-left">
                <h2 className={`text-4xl md:text-5xl font-heading font-bold tracking-tight mb-6 ${textClass}`}>
                  {item.title}
                </h2>
                <p className={`text-lg md:text-xl font-body leading-relaxed mb-8 ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
                  {item.excerpt}
                </p>
                <div className={`flex items-center gap-4 ${align === 'right' ? 'justify-start' : 'justify-end'} md:justify-start`}>
                   <AppleButton variant={isDark ? 'primary' : 'primary'}>Read Story</AppleButton>
                   <AppleButton variant="link" className={isDark ? 'text-[#2997ff]' : ''}>Share</AppleButton>
                </div>
             </div>
          </div>
       </div>
    </section>
  );
};

const ProDataSection: React.FC = () => (
  <section className="bg-black py-32 overflow-hidden relative">
     <div className="max-w-[1000px] mx-auto px-6 text-center relative z-10">
        <h2 className="text-[#a1a1a6] font-heading font-bold text-xl md:text-2xl mb-4">Susdata Intelligence</h2>
        <h3 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-stone-500">
           Pro-level Data.
        </h3>
        <p className="text-xl md:text-2xl text-[#86868b] font-body max-w-3xl mx-auto mb-12">
           Over 500 verified datasets. Real-time indicators. The most advanced sustainability tracking platform for Africa.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
           {[
             { label: "Countries", val: "54" },
             { label: "Datasets", val: "500+" },
             { label: "Updates", val: "Real-time" },
             { label: "Sectors", val: "12" }
           ].map((stat, i) => (
             <div key={i} className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">{stat.val}</span>
                <span className="text-xs font-bold uppercase tracking-widest text-[#86868b]">{stat.label}</span>
             </div>
           ))}
        </div>

        <div className="flex justify-center gap-4">
           <AppleButton className="bg-white text-black hover:bg-stone-200">Access Susdata</AppleButton>
           <AppleButton variant="link" className="text-[#2997ff]">View Documentation</AppleButton>
        </div>
     </div>
     
     {/* Abstract Glossy Reflection Background */}
     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#0071e3]/20 to-purple-500/20 rounded-full blur-[120px] pointer-events-none"></div>
  </section>
);

const CarouselSection: React.FC<{ title: string; items: any[] }> = ({ title, items }) => (
   <section className="py-20 overflow-hidden bg-white">
      <div className="max-w-[1200px] mx-auto px-6 mb-10 flex justify-between items-end">
         <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#1d1d1f] tracking-tight">{title}</h2>
         <div className="hidden md:flex gap-2">
            <button className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center hover:bg-stone-200 disabled:opacity-50"><ChevronRight className="rotate-180 w-5 h-5" /></button>
            <button className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center hover:bg-stone-200"><ChevronRight className="w-5 h-5" /></button>
         </div>
      </div>
      
      {/* Scroll Container */}
      <div className="flex gap-6 overflow-x-auto px-6 pb-8 snap-x max-w-[1440px] mx-auto hide-scrollbar">
         {items.map((item, i) => (
            <div key={i} className="snap-center shrink-0 w-[300px] md:w-[400px] flex flex-col group cursor-pointer">
               <div className="aspect-video rounded-[20px] overflow-hidden mb-6 relative">
                  <img 
                     src={`https://picsum.photos/seed/${item.title.length + i}/600/400`} 
                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                     alt="" 
                  />
                  {item.category && (
                     <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#1d1d1f]">
                        {item.category}
                     </div>
                  )}
               </div>
               <span className="text-xs font-bold text-[#f56300] uppercase mb-2">New Story</span>
               <h3 className="text-xl font-heading font-bold text-[#1d1d1f] mb-3 group-hover:text-[#0071e3] transition-colors">{item.title}</h3>
               <p className="text-stone-500 text-sm line-clamp-2 leading-relaxed">{item.excerpt}</p>
            </div>
         ))}
      </div>
   </section>
);

const SeriesGrid: React.FC = () => (
   <section className="bg-[#f5f5f7] py-24 px-4">
      <div className="max-w-[1200px] mx-auto">
         <SectionHeader title="Explore Series" subtitle="Curated collections of in-depth reporting." />
         
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {EXPLORE_SERIES.map((series, i) => (
               <div key={i} className="bg-white rounded-[24px] p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col h-full">
                  <div className="w-10 h-10 bg-[#0071e3]/10 text-[#0071e3] rounded-full flex items-center justify-center mb-4">
                     <PlayCircle className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#1d1d1f] mb-2">{series.title}</h3>
                  <p className="text-sm text-stone-500 flex-1">{series.desc}</p>
                  <div className="mt-4 pt-4 border-t border-stone-100 flex justify-between items-center">
                     <span className="text-xs font-bold uppercase text-stone-400">View Series</span>
                     <ChevronRight className="w-4 h-4 text-stone-300" />
                  </div>
               </div>
            ))}
         </div>
      </div>
   </section>
);

const AppleFooter: React.FC = () => (
   <footer className="bg-[#f5f5f7] text-[#1d1d1f] pt-12 pb-8 text-[11px] font-body">
      <div className="max-w-[1024px] mx-auto px-4">
         <div className="border-b border-[#d2d2d7] pb-6 mb-4">
            <p className="text-[#86868b] mb-2">
               1. Trade-in values will vary based on the condition, year, and configuration of your eligible trade-in device. Not all devices are eligible for credit. You must be at least 18 years old to be eligible to trade in for credit or for an Apple Gift Card.
            </p>
         </div>
         
         <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
            {NAV_STRUCTURE.slice(0, 5).map((col, i) => (
               <div key={i}>
                  <h4 className="font-bold text-[#1d1d1f] mb-2">{col.label}</h4>
                  <ul className="space-y-1.5">
                     {col.children ? col.children.map((link, j) => (
                        <li key={j}><a href={link.href} className="text-[#424245] hover:underline">{link.label}</a></li>
                     )) : (
                        <li><a href={col.href} className="text-[#424245] hover:underline">Go to {col.label}</a></li>
                     )}
                  </ul>
               </div>
            ))}
         </div>

         <div className="pt-4 border-t border-[#d2d2d7] flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-[#86868b]">
               Copyright © 2025 Susinsight Inc. All rights reserved.
            </div>
            <div className="flex gap-4 text-[#424245]">
               <a href="#" className="hover:underline border-r border-[#d2d2d7] pr-4">Privacy Policy</a>
               <a href="#" className="hover:underline border-r border-[#d2d2d7] pr-4">Terms of Use</a>
               <a href="#" className="hover:underline border-r border-[#d2d2d7] pr-4">Sales and Refunds</a>
               <a href="#" className="hover:underline">Legal</a>
            </div>
            <div className="text-[#424245]">
               <a href="#" className="hover:underline">Nigeria</a>
            </div>
         </div>
      </div>
   </footer>
);

// --- Main Layout ---

const AppleHome: React.FC = () => {
  return (
    <div className="bg-white min-h-screen font-body text-[#1d1d1f] selection:bg-[#0071e3] selection:text-white">
      <AppleNav />
      
      <main>
        {/* Full Screen Hero - COP30 Story */}
        <HeroProduct />

        {/* Trending Ticker (Styled as Apple News Ticker) */}
        <div className="bg-white border-b border-stone-200 py-4 overflow-hidden">
           <div className="max-w-[1200px] mx-auto px-6 flex items-center gap-4">
              <span className="font-bold text-[#f56300] text-xs uppercase tracking-widest whitespace-nowrap">Breaking News</span>
              <div className="flex-1 flex gap-8 animate-marquee whitespace-nowrap overflow-x-auto hide-scrollbar">
                 {TRENDING_ARTICLES.map((article, i) => (
                    <a key={i} href="#" className="flex items-center gap-2 text-sm font-medium hover:text-[#0071e3] transition-colors">
                       <span className="text-stone-400 text-xs">{article.date}</span>
                       {article.title}
                       <ChevronRight className="w-3 h-3 text-stone-300" />
                    </a>
                 ))}
              </div>
           </div>
        </div>

        {/* Section 1: Insightful Articles (Bento Grid) */}
        <BentoGrid title="Insightful Articles" items={CONTENT_SECTIONS[0].articles} />

        {/* Section 2: Business Stories (Carousel) */}
        <CarouselSection title="Business Stories" items={CONTENT_SECTIONS[1].articles} />

        {/* Founder's Feature (Big Row Left) */}
        <FeatureRow 
          item={{
             title: FOUNDER_CORNER.title,
             excerpt: FOUNDER_CORNER.subtitle,
             category: "Spotlight"
          }}
          align="left"
          theme="light"
        />

        {/* Cultural Stories (Big Row Right - Dark) */}
        <FeatureRow 
          item={{
             title: CULTURAL_STORIES.title,
             excerpt: CULTURAL_STORIES.subtitle,
          }}
          align="right"
          theme="dark"
        />

        {/* Susdata Pro Section */}
        <ProDataSection />

        {/* Unexpected Impact (Bento) */}
        <BentoGrid title="Unexpected Impact" items={[...UNEXPECTED_IMPACT.articles, ...FICTIONAL_STORIES.articles.slice(0, 2)]} />
        
        {/* Series Grid */}
        <SeriesGrid />

        {/* Impact Stories */}
        <CarouselSection title="Impact Stories" items={IMPACT_STORIES.articles} />

        {/* List Views for Lower Sections */}
        <div className="py-24 bg-white">
           <div className="max-w-[800px] mx-auto px-6">
              <SectionHeader title="More Analysis" />
              <div className="space-y-12">
                 {LOWER_SECTIONS.slice(0, 3).map((section) => (
                    <div key={section.id} className="border-t border-stone-200 pt-8">
                       <h3 className="text-xl font-heading font-bold mb-6">{section.title}</h3>
                       <div className="space-y-6">
                          {section.articles.map((art, i) => (
                             <div key={i} className="group cursor-pointer">
                                <h4 className="font-bold text-[#1d1d1f] text-lg group-hover:text-[#0071e3] flex items-center gap-2">
                                   {art.title}
                                   <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </h4>
                                <p className="text-stone-500 text-sm mt-1">{art.excerpt}</p>
                             </div>
                          ))}
                       </div>
                       <div className="mt-4">
                          <AppleButton variant="link">View all {section.title}</AppleButton>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Final CTA */}
        <section className="bg-[#f5f5f7] py-32 text-center">
           <div className="max-w-xl mx-auto px-6">
              <h2 className="text-4xl font-heading font-bold mb-6">Stay ahead of the curve.</h2>
              <p className="text-lg text-stone-500 mb-8">Join our growing community and unlock all insights for free.</p>
              <AppleButton className="px-8 py-3 text-base">Register Now</AppleButton>
           </div>
        </section>

      </main>
      
      <AppleFooter />
    </div>
  );
};

export default AppleHome;
