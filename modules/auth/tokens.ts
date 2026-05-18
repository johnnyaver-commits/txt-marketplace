import { SignJWT, jwtVerify } from 'jose';
import { createHash, randomUUID } from 'node:crypto';

export type AuthRole = 'USER' | 'ADMIN' | 'MODERATOR';
export type AccessTokenPayload = { userId: string; role: AuthRole };

function secretKey(secret: string) {
  return new TextEncoder().encode(secret);
}

export async function signAccessToken(payload: AccessTokenPayload, secret: string, expiresIn: string) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(payload.userId)
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secretKey(secret));
}

export async function verifyAccessToken(token: string, secret: string) {
  const { payload } = await jwtVerify(token, secretKey(secret));
  return { userId: String(payload.userId), role: payload.role as AuthRole } satisfies AccessTokenPayload;
}

export function createRefreshToken() {
  return randomUUID() + randomUUID();
}

export function hashRefreshToken(token: string) {
  return createHash('sha256').update(token).digest('hex');
}

export function expiresAtFromNow(days: number) {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
}
