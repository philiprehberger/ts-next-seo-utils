import type { Metadata } from 'next';
import type { SiteConfig, PageMetadataOptions, ArticleMetadataOptions } from './types';

export function createMetadataGenerator(site: SiteConfig) {
  const locale = site.locale || 'en_US';

  function generatePageMetadata(options: PageMetadataOptions): Metadata {
    const url = options.path ? `${site.url}${options.path}` : site.url;
    const image = options.image || site.defaultImage;
    const title = options.title === site.name ? site.name : `${options.title} | ${site.name}`;

    const metadata: Metadata = {
      title,
      description: options.description,
      ...(options.keywords && { keywords: options.keywords }),
      ...(options.noIndex && { robots: { index: false, follow: false } }),
      openGraph: {
        title: options.title,
        description: options.description,
        url,
        siteName: site.name,
        locale,
        type: options.type || 'website',
        ...(image && { images: [{ url: image, width: 1200, height: 630, alt: options.title }] }),
        ...(options.publishedTime && { publishedTime: options.publishedTime }),
        ...(options.modifiedTime && { modifiedTime: options.modifiedTime }),
      },
      twitter: {
        card: 'summary_large_image',
        title: options.title,
        description: options.description,
        ...(image && { images: [image] }),
        ...(site.twitterHandle && { creator: site.twitterHandle }),
      },
      alternates: {
        canonical: url,
      },
    };

    return metadata;
  }

  function generateArticleMetadata(options: ArticleMetadataOptions): Metadata {
    const base = generatePageMetadata({ ...options, type: 'article' });
    return {
      ...base,
      openGraph: {
        ...base.openGraph,
        type: 'article',
        publishedTime: options.publishedTime,
        ...(options.modifiedTime && { modifiedTime: options.modifiedTime }),
        authors: [options.author],
        ...(options.tags && { tags: options.tags }),
        ...(options.section && { section: options.section }),
      },
    };
  }

  function generateRootMetadata(overrides?: Partial<Metadata>): Metadata {
    return {
      metadataBase: new URL(site.url),
      title: {
        default: site.name,
        template: `%s | ${site.name}`,
      },
      description: site.description || '',
      openGraph: {
        type: 'website',
        locale,
        url: site.url,
        siteName: site.name,
        ...(site.defaultImage && {
          images: [{ url: site.defaultImage, width: 1200, height: 630, alt: site.name }],
        }),
      },
      twitter: {
        card: 'summary_large_image',
        ...(site.twitterHandle && { creator: site.twitterHandle }),
      },
      ...overrides,
    };
  }

  return { generatePageMetadata, generateArticleMetadata, generateRootMetadata };
}
