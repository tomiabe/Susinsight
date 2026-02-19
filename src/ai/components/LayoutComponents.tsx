"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Search, ChevronRight, Mail, ArrowUpRight, Globe, Check 
} from 'lucide-react';
import { Button } from './ui';
import { FOOTER_LINKS, NAV_STRUCTURE } from '../constants';
import type { FooterColumn, NavItem } from '../types';

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
  { code: 'sw', label: 'Kiswahili', flag: '🇰🇪' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'zh-CN', label: '中文 (Chinese)', flag: '🇨🇳' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'ja', label: '日本語 (Japanese)', flag: '🇮🇯' },
  { code: 'hi', label: 'हिन्दी (Hindi)', flag: '🇮🇳' },
  { code: 'yo', label: 'Yorùbá', flag: '🇳🇬' },
  { code: 'ha', label: 'Hausa', flag: '🇳🇬' },
  { code: 'zu', label: 'isiZulu', flag: '🇿🇦' },
  { code: 'am', label: 'Amharic', flag: '🇪🇹' },
];

// Remix Icon Class Map for consistent brand logos
const SOCIAL_LINKS = [
  { platform: 'Twitter', iconClass: 'ri-twitter-x-fill', href: '#' },
  { platform: 'LinkedIn', iconClass: 'ri-linkedin-box-fill', href: '#' },
  { platform: 'Instagram', iconClass: 'ri-instagram-line', href: '#' },
  { platform: 'Facebook', iconClass: 'ri-facebook-box-fill', href: '#' },
  { platform: 'YouTube', iconClass: 'ri-youtube-fill', href: '#' },
  { platform: 'Spotify', iconClass: 'ri-spotify-fill', href: '#' },
  { platform: 'Threads', iconClass: 'ri-threads-fill', href: '#' },
  { platform: 'Pinterest', iconClass: 'ri-pinterest-fill', href: '#' },
  { platform: 'Flipboard', iconClass: 'ri-flipboard-fill', href: '#' },
];

export const AnnouncementBar: React.FC<{ 
    message: string; 
    linkText?: string; 
    linkHref?: string; 
    onClose?: () => void;
}> = ({ message, linkText, linkHref, onClose }) => {
    return (
        <div className="bg-brand-light text-brand-dark border-b border-brand-primary/20 text-xs md:text-sm font-heading font-bold py-3 px-4 relative z-[60]">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center text-center gap-1 md:gap-2 pr-8 md:pr-0">
                <span>{message}</span>
                {linkText && (
                    <a href={linkHref || '#'} className="underline underline-offset-2 hover:text-brand-primary transition-colors">
                        {linkText}
                    </a>
                )}
            </div>
            {onClose && (
                <button onClick={onClose} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-black/5 rounded-full transition-colors">
                    <X className="w-4 h-4" />
                </button>
            )}
        </div>
    );
};

type HeaderProps = {
  navItems?: NavItem[];
};

