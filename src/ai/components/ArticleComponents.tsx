import React from 'react';
import { ArrowRight, BarChart3 } from 'lucide-react';
import { Article, SectionData } from '../types';
import { Card, Badge, SectionTitle, ReadMoreLink, Button } from './ui';

export const ArticleGridItem: React.FC<{
  article: Article;
  showImage?: boolean;
  showCategoryBadge?: boolean;
}> = ({ article, showImage = true, showCategoryBadge = true }) => {
  const seed = article.imageSeed || Math.floor(Math.random() * 1000);
  const imageSrc = article.imageUrl || `https://picsum.photos/seed/${seed}/800/600`;
  const imageAlt = article.imageAlt || article.title;

  return (
    <div className="flex flex-col h-full group">
      <div className="mb-4 overflow-hidden rounded-md aspect-video bg-stone-200 relative">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
        />
        {showCategoryBadge && article.category && (
          <div className="absolute top-2 left-2">
            <span className="bg-white/90 backdrop-blur-sm text-brand-primary text-xs font-heading font-bold px-2 py-1 rounded">
              {article.category}
            </span>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col">
        <h3 className="text-xl font-heading font-bold text-brand-dark mb-2 group-hover:text-brand-primary transition-colors leading-tight">
          <a href={article.link || '#'}>{article.title}</a>
        </h3>

        {article.author && (
          <p className="text-xs font-bold text-stone-500 mb-3 uppercase tracking-wider font-heading">
            by {article.author} {article.date && `• ${article.date}`}
          </p>
        )}

        <p className="text-stone-600 mb-4 leading-relaxed text-sm flex-1 font-body">
          {article.excerpt}
        </p>

        <ReadMoreLink href={article.link || '#'} />
      </div>
    </div>
  );
};

export const Section: React.FC<{ data: SectionData }> = ({ data }) => {
  const bgColor = data.bgColor || 'bg-white';
  const isDark = bgColor.includes('brand-dark') || bgColor.includes('emerald-900');

  return (
    <section className={`${bgColor} py-16 md:py-24`} id={data.id}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8">
          <SectionTitle title={data.title} subtitle={data.subtitle} light={isDark} />
          {data.ctaText && (
            <div className="hidden md:block mb-12">
              <Button variant={isDark ? "secondary" : "outline"}>{data.ctaText}</Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
          {data.articles.map((article, idx) => (
            <ArticleGridItem
              key={idx}
              article={{ ...article, imageSeed: idx + data.id.length * 10 }} // Deterministic seed
            />
          ))}
        </div>

        {data.ctaText && (
          <div className="mt-12 md:hidden text-center">
            <Button variant={isDark ? "secondary" : "outline"} className="w-full">{data.ctaText}</Button>
          </div>
        )}
      </div>
    </section>
  );
};

export const SusdataSection: React.FC<{ data: any }> = ({ data }) => {
  return (
    <section className="bg-stone-900 py-20 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-6 h-6 text-brand-light" />
            <h2 className="text-xs font-heading font-bold uppercase tracking-widest text-brand-light">Susdata</h2>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">{data.title}</h2>
          <p className="text-stone-300 text-lg md:text-xl font-body max-w-3xl">{data.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Visualization Side */}
          <div className="lg:col-span-7">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-10 h-full flex flex-col items-center justify-center text-center group hover:bg-white/10 transition-colors cursor-pointer">
              <div className="aspect-[16/9] w-full relative mb-6 rounded-lg overflow-hidden">
                <img
                  src={`https://picsum.photos/seed/${data.visualizationImageSeed}/800/450`}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  alt="Data Visualization"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-black/70 text-white px-4 py-2 text-sm font-bold rounded backdrop-blur-md">Explore Interactive Chart</span>
                </div>
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-2">Visualizing the Climate Gap</h3>
              <p className="text-stone-400 text-sm">Interactive dataset tracking carbon emissions versus financing received across 54 nations.</p>
            </div>
          </div>

          {/* Articles Side */}
          <div className="lg:col-span-5 flex flex-col gap-8 justify-center">
            {data.articles.map((article: any, i: number) => (
              <div key={i} className="group cursor-pointer border-b border-white/10 pb-8 last:border-0 last:pb-0">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-primary mb-2 block">{article.category}</span>
                <h3 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-brand-light transition-colors">{article.title}</h3>
                <p className="text-stone-400 text-sm leading-relaxed">{article.excerpt}</p>
              </div>
            ))}
            <div className="mt-4">
              <Button variant="secondary" size="md">View All Data Stories</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
