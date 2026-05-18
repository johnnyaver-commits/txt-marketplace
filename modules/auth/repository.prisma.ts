import type { Prisma, PrismaClient } from '@prisma/client';
import type { AuthRepository, AuthUserRecord } from './service';

type UserWithProfile = Prisma.UserGetPayload<{ include: { profile: true } }>;

function mapUser(user: UserWithProfile | null): AuthUserRecord | null {
  if (!user) return null;
  return {
    id: user.id,
    email: user.email,
    passwordHash: user.passwordHash,
    role: user.role,
    status: user.status,
    profile: user.profile ? { nickname: user.profile.nickname } : null,
  };
}

export function createPrismaAuthRepository(prisma: PrismaClient): AuthRepository {
  return {
    async findUserByEmail(email) {
      const user = await prisma.user.findUnique({ where: { email }, include: { profile: true } });
      return mapUser(user);
    },
    async findUserById(id) {
      const user = await prisma.user.findUnique({ where: { id }, include: { profile: true } });
      return mapUser(user);
    },
    async createUser(input) {
      const user = await prisma.user.create({
        data: {
          email: input.email,
          passwordHash: input.passwordHash,
          profile: { create: { nickname: input.nickname } },
        },
        include: { profile: true },
      });
      return mapUser(user)!;
    },
    async saveRefreshToken(input) {
      await prisma.refreshToken.create({ data: input });
    },
    async revokeRefreshToken(tokenHash) {
      await prisma.refreshToken.updateMany({ where: { tokenHash, revokedAt: null }, data: { revokedAt: new Date() } });
    },
  };
}
