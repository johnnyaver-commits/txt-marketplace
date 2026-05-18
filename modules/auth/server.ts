import { cookies } from 'next/headers';
import { env } from '@/lib/env';
import { prisma } from '@/lib/db/prisma';
import { assertDatabaseConfigured } from '@/lib/db/availability';
import { createPrismaAuthRepository } from './repository.prisma';
import { createAuthService } from './service';
import { ACCESS_COOKIE, REFRESH_COOKIE, authCookieOptions, clearCookieOptions } from './cookies';
import { verifyAccessToken } from './tokens';

export function getAuthService() {
  assertDatabaseConfigured();
  return createAuthService({
    repo: createPrismaAuthRepository(prisma),
    pepper: env.passwordPepper,
    accessSecret: env.jwtAccessSecret,
    refreshSecret: env.jwtRefreshSecret,
    accessExpires: env.jwtAccessExpires,
    refreshExpires: env.jwtRefreshExpires,
  });
}

export async function setAuthCookies(accessToken: string, refreshToken: string) {
  const jar = await cookies();
  jar.set(ACCESS_COOKIE, accessToken, { ...authCookieOptions(env.isProduction), maxAge: 15 * 60 });
  jar.set(REFRESH_COOKIE, refreshToken, { ...authCookieOptions(env.isProduction), maxAge: 30 * 24 * 60 * 60 });
}

export async function clearAuthCookies() {
  const jar = await cookies();
  jar.set(ACCESS_COOKIE, '', clearCookieOptions(env.isProduction));
  jar.set(REFRESH_COOKIE, '', clearCookieOptions(env.isProduction));
}

export async function getCurrentUserFromCookie() {
  const jar = await cookies();
  const accessToken = jar.get(ACCESS_COOKIE)?.value;
  if (!accessToken) return null;
  try {
    const payload = await verifyAccessToken(accessToken, env.jwtAccessSecret);
    return getAuthService().me(payload.userId);
  } catch {
    return null;
  }
}

export async function getRefreshTokenFromCookie() {
  const jar = await cookies();
  return jar.get(REFRESH_COOKIE)?.value ?? '';
}
