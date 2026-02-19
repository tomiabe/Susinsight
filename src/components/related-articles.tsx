"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { ArticleGridItem } from "@/ai/components/ArticleComponents";
import type { Article } from "@/ai/types";

export function RelatedArticles({ category, articles }: { category: string; articles: Article[] }) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    // Create a duplicated list for seamless-feeling looping
    const displayArticles = [...articles, ...articles, ...articles];

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isAutoPlaying && !isHovered) {
            interval = setInterval(() => {
                if (scrollContainerRef.current) {
                    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;

                    // Dynamically calculate width based on responsive classes (280px mobile / 320px desktop)
                    const isMobile = window.innerWidth < 768;
                    const itemWidth = (isMobile ? 280 : 320) + 24; // Width + 1.5rem gap

                    // Seamless loop check: reset to the middle set if we reach the end
                    if (scrollLeft + clientWidth >= scrollWidth - 50) {
                        scrollContainerRef.current.scrollTo({
                            left: itemWidth * articles.length,
                            behavior: "auto"
                        });
                    } else {
                        scrollContainerRef.current.scrollBy({
                            left: itemWidth,
                            behavior: "smooth"
                        });
                    }
                }
            }, 3800);
        }

        return () => clearInterval(interval);
    }, [isAutoPlaying, isHovered, articles.length]);

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = 344;
            scrollContainerRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth"
            });
            // Auto-pause when user takes control
            setIsAutoPlaying(false);
        }
    };

    if (!articles.length) return null;

    return (
        <div
            className="py-12 border-t border-stone-100 mt-16 w-full group/section"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
                <h2 className="text-xl md:text-2xl font-heading font-bold text-brand-dark uppercase tracking-tight">
                    More {category}
                </h2>
                <div className="flex gap-3 items-center self-start sm:self-auto">
                    <button
                        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                        className={`p-2.5 rounded-full border transition-all shadow-sm active:scale-95 ${isAutoPlaying
                            ? "border-brand-primary/20 bg-brand-light/40 text-brand-primary"
                            : "border-stone-200 bg-white text-stone-400 hover:text-brand-primary hover:border-brand-primary"
                            }`}
                        aria-label={isAutoPlaying ? "Pause auto-scroll" : "Play auto-scroll"}
                    >
                        {isAutoPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                    </button>

                    <div className="w-px h-6 bg-stone-100 mx-1" />

                    <div className="flex gap-2">
                        <button
                            onClick={() => scroll("left")}
                            className="p-2.5 rounded-full border border-stone-200 bg-white hover:border-brand-primary text-brand-dark hover:text-brand-primary transition-all shadow-sm active:scale-95"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="p-2.5 rounded-full border border-stone-200 bg-white hover:border-brand-primary text-brand-dark hover:text-brand-primary transition-all shadow-sm active:scale-95"
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            <div
                ref={scrollContainerRef}
                onTouchStart={() => setIsAutoPlaying(false)}
                className="flex gap-6 overflow-x-auto hide-scrollbar pb-6 snap-x snap-mandatory w-full"
            >
                {displayArticles.map((article, i) => (
                    <div key={`${article.title}-${i}`} className="w-[280px] md:w-[320px] flex-shrink-0 snap-start">
                        <ArticleGridItem article={article} showCategoryBadge={false} />
                    </div>
                ))}
            </div>
        </div>
    );
}
