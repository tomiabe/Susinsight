import "server-only";

import {
  CONTENT_SECTIONS,
  CULTURAL_STORIES,
  EXPLORE_SERIES,
  FICTIONAL_STORIES,
  FOUNDER_CORNER,
  HERO_FEATURE,
  IMPACT_STORIES,
  LOWER_SECTIONS,
  SIGNALS_PREVIEW,
  TRENDING_ARTICLES
} from "@/ai/constants";
import type { LiveHomeData, SeriesItem } from "@/ai/live-types";
import type { Article, SectionData } from "@/ai/types";
import { SECTION_CATEGORY_MAP } from "@/ai/wp-section-map";

type WpPostNode = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  content?: string | null;
  date: string;
  uri?: string | null;
  author?: {
    node?: {
      name?: string | null;
      description?: string | null;
      avatar?: {
        url?: string | null;
      } | null;
    } | null;
  } | null;
  featuredImage?: {
    node?: {
      sourceUrl?: string | null;
      altText?: string | null;
    } | null;
  } | null;
  categories?: {
    nodes: Array<{
      name: string;
      slug: string;
    }>;
  };
  tags?: {
    nodes: Array<{
      name: string;
      slug: string;
    }>;
  };
  previous?: {
    slug: string;
    title: string;
  } | null;
  next?: {
    slug: string;
    title: string;
  } | null;
};

export type WpPageNode = {
  id: string;
  slug: string;
  uri?: string | null;
  title: string;
  content?: string | null;
  excerpt?: string | null;
  date?: string | null;
  modified?: string | null;
  featuredImage?: {
    node?: {
      sourceUrl?: string | null;
      altText?: string | null;
    } | null;
  } | null;
};

const endpoint = process.env.WORDPRESS_GRAPHQL_URL;
const headlessKey = process.env.HEADLESS_FETCH_KEY;
const useWordPressContent = process.env.USE_WORDPRESS_CONTENT === "true";

function stripHtml(html: string | null | undefined): string {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\[\.\.\.\]/g, "")
    .replace(/&hellip;/g, "")
    .replace(/\.\.\.$/, "")
    .trim();
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

function toArticle(post: WpPostNode): Article {
  return {
    title: stripHtml(post.title),
    author: post.author?.node?.name || "Susinsight Staff",
    authorAvatar: post.author?.node?.avatar?.url || undefined,
    authorBio: post.author?.node?.description || undefined,
    excerpt: stripHtml(post.excerpt) || "Read the full story on Susinsight.",
    category: post.categories?.nodes?.[0]?.name,
    date: formatDate(post.date),
    link: `/stories/${post.slug}`,
    imageUrl: post.featuredImage?.node?.sourceUrl || undefined,
    imageAlt: post.featuredImage?.node?.altText || stripHtml(post.title),
    slug: post.slug
  };
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function list(values: readonly string[]): string[] {
  return [...values];
}

function hasCategory(post: WpPostNode, candidates: string[]): boolean {
  const set = new Set(candidates.map(normalize));
  return (post.categories?.nodes || []).some((category) => {
    const slug = normalize(category.slug);
    const name = normalize(category.name);
    return set.has(slug) || set.has(name);
  });
}

function selectByCategories(
  posts: WpPostNode[],
  candidates: string[],
  limit: number,
  used: Set<string>
): WpPostNode[] {
  const picked: WpPostNode[] = [];
  for (const post of posts) {
    if (picked.length >= limit) break;
    if (used.has(post.id)) continue;
    if (!hasCategory(post, candidates)) continue;
    used.add(post.id);
    picked.push(post);
  }
  return picked;
}

function buildSection(
  base: SectionData,
  posts: WpPostNode[],
  candidates: string[],
  limit: number,
  used: Set<string>
): SectionData {
  const picked = selectByCategories(posts, candidates, limit, used).map(toArticle);
  return {
    ...base,
    articles: picked.length ? picked : base.articles
  };
}

function buildSeries(posts: WpPostNode[], candidates: string[], used: Set<string>): SeriesItem[] {
  const picked = selectByCategories(posts, candidates, 8, used);
  if (!picked.length) return EXPLORE_SERIES;
  return picked.map((post, index) => {
    const text = stripHtml(post.excerpt) || "Explore this series from the Susinsight newsroom.";
    return {
      title: stripHtml(post.title),
      desc: text,
      imageSeed: index + 1,
      imageUrl: post.featuredImage?.node?.sourceUrl || undefined,
      link: `/stories/${post.slug}`
    };
  });
}

async function wpRequest<T>(
  query: string,
  variables?: Record<string, unknown>,
  options?: { preview?: boolean }
): Promise<T | null> {
  if (!endpoint || !useWordPressContent) return null;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(headlessKey ? { "x-susinsight-headless-key": headlessKey } : {}),
        ...(process.env.WP_PREVIEW_TOKEN ? { authorization: `Bearer ${process.env.WP_PREVIEW_TOKEN}` } : {})
      },
      body: JSON.stringify({ query, variables }),
      ...(options?.preview ? { cache: "no-store" as const } : { next: { revalidate: 120 } })
    });

    if (!response.ok) return null;

    const payload = (await response.json()) as { data?: T };
    return payload.data || null;
  } catch {
    return null;
  }
}

