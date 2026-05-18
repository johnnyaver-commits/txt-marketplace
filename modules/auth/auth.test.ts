import { describe, expect, it } from 'vitest';
import { loginSchema, registerSchema } from './schemas';
import { hashPassword, verifyPassword } from './password';
import { createAuthService, type AuthRepository } from './service';
import { signAccessToken, verifyAccessToken } from './tokens';

function createMemoryRepo(): AuthRepository {
  const users = new Map<string, { id: string; email: string; passwordHash: string; role: 'USER' | 'ADMIN' | 'MODERATOR'; status: 'ACTIVE' | 'SUSPENDED' | 'BANNED'; profile: { nickname: string } | null }>();
  return {
    async findUserByEmail(email) {
      return [...users.values()].find((user) => user.email === email) ?? null;
    },
    async findUserById(id) {
      return users.get(id) ?? null;
    },
    async createUser(input) {
      const user = { id: `user-${users.size + 1}`, email: input.email, passwordHash: input.passwordHash, role: 'USER' as const, status: 'ACTIVE' as const, profile: { nickname: input.nickname } };
      users.set(user.id, user);
      return user;
    },
    async saveRefreshToken() {},
    async revokeRefreshToken() {},
  };
}

describe('auth schemas', () => {
  it('normalizes register email and trims nickname', () => {
    const result = registerSchema.parse({ email: '  USER@Example.COM ', password: 'StrongPass123!', nickname: '  MOA小卡控  ' });
    expect(result.email).toBe('user@example.com');
    expect(result.nickname).toBe('MOA小卡控');
  });

  it('rejects weak login payload', () => {
    const result = loginSchema.safeParse({ email: 'bad', password: '' });
    expect(result.success).toBe(false);
  });
});

describe('password utilities', () => {
  it('hashes and verifies passwords with pepper', async () => {
    const hash = await hashPassword('StrongPass123!', 'pepper');
    expect(hash).not.toContain('StrongPass123!');
    await expect(verifyPassword(hash, 'StrongPass123!', 'pepper')).resolves.toBe(true);
    await expect(verifyPassword(hash, 'WrongPass123!', 'pepper')).resolves.toBe(false);
  });
});

describe('tokens', () => {
  it('signs and verifies access tokens', async () => {
    const token = await signAccessToken({ userId: 'user-1', role: 'USER' }, 'secret-secret-secret-secret', '15m');
    const payload = await verifyAccessToken(token, 'secret-secret-secret-secret');
    expect(payload.userId).toBe('user-1');
    expect(payload.role).toBe('USER');
  });
});

describe('auth service', () => {
  it('registers user and prevents duplicate emails', async () => {
    const service = createAuthService({ repo: createMemoryRepo(), pepper: 'pepper', accessSecret: 'secret-secret-secret-secret', refreshSecret: 'refresh-secret-secret', accessExpires: '15m', refreshExpires: '30d' });
    const first = await service.register({ email: 'user@example.com', password: 'StrongPass123!', nickname: 'MOA小卡控' });
    expect(first.user.email).toBe('user@example.com');
    await expect(service.register({ email: 'USER@example.com', password: 'StrongPass123!', nickname: '其他人' })).rejects.toMatchObject({ code: 'EMAIL_ALREADY_EXISTS' });
  });

  it('logs in with correct password and rejects wrong password', async () => {
    const service = createAuthService({ repo: createMemoryRepo(), pepper: 'pepper', accessSecret: 'secret-secret-secret-secret', refreshSecret: 'refresh-secret-secret', accessExpires: '15m', refreshExpires: '30d' });
    await service.register({ email: 'user@example.com', password: 'StrongPass123!', nickname: 'MOA小卡控' });
    const login = await service.login({ email: 'USER@example.com', password: 'StrongPass123!' });
    expect(login.user.nickname).toBe('MOA小卡控');
    await expect(service.login({ email: 'user@example.com', password: 'WrongPass123!' })).rejects.toMatchObject({ code: 'INVALID_CREDENTIALS' });
  });
});
