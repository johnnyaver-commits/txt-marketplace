import type { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export const ACCESS_COOKIE = 'txt_access_token';
export const REFRESH_COOKIE = 'txt_refresh_token';

export function authCookieOptions(isProduction: boolean): Partial<ResponseCookie> {
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
  };
}

export function clearCookieOptions(isProduction: boolean): Partial<ResponseCookie> {
  return {
    ...authCookieOptions(isProduction),
    maxAge: 0,
  };
}
