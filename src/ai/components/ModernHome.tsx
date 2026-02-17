import React, { useState, useEffect } from 'react';
import { 
  Menu, Search, Sun, Moon, ArrowRight, ArrowUpRight, 
  Globe, TrendingUp, X, Play, ChevronRight, Users 
} from 'lucide-react';
import { useTheme } from '../App';
import { 
  CONTENT_SECTIONS, 
  HERO_FEATURE, 
  TRENDING_ARTICLES, 
  FOUNDER_CORNER,
  CULTURAL_STORIES,
  UNEXPECTED_IMPACT,
  FICTIONAL_STORIES,
  IMPACT_STORIES,
  LOWER_SECTIONS,
  NAV_STRUCTURE,
  EXPLORE_SERIES
} from '../constants';
import { Article } from '../types';

// --- Atomic Components ---

const SectionLabel: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <span className={`inline-block font-heading font-bold text-[11px] tracking-[0.2em] uppercase mb-2 ${className}`}>
    {children}
  </span>
);

const Divider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`h-[1px] w-full bg-stone-200 dark:bg-stone-800 ${className}`}></div>
);

const Button: React.FC<{ 
  children: React.ReactNode; 
  variant?: 'solid' | 'outline' | 'ghost';
  className?: string 
}> = ({ children, variant = 'solid', className = '' }) => {
  const base = "px-6 py-3 rounded-full font-heading font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2";
  const variants = {
    solid: "bg-black text-white dark:bg-white dark:text-black hover:opacity-80",
    outline: "border border-stone-300 dark:border-stone-700 hover:border-black dark:hover:border-white",
    ghost: "hover:bg-stone-100 dark:hover:bg-white/10"
  };
  return <button className={`${base} ${variants[variant]} ${className}`}>{children}</button>;
};