export async function getLiveHomeData(options?: { preview?: boolean }): Promise<LiveHomeData> {
  const query = /* GraphQL */ `
    query HomeFeed {
      posts(first: 40, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
        nodes {
          id
          slug
          uri
          title
          excerpt
          date
          author {
            node {
              name
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const data = await wpRequest<{ posts?: { nodes: WpPostNode[] } }>(query, undefined, options);
  const nodes = data?.posts?.nodes || [];

  if (!nodes.length) {
    return {
      heroFeature: {
        ...HERO_FEATURE,
        link: "#"
      },
      trendingArticles: TRENDING_ARTICLES,
      signalsPreview: SIGNALS_PREVIEW,
      contentSections: CONTENT_SECTIONS
    };
  }

  const used = new Set<string>();
  const articles = nodes.map(toArticle);
  const heroFeature = articles[0] || { ...HERO_FEATURE, link: "#" };
  if (nodes[0]?.id) used.add(nodes[0].id);
  const trendingArticles = articles.slice(1, 4).length ? articles.slice(1, 4) : TRENDING_ARTICLES;
  nodes.slice(1, 4).forEach((node) => used.add(node.id));

  const signalsPreview = buildSection(
    SIGNALS_PREVIEW,
    nodes,
    list(SECTION_CATEGORY_MAP.signalsPreview),
    3,
    used
  );

  const contentSections: SectionData[] = [
    buildSection(CONTENT_SECTIONS[0], nodes, list(SECTION_CATEGORY_MAP.contentSections.insightful), 6, used),
    buildSection(CONTENT_SECTIONS[1], nodes, list(SECTION_CATEGORY_MAP.contentSections.business), 3, used),
    buildSection(CONTENT_SECTIONS[2], nodes, list(SECTION_CATEGORY_MAP.contentSections.spotlight), 3, used)
  ];

  const founderCorner = buildSection(
    FOUNDER_CORNER,
    nodes,
    list(SECTION_CATEGORY_MAP.founderCorner),
    3,
    used
  );
  const culturalStories = buildSection(
    CULTURAL_STORIES,
    nodes,
    list(SECTION_CATEGORY_MAP.culturalStories),
    3,
    used
  );
  const unexpectedImpact = buildSection(
    {
      id: "unexpected-impact",
      title: "Unexpected Impact",
      subtitle: "Discover how ordinary choices can ripple into continental transformation.",
      articles: [],
      ctaText: "View All Impacts"
    },
    nodes,
    list(SECTION_CATEGORY_MAP.unexpectedImpact),
    3,
    used
  );
  const fictionalStories = buildSection(
    FICTIONAL_STORIES,
    nodes,
    list(SECTION_CATEGORY_MAP.fictionalStories),
    3,
    used
  );
  const impactStories = buildSection(
    IMPACT_STORIES,
    nodes,
    list(SECTION_CATEGORY_MAP.impactStories),
    3,
    used
  );

  const lowerSections: SectionData[] = [
    buildSection(LOWER_SECTIONS[0], nodes, list(SECTION_CATEGORY_MAP.lowerSections.investorInsights), 3, used),
    buildSection(LOWER_SECTIONS[1], nodes, list(SECTION_CATEGORY_MAP.lowerSections.eventFocus), 3, used),
    buildSection(LOWER_SECTIONS[2], nodes, list(SECTION_CATEGORY_MAP.lowerSections.expertOpinions), 3, used),
    buildSection(LOWER_SECTIONS[3], nodes, list(SECTION_CATEGORY_MAP.lowerSections.policyReviews), 3, used),
    buildSection(LOWER_SECTIONS[4], nodes, list(SECTION_CATEGORY_MAP.lowerSections.unAffairs), 3, used)
  ];

  const exploreSeries = buildSeries(nodes, list(SECTION_CATEGORY_MAP.exploreSeries), used);

  return {
    heroFeature,
    trendingArticles,
    signalsPreview,
    contentSections,
    founderCorner,
    culturalStories,
    unexpectedImpact,
    fictionalStories,
    impactStories,
    lowerSections,
    exploreSeries
  };
}

export async function getStoryBySlug(slug: string, options?: { preview?: boolean }): Promise<WpPostNode | null> {
  const query = /* GraphQL */ `
    query StoryBySlug($slug: ID!, $asPreview: Boolean!) {
      post(id: $slug, idType: SLUG, asPreview: $asPreview) {
        id
        slug
        title
        excerpt
        content
        date
        author {
          node {
            name
            description
            avatar {
              url
            }
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        tags {
          nodes {
            name
            slug
          }
        }
        previous {
          slug
          title
        }
        next {
          slug
          title
        }
      }
    }
  `;

  const data = await wpRequest<{ post?: WpPostNode | null }>(
    query,
    { slug, asPreview: Boolean(options?.preview) },
    options
  );
  return data?.post || null;
}

export async function getStoryById(id: number, options?: { preview?: boolean }): Promise<WpPostNode | null> {
  const query = /* GraphQL */ `
    query StoryById($id: ID!, $asPreview: Boolean!) {
      post(id: $id, idType: DATABASE_ID, asPreview: $asPreview) {
        id
        slug
        title
        excerpt
        content
        date
        author {
          node {
            name
            description
            avatar {
              url
            }
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
  `;

  const data = await wpRequest<{ post?: WpPostNode | null }>(
    query,
    { id, asPreview: Boolean(options?.preview) },
    options
  );
  return data?.post || null;
}

export async function getPostsByCategory(categoryName: string, count: number = 10): Promise<Article[]> {
  const query = /* GraphQL */ `
    query PostsByCategory($categoryName: String, $count: Int!) {
      posts(where: { categoryName: $categoryName }, first: $count) {
        nodes {
          id
          slug
          title
          excerpt
          date
          author {
            node {
              name
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
        }
      }
      latest: posts(first: $count) {
        nodes {
          id
          slug
          title
          excerpt
          date
          author {
            node {
              name
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const data = await wpRequest<{
    posts?: { nodes: WpPostNode[] },
    latest?: { nodes: WpPostNode[] }
  }>(
    query,
    { categoryName, count }
  );

  const matched = data?.posts?.nodes || [];
  if (matched.length > 0) {
    return matched.map(toArticle);
  }

  // Fallback to latest posts if no category match
  return (data?.latest?.nodes || []).map(toArticle);
}

export async function getPageByUri(uri: string, options?: { preview?: boolean }): Promise<WpPageNode | null> {
  const normalized = uri.startsWith("/") ? uri : `/${uri}`;
  const withTrailingSlash = normalized.endsWith("/") ? normalized : `${normalized}/`;

  const query = /* GraphQL */ `
    query PageByUri($uri: ID!, $asPreview: Boolean!) {
      page(id: $uri, idType: URI, asPreview: $asPreview) {
        id
        slug
        uri
        title
        content
        excerpt
        date
        modified
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  `;

  const data = await wpRequest<{ page?: WpPageNode | null }>(
    query,
    { uri: withTrailingSlash, asPreview: Boolean(options?.preview) },
    options
  );
  return data?.page || null;
}
