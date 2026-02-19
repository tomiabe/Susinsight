export interface Article {
  title: string;
  author?: string;
  authorSlug?: string;
  authorAvatar?: string;
  authorBio?: string;
  excerpt: string;
  category?: string;
  date?: string;
  link?: string;
  imageSeed?: number;
  imageUrl?: string;
  imageAlt?: string;
  slug?: string;
}

export interface SectionData {
  id: string;
  title: string;
  subtitle?: string;
  articles: Article[];
  ctaLink?: string;
  ctaText?: string;
  bgColor?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}
