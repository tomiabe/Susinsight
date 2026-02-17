import React from 'react';
import { 
  Search, Menu, User, ChevronRight, BarChart2, Globe, ArrowRight 
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

// --- Economist UI Primitives ---

const EcoRedLabel: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <span className={`inline-block font-heading font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-[#E3120B] mb-2 ${className}`}>
    {children}
  </span>
);

const EcoHeadline: React.FC<{ 
  children: React.ReactNode; 
  size?: 'sm' | 'md' | 'lg' | 'xl'; 
  className?: string;
  inverse?: boolean;
}> = ({ children, size = 'md', className = '', inverse = false }) => {
  const sizes = {
    sm: "text-lg leading-tight",
    md: "text-xl md:text-2xl leading-tight",
    lg: "text-2xl md:text-3xl leading-tight",
    xl: "text-3xl md:text-5xl leading-[1.1]",
  };
  return (
    <h3 className={`font-heading font-bold ${sizes[size]} ${inverse ? 'text-white' : 'text-[#121212]'} ${className} group-hover:underline decoration-[#E3120B] decoration-2 underline-offset-4`}>
      {children}
    </h3>
  );
};

const EcoSeparator: React.FC = () => (
  <div className="w-full h-px bg-stone-300 my-4"></div>
);

const EcoSectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <div className="border-t-2 border-[#121212] pt-2 mb-6">
    <h2 className="font-heading font-bold text-sm uppercase tracking-widest text-[#121212]">{title}</h2>
  </div>
);

// --- Layout Components ---

