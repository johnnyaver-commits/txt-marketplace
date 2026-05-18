import { NextResponse } from 'next/server';
import { ok } from '@/lib/api-response';
import { jsonError } from '@/lib/http/errors';
import { getAuthService, setAuthCookies } from '@/modules/auth/server';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const result = await getAuthService().register(await request.json());
    await setAuthCookies(result.accessToken, result.refreshToken);
    return NextResponse.json(ok({ user: result.user }), { status: 201 });
  } catch (error) {
    return jsonError(error);
  }
}
