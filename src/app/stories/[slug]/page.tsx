import React from "react";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { Mail } from "lucide-react";
import { getLiveHomeData, getNavigationData, getStoryBySlug, getPostsByCategory } from "@/ai/live-data";
import { exampleArticle } from "@/ai/article-example";
import { getFallbackImageSrc } from "@/ai/image-fallback";
import { Footer, Header } from "@/ai/components/LayoutComponents";
import { RelatedArticles } from "@/components/related-articles";
import { ArticlePagination } from "@/components/article-pagination";
import { ArticleExtras } from "@/components/article-extras";
import { AD_SPOTS } from "@/ai/constants";
import type { LiveHomeData } from "@/ai/live-types";
import type { FooterColumn, NavItem } from "@/ai/types";
import {
  ArticleProgressBar,
  ArticleShareRail,
  ArticleClap,
  ArticleActionsMobile,
  SeriesCallout,
  ArticleTextSizeControls,
  ArticleAudioPlayer,
  FeaturedImageWithCaption
} from "@/components/article-extras";

type PageProps = {
  params: {
    slug: string;
  };
};

function stripHtml(html: string | null | undefined): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

function InlineNewsletter() {
  return (
    <aside className="my-16 border border-brand-primary/15 bg-brand-light/50 p-8 md:p-10 rounded-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -mr-16 -mt-16" />
      <div className="relative z-10">
        <div className="flex items-center gap-2.5 mb-8 justify-center md:justify-start">
          <Mail className="w-4 h-4 text-brand-primary" aria-hidden="true" />
          <p className="font-heading text-[10px] font-bold uppercase tracking-widest text-brand-primary m-0 leading-none">
            Newsletter
          </p>
        </div>
        <h3 className="font-heading font-bold text-2xl text-brand-dark mb-4 leading-tight text-center md:text-left">Get Susinsight in your inbox</h3>
        <p className="font-body text-stone-600 mb-8 leading-relaxed text-sm text-center md:text-left">
          Weekly context on policy, infrastructure, markets, and the people building new systems in Africa.
        </p>
        <form className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="you@example.com"
            className="flex-1 border border-stone-200 bg-white px-4 py-3 rounded-lg focus:outline-none focus:border-brand-primary transition-colors text-sm shadow-inner"
          />
          <button type="submit" className="px-6 py-3 bg-brand-primary text-white font-heading font-bold rounded-lg hover:bg-brand-dark transition-all shadow-sm">
            Subscribe
          </button>
        </form>
      </div>
    </aside>
  );
}

