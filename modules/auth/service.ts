import { AuthError } from './errors';
import { hashPassword, verifyPassword } from './password';
import { loginSchema, registerSchema, type LoginInput, type RegisterInput } from './schemas';
import { createRefreshToken, expiresAtFromNow, hashRefreshToken, signAccessToken, type AuthRole } from './tokens';

export type AuthUserRecord = {
  id: string;
  email: string;
  passwordHash: string;
  role: AuthRole;
  status: 'ACTIVE' | 'SUSPENDED' | 'BANNED';
  profile: { nickname: string } | null;
};

export type AuthRepository = {
  findUserByEmail(email: string): Promise<AuthUserRecord | null>;
  findUserById(id: string): Promise<AuthUserRecord | null>;
  createUser(input: { email: string; passwordHash: string; nickname: string }): Promise<AuthUserRecord>;
  saveRefreshToken(input: { userId: string; tokenHash: string; expiresAt: Date }): Promise<void>;
  revokeRefreshToken(tokenHash: string): Promise<void>;
};

export type AuthServiceConfig = {
  repo: AuthRepository;
  pepper: string;
  accessSecret: string;
  refreshSecret: string;
  accessExpires: string;
  refreshExpires: string;
};

function publicUser(user: AuthUserRecord) {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    status: user.status,
    nickname: user.profile?.nickname ?? '',
  };
}

function parseRefreshDays(refreshExpires: string) {
  const match = refreshExpires.match(/^(\d+)d$/);
  return match ? Number(match[1]) : 30;
}

async function issueTokens(config: AuthServiceConfig, user: AuthUserRecord) {
  const accessToken = await signAccessToken({ userId: user.id, role: user.role }, config.accessSecret, config.accessExpires);
  const refreshToken = createRefreshToken();
  await config.repo.saveRefreshToken({ userId: user.id, tokenHash: hashRefreshToken(refreshToken), expiresAt: expiresAtFromNow(parseRefreshDays(config.refreshExpires)) });
  return { accessToken, refreshToken };
}

export function createAuthService(config: AuthServiceConfig) {
  return {
    async register(input: RegisterInput) {
      const parsed = registerSchema.parse(input);
      const existing = await config.repo.findUserByEmail(parsed.email);
      if (existing) throw new AuthError('EMAIL_ALREADY_EXISTS', '此 Email 已註冊');
      const user = await config.repo.createUser({ email: parsed.email, nickname: parsed.nickname, passwordHash: await hashPassword(parsed.password, config.pepper) });
      return { user: publicUser(user), ...(await issueTokens(config, user)) };
    },

    async login(input: LoginInput) {
      const parsed = loginSchema.parse(input);
      const user = await config.repo.findUserByEmail(parsed.email);
      if (!user) throw new AuthError('INVALID_CREDENTIALS', '帳號或密碼錯誤');
      if (user.status !== 'ACTIVE') throw new AuthError('USER_NOT_ACTIVE', '帳號目前無法登入');
      const valid = await verifyPassword(user.passwordHash, parsed.password, config.pepper);
      if (!valid) throw new AuthError('INVALID_CREDENTIALS', '帳號或密碼錯誤');
      return { user: publicUser(user), ...(await issueTokens(config, user)) };
    },

    async me(userId: string) {
      const user = await config.repo.findUserById(userId);
      if (!user) throw new AuthError('UNAUTHORIZED', '尚未登入');
      return publicUser(user);
    },

    async logout(refreshToken: string) {
      await config.repo.revokeRefreshToken(hashRefreshToken(refreshToken));
      return { loggedOut: true };
    },
  };
}
