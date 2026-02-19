import React, { useState, useEffect } from 'react';
import { Header, Footer, NewsletterBanner, PromoBanner, AdBanner, SpecialProjectBanner, AnnouncementBar, NewsletterCardSection } from './LayoutComponents';
import { Section, ArticleGridItem, SusdataSection } from './ArticleComponents';
import { Button, SectionTitle } from './ui';
import type { LiveHomeData, SeriesItem } from '../live-types';
import { 
  CONTENT_SECTIONS, 
  HERO_FEATURE, 
  TRENDING_ARTICLES, 
  SIGNALS_PREVIEW,
  SUSDATA_SECTION,
  SPECIAL_PROJECT,
  AD_SPOTS,
  SOCIAL_FEED,
  FOUNDER_CORNER,
  CULTURAL_STORIES,
  UNEXPECTED_IMPACT,
  FICTIONAL_STORIES,
  IMPACT_STORIES,
  LOWER_SECTIONS,
  EXPLORE_SERIES
} from '../constants';
import { ArrowRight, Globe, ChevronRight, ChevronLeft, Pause, Play, Book, CalendarDays } from 'lucide-react';

// Configuration for Ads
const SHOW_ADS = true;

type ClassicHomeProps = {
  liveData?: LiveHomeData;
};

const ClassicHome: React.FC<ClassicHomeProps> = ({ liveData }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const heroFeature = liveData?.heroFeature || HERO_FEATURE;
  const trendingArticles = liveData?.trendingArticles || TRENDING_ARTICLES;
  const signalsPreview = liveData?.signalsPreview || SIGNALS_PREVIEW;
  const contentSections = liveData?.contentSections || CONTENT_SECTIONS;
  const founderCorner = liveData?.founderCorner || FOUNDER_CORNER;
  const culturalStories = liveData?.culturalStories || CULTURAL_STORIES;
  const unexpectedImpact = liveData?.unexpectedImpact || UNEXPECTED_IMPACT;
  const fictionalStories = liveData?.fictionalStories || FICTIONAL_STORIES;
  const impactStories = liveData?.impactStories || IMPACT_STORIES;
  const lowerSections = liveData?.lowerSections || LOWER_SECTIONS;
  const exploreSeries: SeriesItem[] =
    liveData?.exploreSeries ||
    EXPLORE_SERIES.map((item) => ({
      title: item.title,
      desc: item.desc,
      imageSeed: item.imageSeed
    }));
  const marqueeSeries = [
    ...exploreSeries,
    ...exploreSeries,
    ...exploreSeries,
    ...exploreSeries,
    ...exploreSeries,
    ...exploreSeries
  ];

  const heroArticles = [
    { ...heroFeature, imageSeed: 999 },
    ...(contentSections[0]?.articles?.slice(0, 4) || [])
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPaused) {
        setCurrentSlide((prev) => (prev + 1) % heroArticles.length);
      }
    }, 5000); // 5 seconds per slide
    return () => clearInterval(timer);
  }, [isPaused, heroArticles.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroArticles.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroArticles.length) % heroArticles.length);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div className="font-body antialiased text-brand-dark bg-white min-h-screen flex flex-col">
      
      {/* ANNOUNCEMENT BAR (Togglable) */}
      {showAnnouncement && (
        <AnnouncementBar 
            message="We are launching our 2025 Sustainability Outlook Report next week." 
            linkText="Pre-register now"
            linkHref="#"
            onClose={() => setShowAnnouncement(false)}
        />
      )}

      <Header />

      <main className="flex-grow">
        
        {/* TOP MISSION STATEMENT STRIP */}
        <div className="bg-brand-dark text-white border-b border-brand-light/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-center">
                <p className="text-sm font-body text-stone-200">
                    Your window into the people, practices, and policies shaping Africa’s development.
                </p>
            </div>
        </div>

        {/* HERO SECTION - AUTOMATED SLIDER (Dark Green Background) */}
        <section 
            className="bg-brand-dark text-white overflow-hidden py-8 md:py-12 relative group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
             {/* Background Accent */}
             <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-primary opacity-10 transform skew-x-12 translate-x-20"></div>
             
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex items-center gap-2 mb-6">
                    <span className="w-2 h-2 rounded-full bg-brand-light animate-pulse"></span>
                    {/* Latest Stories - Light Yellow text on Dark Green */}
                    <h2 className="text-xs font-heading font-bold uppercase tracking-widest text-brand-light">Latest Stories</h2>
                </div>

                {/* Slider Viewport */}
                <div className="relative w-full overflow-hidden rounded-lg bg-stone-900/20 border border-white/5">
                    {/* Slides Container */}
                    <div 
                        className="flex transition-transform duration-700 ease-in-out h-full"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {heroArticles.map((article, i) => (
                            <div key={i} className="w-full flex-shrink-0 flex flex-col md:flex-row min-h-[500px] md:min-h-[380px]">
                                {/* Image Side - Reduced Width & Height */}
                                <div className="w-full md:w-5/12 h-[200px] md:h-auto relative overflow-hidden">
                                    <img 
                                        src={article.imageUrl || `https://picsum.photos/seed/${article.imageSeed || i * 50}/1200/800`}
                                        className="w-full h-full object-cover" 
                                        alt={article.imageAlt || article.title}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-primary to-transparent md:bg-gradient-to-r md:from-transparent md:to-brand-primary/50"></div>
                                </div>
                                
                                {/* Content Side - Increased Width */}
                                {/* Added pb-24 for mobile to ensure controls don't overlap text */}
                                <div className="w-full md:w-7/12 bg-brand-primary p-6 md:p-12 flex flex-col justify-center border-l border-white/10 relative pb-24 md:pb-12">
                                    <div className="flex items-center gap-2 text-stone-200 text-xs font-heading font-bold uppercase mb-4">
                                        <span className="text-brand-light">{article.category || 'Featured'}</span>
                                        <span>•</span>
                                        <span>{article.author || 'Editorial'}</span>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold leading-tight mb-6 text-white">
                                        {article.title}
                                    </h3>
                                    <p className="text-stone-100 font-body text-base md:text-lg leading-relaxed mb-8">
                                        {article.excerpt}
                                    </p>
                                    <a href={article.link || '#'} className="flex items-center gap-2 text-brand-light font-heading font-bold text-sm uppercase tracking-widest hover:text-white transition-colors self-start group/btn">
                                        Read Story <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Controls - Centered on Mobile */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-6 md:right-auto md:bottom-6 flex items-center gap-4 bg-black/20 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full z-20">
                        <button 
                            onClick={togglePause} 
                            className="text-white/70 hover:text-white transition-colors p-1"
                            aria-label={isPaused ? "Play" : "Pause"}
                        >
                            {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4 fill-current" />}
                        </button>
                        
                        <div className="w-px h-4 bg-white/20"></div>

                        <div className="flex gap-2">
                            {heroArticles.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentSlide(i)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                        currentSlide === i ? 'bg-brand-light w-4' : 'bg-white/30 hover:bg-white/50'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Manual Arrows */}
                    <button 
                        onClick={prevSlide}
                        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all border border-white/10 hidden md:block"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button 
                        onClick={nextSlide}
                        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all border border-white/10 hidden md:block"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
             </div>
        </section>

        {/* TRENDING SECTION - Standardized Layout (White Background) */}
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-8">
                <SectionTitle title="What's Trending?" subtitle="The latest stories making waves across the continent." />
                <div className="hidden md:block mb-12">
                     <Button variant="outline" onClick={() => window.location.href='/trending'}>See All Trending</Button>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
              {trendingArticles.map((article, idx) => (
                <ArticleGridItem 
                    key={idx} 
                    // Hide Date by passing a modified object or just styling.
                    article={{...article, imageSeed: 100 + idx, date: undefined}} 
                />
              ))}
            </div>

            <div className="mt-12 md:hidden text-center">
                 <Button variant="outline" className="w-full" onClick={() => window.location.href='/trending'}>See All Trending</Button>
            </div>
          </div>
        </section>
        
        {/* SPECIAL PROJECT FEATURE (Moved Up) */}
        <SpecialProjectBanner data={SPECIAL_PROJECT} />

        {/* AD SPOT 1 (Top) */}
        {SHOW_ADS && <AdBanner data={AD_SPOTS[0]} />}

        {/* SIGNALS SECTION (Light Yellow) */}
        <Section data={{...signalsPreview, bgColor: 'bg-brand-light'}} />
        
        {/* NEWSLETTER 1 (Primary Green) */}
        <NewsletterBanner bgColor="bg-brand-primary" />

        {/* Articles: Insightful (White) */}
        <Section data={{...(contentSections[0] || CONTENT_SECTIONS[0]), bgColor: 'bg-white'}} />
        
        {/* Articles: Business (Light Yellow) */}
        <Section data={{...(contentSections[1] || CONTENT_SECTIONS[1]), bgColor: 'bg-brand-light'}} />
        
        {/* Articles: Spotlight (White) */}
        <Section data={{...(contentSections[2] || CONTENT_SECTIONS[2]), bgColor: 'bg-white'}} />
        
        {/* AD SPOT 2 (Middle) */}
        {SHOW_ADS && <AdBanner data={AD_SPOTS[1]} />}

        {/* FEATURE: Founder's Corner (Light Yellow) */}
        <Section data={{...founderCorner, bgColor: 'bg-brand-light'}} />

        {/* SUSDATA SECTION (Moved between Founder and Culture) */}
        <SusdataSection data={SUSDATA_SECTION} />
        
        {/* Articles: Cultural (White) */}
        <Section data={{...culturalStories, bgColor: 'bg-white'}} />
        
        {/* Articles: Unexpected (Light Yellow) */}
        <Section data={{...unexpectedImpact, bgColor: 'bg-brand-light'}} />

        {/* FEATURE: Fictional Stories (White) */}
        <div className="text-brand-dark">
             <Section data={{...fictionalStories, bgColor: 'bg-white'}} />
        </div>

        {/* Articles: Impact (Light Yellow) */}
        <Section data={{...impactStories, bgColor: 'bg-brand-light'}} />
        
        {/* FEATURE: Resources (Primary Green) */}
        <section className="py-20 bg-brand-primary text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                     <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">Educational Resources</h2>
                     <div className="h-1 w-16 bg-brand-light mx-auto"></div>
                </div>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="p-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-colors">
                        <div className="w-12 h-12 bg-white text-brand-primary rounded-full flex items-center justify-center mx-auto mb-6">
                            <Book className="w-6 h-6" />
                        </div>
                        <h3 className="font-heading font-bold text-xl mb-3 text-white">Glossary</h3>
                        <p className="text-white/80 mb-6 text-sm font-body leading-relaxed">Clear explanations of essential concepts shaping Africa’s progress.</p>
                        <Button variant="secondary" size="sm">Expand Knowledge</Button>
                    </div>
                    <div className="p-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-colors">
                         <div className="w-12 h-12 bg-white text-brand-primary rounded-full flex items-center justify-center mx-auto mb-6">
                            <CalendarDays className="w-6 h-6" />
                         </div>
                        <h3 className="font-heading font-bold text-xl mb-3 text-white">Independence Dates</h3>
                        <p className="text-white/80 mb-6 text-sm font-body leading-relaxed">Track pivotal moments in African history through a comprehensive timeline.</p>
                        <Button variant="secondary" size="sm">Discover Dates</Button>
                    </div>
                    <div className="p-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-colors">
                        <div className="w-12 h-12 bg-white text-brand-primary rounded-full flex items-center justify-center mx-auto mb-6 font-heading font-bold text-xl"><Globe size={20}/></div>
                        <h3 className="font-heading font-bold text-xl mb-3 text-white">World Days</h3>
                        <p className="text-white/80 mb-6 text-sm font-body leading-relaxed">Connect with global movements and action days that drive positive change.</p>
                        <Button variant="secondary" size="sm">View Calendar</Button>
                    </div>
                </div>
            </div>
        </section>

        {/* LOWER SECTIONS - Alternating Colors */}
        {lowerSections.slice(0, 3).map((section, idx) => (
          <React.Fragment key={section.id}>
             <Section data={{...section, bgColor: idx % 2 === 0 ? 'bg-white' : 'bg-brand-light'}} />
          </React.Fragment>
        ))}
        {/* LOWER SECTION - Policy (Light Yellow) */}
        <Section data={{...lowerSections[3], bgColor: 'bg-brand-light'}} />
        
        {/* LOWER SECTION - UN Affairs (White) */}
        <Section data={{...lowerSections[4], bgColor: 'bg-white'}} />

        {/* FEATURE: Explore Series (Dark Green - Auto Marquee Slider) */}
        <section className="py-20 bg-brand-dark text-white relative overflow-hidden group/series">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">Explore Our Series</h2>
                    <div className="w-16 h-1 bg-brand-primary mx-auto"></div>
                </div>
             </div>
             
             {/* Marquee Scroll Container */}
             <div className="flex overflow-hidden relative w-full">
                <div className="flex gap-6 animate-marquee group-hover/series:paused pl-6">
                    {marqueeSeries.map((series, i) => (
                        <div key={i} className="w-[300px] md:w-[340px] flex-shrink-0 bg-white/5 border border-white/10 p-6 rounded-lg hover:bg-white/10 transition-colors flex flex-col backdrop-blur-sm group cursor-pointer">
                            <div className="h-40 mb-6 overflow-hidden rounded-md bg-stone-900/50">
                               <img 
                                src={series.imageUrl || `https://picsum.photos/seed/${series.imageSeed || i * 200}/600/400`}
                                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500" 
                                alt={series.title} 
                               />
                            </div>
                            <h3 className="font-heading font-bold text-xl mb-3 text-white">{series.title}</h3>
                            <p className="text-stone-300 text-sm mb-6 font-body leading-relaxed flex-1 opacity-90">{series.desc}</p>
                            <a href={series.link || '#'} className="text-brand-light text-sm font-heading font-bold hover:text-white transition-colors mt-auto inline-flex items-center gap-2">
                                Read Series <ChevronRight className="w-4 h-4" />
                            </a>
                        </div>
                    ))}
                </div>
             </div>

             <div className="text-center mt-12 relative z-10">
                  <Button variant="secondary" size="lg" className="hover:bg-brand-primary hover:text-white border-2 border-transparent">View All Series</Button>
             </div>
        </section>

        {/* AD SPOT 3 (Bottom) */}
        {SHOW_ADS && <AdBanner data={AD_SPOTS[2]} />}
        
        {/* NEWSLETTER 2 (New Card Style) */}
        <NewsletterCardSection />
        
        {/* CTA: Share Your Story (Light Yellow) */}
        <PromoBanner 
          title="Got something worth sharing?" 
          text="If your experience reveals something real about life, hope, or resilience in Africa or the diaspora, we want to hear it."
          buttonText="Share Your Story"
          bgClass="bg-brand-light" 
          theme="light" 
        />

      </main>

      {/* FOOTER (Dark Green) */}
      <Footer />
    </div>
  );
};

export default ClassicHome;
