import type { Metadata } from "next";
import { Footer, Header } from "@/ai/components/LayoutComponents";
import { getNavigationData, getSearchResults } from "@/ai/live-data";
import { absoluteUrl } from "@/ai/site-url";

type SearchPageProps = {
  searchParams?: {
    q?: string;
    page?: string;
  };
};

const PAGE_SIZE = 12;

function parsePage(input?: string): number {
  const parsed = Number(input || "1");
  if (!Number.isFinite(parsed) || parsed < 1) return 1;
  return Math.floor(parsed);
}

function pageHref(page: number, query: string): string {
  const qp = new URLSearchParams();
  qp.set("q", query);
  if (page > 1) qp.set("page", String(page));
  return `/search?${qp.toString()}`;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const query = (searchParams?.q || "").trim();
  if (!query) {
    return {
      title: "Search | Susinsight",
      description: "Search stories on Susinsight.",
      alternates: { canonical: absoluteUrl("/search") },
      openGraph: {
        title: "Search | Susinsight",
        description: "Search stories on Susinsight.",
        url: absoluteUrl("/search")
      }
    };
  }

  const canonical = absoluteUrl(`/search?q=${encodeURIComponent(query)}`);
  return {
    title: `Search: ${query} | Susinsight`,
    description: `Search results for ${query} on Susinsight.`,
    alternates: { canonical },
    openGraph: {
      title: `Search: ${query} | Susinsight`,
      description: `Search results for ${query} on Susinsight.`,
      url: canonical
    }
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = (searchParams?.q || "").trim();
  const [navigation, results] = await Promise.all([
    getNavigationData(),
    query ? getSearchResults(query, 120) : Promise.resolve([])
  ]);
  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const requestedPage = parsePage(searchParams?.page);
  const currentPage = Math.min(requestedPage, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pagedResults = results.slice(start, start + PAGE_SIZE);

  return (
    <div className="min-h-screen bg-white text-brand-dark">
      <Header navItems={navigation.navItems} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-14">
        <p className="font-heading text-xs uppercase tracking-widest text-brand-primary mb-3">Search</p>
        <h1 className="font-heading font-bold text-[32px] md:text-[45px] leading-[1.05] tracking-tight mb-6">
          Find Stories
        </h1>

        <form action="/search" method="get" className="mb-10">
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search by keyword..."
            className="w-full md:max-w-2xl border border-stone-200 rounded-xl px-4 py-3 font-body text-base focus:outline-none focus:border-brand-primary"
          />
        </form>

        {query ? (
          <p className="font-body text-sm text-stone-600 mb-8">
            {results.length} result{results.length === 1 ? "" : "s"} for <span className="font-semibold text-brand-dark">"{query}"</span>
          </p>
        ) : (
          <p className="font-body text-sm text-stone-600 mb-8">Enter a keyword to search the newsroom.</p>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-8">
          {pagedResults.map((post) => (
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

        {query && totalPages > 1 ? (
          <nav className="mt-4 mb-8 flex items-center justify-center gap-4 font-heading text-xs uppercase tracking-widest">
            {currentPage > 1 ? (
              <a href={pageHref(currentPage - 1, query)} className="px-4 py-2 border border-stone-200 rounded-lg hover:border-brand-primary hover:text-brand-primary transition-colors">
                Previous
              </a>
            ) : (
              <span className="px-4 py-2 border border-stone-100 rounded-lg text-stone-300">Previous</span>
            )}

            <span className="text-stone-500">
              Page {currentPage} of {totalPages}
            </span>

            {currentPage < totalPages ? (
              <a href={pageHref(currentPage + 1, query)} className="px-4 py-2 border border-stone-200 rounded-lg hover:border-brand-primary hover:text-brand-primary transition-colors">
                Next
              </a>
            ) : (
              <span className="px-4 py-2 border border-stone-100 rounded-lg text-stone-300">Next</span>
            )}
          </nav>
        ) : null}
      </main>

      <Footer footerLinks={navigation.footerLinks} />
    </div>
  );
}