// --- Complex Layout Components ---

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`
        fixed top-0 inset-x-0 z-50 transition-all duration-500 border-b
        ${scrolled 
          ? 'bg-white/90 dark:bg-black/90 backdrop-blur-md py-3 border-stone-200 dark:border-stone-800' 
          : 'bg-transparent py-6 border-transparent'}
      `}>
        <div className="max-w-[1800px] mx-auto px-6 flex items-center justify-between">
          
          {/* Left: Brand */}
          <div className="flex items-center gap-6">
            <button onClick={() => setMenuOpen(true)} className="group flex items-center gap-2">
              <div className="p-2 bg-stone-100 dark:bg-white/10 rounded-full group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
                <Menu className="w-5 h-5" />
              </div>
              <span className="hidden md:block font-heading font-bold text-xs uppercase tracking-widest opacity-60 group-hover:opacity-100">Menu</span>
            </button>
            <a href="/" className="flex items-center gap-2 group">
              <span className="font-heading font-black text-2xl tracking-tighter text-stone-900 dark:text-white">Susinsight</span>
            </a>
          </div>

          {/* Center: Essential Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-8">
             {['Stories', 'Signals', 'Data', 'Resources'].map(item => (
               <a key={item} href="#" className="relative group overflow-hidden">
                 <span className="block font-heading font-bold text-sm uppercase tracking-wider text-stone-900 dark:text-white group-hover:-translate-y-full transition-transform duration-300">{item}</span>
                 <span className="absolute top-full left-0 block font-heading font-bold text-sm uppercase tracking-wider text-emerald-600 dark:text-emerald-400 group-hover:-translate-y-full transition-transform duration-300">{item}</span>
               </a>
             ))}
          </div>

          {/* Right: Tools */}
          <div className="flex items-center gap-4">
             <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-white/10 transition-colors">
                {theme === 'light' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
             </button>
             <button className="hidden sm:block p-2 rounded-full hover:bg-stone-100 dark:hover:bg-white/10 transition-colors">
                <Search className="w-5 h-5" />
             </button>
             <a href="#" className="hidden md:inline-flex px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-full font-heading font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform">
                Subscribe
             </a>
          </div>
        </div>
      </nav>

      {/* Full Screen Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-white dark:bg-black animate-in fade-in duration-300 flex flex-col">
           <div className="p-6 flex justify-between items-center border-b border-stone-100 dark:border-stone-800">
              <span className="font-heading font-bold text-xl dark:text-white">Full Index</span>
              <button onClick={() => setMenuOpen(false)} className="p-3 bg-stone-100 dark:bg-white/10 rounded-full hover:rotate-90 transition-transform">
                 <X className="w-6 h-6 dark:text-white" />
              </button>
           </div>
           <div className="flex-1 overflow-y-auto p-8 md:p-16">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                 {NAV_STRUCTURE.map((section) => (
                    <div key={section.label}>
                       <SectionLabel className="text-emerald-600 dark:text-emerald-400 border-b border-emerald-500/20 pb-2 w-full mb-6">
                          {section.label}
                       </SectionLabel>
                       <ul className="space-y-4">
                          {section.children?.map(link => (
                             <li key={link.label}>
                                <a href={link.href} className="group flex items-center gap-2 text-2xl font-serif text-stone-800 dark:text-stone-300 hover:text-black dark:hover:text-white transition-colors">
                                   <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-emerald-500" />
                                   {link.label}
                                </a>
                             </li>
                          )) || (
                             <li><a href={section.href} className="text-2xl font-serif dark:text-white">{section.label}</a></li>
                          )}
                       </ul>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      )}
    </>
  );
};

const MagazineHero: React.FC = () => (
  <header className="pt-32 pb-16 px-4 md:px-6 max-w-[1800px] mx-auto">
    {/* Top Bar: Date & Ticker */}
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-black dark:border-white pb-6 mb-12 gap-6">
       <div>
          <h1 className="text-[12vw] md:text-[8vw] leading-[0.8] font-heading font-black tracking-tighter text-stone-900 dark:text-white uppercase mb-2">
            Susinsight
            <span className="text-emerald-500 text-[2rem] md:text-[4rem] align-top leading-none">.</span>
          </h1>
          <p className="text-lg md:text-xl font-serif italic text-stone-600 dark:text-stone-400 max-w-2xl">
             Your window into the people, practices, and policies shaping Africa’s development.
          </p>
       </div>
       <div className="text-right hidden md:block">
          <SectionLabel className="text-stone-400 dark:text-stone-500">Edition</SectionLabel>
          <div className="font-serif text-lg dark:text-white">Vol. 25 — {new Date().getFullYear()}</div>
       </div>
    </div>

    {/* Hero Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
       {/* Main Story (Left - 8 cols) */}
       <div className="lg:col-span-8 group cursor-pointer">
          <div className="relative overflow-hidden rounded-[2rem] aspect-[16/10] mb-8">
             <img 
               src="https://picsum.photos/seed/hero2025/1600/1000" 
               alt="Hero" 
               className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
             <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
                <span className="bg-emerald-500 text-white px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-md mb-4 inline-block">
                   {HERO_FEATURE.category}
                </span>
             </div>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-medium text-stone-900 dark:text-white leading-[1.1] mb-4 group-hover:underline decoration-2 underline-offset-4 decoration-emerald-500">
             {HERO_FEATURE.title}
          </h2>
          <p className="text-xl text-stone-600 dark:text-stone-300 font-serif leading-relaxed max-w-3xl">
             {HERO_FEATURE.excerpt}
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm font-bold uppercase tracking-wide text-stone-500 dark:text-stone-400">
             <span>{HERO_FEATURE.author}</span>
             <span className="w-1 h-1 bg-stone-300 rounded-full"></span>
             <span>Read Story</span>
          </div>
       </div>

       {/* Side Rail (Right - 4 cols) */}
       <div className="lg:col-span-4 flex flex-col h-full border-t lg:border-t-0 lg:border-l border-stone-200 dark:border-stone-800 pt-8 lg:pt-0 lg:pl-12">
          <SectionLabel className="text-stone-400">The Briefing</SectionLabel>
          
          <div className="flex-1 flex flex-col gap-8">
             {CONTENT_SECTIONS[0].articles.slice(0, 3).map((article, i) => (
                <div key={i} className="group cursor-pointer border-b border-stone-100 dark:border-stone-800 pb-8 last:border-0">
                   <SectionLabel className="text-emerald-600 dark:text-emerald-500 text-[10px] mb-1">
                      {article.category || 'Analysis'}
                   </SectionLabel>
                   <h3 className="text-xl md:text-2xl font-serif font-medium text-stone-900 dark:text-white mb-3 group-hover:text-emerald-600 transition-colors">
                      {article.title}
                   </h3>
                   <p className="text-sm text-stone-500 dark:text-stone-400 line-clamp-2 mb-3">
                      {article.excerpt}
                   </p>
                   <div className="flex items-center gap-2 text-xs font-bold uppercase text-stone-400">
                      {article.author}
                   </div>
                </div>
             ))}
          </div>

          <div className="mt-8 pt-8 border-t border-black dark:border-white">
             <div className="bg-stone-100 dark:bg-white/10 p-6 rounded-2xl">
                <SectionLabel>Trending Now</SectionLabel>
                <div className="space-y-4 mt-2">
                   {TRENDING_ARTICLES.map((item, idx) => (
                      <div key={idx} className="flex gap-3 items-start">
                         <span className="text-emerald-500 font-bold text-lg">{idx + 1}</span>
                         <p className="text-sm font-medium text-stone-800 dark:text-stone-200 leading-snug hover:underline cursor-pointer">
                            {item.title}
                         </p>
                      </div>
                   ))}
                </div>
             </div>
          </div>
       </div>
    </div>
  </header>
);

