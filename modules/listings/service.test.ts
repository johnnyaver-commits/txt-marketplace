import { describe, expect, it } from 'vitest';
import { createListingService, type ListingRepository } from './service';

function createRepo(): ListingRepository {
  const listings = new Map<string, any>();
  return {
    async create(input) {
      const listing = { ...input, id: `listing-${listings.size + 1}`, status: 'ACTIVE' as const, publishedAt: new Date('2026-01-01'), images: input.imageUrls.map((url, index) => ({ url, sortOrder: index })) };
      listings.set(listing.id, listing);
      return listing;
    },
    async findById(id) {
      return listings.get(id) ?? null;
    },
    async list(query) {
      const items = [...listings.values()].filter((item) => !query.tradeMode || item.tradeMode === query.tradeMode || item.tradeMode === 'BOTH');
      return { items, total: items.length };
    },
    async update(id, input) {
      const current = listings.get(id);
      if (!current) return null;
      const updated = { ...current, ...input };
      listings.set(id, updated);
      return updated;
    },
  };
}

const validInput = {
  title: 'TXT Blue Hour 太顯小卡',
  category: 'PHOTOCARD' as const,
  tradeMode: 'BOTH' as const,
  price: 450,
  conditionGrade: 'A',
  albumEra: 'Blue Hour',
  memberTag: '太顯',
  isOfficial: true,
  description: '官方小卡，保存良好，可提供購買證明。',
  imageUrls: ['https://example.com/card.jpg'],
};

describe('listing service', () => {
  it('creates active listing for current seller', async () => {
    const service = createListingService(createRepo());
    const listing = await service.createListing('seller-1', validInput);

    expect(listing.sellerId).toBe('seller-1');
    expect(listing.status).toBe('ACTIVE');
    expect(listing.images).toHaveLength(1);
  });

  it('prevents non-owner from updating listing', async () => {
    const service = createListingService(createRepo());
    const listing = await service.createListing('seller-1', validInput);

    await expect(service.updateListing('seller-2', listing.id, { price: 500 })).rejects.toMatchObject({ code: 'FORBIDDEN' });
  });

  it('soft deletes owner listing by setting inactive status', async () => {
    const service = createListingService(createRepo());
    const listing = await service.createListing('seller-1', validInput);
    const deleted = await service.deleteListing('seller-1', listing.id);

    expect(deleted.status).toBe('INACTIVE');
  });

  it('filters list by swap-compatible trade mode', async () => {
    const repo = createRepo();
    const service = createListingService(repo);
    await service.createListing('seller-1', validInput);
    await service.createListing('seller-2', { ...validInput, title: '交換專用小卡', tradeMode: 'SWAP', price: undefined });

    const result = await service.listListings({ tradeMode: 'SWAP', page: 1, pageSize: 20 });
    expect(result.items).toHaveLength(2);
  });
});
