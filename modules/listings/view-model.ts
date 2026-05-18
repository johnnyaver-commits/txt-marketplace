import type { TradeMode } from '@/components/listing/trade-mode-badge';

export type ListingViewRecord = {
  id: string;
  title: string;
  price?: number | null;
  tradeMode: TradeMode;
  memberTag?: string | null;
  albumEra?: string | null;
  conditionGrade: string;
  images: { url: string; sortOrder: number }[];
  description: string;
};

export const tradeModeLabels: Record<TradeMode, string> = {
  SELL: '可售',
  SWAP: '可換',
  BOTH: '售換皆可',
};

export function getTradeModeLabel(mode: TradeMode) {
  return tradeModeLabels[mode];
}

export function listingToCardProps(listing: ListingViewRecord) {
  return {
    href: `/listings/${listing.id}`,
    title: listing.title,
    price: listing.price,
    tradeMode: listing.tradeMode,
    memberTag: listing.memberTag ?? 'TXT',
    albumEra: listing.albumEra ?? '周邊',
    condition: listing.conditionGrade,
    coverUrl: listing.images[0]?.url ?? null,
    meta: listing.description,
  };
}