export const Header: React.FC<HeaderProps> = ({ navItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(LANGUAGES[0]);
  const [langSearch, setLangSearch] = useState('');
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
    };
    const cookie = getCookie('googtrans');
    if (cookie) {
        const langCode = cookie.split('/').pop();
        const found = LANGUAGES.find(l => l.code === langCode);
        if (found) setCurrentLang(found);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const resolvedNavItems = navItems && navItems.length ? navItems : NAV_STRUCTURE;
  const menuGridItems = resolvedNavItems.filter(item => item.label !== 'Account' && item.label !== "What's Trending");

  const handleLangSelect = (lang: typeof LANGUAGES[0]) => {
    const value = `/en/${lang.code}`;
    document.cookie = `googtrans=${value}; path=/;`;
    document.cookie = `googtrans=${value}; path=/; domain=${window.location.hostname}`;
    setCurrentLang(lang);
    setIsLangOpen(false);
    setLangSearch('');
    window.location.reload();
  };

  const filteredLanguages = LANGUAGES.filter(lang => 
    lang.label.toLowerCase().includes(langSearch.toLowerCase())
  );

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-stone-200 shadow-sm h-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            
            <div className="flex items-center gap-4 w-1/3">
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="flex items-center gap-2 text-brand-dark hover:text-brand-primary transition-colors group"
              >
                <Menu className="w-6 h-6" />
                <span className="hidden md:inline font-heading font-bold text-sm tracking-widest uppercase group-hover:underline decoration-brand-primary underline-offset-4">Menu</span>
              </button>
            </div>

            <div className="flex-shrink-0 flex items-center justify-center w-1/3">
              <a href="#" className="flex items-center gap-2 group">
                <span className="font-heading font-bold text-2xl text-brand-dark tracking-tighter">Susinsight</span>
              </a>
            </div>

            <div className="flex items-center justify-end gap-4 md:gap-6 w-1/3">
              <div className="relative" ref={langRef}>
                <button 
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-2 text-stone-500 hover:text-brand-primary transition-colors p-1"
                  aria-label="Select Language"
                >
                    <Globe className="w-5 h-5" />
                    <span className="hidden md:inline font-heading font-bold text-xs uppercase tracking-widest">{currentLang.code}</span>
                </button>
                {isLangOpen && (
                    <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-stone-100 py-2 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                        <div className="px-3 pb-2 border-b border-stone-100">
                             <input 
                                type="text" 
                                placeholder="Search language..." 
                                value={langSearch}
                                onChange={(e) => setLangSearch(e.target.value)}
                                className="w-full text-sm p-2 bg-stone-50 rounded border border-stone-200 focus:outline-none focus:border-brand-primary"
                                autoFocus
                             />
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                            {filteredLanguages.length > 0 ? (
                                filteredLanguages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => handleLangSelect(lang)}
                                        className="w-full text-left px-4 py-2 hover:bg-stone-50 flex items-center justify-between group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-lg">{lang.flag}</span>
                                            <span className={`text-sm font-heading ${currentLang.code === lang.code ? 'font-bold text-brand-dark' : 'text-stone-600 group-hover:text-brand-dark'}`}>
                                                {lang.label}
                                            </span>
                                        </div>
                                        {currentLang.code === lang.code && <Check className="w-4 h-4 text-brand-primary" />}
                                    </button>
                                ))
                            ) : (
                                <div className="px-4 py-3 text-sm text-stone-400 text-center">No languages found</div>
                            )}
                        </div>
                    </div>
                )}
              </div>
              <div className="h-6 w-px bg-stone-200 hidden md:block"></div>
              <a href="/search" className="flex items-center gap-2 text-stone-500 hover:text-brand-primary transition-colors">
                 <span className="hidden md:inline font-heading font-bold text-xs uppercase tracking-widest">Search</span>
                 <Search className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <div 
        className={`fixed inset-0 bg-stone-900/50 z-[60] transition-opacity duration-300 backdrop-blur-sm ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div 
          className={`absolute top-0 left-0 w-full md:w-[600px] lg:w-[800px] h-full bg-white shadow-2xl overflow-y-auto transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
          onClick={e => e.stopPropagation()}
        >
            <div className="sticky top-0 bg-white z-10 px-8 py-6 border-b border-stone-100 flex justify-between items-center">
                <span className="font-heading font-bold text-xl text-brand-dark">Sections</span>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-stone-100 rounded-full hover:bg-stone-200 transition-colors text-stone-600">
                    <X className="w-6 h-6" />
                </button>
            </div>

            <div className="p-8 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    {menuGridItems.map((section) => (
                        <div key={section.label}>
                            <h3 className="font-heading font-bold text-xl text-brand-primary mb-4 border-b border-stone-100 pb-2 flex items-center gap-2">
                                {section.label}
                                <ChevronRight className="w-4 h-4 text-stone-300" />
                            </h3>
                            {section.children ? (
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                                    {section.children.map(child => (
                                        <li key={child.label}>
                                            <a href={child.href} className="text-stone-500 hover:text-brand-primary hover:underline decoration-brand-primary underline-offset-4 text-sm block py-1 font-body transition-colors">
                                                {child.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <a href={section.href} className="text-stone-500 hover:text-brand-primary font-medium font-body transition-colors">
                                    Go to {section.label}
                                </a>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-16 pt-8 border-t border-stone-100 font-body">
                     <h4 className="font-heading font-bold text-stone-900 mb-6 uppercase tracking-widest text-sm">Follow Us</h4>
                     <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                        {SOCIAL_LINKS.map((social) => (
                            <a 
                              key={social.platform} 
                              href={social.href} 
                              className="text-stone-400 hover:text-brand-primary transition-all duration-300 flex justify-center p-2 rounded-full hover:bg-brand-light group"
                              title={social.platform}
                            >
                                <i className={`${social.iconClass} text-xl transition-transform group-hover:scale-110`}></i>
                            </a>
                        ))}
                     </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

type FooterProps = {
  footerLinks?: FooterColumn[];
};

export const Footer: React.FC<FooterProps> = ({ footerLinks }) => {
  const resolvedFooterLinks = footerLinks && footerLinks.length ? footerLinks : FOOTER_LINKS;

  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8 font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-1">
             <a href="#" className="flex items-center gap-2 mb-2">
              <span className="font-heading font-bold text-2xl text-white tracking-tight">Susinsight</span>
            </a>
            <p className="text-stone-300 text-sm mb-8 leading-relaxed">Advancing Sustainability in Africa.</p>
            
            {/* Footer Specific Icons: Brand Light base color */}
            <div className="flex flex-wrap gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a 
                  key={social.platform} 
                  href={social.href} 
                  className="text-brand-light/80 hover:text-white transition-all duration-300 p-1 group"
                  title={social.platform}
                >
                    <i className={`${social.iconClass} text-lg transition-transform group-hover:scale-125 block`}></i>
                </a>
              ))}
            </div>
          </div>

          {resolvedFooterLinks.map((col) => (
            <div key={col.title}>
              <h4 className="font-heading font-bold text-lg mb-4 text-brand-light">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-stone-300 hover:text-white text-sm transition-colors block">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-brand-primary/30 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center text-sm text-stone-300">
          <p className="mb-4 md:mb-0">© 2025 Susinsight. All rights reserved. Powered by Susbridge.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const NewsletterBanner: React.FC<{ bgColor?: string }> = ({ bgColor = 'bg-brand-primary' }) => {
  return (
    <div className={`${bgColor} py-24 text-center`}>
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex justify-center mb-4">
            <Mail className="w-8 h-8 text-white/80" />
        </div>
        <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
            Never miss an update.
        </h3>
        <p className="text-white/90 font-body text-lg md:text-xl mb-10 leading-relaxed">
            Subscribe to our newsletter for weekly intelligence on major African policy shifts and innovation.
        </p>
        <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <div className="flex-1 relative">
                <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="w-full h-14 pl-6 pr-4 rounded-md border-2 border-transparent focus:border-white/50 bg-white text-brand-dark placeholder:text-stone-400 focus:outline-none shadow-sm text-base"
                />
            </div>
            <button 
                type="submit" 
                className="h-14 px-8 rounded-md bg-brand-dark text-white font-heading font-bold text-sm hover:bg-white hover:text-brand-dark hover:border-brand-dark border-2 border-transparent transition-colors shadow-sm whitespace-nowrap"
            >
                Subscribe
            </button>
        </form>
        <p className="text-white/60 text-xs mt-6">
            We care about your data in our <a href="#" className="underline hover:text-white">privacy policy</a>.
        </p>
      </div>
    </div>
  );
};

export const NewsletterCardSection: React.FC = () => {
  return (
    <div className="bg-white py-24 px-4 text-center border-t border-stone-100">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-center mb-4">
            <Mail className="w-8 h-8 text-brand-primary" />
        </div>
        <h3 className="text-3xl md:text-4xl font-heading font-bold text-brand-primary mb-6">
           Never miss an update.
        </h3>
        <p className="text-brand-dark font-body text-lg md:text-xl mb-10 leading-relaxed">
           Subscribe to our newsletter for weekly intelligence on major African policy shifts and innovation.
        </p>
        <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
             <div className="flex-1 relative">
                <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full h-14 pl-6 pr-4 rounded-md border-2 border-stone-200 bg-white text-brand-dark placeholder:text-stone-400 focus:border-brand-primary focus:outline-none transition-all shadow-sm text-base"
                />
             </div>
             <button type="submit" className="h-14 px-8 bg-brand-primary text-white font-heading font-bold rounded-md hover:bg-brand-dark transition-colors whitespace-nowrap shadow-md hover:shadow-lg text-sm">
                Subscribe
             </button>
        </form>
        <p className="text-stone-400 text-xs mt-6 font-body">
            We care about your data in our <a href="#" className="underline hover:text-brand-primary">privacy policy</a>.
        </p>
      </div>
    </div>
  );
};

export const PromoBanner: React.FC<{ 
  title: string; 
  text: string; 
  buttonText: string; 
  bgClass?: string; 
  theme?: 'dark' | 'light' 
}> = ({ title, text, buttonText, bgClass = "bg-brand-primary", theme = 'dark' }) => {
  const textColor = theme === 'dark' ? 'text-white' : 'text-brand-dark';
  const subTextColor = theme === 'dark' ? 'text-white/90' : 'text-stone-700';
  const btnVariant = theme === 'dark' ? 'secondary' : 'primary';
  return (
    <div className={`${bgClass} py-24 text-center`}>
      <div className="max-w-3xl mx-auto px-4">
        <h2 className={`text-3xl md:text-4xl font-heading font-bold mb-6 ${textColor}`}>{title}</h2>
        <p className={`text-lg md:text-xl mb-10 font-body leading-relaxed ${subTextColor}`}>{text}</p>
        <Button 
          variant={btnVariant} 
          size="lg"
          className="rounded-md px-8 h-14 text-base"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export const AdBanner: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="bg-stone-50 border-y border-stone-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
           <div className="flex-1 text-center md:text-left">
              <span className="text-xs font-heading font-bold uppercase tracking-widest text-stone-400 mb-2 block">{data.sponsor}</span>
              <h3 className="text-2xl font-serif font-bold text-brand-dark mb-2">{data.title}</h3>
              <p className="text-stone-600 mb-4 font-body">{data.subtitle}</p>
              <Button variant="outline" size="sm" className="bg-transparent hover:bg-brand-primary hover:text-white">{data.cta}</Button>
           </div>
           <div className="w-full md:w-1/3 aspect-[21/9] md:aspect-video rounded-lg overflow-hidden relative shadow-sm">
              <img src={`https://picsum.photos/seed/${data.imageSeed}/600/300`} className="w-full h-full object-cover" alt="Advertisement" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
           </div>
        </div>
      </div>
    </div>
  );
};

export const SpecialProjectBanner: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="relative py-16 overflow-hidden">
       <div className="absolute inset-0 z-0">
          <img src={`https://picsum.photos/seed/${data.imageSeed}/1600/600`} className="w-full h-full object-cover" alt="Special Project" />
       </div>
       <div className="absolute inset-0 z-10 bg-brand-primary/90 mix-blend-multiply"></div>
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left">
                 <div className="inline-block px-3 py-1 bg-white text-brand-primary font-heading font-bold text-xs uppercase tracking-widest rounded-sm mb-4">
                    Special Project
                 </div>
                 <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4 leading-tight">
                    {data.title}
                 </h2>
                 <p className="text-lg text-white/90 max-w-2xl font-body leading-relaxed">
                    {data.subtitle}
                 </p>
            </div>
            <div className="flex-shrink-0">
                <Button variant="secondary" size="lg" className="shadow-lg whitespace-nowrap">{data.cta}</Button>
            </div>
          </div>
       </div>
    </div>
  );
};

export const SocialGrid: React.FC<{ feed: any[] }> = ({ feed }) => {
  const instagramPosts = feed.filter(item => item.platform === 'instagram');
  const otherPlatforms = feed.filter(item => item.platform !== 'instagram');
  return (
    <div className="py-20 bg-stone-50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
            <div className="flex-1">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-heading font-bold text-brand-dark flex items-center gap-2">
                        <i className="ri-instagram-line"></i> @susinsight
                    </h2>
                    <a href="https://instagram.com/susinsight" className="text-sm font-bold text-brand-primary hover:underline">Follow Us</a>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {instagramPosts.map((item, i) => (
                    <a key={i} href={item.link} className="block group relative aspect-square overflow-hidden rounded-lg shadow-sm">
                        <img 
                            src={`https://picsum.photos/seed/${item.seed}/400/400`} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                            alt="Instagram Post" 
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                    </a>
                    ))}
                </div>
            </div>
            <div className="flex-1 md:max-w-md flex flex-col justify-center">
                 <h2 className="text-2xl font-heading font-bold text-brand-dark mb-2">Connect with us</h2>
                 <p className="text-stone-600 mb-8 font-body">Find us on your favorite platforms for daily inspiration and updates.</p>
                 <div className="space-y-4">
                     {otherPlatforms.map((item, i) => {
                         const social = SOCIAL_LINKS.find(s => s.platform.toLowerCase() === item.platform.toLowerCase());
                         const iconClass = social?.iconClass || 'ri-global-line';
                         return (
                             <a key={i} href={item.link} className="flex items-center gap-4 p-4 bg-white rounded-lg border border-stone-200 hover:border-brand-primary hover:shadow-md transition-all group">
                                 <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                                     <i className={`${iconClass} text-xl`}></i>
                                 </div>
                                 <div>
                                     <span className="block font-heading font-bold text-brand-dark capitalize">{item.platform}</span>
                                     <span className="text-xs text-stone-500">Follow for visual stories</span>
                                 </div>
                                 <ArrowUpRight className="w-4 h-4 ml-auto text-stone-400 group-hover:text-brand-primary transition-colors" />
                             </a>
                         );
                     })}
                     <a href="#" className="flex items-center gap-4 p-4 bg-white rounded-lg border border-stone-200 hover:border-brand-primary hover:shadow-md transition-all group">
                         <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                            <i className="ri-linkedin-box-fill text-xl"></i>
                         </div>
                         <div>
                             <span className="block font-heading font-bold text-brand-dark">LinkedIn</span>
                             <span className="text-xs text-stone-500">Professional insights</span>
                         </div>
                         <ArrowUpRight className="w-4 h-4 ml-auto text-stone-400 group-hover:text-brand-primary transition-colors" />
                     </a>
                 </div>
            </div>
         </div>
      </div>
    </div>
  );
};
