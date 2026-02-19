import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { Footer, Header } from "@/ai/components/LayoutComponents";
import { getNavigationData, getPageByUri, getStoryBySlug } from "@/ai/live-data";
import { absoluteUrl } from "@/ai/site-url";

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
    description: stripHtml(page.excerpt || page.content),
    alternates: {
      canonical: absoluteUrl(uri)
    },
    openGraph: {
      title: stripHtml(page.title),
      description: stripHtml(page.excerpt || page.content),
      url: absoluteUrl(uri)
    }
  };
}

export default async function CatchAllPage({ params }: CatchAllPageProps) {
  const draft = await draftMode();
  const uri = toUri(params.slug);
  const [page, navigation] = await Promise.all([
    getPageByUri(uri, { preview: draft.isEnabled }),
    getNavigationData()
  ]);

  if (!page) {
    const lastSegment = params.slug[params.slug.length - 1] || "";
    if (lastSegment) {
      const story = await getStoryBySlug(lastSegment, { preview: draft.isEnabled });
      if (story?.slug) {
        redirect(`/stories/${story.slug}`);
      }
    }
    return notFound();
  }

  return (
    <div className="min-h-screen bg-white text-brand-dark">
      <Header navItems={navigation.navItems} />

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

      <Footer footerLinks={navigation.footerLinks} />
    </div>
  );
}
