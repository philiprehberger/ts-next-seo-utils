import type {
  OrganizationConfig,
  SiteConfig,
  BreadcrumbItem,
  FAQItem,
  ServiceItem,
  ReviewItem,
  JsonLdBase,
} from './types';

export function organizationJsonLd(org: OrganizationConfig): JsonLdBase {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: org.name,
    url: org.url,
    ...(org.logo && { logo: org.logo }),
    ...(org.sameAs && { sameAs: org.sameAs }),
    ...(org.contactEmail && {
      contactPoint: {
        '@type': 'ContactPoint',
        email: org.contactEmail,
        ...(org.contactPhone && { telephone: org.contactPhone }),
        contactType: 'customer service',
      },
    }),
    ...(org.address && {
      address: {
        '@type': 'PostalAddress',
        ...(org.address.street && { streetAddress: org.address.street }),
        ...(org.address.city && { addressLocality: org.address.city }),
        ...(org.address.state && { addressRegion: org.address.state }),
        ...(org.address.zip && { postalCode: org.address.zip }),
        ...(org.address.country && { addressCountry: org.address.country }),
      },
    }),
  };
}

export function websiteJsonLd(site: SiteConfig): JsonLdBase {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.url,
    ...(site.description && { description: site.description }),
  };
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]): JsonLdBase {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function articleJsonLd(options: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  publisher: { name: string; logo?: string };
}): JsonLdBase {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: options.title,
    description: options.description,
    url: options.url,
    ...(options.image && { image: options.image }),
    datePublished: options.datePublished,
    ...(options.dateModified && { dateModified: options.dateModified }),
    author: { '@type': 'Person', name: options.author },
    publisher: {
      '@type': 'Organization',
      name: options.publisher.name,
      ...(options.publisher.logo && {
        logo: { '@type': 'ImageObject', url: options.publisher.logo },
      }),
    },
  };
}

export function faqJsonLd(items: FAQItem[]): JsonLdBase {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function serviceJsonLd(
  service: ServiceItem,
  provider: { name: string; url: string }
): JsonLdBase {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: { '@type': 'Organization', name: provider.name, url: provider.url },
    ...(service.url && { url: service.url }),
    ...(service.image && { image: service.image }),
    ...(service.price && {
      offers: {
        '@type': 'Offer',
        price: service.price,
        priceCurrency: service.priceCurrency || 'USD',
      },
    }),
  };
}

export function localBusinessJsonLd(options: {
  name: string;
  url: string;
  description?: string;
  image?: string;
  telephone?: string;
  email?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  geo?: { latitude: number; longitude: number };
  openingHours?: string[];
  priceRange?: string;
}): JsonLdBase {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: options.name,
    url: options.url,
    ...(options.description && { description: options.description }),
    ...(options.image && { image: options.image }),
    ...(options.telephone && { telephone: options.telephone }),
    ...(options.email && { email: options.email }),
    address: {
      '@type': 'PostalAddress',
      streetAddress: options.address.street,
      addressLocality: options.address.city,
      addressRegion: options.address.state,
      postalCode: options.address.zip,
      addressCountry: options.address.country,
    },
    ...(options.geo && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: options.geo.latitude,
        longitude: options.geo.longitude,
      },
    }),
    ...(options.openingHours && { openingHoursSpecification: options.openingHours }),
    ...(options.priceRange && { priceRange: options.priceRange }),
  };
}

export function reviewAggregateJsonLd(
  itemName: string,
  reviews: ReviewItem[],
  itemType = 'Organization'
): JsonLdBase {
  const ratings = reviews.map((r) => r.rating);
  const avgRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;

  return {
    '@context': 'https://schema.org',
    '@type': itemType,
    name: itemName,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: avgRating.toFixed(1),
      bestRating: '5',
      worstRating: '1',
      ratingCount: reviews.length,
    },
    review: reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: '5' },
      reviewBody: r.body,
      ...(r.datePublished && { datePublished: r.datePublished }),
    })),
  };
}

export function jsonLdScript(data: JsonLdBase | JsonLdBase[]): string {
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}
