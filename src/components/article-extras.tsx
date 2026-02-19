"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Link as LinkIcon, ArrowRight, Share2, Facebook, Twitter, Linkedin, MessageSquare, Minus, Plus, Search } from "lucide-react";
import { useEffect } from "react";

// --- Original Components Restored Below ---

export function ArticleProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-stone-100 z-50">
      <div
        className="h-full bg-brand-primary transition-all duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export function ArticleShareInline({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4 py-8 border-y border-stone-200 my-8">
      <span className="font-heading text-xs font-bold uppercase tracking-widest text-stone-500">Share this story</span>
      <div className="flex gap-2">
        <button className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center hover:bg-brand-light hover:text-brand-primary transition-colors group">
          <Facebook className="w-4 h-4 text-stone-600 group-hover:text-brand-primary" />
        </button>
        <button className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center hover:bg-brand-light hover:text-brand-primary transition-colors group">
          <Twitter className="w-4 h-4 text-stone-600 group-hover:text-brand-primary" />
        </button>
        <button className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center hover:bg-brand-light hover:text-brand-primary transition-colors group">
          <Linkedin className="w-4 h-4 text-stone-600 group-hover:text-brand-primary" />
        </button>
        <button className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center hover:bg-brand-light hover:text-brand-primary transition-colors group">
          <LinkIcon className="w-4 h-4 text-stone-600 group-hover:text-brand-primary" />
        </button>
      </div>
    </div>
  );
}

export function ArticleShareRail({ title }: { title: string }) {
  return (
    <div className="flex flex-col gap-3 items-center">
      <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Share</span>
      <button className="w-10 h-10 rounded-full border border-stone-200 bg-white flex items-center justify-center hover:bg-brand-light hover:border-brand-primary/30 hover:text-brand-primary transition-colors text-stone-400 group" title="Share on X">
        <i className="ri-twitter-x-fill text-lg group-hover:scale-110 transition-transform"></i>
      </button>
      <button className="w-10 h-10 rounded-full border border-stone-200 bg-white flex items-center justify-center hover:bg-brand-light hover:border-brand-primary/30 hover:text-brand-primary transition-colors text-stone-400 group" title="Share on Facebook">
        <i className="ri-facebook-box-fill text-lg group-hover:scale-110 transition-transform"></i>
      </button>
      <button className="w-10 h-10 rounded-full border border-stone-200 bg-white flex items-center justify-center hover:bg-brand-light hover:border-brand-primary/30 hover:text-brand-primary transition-colors text-stone-400 group" title="Share on Pinterest">
        <i className="ri-pinterest-fill text-lg group-hover:scale-110 transition-transform"></i>
      </button>
      <button className="w-10 h-10 rounded-full border border-stone-200 bg-white flex items-center justify-center hover:bg-brand-light hover:border-brand-primary/30 hover:text-brand-primary transition-colors text-stone-400 group" title="Share on LinkedIn">
        <i className="ri-linkedin-box-fill text-lg group-hover:scale-110 transition-transform"></i>
      </button>
      <div className="h-px w-6 bg-stone-200 mx-auto my-1" />
      <button className="w-10 h-10 rounded-full border border-stone-200 bg-white flex items-center justify-center hover:bg-brand-light hover:border-brand-primary/30 hover:text-brand-primary transition-colors text-stone-400 group" title="Copy Link">
        <i className="ri-link text-lg group-hover:scale-110 transition-transform"></i>
      </button>
    </div>
  );
}

