import { NextResponse } from 'next/server';
import { ok } from '@/lib/api-response';
import { jsonError } from '@/lib/http/errors';
import { getAuthService, setAuthCookies } from '@/modules/auth/server';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const result = await getAuthService().login(await request.json());
    await setAuthCookies(result.accessToken, result.refreshToken);
    return NextResponse.json(ok({ user: result.user }));
  } catch (error) {
    return jsonError(error);
  }
}
