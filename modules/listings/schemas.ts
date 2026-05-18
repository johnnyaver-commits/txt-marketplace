import { z } from 'zod';

export const tradeModeSchema = z.enum(['SELL', 'SWAP', 'BOTH']);
export const listingCategorySchema = z.enum(['CD', 'PHOTOCARD', 'GOODS', 'OTHER']);

export const createListingSchema = z.object({
  title: z.string().trim().min(2, '商品名稱至少 2 個字').max(80),
  category: listingCategorySchema,
  tradeMode: tradeModeSchema,
  price: z.number().int().min(1).max(20000).nullable().optional(),
  conditionGrade: z.string().trim().min(1).max(20),
  albumEra: z.string().trim().max(60).optional(),
  memberTag: z.string().trim().max(60).optional(),
  versionName: z.string().trim().max(60).optional(),
  isOfficial: z.boolean().default(false),
  proofNote: z.string().trim().max(200).optional(),
  description: z.string().trim().min(5).max(2000),
  imageUrls: z.array(z.string().url()).min(1).max(8),
}).superRefine((value, ctx) => {
  if ((value.tradeMode === 'SELL' || value.tradeMode === 'BOTH') && !value.price) {
    ctx.addIssue({ code: 'custom', path: ['price'], message: '可售商品必須填寫價格' });
  }
});

export type CreateListingInput = z.infer<typeof createListingSchema>;
