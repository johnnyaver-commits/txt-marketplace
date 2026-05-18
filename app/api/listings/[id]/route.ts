import { NextResponse } from 'next/server';
import { ok, fail } from '@/lib/api-response';
import { getCurrentUserFromCookie } from '@/modules/auth/server';
import { listingJsonError } from '@/modules/listings/http';
import { getListingService } from '@/modules/listings/server';

export const runtime = 'nodejs';

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: Params) {
  try {
    const { id } = await context.params;
    const listing = await getListingService().getListing(id);
    return NextResponse.json(ok({ listing }));
  } catch (error) {
    return listingJsonError(error);
  }
}

export async function PATCH(request: Request, context: Params) {
  try {
    const user = await getCurrentUserFromCookie();
    if (!user) return NextResponse.json(fail('UNAUTHORIZED', '尚未登入'), { status: 401 });
    const { id } = await context.params;
    const listing = await getListingService().updateListing(user.id, id, await request.json());
    return NextResponse.json(ok({ listing }));
  } catch (error) {
    return listingJsonError(error);
  }
}

export async function DELETE(_request: Request, context: Params) {
  try {
    const user = await getCurrentUserFromCookie();
    if (!user) return NextResponse.json(fail('UNAUTHORIZED', '尚未登入'), { status: 401 });
    const { id } = await context.params;
    const listing = await getListingService().deleteListing(user.id, id);
    return NextResponse.json(ok({ listing }));
  } catch (error) {
    return listingJsonError(error);
  }
}
