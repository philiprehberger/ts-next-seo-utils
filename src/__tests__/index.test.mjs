import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('next-seo-utils', async () => {
  const mod = await import('../../dist/index.mjs');

  it('exports createMetadataGenerator as a function', () => {
    assert.ok(typeof mod.createMetadataGenerator === 'function');
  });

  it('exports organizationJsonLd as a function', () => {
    assert.ok(typeof mod.organizationJsonLd === 'function');
  });

  it('exports faqJsonLd as a function', () => {
    assert.ok(typeof mod.faqJsonLd === 'function');
  });
});
