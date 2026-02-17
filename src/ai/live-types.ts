import type { Article, SectionData } from "@/ai/types";

export type SeriesItem = {
  title: string;
  desc: string;
  imageSeed?: number;
  imageUrl?: string;
  link?: string;
};

export type LiveHomeData = {
  heroFeature?: Article;
  trendingArticles?: Article[];
  signalsPreview?: SectionData;
  contentSections?: SectionData[];
  founderCorner?: SectionData;
  culturalStories?: SectionData;
  unexpectedImpact?: SectionData;
  fictionalStories?: SectionData;
  impactStories?: SectionData;
  lowerSections?: SectionData[];
  exploreSeries?: SeriesItem[];
};
