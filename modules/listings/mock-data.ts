import type { ListingViewRecord } from './view-model';

export const mockListings: ListingViewRecord[] = [
  {
    id: 'blue-hour-taehyun-card',
    title: 'TXT Blue Hour 太顯小卡',
    price: 450,
    tradeMode: 'BOTH',
    memberTag: '太顯',
    albumEra: 'Blue Hour',
    conditionGrade: 'A級',
    images: [{ url: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=900&auto=format&fit=crop', sortOrder: 0 }],
    description: '官方 / 已到台 / 無折痕 / 可提供購買證明，優先交換同系列秀彬。',
  },
  {
    id: 'freeze-hueningkai-card',
    title: 'The Chaos Chapter 休寧凱專卡',
    price: null,
    tradeMode: 'SWAP',
    memberTag: '休寧凱',
    albumEra: 'Freeze',
    conditionGrade: '近全新',
    images: [{ url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=900&auto=format&fit=crop', sortOrder: 0 }],
    description: '交換優先，想換太顯或秀彬同期別小卡，可接受補差額。',
  },
  {
    id: 'minisode-yeonjun-postcard',
    title: 'Minisode 3 誠俊明信片組',
    price: 680,
    tradeMode: 'SELL',
    memberTag: '誠俊',
    albumEra: 'Minisode 3',
    conditionGrade: '全新',
    images: [{ url: 'https://images.unsplash.com/photo-1528459105426-b9548367069b?q=80&w=900&auto=format&fit=crop', sortOrder: 0 }],
    description: '未拆封，附原購買證明，支援 7-ELEVEN / 全家超商取貨。',
  },
  {
    id: 'sweet-beomgyu-lucky-draw',
    title: 'SWEET 杋圭 Lucky Draw',
    price: 1200,
    tradeMode: 'BOTH',
    memberTag: '杋圭',
    albumEra: 'SWEET',
    conditionGrade: 'A級',
    images: [{ url: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=900&auto=format&fit=crop', sortOrder: 0 }],
    description: '稀有特典卡，保存於卡套與硬卡夾，面交或高價宅配優先。',
  },
];

export function getMockListing(id: string) {
  return mockListings.find((listing) => listing.id === id) ?? null;
}
