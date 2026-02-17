import React from 'react';
import { 
  Search, Menu, User, ChevronRight, PenTool, Coffee, BookOpen, 
  Glasses, Mic, Mail
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

// --- NYer Primitives ---

const NYFont: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <span className={`font-display ${className}`}>{children}</span>
);

const NYByline: React.FC<{ author: string; date?: string; className?: string }> = ({ author, date, className = '' }) => (
  <div className={`font-heading text-[10px] tracking-widest uppercase text-[#d93025] mb-2 ${className}`}>
    By <span className="text-black font-bold">{author}</span> {date && <span className="text-stone-400 mx-1">|</span>} {date}
  </div>
);

const NYRubric: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="font-heading font-bold text-[10px] tracking-[0.15em] uppercase text-black mb-3 border-b-2 border-black inline-block pb-1">
    {children}
  </div>
);

const NYDivider: React.FC = () => (
  <div className="w-full h-px bg-stone-200 my-8"></div>
);

// --- Layout Components ---

const NYNavbar: React.FC = () => (
  <nav className="bg-white border-b border-black pb-4 pt-4 sticky top-0 z-50">
    <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-3 items-center">
      <div className="flex items-center gap-4">
        <Menu className="w-6 h-6 stroke-[1.5]" />
        <span className="hidden md:inline font-heading font-bold text-xs uppercase tracking-widest">Sections</span>
      </div>
      
      <div className="text-center">
        <h1 className="font-display font-medium text-4xl md:text-6xl tracking-tight">Susinsight</h1>
      </div>
      
      <div className="flex justify-end items-center gap-4">
        <button className="hidden md:block font-heading font-bold text-xs uppercase tracking-widest px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors">
          Subscribe
        </button>
        <span className="font-heading text-xs font-bold uppercase tracking-widest hidden md:inline">Sign In</span>
        <Search className="w-5 h-5" />
      </div>
    </div>
    
    <div className="flex justify-center gap-8 mt-4 border-t border-stone-200 pt-3 overflow-x-auto hide-scrollbar">
      {['News', 'Culture', 'Books', 'Business', 'Tech', 'Science', 'Humor', 'Cartoons', 'Magazine'].map(item => (
        <a key={item} href="#" className="font-heading font-bold text-xs uppercase tracking-widest hover:text-[#d93025] whitespace-nowrap">
          {item}
        </a>
      ))}
    </div>
  </nav>
);

const NYHero: React.FC = () => (
  <section className="py-12 border-b border-stone-200">
    <div className="max-w-[1280px] mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Feature */}
        <div className="lg:col-span-8 flex flex-col items-center text-center">
           <NYRubric>{HERO_FEATURE.category}</NYRubric>
           <h2 className="font-display font-medium text-5xl md:text-7xl leading-[1.05] mb-6 max-w-3xl">
              {HERO_FEATURE.title}
           </h2>
           <p className="font-serif text-xl md:text-2xl text-stone-600 mb-6 max-w-2xl leading-relaxed italic">
              {HERO_FEATURE.excerpt}
           </p>
           <NYByline author={HERO_FEATURE.author} className="mb-8 scale-110" />
           
           <div className="w-full aspect-[16/9] overflow-hidden relative group cursor-pointer">
              <img 
                 src="https://picsum.photos/seed/nyer_hero/1600/900" 
                 className="w-full h-full object-cover transition-transform duration-[2s] ease-in-out group-hover:scale-105 grayscale hover:grayscale-0"
                 alt="Hero"
              />
              <div className="absolute bottom-4 right-4 text-[10px] font-heading uppercase text-white bg-black/50 px-2 py-1">
                 Photograph by {HERO_FEATURE.author}
              </div>
           </div>
        </div>

        {/* The Sidebar (The Daily) */}
        <div className="lg:col-span-4 border-l border-stone-200 pl-12 flex flex-col relative">
           <div className="sticky top-40">
              <div className="flex items-center justify-between mb-6">
                 <NYRubric>The Daily</NYRubric>
                 <span className="text-xs font-serif italic text-stone-400">Updated hourly</span>
              </div>
              
              <div className="space-y-8">
                 {TRENDING_ARTICLES.map((article, i) => (
                    <div key={i} className="group cursor-pointer">
                       <h3 className="font-display font-bold text-xl leading-tight mb-2 group-hover:text-[#d93025] transition-colors">
                          {article.title}
                       </h3>
                       <p className="font-serif text-sm leading-relaxed text-stone-600 mb-2 line-clamp-3">
                          {article.excerpt}
                       </p>
                       <div className="text-[10px] font-heading uppercase text-stone-400">
                          {article.date}
                       </div>
                    </div>
                 ))}
                 
                 <div className="group cursor-pointer">
                     <h3 className="font-display font-bold text-xl leading-tight mb-2 group-hover:text-[#d93025]">
                        Daily Cartoon
                     </h3>
                     <div className="aspect-square bg-stone-100 border border-stone-200 flex items-center justify-center p-8">
                        <PenTool className="w-12 h-12 text-stone-300" />
                        <span className="sr-only">Cartoon placeholder</span>
                     </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  </section>
);