export function ArticleClap() {
  const [claps, setClaps] = useState(0);
  const [isClapping, setIsClapping] = useState(false);

  const handleClap = () => {
    setClaps(c => c + 1);
    setIsClapping(true);
    setTimeout(() => setIsClapping(false), 800);
  };

  return (
    <div className="relative z-10 w-fit">
      <button
        onClick={handleClap}
        className="w-12 h-12 rounded-full bg-stone-50 border border-stone-200 flex flex-col items-center justify-center hover:bg-brand-light hover:border-brand-primary/30 transition-all group"
        aria-label="Clap for this article"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-6 h-6 text-brand-primary group-hover:text-brand-dark fill-current transition-colors">
          <path d="M408 72L408 136C408 149.3 397.3 160 384 160C370.7 160 360 149.3 360 136L360 72C360 58.7 370.7 48 384 48C397.3 48 408 58.7 408 72zM284 74.7L316 122.7C323.4 133.7 320.4 148.6 309.3 156C298.2 163.4 283.4 160.4 276 149.3L244 101.3C236.6 90.3 239.6 75.4 250.7 68C261.8 60.6 276.6 63.7 284 74.7zM199 183C208.4 173.6 223.6 173.6 232.9 183L356.7 306.7C366.8 316.8 384 309.6 384 295.4L384 256C384 238.3 398.3 224 416 224C433.7 224 448 238.3 448 256L448 409.6C448 466.7 418 519.6 369.1 549C305.1 587.4 223.3 577.3 170.6 524.6L71 425C61.6 415.6 61.6 400.4 71 391.1C80.4 381.8 95.6 381.7 104.9 391.1L157.9 444.1C164 450.2 173.9 450.2 180 444.1C186.1 438 186.1 428.1 180 422L87 329C77.6 319.6 77.6 304.4 87 295.1C96.4 285.8 111.6 285.7 120.9 295.1L213.9 388.1C220 394.2 229.9 394.2 236 388.1C242.1 382 242.1 372.1 236 366L119 249C109.6 239.6 109.6 224.4 119 215.1C128.4 205.8 143.6 205.7 152.9 215.1L269.9 332.1C276 338.2 285.9 338.2 292 332.1C298.1 326 298.1 316.1 292 310L199 217C189.6 207.6 189.6 192.4 199 183.1zM497.1 548.9C472.9 563.4 446.2 571 419.4 572C467.5 532.4 496 473 496 409.6L496 311.5C504.2 311.4 512 305.1 512 295.5L512 256.1C512 238.4 526.3 224.1 544 224.1C561.7 224.1 576 238.4 576 256.1L576 409.7C576 466.8 546 519.7 497.1 549.1zM517.3 68C528.3 75.4 531.3 90.3 524 101.3L492 149.3C484.6 160.3 469.7 163.3 458.7 156C447.7 148.7 444.7 133.7 452 122.7L484 74.7C491.4 63.7 506.3 60.7 517.3 68z" />
        </svg>
        {isClapping && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-brand-primary font-bold animate-clap-float pointer-events-none">
            +1
          </div>
        )}
      </button>
      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold text-stone-400 font-body">
        {claps > 0 ? claps : ''}
      </span>
    </div>
  )
}

export function ArticleActionsMobile({ title }: { title: string }) {
  return (
    <div className="lg:hidden flex items-center justify-between py-6 border-t border-stone-200 mt-10">
      <div className="flex flex-col gap-3">
        <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-stone-400">Share</span>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full border border-stone-200 bg-white flex items-center justify-center hover:bg-brand-light hover:border-brand-primary/30 hover:text-brand-primary transition-colors text-stone-400 group" title="Share on X">
            <i className="ri-twitter-x-fill text-lg group-hover:scale-110 transition-transform"></i>
          </button>
          <button className="w-10 h-10 rounded-full border border-stone-200 bg-white flex items-center justify-center hover:bg-brand-light hover:border-brand-primary/30 hover:text-brand-primary transition-colors text-stone-400 group" title="Share on Facebook">
            <i className="ri-facebook-box-fill text-lg group-hover:scale-110 transition-transform"></i>
          </button>
          <button className="w-10 h-10 rounded-full border border-stone-200 bg-white flex items-center justify-center hover:bg-brand-light hover:border-brand-primary/30 hover:text-brand-primary transition-colors text-stone-400 group" title="Share on Pinterest">
            <i className="ri-pinterest-fill text-lg group-hover:scale-110 transition-transform"></i>
          </button>
          <button className="w-10 h-10 rounded-full border border-stone-200 bg-white flex items-center justify-center hover:bg-brand-light hover:border-brand-primary/30 hover:text-brand-primary transition-colors text-stone-400 group" title="Share on LinkedIn">
            <i className="ri-linkedin-box-fill text-lg group-hover:scale-110 transition-transform"></i>
          </button>
          <div className="w-px h-6 bg-stone-200 mx-1 self-center" />
          <button className="w-10 h-10 rounded-full border border-stone-200 bg-white flex items-center justify-center hover:bg-brand-light hover:border-brand-primary/30 hover:text-brand-primary transition-colors text-stone-400 group" title="Copy Link">
            <i className="ri-link text-lg group-hover:scale-110 transition-transform"></i>
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-3">
        <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-stone-400">Clap</span>
        <ArticleClap />
      </div>
    </div>
  );
}

