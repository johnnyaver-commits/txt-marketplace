# TXT Trading Platform SDD

## 目標
建立以 TXT 周邊商品為主的繁體中文 Web 平台，支援買賣、交換、訂單、評價、管理員後台，以及綠界 / LINE Pay / 超商物流整合。

## MVP 邊界
- 單一賣家單一訂單，不做跨賣家購物車與自動拆帳。
- 交換流程與購買流程分離：買賣產生 `Order`，交換產生 `SwapProposal`。
- Apple Pay / 信用卡走綠界 hosted checkout；LINE Pay 走官方 API；超商取貨走綠界物流 C2C。
- Web 平台、繁體中文、帳號密碼登入。

## 技術棧
- Next.js 15 App Router + Route Handlers
- TypeScript + Tailwind CSS
- PostgreSQL + Prisma 5.22
- Zod validation
- Argon2id + HttpOnly Cookie JWT
- S3-compatible storage 或 Vercel Blob
- GitHub + Vercel Preview / Production

## 核心資料模型
目前 `prisma/schema.prisma` 已建立：
- users, user_profiles, refresh_tokens
- listings, listing_images, favorites
- orders, order_items
- payment_transactions
- logistics_shipments
- swap_proposals, swap_proposal_items
- reviews, reports, admin_audit_logs

## 重要商業規則
1. `tradeMode` = `SELL` / `SWAP` / `BOTH`。
2. 可售商品必須有價格，交換-only 商品可無價格。
3. 訂單只允許同一 seller。
4. Webhook 必須先落 log / raw payload，再驗簽，再 idempotent 更新狀態。
5. LINE Pay `transactionId` 一律用 string。
6. 平台不得保存完整卡號、CVV 或 Apple Pay 原始敏感支付資料。
7. C2C 物流沒有標準逆物流；爭議與退貨需管理員流程。

## 第一階段開發順序
1. Auth：註冊、登入、登出、HttpOnly Cookie、refresh token rotation。（第一版已完成：register/login/logout/me、Argon2id、JWT cookies、refresh token hash）
2. Listings：上架、列表、詳情、編輯、下架、圖片儲存。
3. Orders：單一賣家建單、狀態機、庫存/商品狀態鎖定。
4. Payments：LINE Pay request/confirm、綠界 checkout、Webhook idempotency。
5. Logistics：門市清單、建立 C2C shipment、物流 webhook。
6. Swaps：交換提案、接受/拒絕/counter、交換狀態機。
7. Reviews/Admin：完成交易後互評、檢舉、後台 audit log。

## 完成定義
- 可以註冊/登入、上架、瀏覽搜尋、單一賣家下單。
- 可以跑 LINE Pay sandbox 與綠界 stage happy path。
- 可以完成綠界物流選店與建單。
- 可以送出並接受交換提案。
- 管理員可查看 webhook log、處理檢舉與下架商品。
