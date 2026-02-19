import type { Metadata } from "next";
import { Footer, Header } from "@/ai/components/LayoutComponents";
import { getNavigationData, getStoriesFeed } from "@/ai/live-data";
import { absoluteUrl } from "@/ai/site-url";

export const metadata: Metadata = {
  title: "Stories | Susinsight",
  description: "Latest stories from the Susinsight newsroom.",
  alternates: {
    canonical: absoluteUrl("/stories")
  },
  openGraph: {
    title: "Stories | Susinsight",
    description: "Latest stories from the Susinsight newsroom.",
    url: absoluteUrl("/stories")
  }
};

type StoriesArchivePageProps = {
  searchParams?: {
    page?: string;
  };
};

const PAGE_SIZE = 12;

function parsePage(input?: string): number {
  const parsed = Number(input || "1");
  if (!Number.isFinite(parsed) || parsed < 1) return 1;
  return Math.floor(parsed);
}

function pageHref(page: number): string {
  return page <= 1 ? "/stories" : `/stories?page=${page}`;
}

export default async function StoriesArchivePage({ searchParams }: StoriesArchivePageProps) {
  const [navigation, stories] = await Promise.all([
    getNavigationData(),
    getStoriesFeed(120)
  ]);
  const totalPages = Math.max(1, Math.ceil(stories.length / PAGE_SIZE));
  const requestedPage = parsePage(searchParams?.page);
  const currentPage = Math.min(requestedPage, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pagedStories = stories.slice(start, start + PAGE_SIZE);

  return (
    <div className="min-h-screen bg-white text-brand-dark">
      <Header navItems={navigation.navItems} />

      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-14">
          <p className="font-heading text-xs uppercase tracking-widest text-brand-primary mb-3">Susinsight</p>
          <h1 className="font-heading font-bold text-[32px] md:text-[45px] leading-[1.05] tracking-tight mb-4">
            All Stories
          </h1>
          <p className="font-serif text-lg text-stone-600 max-w-3xl">
            Reporting, analysis, and long-form narratives from across Africa’s sustainability and innovation landscape.
          </p>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {pagedStories.map((post) => (
              <article key={post.slug} className="border border-stone-100 rounded-xl overflow-hidden bg-white shadow-sm">
                {post.imageUrl ? (
                  <a href={post.link || "#"} className="block">
                    <img src={post.imageUrl} alt={post.imageAlt || post.title} className="w-full h-52 object-cover" />
                  </a>
                ) : null}
                <div className="p-5">
                  <p className="font-heading text-[10px] font-bold uppercase tracking-widest text-brand-primary mb-2">
                    {post.category || "Story"}
                  </p>
                  <h2 className="font-heading font-bold text-[23px] leading-[1.15] mb-3">
                    <a href={post.link || "#"} className="hover:text-brand-primary transition-colors">
                      {post.title}
                    </a>
                  </h2>
                  <p className="font-body text-sm text-stone-600 leading-6 mb-4">{post.excerpt}</p>
                  <div className="font-heading text-[10px] uppercase tracking-widest text-stone-500">
                    {post.author || "Susinsight Staff"} {post.date ? `• ${post.date}` : ""}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {totalPages > 1 ? (
            <nav className="mt-12 flex items-center justify-center gap-4 font-heading text-xs uppercase tracking-widest">
              {currentPage > 1 ? (
                <a href={pageHref(currentPage - 1)} className="px-4 py-2 border border-stone-200 rounded-lg hover:border-brand-primary hover:text-brand-primary transition-colors">
                  Previous
                </a>
              ) : (
                <span className="px-4 py-2 border border-stone-100 rounded-lg text-stone-300">Previous</span>
              )}

              <span className="text-stone-500">
                Page {currentPage} of {totalPages}
              </span>

              {currentPage < totalPages ? (
                <a href={pageHref(currentPage + 1)} className="px-4 py-2 border border-stone-200 rounded-lg hover:border-brand-primary hover:text-brand-primary transition-colors">
                  Next
                </a>
              ) : (
                <span className="px-4 py-2 border border-stone-100 rounded-lg text-stone-300">Next</span>
              )}
            </nav>
          ) : null}
        </section>
      </main>

      <Footer footerLinks={navigation.footerLinks} />
    </div>
  );
}
