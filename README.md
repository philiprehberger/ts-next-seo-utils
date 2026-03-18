# @philiprehberger/next-seo-utils

[![CI](https://github.com/philiprehberger/next-seo-utils/actions/workflows/publish.yml/badge.svg)](https://github.com/philiprehberger/next-seo-utils/actions/workflows/publish.yml)
[![npm version](https://img.shields.io/npm/v/@philiprehberger/next-seo-utils.svg)](https://www.npmjs.com/package/@philiprehberger/next-seo-utils)
[![License](https://img.shields.io/github/license/philiprehberger/next-seo-utils)](LICENSE)

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


## Development

```bash
npm install
npm run build
npm test
```

## License

MIT
