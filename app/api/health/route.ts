import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({ ok: true, service: 'txt-marketplace', timestamp: new Date().toISOString() });
}
