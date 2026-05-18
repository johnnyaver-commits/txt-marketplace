import { NextResponse } from 'next/server';
import { ok } from '@/lib/api-response';
import { jsonError } from '@/lib/http/errors';
import { clearAuthCookies, getAuthService, getRefreshTokenFromCookie } from '@/modules/auth/server';

export const runtime = 'nodejs';

export async function POST() {
  try {
    const refreshToken = await getRefreshTokenFromCookie();
    if (refreshToken) await getAuthService().logout(refreshToken);
    await clearAuthCookies();
    return NextResponse.json(ok({ loggedOut: true }));
  } catch (error) {
    return jsonError(error);
  }
}
