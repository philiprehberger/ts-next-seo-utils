# @philiprehberger/next-seo-utils

[![CI](https://github.com/philiprehberger/ts-next-seo-utils/actions/workflows/ci.yml/badge.svg)](https://github.com/philiprehberger/ts-next-seo-utils/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@philiprehberger/next-seo-utils.svg)](https://www.npmjs.com/package/@philiprehberger/next-seo-utils)
[![License](https://img.shields.io/github/license/philiprehberger/ts-next-seo-utils)](LICENSE)

Next.js SEO utilities: metadata generators, JSON-LD schemas, and Open Graph helpers

## Installation

```bash
npm install @philiprehberger/next-seo-utils
```

## Usage

### Metadata Generator

```ts
import { createMetadataGenerator } from '@philiprehberger/next-seo-utils';

const seo = createMetadataGenerator({
  name: 'My Site',
  url: 'https://example.com',
  description: 'My awesome site',
  twitterHandle: '@myhandle',
  defaultImage: 'https://example.com/og.jpg',
});

// In a Next.js page:
export const metadata = seo.generatePageMetadata({
  title: 'About',
  description: 'About us page',
  path: '/about',
});

// Root layout:
export const metadata = seo.generateRootMetadata();
```

### JSON-LD Structured Data

```ts
import { organizationJsonLd, faqJsonLd, breadcrumbJsonLd, jsonLdScript } from '@philiprehberger/next-seo-utils';

const org = organizationJsonLd({
  name: 'My Company',
  url: 'https://example.com',
  logo: 'https://example.com/logo.png',
});

const faq = faqJsonLd([
  { question: 'What do you do?', answer: 'We build software.' },
]);

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Home', url: 'https://example.com' },
  { name: 'About', url: 'https://example.com/about' },
]);

// Render as script tag
const scriptTag = jsonLdScript(org);
```

## API

### Metadata

| Function | Signature | Description |
|----------|-----------|-------------|
| `createMetadataGenerator` | `(site: SiteConfig) => { generatePageMetadata, generateArticleMetadata, generateRootMetadata }` | Create a metadata generator bound to your site config. |

#### Returned methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `generatePageMetadata` | `(options: PageMetadataOptions) => Metadata` | Generate metadata for a single page. |
| `generateArticleMetadata` | `(options: ArticleMetadataOptions) => Metadata` | Generate article-specific metadata with Open Graph article fields. |
| `generateRootMetadata` | `(overrides?: Partial<Metadata>) => Metadata` | Generate root layout metadata with title template. |

### JSON-LD

| Function | Signature | Description |
|----------|-----------|-------------|
| `organizationJsonLd` | `(org: OrganizationConfig) => JsonLdBase` | Organization structured data. |
| `websiteJsonLd` | `(site: SiteConfig) => JsonLdBase` | WebSite structured data. |
| `breadcrumbJsonLd` | `(items: BreadcrumbItem[]) => JsonLdBase` | Breadcrumb navigation structured data. |
| `articleJsonLd` | `(options) => JsonLdBase` | Article structured data. |
| `faqJsonLd` | `(items: FAQItem[]) => JsonLdBase` | FAQ page structured data. |
| `serviceJsonLd` | `(service: ServiceItem, provider) => JsonLdBase` | Service structured data. |
| `localBusinessJsonLd` | `(options) => JsonLdBase` | Local business structured data. |
| `reviewAggregateJsonLd` | `(itemName: string, reviews: ReviewItem[], itemType?: string) => JsonLdBase` | Aggregate review structured data. |
| `jsonLdScript` | `(data: JsonLdBase \| JsonLdBase[]) => string` | Wrap JSON-LD data in a `<script>` tag string. |

## Development

```bash
npm install
npm run build
npm test
```

## License

MIT
