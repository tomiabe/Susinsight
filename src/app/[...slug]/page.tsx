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

type PageChrome = {
  eyebrow: string;
  subtitle: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
};

const DEFAULT_CHROME: PageChrome = {
  eyebrow: "Susinsight",
  subtitle: "Context, clarity, and practical insight for decision makers across Africa.",
  ctaPrimary: { label: "Browse Stories", href: "/stories" },
  ctaSecondary: { label: "Search", href: "/search" }
};

const PAGE_CHROME_MAP: Record<string, PageChrome> = {
  about: {
    eyebrow: "About Susinsight",
    subtitle: "Who we are, what we cover, and why we built this newsroom.",
    ctaPrimary: { label: "Read Stories", href: "/stories" },
    ctaSecondary: { label: "Our Contributors", href: "/contributors" }
  },
  contact: {
    eyebrow: "Contact",
    subtitle: "Reach the editorial team, partnerships desk, and contributor support.",
    ctaPrimary: { label: "Send a Pitch", href: "/share" },
    ctaSecondary: { label: "Partner With Us", href: "/partner" }
  },
  contribute: {
    eyebrow: "Contribute",
    subtitle: "Join the newsroom network and publish grounded reporting with us.",
    ctaPrimary: { label: "Share Your Story", href: "/share" },
    ctaSecondary: { label: "Contact Editorial", href: "/contact" }
  },
  partner: {
    eyebrow: "Partnerships",
    subtitle: "Collaborate with Susinsight to support high-impact journalism.",
    ctaPrimary: { label: "Start a Partnership", href: "/contact" },
    ctaSecondary: { label: "Amplify Impact", href: "/amplify" }
  },
  amplify: {
    eyebrow: "Amplify Impact",
    subtitle: "Showcase your sustainability work and evidence-backed outcomes.",
    ctaPrimary: { label: "Submit Details", href: "/contact" },
    ctaSecondary: { label: "Be in the Spotlight", href: "/spotlight" }
  },
  spotlight: {
    eyebrow: "Spotlight",
    subtitle: "Highlight initiatives and people building practical systems change.",
    ctaPrimary: { label: "Apply", href: "/contact" },
    ctaSecondary: { label: "Read Features", href: "/stories" }
  }
};

function stripHtml(html: string | null | undefined): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function toUri(slugParts: string[]): string {
  return `/${slugParts.join("/")}/`;
}

function resolveChrome(slugParts: string[]): PageChrome {
  const key = (slugParts[0] || "").toLowerCase();
  return PAGE_CHROME_MAP[key] || DEFAULT_CHROME;
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
  const chrome = resolveChrome(params.slug);
  const quickLinks = navigation.navItems.slice(0, 6).map((item) => ({
    label: item.label,
    href: item.href
  }));

  return (
    <div className="min-h-screen bg-white text-brand-dark">
      <Header navItems={navigation.navItems} />

      <main>
        <section className="border-b border-stone-100 bg-brand-light/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
            <p className="font-heading text-xs uppercase tracking-widest text-brand-primary mb-3">{chrome.eyebrow}</p>
            <h1 className="font-heading font-bold text-[32px] md:text-[45px] leading-[1.05] tracking-tight mb-4">
              {stripHtml(page.title)}
            </h1>
            <p className="font-serif text-lg text-stone-600 max-w-3xl">{chrome.subtitle}</p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
          <div className="grid lg:grid-cols-[1fr_320px] gap-10 items-start">
            <article>
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

            <aside className="space-y-6 lg:sticky lg:top-28">
              <div className="border border-stone-100 rounded-2xl p-6 bg-white shadow-sm">
                <h3 className="font-heading font-bold text-[11px] uppercase tracking-[0.15em] text-stone-400 mb-4">
                  Next Steps
                </h3>
                <a
                  href={chrome.ctaPrimary.href}
                  className="block w-full text-center px-4 py-3 rounded-lg bg-brand-primary text-white font-heading font-bold text-xs uppercase tracking-widest hover:bg-brand-dark transition-colors mb-3"
                >
                  {chrome.ctaPrimary.label}
                </a>
                <a
                  href={chrome.ctaSecondary.href}
                  className="block w-full text-center px-4 py-3 rounded-lg border border-stone-200 text-brand-dark font-heading font-bold text-xs uppercase tracking-widest hover:border-brand-primary hover:text-brand-primary transition-colors"
                >
                  {chrome.ctaSecondary.label}
                </a>
              </div>

              <div className="border border-stone-100 rounded-2xl p-6 bg-white shadow-sm">
                <h3 className="font-heading font-bold text-[11px] uppercase tracking-[0.15em] text-stone-400 mb-4">
                  Explore
                </h3>
                <div className="space-y-3">
                  {quickLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="block text-sm font-body text-stone-600 hover:text-brand-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer footerLinks={navigation.footerLinks} />
    </div>
  );
}
