import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { getStoryBySlug } from "@/ai/live-data";
import { getFallbackImageSrc } from "@/ai/image-fallback";

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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const draft = await draftMode();
  const post = await getStoryBySlug(params.slug, { preview: draft.isEnabled });
  if (!post) return { title: "Story Not Found | Susinsight" };

  return {
    title: `${stripHtml(post.title)} | Susinsight`,
    description: stripHtml(post.excerpt)
  };
}

export default async function StoryPage({ params }: PageProps) {
  const draft = await draftMode();
  const post = await getStoryBySlug(params.slug, { preview: draft.isEnabled });
  if (!post) return notFound();

  return (
    <main className="min-h-screen bg-white text-brand-dark">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="font-heading text-xs uppercase tracking-widest text-brand-primary mb-4">
          {post.categories?.nodes?.[0]?.name || "Story"}
        </p>

        <h1 className="font-heading font-bold text-4xl md:text-5xl leading-tight mb-6">
          {stripHtml(post.title)}
        </h1>

        <div className="font-heading text-xs uppercase tracking-widest text-stone-500 mb-8 flex gap-3">
          <span>{post.author?.node?.name || "Susinsight Staff"}</span>
          <span>•</span>
          <span>{formatDate(post.date)}</span>
        </div>

        <img
          src={
            post.featuredImage?.node?.sourceUrl ||
            getFallbackImageSrc({
              title: stripHtml(post.title),
              category: post.categories?.nodes?.[0]?.name,
              seed: 100
            })
          }
          alt={post.featuredImage?.node?.altText || stripHtml(post.title)}
          className="w-full h-auto rounded-md mb-10"
        />

        <div
          className="font-serif text-lg leading-8 text-stone-700 story-content"
          dangerouslySetInnerHTML={{ __html: post.content || post.excerpt || "" }}
        />
      </article>
    </main>
  );
}
