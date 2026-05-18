import { describe, expect, it } from 'vitest';
import { createListingSchema } from './schemas';

describe('createListingSchema', () => {
  it('requires price when tradeMode is SELL', () => {
    const result = createListingSchema.safeParse({
      title: 'TXT Blue Hour 小卡',
      category: 'PHOTOCARD',
      tradeMode: 'SELL',
      conditionGrade: 'A',
      description: '官方小卡，保存良好。',
      imageUrls: ['https://example.com/card.jpg'],
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toEqual(['price']);
  });

  it('accepts swap-only listing without price', () => {
    const result = createListingSchema.safeParse({
      title: 'TXT Blue Hour 小卡',
      category: 'PHOTOCARD',
      tradeMode: 'SWAP',
      conditionGrade: 'A',
      description: '想交換太顯同系列小卡。',
      imageUrls: ['https://example.com/card.jpg'],
    });

    expect(result.success).toBe(true);
  });
});