const EditorialSection: React.FC<{ 
  title: string;
  subtitle?: string;
  articles: Article[];
  theme?: 'light' | 'dark' | 'brand';
  layout?: 'grid' | 'list' | 'spotlight';
}> = ({ title, subtitle, articles, theme = 'light', layout = 'grid' }) => {
  
  const bgColors = {
    light: "bg-white dark:bg-black",
    dark: "bg-stone-900 dark:bg-white/5 text-white",
    brand: "bg-[#FDFBF7] dark:bg-emerald-950/30"
  };

  const textColors = theme === 'dark' ? "text-white" : "text-stone-900 dark:text-white";
  const subColors = theme === 'dark' ? "text-stone-400" : "text-stone-500 dark:text-stone-400";

  return (
    <section className={`py-20 px-4 md:px-6 border-t border-stone-200 dark:border-stone-800 ${bgColors[theme]}`}>
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           
           {/* Sticky Header (Left) */}
           <div className="lg:col-span-3">
              <div className="sticky top-32">
                 <h2 className={`text-4xl md:text-5xl font-heading font-bold mb-6 tracking-tight leading-none ${textColors}`}>
                    {title}
                 </h2>
                 <Divider className={`mb-6 ${theme === 'dark' ? 'bg-white/20' : 'bg-black/10'}`} />
                 {subtitle && (
                   <p className={`text-lg font-serif italic mb-8 ${subColors}`}>
                      {subtitle}
                   </p>
                 )}
                 <Button variant={theme === 'dark' ? 'outline' : 'solid'} className="w-full md:w-auto">
                    Explore All
                 </Button>
              </div>
           </div>

           {/* Content (Right) */}
           <div className="lg:col-span-9">
              {layout === 'grid' && (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {articles.slice(0, 6).map((article, i) => (
                       <article key={i} className="flex flex-col group">
                          <div className="aspect-[3/2] overflow-hidden rounded-xl mb-6 bg-stone-200 dark:bg-white/10">
                             <img 
                               src={`https://picsum.photos/seed/${article.imageSeed || i * 33}/800/600`}
                               alt={article.title}
                               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                             />
                          </div>
                          <SectionLabel className="text-emerald-600 dark:text-emerald-400">
                             {article.category || 'Feature'}
                          </SectionLabel>
                          <h3 className={`text-xl font-bold font-heading mb-3 leading-tight group-hover:underline ${textColors}`}>
                             {article.title}
                          </h3>
                          <p className={`text-sm font-serif line-clamp-3 mb-4 ${subColors}`}>
                             {article.excerpt}
                          </p>
                       </article>
                    ))}
                 </div>
              )}

              {layout === 'list' && (
                 <div className="flex flex-col">
                    {articles.slice(0, 4).map((article, i) => (
                       <article key={i} className={`group py-8 first:pt-0 flex flex-col md:flex-row gap-8 items-start border-b ${theme === 'dark' ? 'border-white/10' : 'border-stone-200 dark:border-stone-800'}`}>
                          <div className="w-full md:w-1/3 aspect-video rounded-xl overflow-hidden bg-stone-200">
                             <img 
                               src={`https://picsum.photos/seed/${article.imageSeed || i * 44}/600/400`}
                               className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                               alt=""
                             />
                          </div>
                          <div className="flex-1">
                             <div className="flex items-center gap-3 mb-3">
                                <span className={`w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-emerald-400' : 'bg-emerald-600'}`}></span>
                                <span className="font-heading font-bold text-xs uppercase tracking-widest opacity-60">
                                   {article.author || 'Editorial'}
                                </span>
                             </div>
                             <h3 className={`text-2xl md:text-3xl font-serif font-medium mb-4 group-hover:text-emerald-500 transition-colors ${textColors}`}>
                                {article.title}
                             </h3>
                             <p className={`text-base max-w-2xl ${subColors}`}>{article.excerpt}</p>
                          </div>
                          <div className="hidden md:flex justify-end">
                             <div className={`p-3 rounded-full border transition-colors ${theme === 'dark' ? 'border-white/20 group-hover:bg-white group-hover:text-black' : 'border-black/10 group-hover:bg-black group-hover:text-white'}`}>
                                <ArrowUpRight className="w-5 h-5" />
                             </div>
                          </div>
                       </article>
                    ))}
                 </div>
              )}
           </div>
        </div>
      </div>
    </section>
  );
};

