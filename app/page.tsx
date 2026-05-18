import Link from 'next/link';
import { Heart, Search, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { AppHeader } from '@/components/app-header';
import { ListingCard } from '@/components/listing/listing-card';

const samples = [
  { title: 'TXT Blue Hour 太顯小卡', price: 450, tradeMode: 'BOTH' as const, memberTag: '太顯', albumEra: 'Blue Hour', condition: 'A級', meta: '官方 / 已到台 / 無折痕 / 可提供購買證明' },
  { title: 'The Chaos Chapter 休寧凱專卡', price: null, tradeMode: 'SWAP' as const, memberTag: '休寧凱', albumEra: 'Freeze', condition: '近全新', meta: '優先交換同系列秀彬或補差額交換。' },
  { title: 'Minisode 3 誠俊明信片組', price: 680, tradeMode: 'SELL' as const, memberTag: '誠俊', albumEra: 'Minisode 3', condition: '全新', meta: '未拆封，附原購買證明，支援超商取貨。' },
];

const trustItems = [
  { title: '單一賣家訂單', desc: '避免跨賣家拆帳風險，MVP 金流與物流狀態更清楚。', Icon: ShieldCheck },
  { title: '交換提案獨立流程', desc: '買賣產生 order，交換產生 swap_proposal，狀態機不混用。', Icon: Sparkles },
  { title: '超商取貨優先', desc: '預留綠界物流 C2C 門市清單、建單、託運單與狀態通知。', Icon: Truck },
];

export default function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
      <AppHeader />

      <section className="grid items-center gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-[#654f73] shadow-sm ring-1 ring-[#8f7aa2]/15">
            <Heart size={16} /> 韓系柔和收藏櫥窗 × 交易級 marketplace
          </div>
          <h1 className="max-w-3xl text-5xl font-black leading-[1.08] tracking-tight text-[#32283a] sm:text-6xl">
            為 TXT 周邊打造的買賣、交換與信任工作台
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#6f6677]">
            支援小卡、專輯、周邊小物；商品可標示可售、可換或售換皆可。MVP 採單一賣家訂單，金流預留綠界信用卡 / Apple Pay 與 LINE Pay，物流預留 7-ELEVEN / 全家 C2C。
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/listings" className="rounded-full bg-[#32283a] px-6 py-3 text-center font-bold text-white shadow-lg shadow-[#32283a]/20">開始瀏覽</Link>
            <Link href="/listings/new" className="rounded-full bg-white/75 px-6 py-3 text-center font-bold text-[#654f73] ring-1 ring-[#8f7aa2]/15">建立商品草稿</Link>
          </div>
        </div>
        <div className="k-card rounded-[36px] p-5">
          <ListingCard {...samples[0]} />
        </div>
      </section>

      <section id="trust" className="grid gap-4 md:grid-cols-3">
        {trustItems.map(({ title, desc, Icon }) => (
          <div key={title} className="k-card rounded-[28px] p-6">
            <Icon className="mb-4 text-[#8f7aa2]" />
            <h2 className="text-lg font-bold">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-[#6f6677]">{desc}</p>
          </div>
        ))}
      </section>

      <section id="listings" className="py-16">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-semibold text-[#8f7aa2]">NEW LISTINGS</p>
            <h2 className="mt-2 text-3xl font-black">近期熱門 TXT 周邊</h2>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/75 px-4 py-3 text-sm text-[#6f6677] ring-1 ring-[#8f7aa2]/15">
            <Search size={16} /> 搜尋成員、期別、版本
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {samples.map((item) => <ListingCard key={item.title} {...item} />)}
        </div>
      </section>
    </main>
  );
}
