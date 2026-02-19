import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer, Header } from "@/ai/components/LayoutComponents";
import { getAuthorArchive, getNavigationData } from "@/ai/live-data";
import { absoluteUrl } from "@/ai/site-url";

type AuthorPageProps = {
  params: {
    slug: string;
  };
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

function stripHtml(html: string | null | undefined): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const archive = await getAuthorArchive(params.slug);
  if (!archive) return { title: "Author Not Found | Susinsight" };

  return {
    title: `${archive.name} | Susinsight`,
    description: stripHtml(archive.description) || `${archive.name} on Susinsight`,
    alternates: {
      canonical: absoluteUrl(`/author/${archive.slug}`)
    },
    openGraph: {
      title: `${archive.name} | Susinsight`,
      description: stripHtml(archive.description) || `${archive.name} on Susinsight`,
      url: absoluteUrl(`/author/${archive.slug}`)
    }
  };
}

export default async function AuthorPage({ params, searchParams }: AuthorPageProps) {
  const [archive, navigation] = await Promise.all([
    getAuthorArchive(params.slug),
    getNavigationData()
  ]);

  if (!archive) return notFound();
  const totalPages = Math.max(1, Math.ceil(archive.posts.length / PAGE_SIZE));
  const requestedPage = parsePage(searchParams?.page);
  const currentPage = Math.min(requestedPage, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const posts = archive.posts.slice(start, start + PAGE_SIZE);
  const pageHref = (page: number) =>
    page <= 1 ? `/author/${params.slug}` : `/author/${params.slug}?page=${page}`;

  return (
    <div className="min-h-screen bg-white text-brand-dark">
      <Header navItems={navigation.navItems} />

      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-14">
          <p className="font-heading text-xs uppercase tracking-widest text-brand-primary mb-3">Author</p>
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-4">
            {archive.avatarUrl ? (
              <img src={archive.avatarUrl} alt={archive.name} className="w-20 h-20 rounded-full object-cover border border-stone-200" />
            ) : null}
            <h1 className="font-heading font-bold text-[32px] md:text-[45px] leading-[1.05] tracking-tight">
              {archive.name}
            </h1>
          </div>
          {archive.description ? (
            <p className="font-serif text-lg text-stone-600 max-w-3xl">
              {stripHtml(archive.description)}
            </p>
          ) : null}
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
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
