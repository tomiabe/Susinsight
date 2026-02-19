import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer, Header } from "@/ai/components/LayoutComponents";
import { getNavigationData, getTagArchive } from "@/ai/live-data";

type TagPageProps = {
  params: {
    slug: string;
  };
};

function stripHtml(html: string | null | undefined): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const archive = await getTagArchive(params.slug);
  if (!archive) return { title: "Tag Not Found | Susinsight" };

  return {
    title: `${archive.name} | Susinsight`,
    description: stripHtml(archive.description) || `Stories tagged ${archive.name}`
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const [archive, navigation] = await Promise.all([
    getTagArchive(params.slug),
    getNavigationData()
  ]);

  if (!archive) return notFound();

  return (
    <div className="min-h-screen bg-white text-brand-dark">
      <Header navItems={navigation.navItems} />

      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-14">
          <p className="font-heading text-xs uppercase tracking-widest text-brand-primary mb-3">Tag</p>
          <h1 className="font-heading font-bold text-[32px] md:text-[45px] leading-[1.05] tracking-tight mb-4">
            {archive.name}
          </h1>
          {archive.description ? (
            <p className="font-serif text-lg text-stone-600 max-w-3xl">
              {stripHtml(archive.description)}
            </p>
          ) : null}
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {archive.posts.map((post) => (
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
        </section>
      </main>

      <Footer footerLinks={navigation.footerLinks} />
    </div>
  );
}