const NYColumnSection: React.FC<{ 
   leftSection: any; 
   rightSection: any; 
}> = ({ leftSection, rightSection }) => (
   <section className="py-12 border-b border-stone-200">
      <div className="max-w-[1280px] mx-auto px-6">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-stone-200 border border-stone-200">
            <div className="bg-white p-8 md:p-12">
               <NYRubric>{leftSection.title}</NYRubric>
               <div className="mt-8 space-y-12">
                  {leftSection.articles.slice(0,3).map((art: any, i: number) => (
                     <div key={i} className="flex gap-6 items-start group cursor-pointer">
                        <div className="flex-1">
                           <h3 className="font-display font-bold text-2xl mb-2 group-hover:underline decoration-[#d93025] decoration-2 underline-offset-4">{art.title}</h3>
                           <NYByline author={art.author || 'Staff'} />
                           <p className="font-serif text-base text-stone-700 leading-relaxed">{art.excerpt}</p>
                        </div>
                        <div className="w-24 h-24 bg-stone-100 flex-shrink-0 grayscale group-hover:grayscale-0 transition-all">
                           <img src={`https://picsum.photos/seed/${art.title.length}/200`} className="w-full h-full object-cover" alt="" />
                        </div>
                     </div>
                  ))}
               </div>
            </div>
            
            <div className="bg-white p-8 md:p-12">
               <NYRubric>{rightSection.title}</NYRubric>
               <div className="mt-8 space-y-12">
                  {rightSection.articles.slice(0,3).map((art: any, i: number) => (
                     <div key={i} className="flex gap-6 items-start group cursor-pointer">
                         <div className="w-24 h-24 bg-stone-100 flex-shrink-0 rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                           <img src={`https://picsum.photos/seed/${art.title.length + 5}/200`} className="w-full h-full object-cover" alt="" />
                        </div>
                        <div className="flex-1">
                           <h3 className="font-display font-bold text-2xl mb-2 group-hover:underline decoration-[#d93025] decoration-2 underline-offset-4">{art.title}</h3>
                           <NYByline author={art.author || 'Contributor'} />
                           <p className="font-serif text-base text-stone-700 leading-relaxed">{art.excerpt}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   </section>
);

const NYSpotlight: React.FC = () => (
   <section className="py-16 bg-[#fcfcfc] border-b border-stone-200">
      <div className="max-w-[1000px] mx-auto px-6 text-center">
         <div className="w-12 h-12 mx-auto mb-6 text-black">
             <Glasses className="w-full h-full" />
         </div>
         <h2 className="font-display font-medium text-4xl mb-4 italic">"The Founder's Corner"</h2>
         <p className="font-serif text-lg text-stone-600 mb-12 max-w-xl mx-auto">
            Profiles of the individuals shaping the future of African sustainability, one innovation at a time.
         </p>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {FOUNDER_CORNER.articles.map((founder, i) => (
               <div key={i} className="group cursor-pointer">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-stone-200 mb-6 group-hover:border-[#d93025] transition-colors">
                     <img src={`https://picsum.photos/seed/${founder.title.length}/300`} className="w-full h-full object-cover grayscale" alt="" />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-2">{founder.title}</h3>
                  <p className="font-serif text-sm text-stone-600 leading-relaxed">{founder.excerpt}</p>
               </div>
            ))}
         </div>
      </div>
   </section>
);

const NYFiction: React.FC = () => (
   <section className="py-12 bg-[#fffdf5] border-b border-stone-200">
      <div className="max-w-[1280px] mx-auto px-6">
         <div className="flex items-center gap-4 mb-8">
            <NYRubric>Shouts & Murmurs</NYRubric>
            <span className="h-px bg-black flex-1 opacity-20"></span>
            <BookOpen className="w-4 h-4 text-stone-400" />
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {FICTIONAL_STORIES.articles.map((story, i) => (
               <div key={i} className="text-center group cursor-pointer">
                  <h3 className="font-display font-bold italic text-3xl mb-3 group-hover:text-[#d93025]">{story.title}</h3>
                  <div className="w-8 h-px bg-[#d93025] mx-auto mb-4"></div>
                  <p className="font-serif text-base text-stone-800 leading-relaxed">
                     {story.excerpt}
                  </p>
                  <div className="mt-4 font-heading text-xs font-bold uppercase text-stone-400">Fiction</div>
               </div>
            ))}
         </div>
      </div>
   </section>
);

const NYData: React.FC = () => (
   <section className="py-12">
      <div className="max-w-[1280px] mx-auto px-6">
         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 border-r border-stone-200 pr-8">
               <NYRubric>Dept. of Data</NYRubric>
               <h3 className="font-display font-medium text-4xl mb-4">Susdata Intelligence.</h3>
               <p className="font-serif text-lg text-stone-600 mb-6">
                  Verified datasets and real-time indicators for the modern African economy.
               </p>
               <button className="font-heading font-bold text-xs uppercase tracking-widest text-[#d93025] border border-[#d93025] px-6 py-3 hover:bg-[#d93025] hover:text-white transition-colors w-full">
                  Access Data
               </button>
            </div>
            
            <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
               {[
                  { label: "Markets", desc: "Regional Growth" },
                  { label: "Energy", desc: "Grid Capacity" },
                  { label: "Water", desc: "Resource Scarcity" },
                  { label: "Policy", desc: "Regulatory Change" }
               ].map((item, i) => (
                  <div key={i} className="border-t-4 border-black pt-4">
                     <h4 className="font-heading font-bold text-sm uppercase tracking-widest mb-2">{item.label}</h4>
                     <p className="font-serif text-stone-600 text-sm">{item.desc}</p>
                     <div className="mt-4 h-24 bg-stone-50 border border-stone-100 relative">
                        {/* Abstract bar chart */}
                        <div className="absolute bottom-0 left-2 w-2 bg-stone-300 h-12"></div>
                        <div className="absolute bottom-0 left-6 w-2 bg-stone-800 h-16"></div>
                        <div className="absolute bottom-0 left-10 w-2 bg-[#d93025] h-20"></div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   </section>
);

const NYList: React.FC<{ items: any[]; title: string }> = ({ items, title }) => (
   <div className="py-8">
      <NYRubric>{title}</NYRubric>
      <ul className="space-y-6 mt-4">
         {items.slice(0, 4).map((item, i) => (
            <li key={i} className="flex gap-4 items-baseline group cursor-pointer border-b border-stone-100 pb-4 last:border-0">
               <span className="font-heading font-bold text-xs text-[#d93025] tracking-widest flex-shrink-0">
                  {i + 1}.
               </span>
               <div>
                  <h4 className="font-display font-bold text-lg leading-tight group-hover:underline">{item.title}</h4>
                  <p className="font-serif text-sm text-stone-500 mt-1 line-clamp-2">{item.excerpt}</p>
               </div>
            </li>
         ))}
      </ul>
   </div>
);

const NYFooter: React.FC = () => (
   <footer className="bg-white border-t border-black pt-16 pb-8 mt-12">
      <div className="max-w-[1280px] mx-auto px-6">
         <div className="flex flex-col items-center text-center mb-16">
            <h2 className="font-display font-medium text-5xl mb-6">Susinsight</h2>
            <div className="flex gap-6 mb-8 font-heading font-bold text-xs uppercase tracking-widest">
               <a href="#" className="hover:text-[#d93025]">Subscribe</a>
               <a href="#" className="hover:text-[#d93025]">Newsletters</a>
               <a href="#" className="hover:text-[#d93025]">Store</a>
               <a href="#" className="hover:text-[#d93025]">Podcast</a>
            </div>
            <div className="w-16 h-px bg-stone-300"></div>
         </div>
         
         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            {NAV_STRUCTURE.slice(0, 5).map((col, i) => (
               <div key={i}>
                  <h5 className="font-heading font-bold text-[10px] uppercase tracking-widest text-stone-400 mb-4">{col.label}</h5>
                  <ul className="space-y-2">
                     {col.children?.map((link, j) => (
                        <li key={j}><a href={link.href} className="font-serif text-sm hover:underline">{link.label}</a></li>
                     )) || <li><a href={col.href} className="font-serif text-sm hover:underline">Link</a></li>}
                  </ul>
               </div>
            ))}
         </div>
         
         <div className="text-center font-heading text-[10px] uppercase tracking-widest text-stone-400">
            <p>© 2025 Susinsight. All rights reserved.</p>
         </div>
      </div>
   </footer>
);

// --- Main Page ---

const NewYorkerHome: React.FC = () => {
  return (
    <div className="bg-white min-h-screen text-black font-serif selection:bg-[#d93025] selection:text-white">
       <NYNavbar />
       
       <main>
          <NYHero />
          
          <NYColumnSection 
             leftSection={CONTENT_SECTIONS[0]} 
             rightSection={CONTENT_SECTIONS[1]} 
          />
          
          <NYSpotlight />
          
          <NYColumnSection 
             leftSection={CULTURAL_STORIES} 
             rightSection={UNEXPECTED_IMPACT} 
          />
          
          <NYFiction />
          
          <NYData />
          
          <section className="py-12 border-t border-stone-200">
             <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
                <NYList title="Series" items={EXPLORE_SERIES.map(s => ({...s, category: 'Series', excerpt: s.desc}))} />
                <NYList title="Impact" items={IMPACT_STORIES.articles} />
                <div className="py-8 bg-stone-100 px-8 text-center flex flex-col items-center justify-center">
                   <Mail className="w-8 h-8 text-stone-400 mb-4" />
                   <h3 className="font-display font-bold text-2xl mb-2">The Susinsight Newsletter</h3>
                   <p className="font-serif text-sm text-stone-600 mb-6">Get the best of Susinsight delivered to your inbox every morning.</p>
                   <input type="email" placeholder="Your e-mail address" className="w-full p-2 text-sm font-sans border border-stone-300 mb-2" />
                   <button className="w-full bg-black text-white font-heading font-bold text-xs uppercase tracking-widest py-3 hover:bg-[#d93025] transition-colors">Sign Up</button>
                </div>
             </div>
          </section>
       </main>
       
       <NYFooter />
    </div>
  );
};

export default NewYorkerHome;