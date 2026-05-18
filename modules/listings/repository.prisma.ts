import type { Prisma, PrismaClient } from '@prisma/client';
import type { ListListingsQuery, ListingRecord, ListingRepository, ListingStatus } from './service';

type PrismaListing = Prisma.ListingGetPayload<{ include: { images: { orderBy: { sortOrder: 'asc' } } } }>;

function mapListing(listing: PrismaListing): ListingRecord {
  return {
    id: listing.id,
    sellerId: listing.sellerId,
    title: listing.title,
    category: listing.category,
    tradeMode: listing.tradeMode,
    price: listing.price,
    conditionGrade: listing.conditionGrade,
    albumEra: listing.albumEra ?? undefined,
    memberTag: listing.memberTag ?? undefined,
    versionName: listing.versionName ?? undefined,
    isOfficial: listing.isOfficial,
    proofNote: listing.proofNote ?? undefined,
    description: listing.description,
    status: listing.status as ListingStatus,
    publishedAt: listing.publishedAt,
    images: listing.images.map((image) => ({ url: image.url, sortOrder: image.sortOrder })),
    imageUrls: listing.images.map((image) => image.url),
  };
}

function buildWhere(query: ListListingsQuery): Prisma.ListingWhereInput {
  return {
    status: 'ACTIVE',
    deletedAt: null,
    ...(query.q ? { OR: [{ title: { contains: query.q, mode: 'insensitive' } }, { description: { contains: query.q, mode: 'insensitive' } }] } : {}),
    ...(query.category ? { category: query.category } : {}),
    ...(query.tradeMode ? { OR: [{ tradeMode: query.tradeMode }, ...(query.tradeMode !== 'BOTH' ? [{ tradeMode: 'BOTH' as const }] : [])] } : {}),
    ...(query.memberTag ? { memberTag: { contains: query.memberTag, mode: 'insensitive' } } : {}),
    ...(query.albumEra ? { albumEra: { contains: query.albumEra, mode: 'insensitive' } } : {}),
  };
}

export function createPrismaListingRepository(prisma: PrismaClient): ListingRepository {
  return {
    async create(input) {
      const listing = await prisma.listing.create({
        data: {
          sellerId: input.sellerId,
          title: input.title,
          category: input.category,
          tradeMode: input.tradeMode,
          price: input.price,
          conditionGrade: input.conditionGrade,
          albumEra: input.albumEra,
          memberTag: input.memberTag,
          versionName: input.versionName,
          isOfficial: input.isOfficial,
          proofNote: input.proofNote,
          description: input.description,
          status: input.status,
          publishedAt: input.publishedAt,
          images: { create: input.imageUrls.map((url, index) => ({ url, sortOrder: index })) },
        },
        include: { images: { orderBy: { sortOrder: 'asc' } } },
      });
      return mapListing(listing);
    },
    async findById(id) {
      const listing = await prisma.listing.findUnique({ where: { id }, include: { images: { orderBy: { sortOrder: 'asc' } } } });
      return listing ? mapListing(listing) : null;
    },
    async list(query) {
      const where = buildWhere(query);
      const [items, total] = await Promise.all([
        prisma.listing.findMany({ where, include: { images: { orderBy: { sortOrder: 'asc' } } }, orderBy: { createdAt: 'desc' }, skip: (query.page - 1) * query.pageSize, take: query.pageSize }),
        prisma.listing.count({ where }),
      ]);
      return { items: items.map(mapListing), total };
    },
    async update(id, input) {
      const listing = await prisma.listing.update({
        where: { id },
        data: {
          title: input.title,
          category: input.category,
          tradeMode: input.tradeMode,
          price: input.price,
          conditionGrade: input.conditionGrade,
          albumEra: input.albumEra,
          memberTag: input.memberTag,
          versionName: input.versionName,
          isOfficial: input.isOfficial,
          proofNote: input.proofNote,
          description: input.description,
          status: input.status,
          deletedAt: input.deletedAt,
          ...(input.imageUrls ? { images: { deleteMany: {}, create: input.imageUrls.map((url, index) => ({ url, sortOrder: index })) } } : {}),
        },
        include: { images: { orderBy: { sortOrder: 'asc' } } },
      });
      return mapListing(listing);
    },
  };
}