export function ArticleTextSizeControls() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    document.documentElement.style.setProperty('--story-scale', scale.toString());
  }, [scale]);

  const resetScale = () => setScale(1);

  return (
    <div className="flex items-center gap-1 bg-white border border-stone-200 rounded-full p-1 w-fit shadow-sm">
      <button
        onClick={() => setScale(Math.max(0.8, scale - 0.1))}
        className="w-10 h-8 rounded-l-full flex items-center justify-center hover:bg-stone-50 text-stone-500 transition-all disabled:opacity-30"
        disabled={scale <= 0.8}
        aria-label="Decrease font size"
      >
        <span className="text-xs font-body font-bold">A-</span>
      </button>

      <div className="h-4 w-px bg-stone-200"></div>

      <button
        onClick={resetScale}
        className="px-3 h-8 flex items-center justify-center hover:bg-stone-50 text-stone-400 hover:text-brand-primary transition-all"
        aria-label="Reset font size"
      >
        <span className="text-[10px] font-body font-bold uppercase tracking-wider">Reset</span>
      </button>

      <div className="h-4 w-px bg-stone-200"></div>

      <button
        onClick={() => setScale(Math.min(1.5, scale + 0.1))}
        className="w-10 h-8 rounded-r-full flex items-center justify-center hover:bg-stone-50 text-stone-500 transition-all disabled:opacity-30"
        disabled={scale >= 1.5}
        aria-label="Increase font size"
      >
        <span className="text-sm font-body font-bold">A+</span>
      </button>
    </div>
  );
}

