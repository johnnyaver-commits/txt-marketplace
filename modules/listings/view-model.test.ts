import { describe, expect, it } from 'vitest';
import { getTradeModeLabel, listingToCardProps } from './view-model';

describe('listing view model', () => {
  it('maps trade mode to zh-Hant label', () => {
    expect(getTradeModeLabel('SELL')).toBe('可售');
    expect(getTradeModeLabel('SWAP')).toBe('可換');
    expect(getTradeModeLabel('BOTH')).toBe('售換皆可');
  });

  it('converts listing records to card props', () => {
    const card = listingToCardProps({
      id: 'listing-1',
      title: 'TXT Blue Hour 太顯小卡',
      price: 450,
      tradeMode: 'BOTH',
      memberTag: '太顯',
      albumEra: 'Blue Hour',
      conditionGrade: 'A級',
      images: [{ url: 'https://example.com/card.jpg', sortOrder: 0 }],
      description: '官方 / 已到台 / 無折痕',
    });

    expect(card.href).toBe('/listings/listing-1');
    expect(card.coverUrl).toBe('https://example.com/card.jpg');
    expect(card.meta).toContain('官方');
  });
});
