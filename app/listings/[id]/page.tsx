import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ShieldCheck, ShoppingBag, Repeat2 } from 'lucide-react';
import { AppHeader } from '@/components/app-header';
import { TradeModeBadge } from '@/components/listing/trade-mode-badge';
import { formatTwd } from '@/lib/utils';
import { getMockListing } from '@/modules/listings/mock-data';

export default async function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const listing = getMockListing(id);
  if (!listing) notFound();

  return (
    <main className="min-h-screen px-5 py-6 sm:px-8 lg:px-10">
      <AppHeader />
      <section className="mx-auto max-w-7xl py-10">
        <Link href="/listings" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[#654f73]"><ArrowLeft size={16} /> 回商品列表</Link>
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="k-card overflow-hidden rounded-[36px] p-4">
            <div className="relative aspect-square overflow-hidden rounded-[28px] bg-[#f0e7f6]">
              <Image src={listing.images[0]!.url} alt={listing.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          </div>
          <div className="k-card rounded-[36px] p-6 sm:p-8">
            <div className="mb-5 flex flex-wrap gap-2">
              <TradeModeBadge mode={listing.tradeMode} />
              {[listing.albumEra, listing.memberTag, listing.conditionGrade].map((chip) => <span key={chip ?? ''} className="rounded-full bg-[#f3e9f7] px-3 py-1 text-xs font-bold text-[#654f73]">{chip}</span>)}
            </div>
            <h1 className="text-4xl font-black leading-tight text-[#32283a]">{listing.title}</h1>
            <p className="mt-4 text-3xl font-black text-[#32283a]">{formatTwd(listing.price)}</p>
            <p className="mt-5 text-base leading-8 text-[#6f6677]">{listing.description}</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button className="inline-flex items-center justify-center gap-2 rounded-full bg-[#32283a] px-5 py-3 font-bold text-white"><ShoppingBag size={18} /> 立即購買</button>
              <button className="inline-flex items-center justify-center gap-2 rounded-full bg-[#efe7f3] px-5 py-3 font-bold text-[#654f73]"><Repeat2 size={18} /> 提出交換</button>
            </div>

            <div className="mt-8 rounded-[24px] bg-white/65 p-5 ring-1 ring-[#8f7aa2]/10">
              <div className="flex items-center gap-3 font-bold text-[#32283a]"><ShieldCheck className="text-[#8f7aa2]" /> 交易提醒</div>
              <p className="mt-2 text-sm leading-6 text-[#6f6677]">MVP 採單一賣家訂單，後續會串接 LINE Pay、綠界信用卡 / Apple Pay 與超商 C2C 物流。</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