function SidebarWidgets({ liveData }: { liveData?: LiveHomeData }) {
  const heroFeature = liveData?.heroFeature;
  const contentSections = liveData?.contentSections;

  const latestPosts = [
    heroFeature,
    ...(contentSections?.[0]?.articles?.slice(0, 2) || [])
  ].filter(Boolean);

  const widgets = [
    {
      title: "BE IN THE SPOTLIGHT!",
      desc: "Showcase your SDG-driven innovations and inspire others to build a better future.",
      btnText: "Enter Spotlight",
      image: "https://picsum.photos/seed/spotlight/400/250"
    },
    {
      title: "AMPLIFY YOUR IMPACT!",
      desc: "Share your CSR success stories and spark a ripple effect of responsible business.",
      btnText: "Amplify Impact",
      image: "https://picsum.photos/seed/impact/400/250"
    },
    {
      title: "EXPLORE SUSDATA",
      desc: "Dive into key sustainability metrics shaping Africa’s economic, social, and environmental future.",
      btnText: "Visit Sustdata",
      image: "https://picsum.photos/seed/susdata/400/250"
    },
    {
      title: "EXPLORE OUR GLOSSARY",
      desc: "Your go-to guide for unpacking the terms powering Africa’s development journey.",
      btnText: "Expand Knowledge",
      image: "https://picsum.photos/seed/glossary/400/250"
    },
    {
      title: "AFRICAN INDEPENDENCE DATES",
      desc: "Track the milestones of freedom that shaped the path to Africa’s sustainable self-determination.",
      btnText: "Discover Dates",
      image: "https://picsum.photos/seed/dates/400/250"
    }
  ];

  const ad = AD_SPOTS[0];

  return (
    <aside className="space-y-10 sticky top-28 pt-1">
      {/* Latest Widget */}
      <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
        <h3 className="font-heading font-bold text-[11px] uppercase tracking-[0.15em] text-stone-400 mb-6 flex items-center gap-3">
          READ THE LATEST
          <div className="h-px flex-1 bg-stone-100" />
        </h3>
        <div className="space-y-4">
          {latestPosts.map((post, i) => (
            <a key={i} href={post?.link || `/stories/${post?.slug}`} className="group block border-b border-stone-50 last:border-0 pb-4 last:pb-0">
              <p className="text-[10px] font-heading font-bold uppercase tracking-widest text-brand-primary mb-1.5 transition-opacity group-hover:opacity-80">
                {post?.category || "Insight"}
              </p>
              <h4 className="font-body font-bold text-[15.5px] leading-[1.3] group-hover:text-brand-primary transition-colors text-brand-dark">
                {post?.title}
              </h4>
            </a>
          ))}
        </div>
      </div>

      {/* Ad Widget */}
      <div className="p-1 rounded-2xl border border-stone-100 bg-stone-50 overflow-hidden shadow-sm">
        <div className="bg-white p-5 rounded-xl border border-stone-100 text-center">
          <p className="text-[10px] font-heading font-bold uppercase tracking-widest text-stone-400 mb-3">{ad.sponsor}</p>
          <img
            src={`https://picsum.photos/seed/${ad.imageSeed}/400/200`}
            alt={ad.title}
            className="w-full h-32 object-cover rounded-lg mb-4"
          />
          <h4 className="font-heading font-bold text-lg text-brand-dark mb-2">{ad.title}</h4>
          <p className="font-body text-xs text-stone-500 mb-4 px-2">{ad.subtitle}</p>
          <button className="w-full py-2.5 bg-brand-primary text-white font-heading font-bold rounded-lg text-xs uppercase tracking-widest hover:bg-brand-dark transition-colors">
            {ad.cta}
          </button>
        </div>
      </div>

      {/* Action Cards */}
      <div className="space-y-8">
        {widgets.map((widget, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm transition-transform hover:-translate-y-1 duration-300">
            <h4 className="font-heading font-bold text-[13px] uppercase tracking-wider text-brand-dark mb-4">{widget.title}</h4>
            <div className="aspect-[16/10] bg-stone-100 rounded-xl overflow-hidden mb-4 border border-stone-50">
              <img src={widget.image} alt={widget.title} className="w-full h-full object-cover" />
            </div>
            <p className="font-body text-sm text-stone-600 mb-6 leading-relaxed">
              {widget.desc}
            </p>
            <button className="w-full py-3 bg-brand-primary text-white font-heading font-bold rounded-lg text-xs uppercase tracking-widest hover:bg-brand-dark transition-all shadow-md active:translate-y-px">
              {widget.btnText}
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  if (params.slug === exampleArticle.slug) {
    return {
      title: `${exampleArticle.title} | Susinsight`,
      description: exampleArticle.excerpt
    };
  }

  const draft = await draftMode();
  const post = await getStoryBySlug(params.slug, { preview: draft.isEnabled });
  if (!post) return { title: "Story Not Found | Susinsight" };

  return {
    title: `${stripHtml(post.title)} | Susinsight`,
    description: stripHtml(post.excerpt)
  };
}

async function ExampleArticlePage({
  liveData,
  navItems,
  footerLinks
}: {
  liveData: LiveHomeData;
  navItems: NavItem[];
  footerLinks: FooterColumn[];
}) {
  const category = exampleArticle.category;
  let articles = await getPostsByCategory(category, 10);

  // Mock data for demo if live data is unavailable
  if (!articles.length) {
    articles = [
      {
        title: "Venture Debt in Africa: A New Frontier for Scaling Startups?",
        excerpt: "Equity isn't the only answer. We explore how debt financing is allowing green founders to scale without diluting their mission-driven ownership.",
        author: "Favour Olumuyiwa",
        category: "Investor Insights",
        date: "Feb 15, 2026",
        link: "#",
        imageUrl: "https://picsum.photos/seed/debt/800/600"
      },
      {
        title: "The Climate Case for Bamboo Is Clear. So Why Isn’t the Money Moving?",
        excerpt: "Bamboo is cheap, fast-growing, and carbon-rich. Cameroon has active pilot projects, but unlocking scale will take more than potential.",
        author: "Adetoro Adetayo",
        category: "Investor Insights",
        date: "Feb 12, 2026",
        link: "#",
        imageUrl: "https://picsum.photos/seed/bamboo/800/600"
      },
      {
        title: "The Complex World of African Activism: Beyond the Hashtags",
        excerpt: " grassroots movements are evolving, using digital tools to drive local policy change while navigating complex political landscapes.",
        author: "Gloria Edukere",
        category: "Insightful Article",
        date: "Feb 10, 2026",
        link: "#",
        imageUrl: "https://picsum.photos/seed/activism/800/600"
      },
      {
        title: "E-Commerce Took Over Fashion. Can Policy Bring Manufacturing Back?",
        excerpt: "South Africa’s crackdown on duty-free imports hints at a blueprint for protecting jobs, the environment, and regional trade.",
        author: "Gloria Edukere",
        category: "Insightful Article",
        date: "Feb 8, 2026",
        link: "#",
        imageUrl: "https://picsum.photos/seed/trade/800/600"
      }
    ];
  }

  return (
    <div className="min-h-screen bg-white text-brand-dark">
      <Header navItems={navItems} />
      <ArticleProgressBar />

      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="grid lg:grid-cols-[60px_1fr_280px] gap-8 xl:gap-12 items-start">
            <div className="hidden lg:flex sticky top-28 flex-col items-center gap-8">
              <ArticleShareRail title={exampleArticle.title} />
              <div className="flex flex-col items-center gap-3">
                <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-stone-400">Clap</span>
                <ArticleClap />
              </div>
            </div>

            <article>
              <p data-share-anchor className="font-heading text-xs uppercase tracking-widest text-brand-primary mb-4">
                <a href="/" className="hover:underline">Home</a>
                <span className="mx-2">•</span>
                <span>{category}</span>
              </p>

              <h1 className="font-heading font-bold text-[32px] md:text-[45px] leading-[1.05] tracking-tight max-w-4xl mb-5">
                {exampleArticle.title}
              </h1>

              <p className="font-serif text-[18px] md:text-[20px] leading-relaxed text-stone-600 max-w-4xl mb-8">
                {exampleArticle.excerpt}
              </p>

              <div className="grid md:grid-cols-2 gap-4 border-y border-stone-200 py-4 mb-8 text-sm">
                <div>
                  <p className="font-heading text-xs uppercase tracking-widest text-stone-500 mb-1">Authors</p>
                  <div className="font-body text-brand-dark flex flex-wrap gap-2">
                    {exampleArticle.authors.map((author: any, i) => (
                      <React.Fragment key={author.name}>
                        <a href={`/author/${author.name.toLowerCase().replace(/\s+/g, '-')}`} className="hover:underline hover:text-brand-primary transition-colors">
                          {author.name}
                        </a>
                        {i < exampleArticle.authors.length - 1 && <span>·</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-heading text-xs uppercase tracking-widest text-stone-500 mb-1">Editors</p>
                  <div className="font-body text-brand-dark flex flex-wrap gap-2">
                    {exampleArticle.editors.map((editor, i) => (
                      <React.Fragment key={editor}>
                        <a href={`/author/${editor.toLowerCase().replace(/\s+/g, '-')}`} className="hover:underline hover:text-brand-primary transition-colors">
                          {editor}
                        </a>
                        {i < exampleArticle.editors.length - 1 && <span>·</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-heading text-xs uppercase tracking-widest text-stone-500 mb-1">Published</p>
                  <p className="font-body text-brand-dark">{formatDate(exampleArticle.publishedAt)}</p>
                </div>
                <div>
                  <p className="font-heading text-xs uppercase tracking-widest text-stone-500 mb-1">Read Time</p>
                  <p className="font-body text-brand-dark">{exampleArticle.readTime}</p>
                </div>
              </div>

              <FeaturedImageWithCaption
                src={`https://picsum.photos/seed/${exampleArticle.imageSeed}/1200/700`}
                alt={exampleArticle.title}
                caption="Photo Collage/Illustration by Tomi Abe for SUSINSIGHT. Source: Unsplash"
              />

              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-4">
                  <ArticleTextSizeControls />
                  <ArticleAudioPlayer />
                </div>
              </div>

              <div className="story-content">
                {exampleArticle.sections.map((section: any, sectionIndex: number) => (
                  <section key={section.heading} className="mb-12">
                    <h2 className="font-heading font-bold text-3xl md:text-4xl text-brand-dark mb-5">{section.heading}</h2>
                    {section.paragraphs.map((paragraph: string, paragraphIndex: number) => (
                      <p
                        key={`${section.heading}-${paragraphIndex}`}
                        className={`font-serif text-lg leading-8 text-stone-700 mb-6 ${paragraphIndex === 0 ? "story-dropcap" : ""}`}
                        dangerouslySetInnerHTML={{ __html: paragraph }}
                      />
                    ))}

                    {sectionIndex === 0 ? <InlineNewsletter /> : null}
                  </section>
                ))}
              </div>

              <SeriesCallout seriesName="Tech for Tomorrow" />

              <ArticleActionsMobile title={exampleArticle.title} />

              <ArticleExtras
                authors={exampleArticle.authors as any}
                categories={exampleArticle.categories as any}
                tags={exampleArticle.tags.map(tag => ({ name: tag, slug: tag.toLowerCase().replace(/\s+/g, '-') }))}
                primaryCategoryName={exampleArticle.category}
              />

              <ArticlePagination
                previous={{ slug: "bamboo-climate-case", title: "The Climate Case for Bamboo Is Clear. So Why Isn’t the Money Moving?" }}
                next={{ slug: "tunisia-jobs-plan", title: "Can Tunisia’s Jobs Plan Deliver on Its Promise?" }}
              />
            </article>

            <SidebarWidgets liveData={liveData} />
          </div>

          <RelatedArticles
            category={category}
            articles={articles}
          />
        </div>
      </main>

      <Footer footerLinks={footerLinks} />
    </div>
  );
}

export default async function StoryPage({ params }: PageProps) {
  const [liveData, navigation] = await Promise.all([
    getLiveHomeData(),
    getNavigationData()
  ]);

  if (params.slug === exampleArticle.slug) {
    return <ExampleArticlePage liveData={liveData} navItems={navigation.navItems} footerLinks={navigation.footerLinks} />;
  }

  const draft = await draftMode();
  const post = await getStoryBySlug(params.slug, { preview: draft.isEnabled });
  if (!post) return notFound();

  const category = post.categories?.nodes?.[0]?.name || "Insightful Articles";
  let articles = await getPostsByCategory(category, 10);

  return (
    <div className="min-h-screen bg-white text-brand-dark">
      <Header navItems={navigation.navItems} />
      <ArticleProgressBar />

      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="grid lg:grid-cols-[60px_1fr_280px] gap-8 xl:gap-12 items-start">
            <div className="hidden lg:flex sticky top-28 flex-col items-center gap-8">
              <ArticleShareRail title={stripHtml(post.title)} />
              <div className="flex flex-col items-center gap-3">
                <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-stone-400">Clap</span>
                <ArticleClap />
              </div>
            </div>

            <article>
              <p data-share-anchor className="font-heading text-xs uppercase tracking-widest text-brand-primary mb-4">
                <a href="/" className="hover:underline">Home</a>
                <span className="mx-2">•</span>
                <span>{category}</span>
              </p>

              <h1 className="font-heading font-bold text-[32px] md:text-[45px] leading-[1.05] mb-6">{stripHtml(post.title)}</h1>

              <div className="font-heading text-xs uppercase tracking-widest text-stone-500 mb-6 flex gap-3">
                <a
                  href={`/author/${(post.author?.node?.name || "Susinsight Staff").toLowerCase().replace(/\s+/g, '-')}`}
                  className="hover:underline hover:text-brand-primary transition-colors"
                >
                  {post.author?.node?.name || "Susinsight Staff"}
                </a>
                <span>•</span>
                <span>{formatDate(post.date)}</span>
              </div>

              <FeaturedImageWithCaption
                src={
                  post.featuredImage?.node?.sourceUrl ||
                  getFallbackImageSrc({
                    title: stripHtml(post.title),
                    category,
                    seed: 100
                  })
                }
                alt={post.featuredImage?.node?.altText || stripHtml(post.title)}
                caption="Photo Collage/Illustration by Tomi Abe for SUSINSIGHT. Source: Unsplash"
              />

              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-4">
                  <ArticleTextSizeControls />
                  <ArticleAudioPlayer />
                </div>
              </div>

              <div
                className="font-serif text-lg leading-8 text-stone-700 story-content mb-12"
                dangerouslySetInnerHTML={{ __html: post.content || post.excerpt || "" }}
              />

              <SeriesCallout seriesName={category} />

              <ArticleActionsMobile title={stripHtml(post.title)} />

              <InlineNewsletter />

              <ArticleExtras
                authors={[{
                  name: post.author?.node?.name || "Susinsight Staff",
                  avatar: post.author?.node?.avatar?.url || undefined,
                  bio: post.author?.node?.description || undefined
                }]}
                categories={post.categories?.nodes || []}
                tags={post.tags?.nodes || []}
                primaryCategoryName={category}
              />

              <ArticlePagination previous={post.previous} next={post.next} />
            </article>

            <SidebarWidgets liveData={liveData} />
          </div>

          <RelatedArticles
            category={category}
            articles={articles}
          />
        </div>
      </main>

      <Footer footerLinks={navigation.footerLinks} />
    </div>
  );
}