const EcoNavbar: React.FC = () => (
  <nav className="bg-white border-b border-stone-200 sticky top-0 z-50">
    {/* Top Utility Bar */}
    <div className="hidden md:flex justify-between items-center px-4 py-1 bg-[#fdfdfd] text-[11px] font-heading font-bold uppercase tracking-wider text-stone-500 border-b border-stone-100">
       <div className="flex gap-4">
          <span>{new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <span>My Account</span>
       </div>
       <div className="flex gap-4">
          <span>Subscribe</span>
          <span>Newsletters</span>
       </div>
    </div>

    {/* Main Masthead */}
    <div className="max-w-[1200px] mx-auto px-4 h-16 flex items-center justify-between">
       <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-[#121212] hover:text-[#E3120B] transition-colors">
             <Menu className="w-5 h-5" />
             <span className="hidden md:inline font-heading font-bold text-xs uppercase tracking-widest">Menu</span>
          </button>
          <button className="md:hidden">
             <Search className="w-5 h-5" />
          </button>
       </div>

       {/* Logo Box */}
       <div className="absolute left-1/2 -translate-x-1/2 h-full py-0">
          <div className="bg-[#E3120B] h-full px-6 flex items-center justify-center">
             <span className="font-heading font-bold text-white text-xl md:text-2xl tracking-tighter">Susinsight</span>
          </div>
       </div>

       <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center gap-2 text-[#121212] font-heading font-bold text-xs uppercase tracking-widest hover:text-[#E3120B] transition-colors">
             <span>Search</span>
             <Search className="w-4 h-4" />
          </button>
          <button className="bg-[#121212] text-white px-5 py-2 font-heading font-bold text-xs uppercase tracking-widest hover:bg-[#E3120B] transition-colors">
             Subscribe
          </button>
       </div>
    </div>
  </nav>
);

const EcoHero: React.FC = () => (
   <section className="bg-[#fdfdfd] pt-8 pb-12 border-b border-stone-200">
      <div className="max-w-[1200px] mx-auto px-4">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Main Cover Story (8 cols) */}
            <div className="lg:col-span-8">
               <div className="mb-2">
                  <EcoRedLabel>Leaders</EcoRedLabel>
               </div>
               <div className="group cursor-pointer">
                  <div className="relative aspect-[16/9] mb-4 border border-stone-100">
                     <img 
                        src="https://picsum.photos/seed/eco_hero/1200/800" 
                        className="w-full h-full object-cover" 
                        alt="Hero"
                     />
                     <div className="absolute bottom-0 left-0 bg-[#E3120B] text-white px-3 py-1 font-heading font-bold text-xs uppercase tracking-widest">
                        {HERO_FEATURE.category}
                     </div>
                  </div>
                  <EcoHeadline size="xl" className="mb-4">{HERO_FEATURE.title}</EcoHeadline>
                  <p className="font-serif text-lg text-stone-700 leading-relaxed mb-4">
                     {HERO_FEATURE.excerpt}
                  </p>
                  <p className="font-heading font-bold text-xs uppercase tracking-widest text-stone-400">
                     By {HERO_FEATURE.author}
                  </p>
               </div>
            </div>

            {/* The World This Week (4 cols sidebar) */}
            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-stone-200 lg:pl-8 pt-8 lg:pt-0">
               <EcoSectionHeader title="The World This Week" />
               <div className="space-y-6">
                  {TRENDING_ARTICLES.map((article, i) => (
                     <div key={i} className="group cursor-pointer">
                        <EcoRedLabel className="mb-1 text-[9px] text-stone-500">{article.date}</EcoRedLabel>
                        <h4 className="font-heading font-bold text-lg text-[#121212] leading-tight mb-2 group-hover:text-[#E3120B]">
                           {article.title}
                        </h4>
                        <p className="font-sans text-sm text-stone-600 leading-relaxed">
                           {article.excerpt.substring(0, 100)}...
                        </p>
                        {i < TRENDING_ARTICLES.length - 1 && <EcoSeparator />}
                     </div>
                  ))}
                  
                  {/* Extra filler for sidebar density */}
                  <EcoSeparator />
                  <div className="group cursor-pointer">
                     <EcoRedLabel className="mb-1 text-[9px] text-stone-500">Briefing</EcoRedLabel>
                     <h4 className="font-heading font-bold text-lg text-[#121212] leading-tight mb-2 group-hover:text-[#E3120B]">
                        Susdata releases new indicators for 2026
                     </h4>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </section>
);

const EcoBriefingSection: React.FC<{ title: string; subtitle?: string; articles: any[] }> = ({ title, subtitle, articles }) => (
   <section className="py-12 border-b border-stone-200 bg-white">
      <div className="max-w-[1200px] mx-auto px-4">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-3">
               <EcoSectionHeader title={title} />
               {subtitle && <p className="font-serif italic text-stone-600 mb-4">{subtitle}</p>}
            </div>
            <div className="lg:col-span-9">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {articles.slice(0, 3).map((article, i) => (
                     <article key={i} className="group cursor-pointer flex flex-col h-full">
                        <div className="h-40 mb-4 bg-stone-100 relative overflow-hidden">
                           <img src={`https://picsum.photos/seed/${article.imageSeed || i + title.length}/400/300`} className="w-full h-full object-cover" alt="" />
                           <div className="absolute top-0 left-0 w-full h-1 bg-[#121212] group-hover:bg-[#E3120B] transition-colors"></div>
                        </div>
                        <EcoRedLabel>{article.category || 'Analysis'}</EcoRedLabel>
                        <EcoHeadline size="sm" className="mb-3">{article.title}</EcoHeadline>
                        <p className="font-sans text-sm text-stone-600 leading-relaxed flex-1">
                           {article.excerpt}
                        </p>
                     </article>
                  ))}
               </div>
            </div>
         </div>
      </div>
   </section>
);

const EcoGraphicDetail: React.FC = () => (
   <section className="py-12 bg-[#F2F2F2] border-b border-stone-300">
      <div className="max-w-[1200px] mx-auto px-4">
         <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-stone-300 pb-4">
            <div>
               <EcoRedLabel>Graphic Detail</EcoRedLabel>
               <h2 className="font-heading font-bold text-3xl text-[#121212]">Susdata Intelligence</h2>
            </div>
            <a href="#" className="font-heading font-bold text-xs uppercase tracking-widest text-[#E3120B] hover:text-[#121212] mt-4 md:mt-0">
               Explore all data <ArrowRight className="inline w-3 h-3 ml-1" />
            </a>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
               <div className="bg-white p-6 shadow-sm border border-stone-200">
                  <h3 className="font-heading font-bold text-sm text-[#121212] mb-1">Regional Growth Indicators</h3>
                  <p className="text-xs text-stone-500 mb-6">Annual percentage change, 2024-2025</p>
                  
                  {/* Fake Chart */}
                  <div className="space-y-4">
                     {[
                        { label: 'West Africa', w: '75%', val: '4.2%' },
                        { label: 'East Africa', w: '85%', val: '5.8%' },
                        { label: 'Southern Africa', w: '45%', val: '1.9%' },
                        { label: 'North Africa', w: '60%', val: '3.1%' },
                     ].map((item, i) => (
                        <div key={i}>
                           <div className="flex justify-between text-xs font-bold font-heading mb-1 text-stone-700">
                              <span>{item.label}</span>
                              <span>{item.val}</span>
                           </div>
                           <div className="h-2 bg-stone-100 w-full">
                              <div className="h-full bg-[#E3120B]" style={{ width: item.w }}></div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
            <div className="flex flex-col justify-center">
               <h3 className="font-heading font-bold text-2xl mb-4 text-[#121212]">The data gap is closing.</h3>
               <p className="font-serif text-lg text-stone-700 mb-6">
                  With over 500 verified datasets now available, Susdata provides the granular visibility needed for high-stakes investment decisions across the continent.
               </p>
               <button className="self-start border-2 border-[#121212] text-[#121212] px-6 py-2 font-heading font-bold text-xs uppercase tracking-widest hover:bg-[#121212] hover:text-white transition-colors">
                  View Full Report
               </button>
            </div>
         </div>
      </div>
   </section>
);

const EcoListSection: React.FC<{ items: any[]; title: string; cols?: number }> = ({ items, title, cols = 1 }) => (
   <section className="py-12 border-b border-stone-200 bg-white">
      <div className="max-w-[1200px] mx-auto px-4">
         <EcoSectionHeader title={title} />
         <div className={`grid grid-cols-1 md:grid-cols-${cols} gap-8`}>
            {items.map((item, i) => (
               <div key={i} className="group cursor-pointer flex gap-4 items-start">
                  <div className="flex-1">
                     <EcoRedLabel className="mb-1 text-stone-400 font-normal">{item.category || 'Opinion'}</EcoRedLabel>
                     <h4 className="font-heading font-bold text-lg leading-tight group-hover:underline decoration-[#E3120B] decoration-1 underline-offset-2 text-[#121212]">
                        {item.title}
                     </h4>
                     <p className="text-sm text-stone-500 mt-2 font-sans line-clamp-2">{item.excerpt}</p>
                  </div>
               </div>
            ))}
         </div>
      </div>
   </section>
);

const EcoFooter: React.FC = () => (
   <footer className="bg-[#121212] text-white pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-4">
         <div className="flex flex-col md:flex-row justify-between mb-12">
             <div className="mb-8 md:mb-0">
                <div className="bg-[#E3120B] inline-block px-4 py-2 mb-6">
                   <span className="font-heading font-bold text-white text-xl">Susinsight</span>
                </div>
                <p className="font-serif text-stone-400 max-w-sm">
                   Rigorous analysis of Africa’s development, sustainability, and policy landscape.
                </p>
             </div>
             
             <div className="flex gap-4">
                <button className="bg-white text-[#121212] px-6 py-3 font-heading font-bold text-xs uppercase tracking-widest hover:bg-stone-200">
                   Subscribe for full access
                </button>
             </div>
         </div>

         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 border-t border-stone-800 pt-12 mb-12">
            {NAV_STRUCTURE.slice(0, 5).map((col, i) => (
               <div key={i}>
                  <h5 className="font-heading font-bold text-xs uppercase tracking-widest text-stone-500 mb-4">{col.label}</h5>
                  <ul className="space-y-2">
                     {col.children?.slice(0, 5).map((link, j) => (
                        <li key={j}>
                           <a href={link.href} className="font-sans text-sm text-stone-300 hover:text-white hover:underline decoration-stone-500 underline-offset-4">
                              {link.label}
                           </a>
                        </li>
                     )) || <li><a href={col.href} className="text-stone-300">Link</a></li>}
                  </ul>
               </div>
            ))}
         </div>

         <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-stone-500 font-sans">
            <p>© 2025 Susinsight. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
               <a href="#" className="hover:text-white">Terms</a>
               <a href="#" className="hover:text-white">Privacy</a>
               <a href="#" className="hover:text-white">Cookie Policy</a>
               <a href="#" className="hover:text-white">Accessibility</a>
            </div>
         </div>
      </div>
   </footer>
);

// --- Main Page ---

const EconomistHome: React.FC = () => {
  return (
    <div className="bg-[#fdfdfd] min-h-screen text-[#121212] font-sans selection:bg-[#E3120B] selection:text-white">
       <EcoNavbar />
       
       <main>
          <EcoHero />

          {/* Business Stories */}
          <EcoBriefingSection 
             title="Business" 
             subtitle="Resilience meets revenue in the new African economy."
             articles={CONTENT_SECTIONS[1].articles} 
          />

          {/* Insightful Articles */}
          <section className="py-12 border-b border-stone-200">
             <div className="max-w-[1200px] mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                   {/* Left Column: List */}
                   <div className="lg:col-span-4 border-r border-stone-200 pr-8">
                      <EcoSectionHeader title="Politics & Policy" />
                      <div className="space-y-6">
                         {CONTENT_SECTIONS[0].articles.slice(0, 2).map((art, i) => (
                            <div key={i}>
                               <EcoRedLabel>{art.category}</EcoRedLabel>
                               <h4 className="font-heading font-bold text-lg mb-2 hover:underline decoration-[#E3120B]">{art.title}</h4>
                               <p className="text-sm text-stone-600 line-clamp-2">{art.excerpt}</p>
                               <EcoSeparator />
                            </div>
                         ))}
                      </div>
                   </div>
                   
                   {/* Middle Column: Spotlight */}
                   <div className="lg:col-span-4 border-r border-stone-200 pr-8">
                      <EcoSectionHeader title="Founder's Corner" />
                      <div className="bg-[#F9F9F9] p-6 border-t-4 border-[#E3120B]">
                         <EcoRedLabel>Spotlight</EcoRedLabel>
                         <h3 className="font-heading font-bold text-xl mb-3">{FOUNDER_CORNER.articles[0].title}</h3>
                         <p className="text-sm text-stone-600 mb-4">{FOUNDER_CORNER.articles[0].excerpt}</p>
                         <div className="flex justify-end">
                            <ArrowRight className="w-4 h-4 text-[#E3120B]" />
                         </div>
                      </div>
                      <div className="mt-6 space-y-4">
                         {FOUNDER_CORNER.articles.slice(1).map((art, i) => (
                            <div key={i} className="flex gap-2 items-baseline">
                               <div className="w-2 h-2 bg-[#E3120B] flex-shrink-0"></div>
                               <h4 className="font-heading font-bold text-base hover:underline">{art.title}</h4>
                            </div>
                         ))}
                      </div>
                   </div>

                   {/* Right Column: Opinion */}
                   <div className="lg:col-span-4">
                       <EcoSectionHeader title="Commentary" />
                       <div className="space-y-4">
                          {CULTURAL_STORIES.articles.map((art, i) => (
                             <div key={i} className="relative pl-4 border-l-2 border-stone-200 hover:border-[#E3120B] transition-colors cursor-pointer group">
                                <h4 className="font-heading font-bold text-lg italic group-hover:text-[#E3120B]">{art.title}</h4>
                                <p className="text-xs uppercase font-bold text-stone-400 mt-1">{art.author}</p>
                             </div>
                          ))}
                       </div>
                   </div>
                </div>
             </div>
          </section>

          {/* Graphic Detail / Data */}
          <EcoGraphicDetail />

          {/* Series & Fiction */}
          <div className="grid grid-cols-1 md:grid-cols-2 max-w-[1200px] mx-auto">
             <div className="border-r border-stone-200">
                <EcoListSection title="Fiction" items={FICTIONAL_STORIES.articles} />
             </div>
             <div>
                <EcoListSection title="Series" items={EXPLORE_SERIES.map(s => ({...s, category: 'Series', excerpt: s.desc}))} />
             </div>
          </div>

          {/* Impact Stories */}
          <EcoBriefingSection 
             title="Impact" 
             subtitle="Profit with purpose."
             articles={IMPACT_STORIES.articles} 
          />

          {/* Lower List */}
          <section className="py-12 bg-[#F9F9F9]">
             <div className="max-w-[1200px] mx-auto px-4">
                <EcoSectionHeader title="More from Susinsight" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                   {LOWER_SECTIONS.slice(0, 4).map((section, i) => (
                      <div key={i}>
                         <h4 className="font-heading font-bold text-xs uppercase mb-3 text-[#E3120B]">{section.title}</h4>
                         <ul className="space-y-3">
                            {section.articles.map((art, j) => (
                               <li key={j}>
                                  <a href="#" className="font-heading text-sm font-bold hover:underline decoration-stone-400 leading-snug block">
                                     {art.title}
                                  </a>
                               </li>
                            ))}
                         </ul>
                      </div>
                   ))}
                </div>
             </div>
          </section>

       </main>

       <EcoFooter />
    </div>
  );
};

export default EconomistHome;