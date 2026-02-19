import type { Metadata } from "next";
import { Footer, Header } from "@/ai/components/LayoutComponents";
import { getNavigationData, getSearchResults } from "@/ai/live-data";

type SearchPageProps = {
  searchParams?: {
    q?: string;
  };
};

export const metadata: Metadata = {
  title: "Search | Susinsight",
  description: "Search stories on Susinsight."
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = (searchParams?.q || "").trim();
  const [navigation, results] = await Promise.all([
    getNavigationData(),
    query ? getSearchResults(query, 30) : Promise.resolve([])
  ]);

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
          {results.map((post) => (
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
      </main>

      <Footer footerLinks={navigation.footerLinks} />
    </div>
  );
}
