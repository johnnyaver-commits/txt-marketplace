import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { AuthError } from '@/modules/auth/errors';
import { fail } from '@/lib/api-response';

export function jsonError(error: unknown) {
  if (error instanceof ZodError) {
    return NextResponse.json(fail('VALIDATION_ERROR', '欄位驗證失敗', error.flatten()), { status: 400 });
  }
  if (error instanceof AuthError) {
    const status = error.code === 'UNAUTHORIZED' || error.code === 'INVALID_CREDENTIALS' ? 401 : error.code === 'EMAIL_ALREADY_EXISTS' ? 409 : 400;
    return NextResponse.json(fail(error.code, error.message), { status });
  }
  console.error(error);
  return NextResponse.json(fail('INTERNAL_ERROR', '系統暫時無法處理請求'), { status: 500 });
}