export function FeaturedImageWithCaption({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="my-10">
      <div className="rounded-xl overflow-hidden bg-stone-100 relative aspect-video shadow-sm">
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </div>
      {caption && (
        <figcaption className="mt-3 text-left text-xs text-stone-500 font-body border-b border-stone-100 pb-3 inline-block w-full">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

interface Author {
  name: string;
  avatar?: string;
  bio?: string;
}

interface TaxonomyItem {
  name: string;
  slug: string;
}

interface ArticleExtrasProps {
  authors: Author[];
  categories: TaxonomyItem[];
  tags: TaxonomyItem[];
  primaryCategoryName?: string;
  seriesName?: string;
}

export function SeriesCallout({ seriesName }: { seriesName: string }) {
  return (
    <div className="bg-brand-light/40 p-8 md:p-12 rounded-[2rem] my-12 text-center border border-brand-primary/10">
      <h3 className="text-xl md:text-2xl font-heading font-bold text-brand-dark leading-tight mb-4">
        This story is being curated under our <span className="text-brand-primary">"{seriesName}"</span> series.
      </h3>
      <p className="font-body text-stone-600 text-sm mb-8 max-w-xl mx-auto">
        Dive deeper into the intersection of technology, culture, and progress with more stories from this collection.
      </p>
      <a
        href={`/category/${seriesName.toLowerCase().replace(/\s+/g, '-')}`}
        className="inline-flex items-center gap-2.5 px-6 py-3 bg-brand-primary text-white text-sm font-heading font-bold rounded-lg hover:bg-brand-dark transition-all shadow-sm hover:shadow-md active:scale-95"
      >
        Explore Series <ArrowRight className="w-4 h-4 text-white" />
      </a>
    </div>
  );
}

export function TagsSection({ tags, limit = 11 }: { tags: TaxonomyItem[]; limit?: number }) {
  const [showAll, setShowAll] = useState(false);
  const displayTags = showAll ? tags : tags.slice(0, limit);

  if (tags.length === 0) return null;

  return (
    <div className="flex flex-col h-full">
      <p className="font-heading text-[12px] uppercase tracking-widest text-stone-500 mb-4 px-2">Tags</p>
      <div className="flex flex-wrap gap-2 transition-all duration-300">
        {displayTags.map((tag) => (
          <a
            key={tag.slug}
            href={`/tag/${tag.slug}`}
            className="px-4 py-1.5 rounded-full border border-stone-200 bg-stone-50/50 text-xs font-body font-semibold text-black hover:bg-brand-light hover:border-brand-primary/30 hover:text-brand-dark transition-all"
          >
            {tag.name}
          </a>
        ))}
      </div>
      {tags.length > limit && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-stone-400 hover:text-brand-primary text-[10px] font-heading font-bold uppercase tracking-widest flex items-center gap-1 mt-4 self-start px-2"
        >
          {showAll ? (
            <>Show Less <ChevronUp className="w-3 h-3" /></>
          ) : (
            <>Show More <ChevronDown className="w-3 h-3" /></>
          )}
        </button>
      )}
    </div>
  );
}

export function ArticleExtras({ authors, categories, tags, primaryCategoryName, seriesName }: ArticleExtrasProps) {
  const [showAllCategories, setShowAllCategories] = useState(false);

  // Filter out the primary category from the categories list
  const secondaryCategories = categories.filter(cat => cat.name !== primaryCategoryName);
  const CAT_LIMIT = 5;
  const displayCategories = showAllCategories ? secondaryCategories : secondaryCategories.slice(0, CAT_LIMIT);

  return (
    <div className="space-y-12 mt-16">

      {/* Author Bio Section */}
      <div className="border-t border-stone-200 pt-12">
        <p className="font-heading text-xs font-bold uppercase tracking-widest text-stone-400 mb-8 px-2">Written By</p>
        <div className="grid grid-cols-1 gap-8">
          {authors.map((author, i) => (
            <div key={i} className="flex items-start gap-4 md:gap-6 bg-stone-50/50 p-6 rounded-2xl border border-stone-100">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-stone-200 flex-shrink-0 border-2 border-white shadow-sm">
                {author.avatar ? (
                  <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-400">
                    <span className="text-2xl font-bold">{author.name.charAt(0)}</span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-heading font-bold text-lg text-brand-dark mb-2">{author.name}</h4>
                <p className="font-body text-stone-600 text-sm leading-relaxed mb-4 max-w-2xl">
                  {author.bio || "Editorial contributor at Susinsight, focusing on sustainability and progress across the African continent."}
                </p>
                <div className="flex gap-4">
                  <a href={`/author/${author.name.toLowerCase().replace(/\s+/g, '-')}`} className="text-brand-primary text-xs font-heading font-bold hover:underline inline-flex items-center gap-1">
                    View Profile
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-stone-200 pt-12 h-full">
        {/* Secondary Categories */}
        {secondaryCategories.length > 0 && (
          <div className="flex flex-col h-full">
            <p className="font-heading text-xs font-bold uppercase tracking-widest text-stone-400 mb-6 px-2">In Categories</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {displayCategories.map((cat) => (
                <a
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="px-4 py-1.5 rounded-full border border-stone-200 text-xs font-heading font-bold text-stone-600 hover:bg-brand-light hover:border-brand-primary/30 transition-all flex items-center gap-1.5"
                >
                  {cat.name}
                </a>
              ))}
            </div>
            {secondaryCategories.length > CAT_LIMIT && (
              <button
                onClick={() => setShowAllCategories(!showAllCategories)}
                className="text-stone-400 hover:text-brand-primary text-[10px] font-heading font-bold uppercase tracking-widest flex items-center gap-1 mt-auto self-start px-2 py-2"
              >
                {showAllCategories ? (
                  <>Show Less <ChevronUp className="w-3 h-3" /></>
                ) : (
                  <>Show {secondaryCategories.length - CAT_LIMIT} More <ChevronDown className="w-3 h-3" /></>
                )}
              </button>
            )}
          </div>
        )}

        {/* Tags */}
        <TagsSection tags={tags} />
      </div>
    </div>
  );
}
