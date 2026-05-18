import { prisma } from '@/lib/db/prisma';
import { createPrismaListingRepository } from './repository.prisma';
import { createListingService } from './service';

export function getListingService() {
  return createListingService(createPrismaListingRepository(prisma));
}
