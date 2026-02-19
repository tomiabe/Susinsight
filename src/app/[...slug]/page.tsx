import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { Footer, Header } from "@/ai/components/LayoutComponents";
import { getPageByUri } from "@/ai/live-data";

type CatchAllPageProps = {
  params: {
    slug: string[];
  };
};

function stripHtml(html: string | null | undefined): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function toUri(slugParts: string[]): string {
  return `/${slugParts.join("/")}/`;
}

export async function generateMetadata({ params }: CatchAllPageProps): Promise<Metadata> {
  const draft = await draftMode();
  const uri = toUri(params.slug);
  const page = await getPageByUri(uri, { preview: draft.isEnabled });
  if (!page) return { title: "Page Not Found | Susinsight" };

  return {
    title: `${stripHtml(page.title)} | Susinsight`,
    description: stripHtml(page.excerpt || page.content)
  };
}

export default async function CatchAllPage({ params }: CatchAllPageProps) {
  const draft = await draftMode();
  const uri = toUri(params.slug);
  const page = await getPageByUri(uri, { preview: draft.isEnabled });

  if (!page) return notFound();

  return (
    <div className="min-h-screen bg-white text-brand-dark">
      <Header />

      <main>
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-heading font-bold text-[32px] md:text-[45px] leading-[1.05] tracking-tight mb-8">
            {stripHtml(page.title)}
          </h1>

          {page.featuredImage?.node?.sourceUrl ? (
            <figure className="mb-10">
              <img
                src={page.featuredImage.node.sourceUrl}
                alt={page.featuredImage.node.altText || stripHtml(page.title)}
                className="w-full rounded-md"
              />
            </figure>
          ) : null}

          <div
            className="story-content font-serif text-lg leading-8 text-stone-700"
            dangerouslySetInnerHTML={{ __html: page.content || "" }}
          />
        </article>
      </main>

      <Footer />
    </div>
  );
}
