import { NextResponse } from 'next/server';
import { ok, fail } from '@/lib/api-response';
import { getCurrentUserFromCookie } from '@/modules/auth/server';

export const runtime = 'nodejs';

export async function GET() {
  const user = await getCurrentUserFromCookie();
  if (!user) return NextResponse.json(fail('UNAUTHORIZED', '尚未登入'), { status: 401 });
  return NextResponse.json(ok({ user }));
}
