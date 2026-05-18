import Link from 'next/link';
import { Filter, Plus, Search } from 'lucide-react';
import { AppHeader } from '@/components/app-header';
import { ListingCard } from '@/components/listing/listing-card';
import { mockListings } from '@/modules/listings/mock-data';
import { listingToCardProps, type ListingViewRecord } from '@/modules/listings/view-model';

type ApiListingsResponse = { success: true; data: { items: ListingViewRecord[] } } | { success: false };

async function getListings() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!baseUrl) return mockListings;
    const res = await fetch(`${baseUrl}/api/listings`, { next: { revalidate: 60 } });
    const json = (await res.json()) as ApiListingsResponse;
    return json.success ? json.data.items : mockListings;
  } catch {
    return mockListings;
  }
}

export default async function ListingsPage() {
  const listings = await getListings();
  const cards = listings.map(listingToCardProps);

  return (
    <main className="min-h-screen px-5 py-6 sm:px-8 lg:px-10">
      <AppHeader />
      <section className="mx-auto max-w-7xl py-12">
        <div className="mb-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="font-semibold text-[#8f7aa2]">MARKETPLACE</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-[#32283a] sm:text-5xl">TXT 周邊商品列表</h1>
            <p className="mt-4 max-w-2xl leading-7 text-[#6f6677]">已優先讀取 `/api/listings`；尚未連接資料庫時，會自動顯示精選 mock 商品。</p>
          </div>
          <Link href="/listings/new" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#32283a] px-5 py-3 font-bold text-white shadow-lg shadow-[#32283a]/20"><Plus size={18} /> 我要上架</Link>
        </div>

        <div className="k-card mb-8 grid gap-3 rounded-[28px] p-4 md:grid-cols-[1fr_auto_auto]">
          <label className="flex items-center gap-3 rounded-2xl bg-white/70 px-4 py-3 text-[#6f6677] ring-1 ring-[#8f7aa2]/10">
            <Search size={18} />
            <input className="w-full bg-transparent text-sm outline-none placeholder:text-[#9b91a4]" placeholder="搜尋成員、期別、版本" />
          </label>
          <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#f3e9f7] px-4 py-3 text-sm font-bold text-[#654f73]"><Filter size={16} /> 篩選條件</button>
          <select className="rounded-2xl border-0 bg-white/75 px-4 py-3 text-sm font-bold text-[#654f73] outline-none ring-1 ring-[#8f7aa2]/10">
            <option>最新上架</option><option>價格低到高</option><option>可交換優先</option>
          </select>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => <ListingCard key={card.href} {...card} />)}
        </div>
      </section>
    </main>
  );
}
