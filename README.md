# TXT Trading Platform

以 TXT 周邊商品為主的繁體中文買賣與交換平台。設計方向是韓系柔和收藏櫥窗 + 交易級 marketplace。

## Stack

- Next.js 15 App Router
- React 19 / TypeScript
- Tailwind CSS 4
- PostgreSQL + Prisma 5.22
- Zod / Vitest
- LINE Pay、綠界金流、綠界物流整合預留

## Local Development

```bash
pnpm install
cp .env.example .env.local
pnpm prisma:generate
pnpm dev
```

開啟 http://localhost:3000

## Commands

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Project Structure

```txt
app/                  Next.js pages and route handlers
components/           UI components
modules/              Domain modules and tests
integrations/         Third-party providers (planned)
lib/                  Shared utilities
prisma/schema.prisma  Database schema
docs/SDD.md           System design document
```

## Auth API

目前已完成第一版會員 API：

- `POST /api/auth/register`：註冊並設定 HttpOnly cookies
- `POST /api/auth/login`：登入並設定 HttpOnly cookies
- `POST /api/auth/logout`：撤銷 refresh token 並清除 cookies
- `GET /api/me`：讀取目前登入會員

安全設計：

- 密碼使用 Argon2id + pepper
- Access token / refresh token 存 HttpOnly Cookie
- refresh token 只存 SHA-256 hash
- Auth service 可注入 repository，方便測試與未來替換資料層

## MVP Rule

第一版只做「單一賣家單一訂單」，不做跨賣家購物車或平台自動拆帳，避免金流平台商法遵與對帳風險。
