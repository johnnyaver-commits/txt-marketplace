function required(name: string, fallback?: string) {
  const value = process.env[name] ?? fallback;
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

export const env = {
  jwtAccessSecret: required('JWT_ACCESS_SECRET', 'dev-access-secret-change-me-at-least-32'),
  jwtRefreshSecret: required('JWT_REFRESH_SECRET', 'dev-refresh-secret-change-me-at-least-32'),
  jwtAccessExpires: process.env.JWT_ACCESS_EXPIRES ?? '15m',
  jwtRefreshExpires: process.env.JWT_REFRESH_EXPIRES ?? '30d',
  passwordPepper: required('BCRYPT_OR_ARGON2_PEPPER', 'dev-pepper-change-me'),
  isProduction: process.env.NODE_ENV === 'production',
};
