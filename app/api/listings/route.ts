import { NextResponse } from 'next/server';
import { ok, fail } from '@/lib/api-response';
import { getCurrentUserFromCookie } from '@/modules/auth/server';
import { listingJsonError } from '@/modules/listings/http';
import { getListingService } from '@/modules/listings/server';
import { listingCategorySchema, tradeModeSchema } from '@/modules/listings/schemas';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const tradeMode = url.searchParams.get('tradeMode');
    const category = url.searchParams.get('category');
    const result = await getListingService().listListings({
      q: url.searchParams.get('q') ?? undefined,
      tradeMode: tradeMode ? tradeModeSchema.parse(tradeMode) : undefined,
      category: category ? listingCategorySchema.parse(category) : undefined,
      memberTag: url.searchParams.get('memberTag') ?? undefined,
      albumEra: url.searchParams.get('albumEra') ?? undefined,
      page: Number(url.searchParams.get('page') ?? 1),
      pageSize: Number(url.searchParams.get('pageSize') ?? 20),
    });
    return NextResponse.json(ok({ ...result, pagination: { page: Number(url.searchParams.get('page') ?? 1), pageSize: Number(url.searchParams.get('pageSize') ?? 20), total: result.total } }));
  } catch (error) {
    return listingJsonError(error);
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUserFromCookie();
    if (!user) return NextResponse.json(fail('UNAUTHORIZED', '尚未登入'), { status: 401 });
    const listing = await getListingService().createListing(user.id, await request.json());
    return NextResponse.json(ok({ listing }), { status: 201 });
  } catch (error) {
    return listingJsonError(error);
  }
}