const SpotlightGrid: React.FC = () => (
  <section className="bg-stone-100 dark:bg-stone-900 py-20 px-4">
     <div className="max-w-[1800px] mx-auto">
        <div className="flex items-end justify-between mb-12">
           <h2 className="text-3xl font-heading font-black uppercase tracking-tight text-stone-900 dark:text-white">
              Founder's Corner
           </h2>
           <a href="#" className="text-sm font-bold uppercase tracking-widest hover:underline decoration-2 underline-offset-4 decoration-emerald-500 dark:text-white">View All Founders</a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
           {FOUNDER_CORNER.articles.map((article, i) => (
              <div key={i} className="bg-white dark:bg-black p-8 rounded-[2rem] hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-xl border border-stone-200 dark:border-stone-800 flex flex-col justify-between min-h-[320px]">
                 <div>
                    <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6">
                       <Users className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-heading font-bold mb-4 text-stone-900 dark:text-white leading-tight">
                       {article.title}
                    </h3>
                    <p className="text-sm text-stone-500 dark:text-stone-400 font-serif">
                       {article.excerpt}
                    </p>
                 </div>
                 <div className="mt-8 pt-6 border-t border-stone-100 dark:border-stone-800">
                    <span className="text-xs font-bold uppercase text-stone-400">Read Profile</span>
                 </div>
              </div>
           ))}
           
           {/* CTA Card */}
           <div className="bg-emerald-600 dark:bg-emerald-900 p-8 rounded-[2rem] text-white flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl font-serif font-medium mb-4">Know a changemaker?</h3>
              <p className="text-white/80 text-sm mb-6">We are always looking for stories that inspire.</p>
              <button className="px-6 py-2 bg-white text-emerald-900 rounded-full font-bold text-sm hover:scale-105 transition-transform">
                 Recommend Founder
              </button>
           </div>
        </div>
     </div>
  </section>
);

