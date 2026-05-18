import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { fail } from '@/lib/api-response';
import { ServiceUnavailableError } from '@/lib/db/availability';
import { ListingError } from './errors';

export function listingJsonError(error: unknown) {
  if (error instanceof ZodError) return NextResponse.json(fail('VALIDATION_ERROR', '欄位驗證失敗', error.flatten()), { status: 400 });
  if (error instanceof ListingError) {
    const status = error.code === 'NOT_FOUND' ? 404 : error.code === 'FORBIDDEN' ? 403 : 400;
    return NextResponse.json(fail(error.code, error.message), { status });
  }
  if (error instanceof ServiceUnavailableError) return NextResponse.json(fail('DATABASE_NOT_CONFIGURED', error.message), { status: 503 });
  console.error(error);
  return NextResponse.json(fail('INTERNAL_ERROR', '系統暫時無法處理請求'), { status: 500 });
}
