export interface SiteConfig {
  name: string;
  url: string;
  description?: string;
  locale?: string;
  twitterHandle?: string;
  defaultImage?: string;
}

export interface OrganizationConfig {
  name: string;
  url: string;
  logo?: string;
  sameAs?: string[];
  contactEmail?: string;
  contactPhone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
}

export interface PageMetadataOptions {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  keywords?: string[];
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

export interface ArticleMetadataOptions extends PageMetadataOptions {
  type: 'article';
  publishedTime: string;
  modifiedTime?: string;
  author: string;
  tags?: string[];
  section?: string;
}

export interface JsonLdBase {
  '@context': 'https://schema.org';
  '@type': string;
  [key: string]: unknown;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ServiceItem {
  name: string;
  description: string;
  url?: string;
  image?: string;
  price?: string;
  priceCurrency?: string;
}

export interface ReviewItem {
  author: string;
  rating: number;
  body: string;
  datePublished?: string;
}