const DataVisualSection: React.FC = () => (
   <section className="py-24 bg-black text-white relative overflow-hidden">
      {/* Abstract Grid Background */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <div className="max-w-[1400px] mx-auto px-6 relative z-10 text-center">
         <SectionLabel className="text-emerald-400 mb-4">Susdata Intelligence</SectionLabel>
         <h2 className="text-5xl md:text-7xl font-heading font-black mb-8 tracking-tighter">
            Data that drives <br/><span className="text-emerald-500">decisions.</span>
         </h2>
         <p className="text-xl md:text-2xl text-stone-400 font-serif max-w-2xl mx-auto mb-12">
            Access over 500+ verified datasets covering African economic, environmental, and social sustainability metrics.
         </p>
         
         <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-stone-800 border border-stone-800 rounded-2xl overflow-hidden">
            {[
               { val: "54", label: "Countries Tracked" },
               { val: "500+", label: "Unique Datasets" },
               { val: "12", label: "Industry Sectors" },
               { val: "24/7", label: "Real-time Updates" }
            ].map((stat, i) => (
               <div key={i} className="bg-stone-900/50 backdrop-blur-sm p-8 hover:bg-stone-800 transition-colors">
                  <div className="text-4xl md:text-5xl font-mono font-bold text-white mb-2">{stat.val}</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-stone-500">{stat.label}</div>
               </div>
            ))}
         </div>
         
         <div className="mt-12">
            <Button variant="solid" className="bg-white text-black hover:bg-emerald-400 mx-auto">
               Access Susdata Platform
            </Button>
         </div>
      </div>
   </section>
);

const FooterEditorial: React.FC = () => (
   <footer className="bg-[#F5F5F0] dark:bg-[#0A0A0A] pt-24 pb-12 px-6 border-t border-stone-200 dark:border-stone-800">
      <div className="max-w-[1800px] mx-auto">
         <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-24 mb-20">
            
            {/* Brand Statement */}
            <div className="lg:col-span-1">
               <h3 className="font-heading font-black text-3xl mb-4 dark:text-white tracking-tighter">Susinsight.</h3>
               <p className="font-serif text-stone-600 dark:text-stone-400 leading-relaxed mb-8">
                  Advancing Sustainability in Africa through rigorous journalism, data intelligence, and compelling narratives.
               </p>
               <div className="flex gap-4">
                  <div className="w-10 h-10 border border-stone-300 dark:border-stone-700 rounded-full flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors cursor-pointer">
                     <Globe className="w-4 h-4" />
                  </div>
                  {/* Add more social icons here */}
               </div>
            </div>

            {/* Links Grid */}
            <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
               {[
                  { title: "Sections", links: ["Business", "Policy", "Culture", "Environment"] },
                  { title: "Signals", links: ["Market Watch", "Ground Truth", "Career Compass", "Founder Playbook"] },
                  { title: "Company", links: ["About Us", "Our Vision", "Careers", "Contact"] },
                  { title: "Legal", links: ["Privacy Policy", "Terms of Use", "Cookie Policy", "Accessibility"] }
               ].map((col, i) => (
                  <div key={i}>
                     <h4 className="font-heading font-bold uppercase tracking-widest text-xs mb-6 text-stone-400">{col.title}</h4>
                     <ul className="space-y-4">
                        {col.links.map(link => (
                           <li key={link}>
                              <a href="#" className="font-heading font-medium text-stone-800 dark:text-stone-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                                 {link}
                              </a>
                           </li>
                        ))}
                     </ul>
                  </div>
               ))}
            </div>
         </div>

         {/* Bottom Bar */}
         <div className="pt-8 border-t border-stone-200 dark:border-stone-800 flex flex-col md:flex-row justify-between items-center text-xs font-bold uppercase tracking-widest text-stone-400">
            <p>© 2025 Susinsight Media.</p>
            <p className="mt-4 md:mt-0">Designed with purpose.</p>
         </div>
      </div>
   </footer>
);


const ModernHome: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-stone-900 dark:text-white font-body selection:bg-emerald-200 dark:selection:bg-emerald-900">
      
      <Navbar />
      
      <main>
        <MagazineHero />
        
        {/* Section 1: Business (Grid Layout) */}
        <EditorialSection 
           title={CONTENT_SECTIONS[1].title} 
           subtitle={CONTENT_SECTIONS[1].subtitle}
           articles={CONTENT_SECTIONS[1].articles}
           theme="brand" // Uses the nice off-white background
           layout="grid"
        />

        {/* Section 2: Culture (List Layout for narrative feel) */}
        <EditorialSection 
           title={CULTURAL_STORIES.title} 
           subtitle={CULTURAL_STORIES.subtitle}
           articles={CULTURAL_STORIES.articles}
           layout="list"
        />

        <SpotlightGrid />
        
        {/* Section 3: Impact (Dark Mode for contrast) */}
        <EditorialSection 
           title="Impact & Insight" 
           subtitle="Stories that reveal where Africa’s development is heading."
           articles={[...IMPACT_STORIES.articles, ...CONTENT_SECTIONS[0].articles]}
           theme="dark"
           layout="grid"
        />

        <DataVisualSection />

        {/* Fictional Series / Unexpected */}
        <section className="py-20 px-4 max-w-[1800px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
               <div className="bg-yellow-100 dark:bg-yellow-900/20 p-12 rounded-[3rem] text-center md:text-left h-full flex flex-col justify-center">
                   <SectionLabel className="text-yellow-700 dark:text-yellow-500">Fictional Narratives</SectionLabel>
                   <h3 className="text-3xl font-serif italic mb-6">"Fiction that inspires reflection and action."</h3>
                   <div className="space-y-6">
                      {FICTIONAL_STORIES.articles.slice(0, 2).map((s, i) => (
                         <div key={i} className="group cursor-pointer">
                            <h4 className="text-xl font-bold font-heading group-hover:underline decoration-yellow-500">{s.title}</h4>
                            <p className="text-stone-600 dark:text-stone-400 text-sm">{s.excerpt}</p>
                         </div>
                      ))}
                   </div>
               </div>
               
               <div className="h-full flex flex-col justify-center gap-6">
                   <h2 className="text-4xl font-heading font-black">Explore Series</h2>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {EXPLORE_SERIES.map((series, i) => (
                         <a key={i} href="#" className="p-6 border border-stone-200 dark:border-stone-800 rounded-2xl hover:bg-stone-50 dark:hover:bg-white/5 transition-colors group">
                            <h4 className="font-bold mb-2 group-hover:text-emerald-600">{series.title}</h4>
                            <p className="text-xs text-stone-500">{series.desc}</p>
                         </a>
                      ))}
                   </div>
               </div>
            </div>
        </section>

        {/* Dynamic Lower Sections */}
        {LOWER_SECTIONS.slice(0, 2).map((section, idx) => (
           <EditorialSection 
              key={section.id}
              title={section.title}
              subtitle={section.subtitle}
              articles={section.articles}
              layout="list"
           />
        ))}

        {/* Newsletter / Final CTA */}
        <div className="border-t border-stone-200 dark:border-stone-800 bg-[#FAFAF5] dark:bg-[#0C0C0C]">
           <div className="max-w-4xl mx-auto px-6 py-32 text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-8 text-emerald-600" />
              <h2 className="text-5xl md:text-7xl font-heading font-black mb-8 tracking-tighter">
                 Be the first <br/> to know.
              </h2>
              <p className="text-xl text-stone-500 font-serif mb-12">
                 Join 50,000+ leaders receiving our weekly intelligence briefing on African sustainability.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={e => e.preventDefault()}>
                 <input 
                   type="email" 
                   placeholder="Your email address" 
                   className="flex-1 px-6 py-4 rounded-full border border-stone-300 dark:border-stone-700 bg-white dark:bg-black focus:outline-none focus:ring-2 focus:ring-emerald-500"
                 />
                 <Button className="px-8">Subscribe</Button>
              </form>
           </div>
        </div>

      </main>

      <FooterEditorial />
    </div>
  );
};

export default ModernHome;