import { createListingSchema, type CreateListingInput } from './schemas';
import { ListingError } from './errors';

export type ListingStatus = 'DRAFT' | 'ACTIVE' | 'RESERVED' | 'SOLD' | 'SWAPPED' | 'INACTIVE' | 'REMOVED';
export type ListingRecord = CreateListingInput & {
  id: string;
  sellerId: string;
  status: ListingStatus;
  publishedAt: Date | null;
  images: { url: string; sortOrder: number }[];
};

export type ListListingsQuery = {
  q?: string;
  category?: CreateListingInput['category'];
  tradeMode?: CreateListingInput['tradeMode'];
  memberTag?: string;
  albumEra?: string;
  page?: number;
  pageSize?: number;
};

export type ListingRepository = {
  create(input: CreateListingInput & { sellerId: string; status: ListingStatus; publishedAt: Date }): Promise<ListingRecord>;
  findById(id: string): Promise<ListingRecord | null>;
  list(query: Required<Pick<ListListingsQuery, 'page' | 'pageSize'>> & Omit<ListListingsQuery, 'page' | 'pageSize'>): Promise<{ items: ListingRecord[]; total: number }>;
  update(id: string, input: Partial<CreateListingInput> & { status?: ListingStatus; deletedAt?: Date }): Promise<ListingRecord | null>;
};

function assertOwner(userId: string, listing: ListingRecord) {
  if (listing.sellerId !== userId) throw new ListingError('FORBIDDEN', '只能操作自己的商品');
}

export function createListingService(repo: ListingRepository) {
  return {
    async createListing(sellerId: string, input: CreateListingInput) {
      const parsed = createListingSchema.parse(input);
      return repo.create({ ...parsed, sellerId, status: 'ACTIVE', publishedAt: new Date() });
    },

    async getListing(id: string) {
      const listing = await repo.findById(id);
      if (!listing) throw new ListingError('NOT_FOUND', '找不到商品');
      return listing;
    },

    async listListings(query: ListListingsQuery) {
      return repo.list({ ...query, page: query.page ?? 1, pageSize: Math.min(query.pageSize ?? 20, 50) });
    },

    async updateListing(userId: string, id: string, input: Partial<CreateListingInput>) {
      const listing = await this.getListing(id);
      assertOwner(userId, listing);
      const updated = await repo.update(id, input);
      if (!updated) throw new ListingError('NOT_FOUND', '找不到商品');
      return updated;
    },

    async deleteListing(userId: string, id: string) {
      const listing = await this.getListing(id);
      assertOwner(userId, listing);
      const updated = await repo.update(id, { status: 'INACTIVE', deletedAt: new Date() });
      if (!updated) throw new ListingError('NOT_FOUND', '找不到商品');
      return updated;
    },
  };
}
