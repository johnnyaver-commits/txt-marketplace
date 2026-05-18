import { prisma } from '@/lib/db/prisma';
import { hasDatabaseUrl, ServiceUnavailableError } from '@/lib/db/availability';
import { mockListings } from './mock-data';
import { createPrismaListingRepository } from './repository.prisma';
import { createListingService } from './service';
import type { ListingRecord, ListingRepository } from './service';

function toRecord(item: (typeof mockListings)[number]): ListingRecord {
  return {
    ...item,
    category: 'PHOTOCARD',
    isOfficial: true,
    sellerId: 'mock-seller',
    status: 'ACTIVE',
    publishedAt: new Date('2026-01-01'),
    imageUrls: item.images.map((image) => image.url),
    memberTag: item.memberTag ?? undefined,
    albumEra: item.albumEra ?? undefined,
    price: item.price ?? undefined,
  };
}

function createMockListingRepository(): ListingRepository {
  return {
    async create() {
      throw new ServiceUnavailableError('目前尚未連接資料庫，暫時無法線上上架商品');
    },
    async findById(id) {
      const listing = mockListings.find((item) => item.id === id);
      if (!listing) return null;
      return listing ? toRecord(listing) : null;
    },
    async list(query) {
      const filtered = mockListings.filter((item) => {
        const tradeMatch = !query.tradeMode || item.tradeMode === query.tradeMode || item.tradeMode === 'BOTH';
        const categoryMatch = !query.category || query.category === 'PHOTOCARD';
        const memberMatch = !query.memberTag || item.memberTag?.includes(query.memberTag);
        const eraMatch = !query.albumEra || item.albumEra?.includes(query.albumEra);
        const qMatch = !query.q || `${item.title} ${item.description}`.toLowerCase().includes(query.q.toLowerCase());
        return tradeMatch && categoryMatch && memberMatch && eraMatch && qMatch;
      });
      return {
        items: filtered.slice((query.page - 1) * query.pageSize, query.page * query.pageSize).map(toRecord),
        total: filtered.length,
      };
    },
    async update() {
      throw new ServiceUnavailableError('目前尚未連接資料庫，暫時無法線上編輯商品');
    },
  };
}

export function getListingService() {
  const repo = hasDatabaseUrl() ? createPrismaListingRepository(prisma) : createMockListingRepository();
  return createListingService(repo);
}
