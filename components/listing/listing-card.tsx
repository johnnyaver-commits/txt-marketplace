import { formatTwd } from '@/lib/utils';
import { TradeModeBadge, type TradeMode } from './trade-mode-badge';

export type ListingCardProps = {
  title: string;
  price?: number | null;
  tradeMode: TradeMode;
  memberTag: string;
  albumEra: string;
  condition: string;
  coverGradient?: string;
  meta: string;
};

export function ListingCard(props: ListingCardProps) {
  return (
    <article className="k-card overflow-hidden rounded-[28px]">
      <div className={`relative aspect-square ${props.coverGradient ?? 'bg-gradient-to-br from-[#f7dce6] via-[#f0e7f6] to-[#cce8df]'}`}>
        <div className="absolute left-4 top-4"><TradeModeBadge mode={props.tradeMode} /></div>
        <div className="absolute inset-8 rounded-[24px] border border-white/70 bg-white/35 shadow-inner" />
        <div className="absolute bottom-5 left-5 rounded-2xl bg-white/80 px-4 py-2 text-sm font-semibold text-[#654f73]">
          TXT OFFICIAL
        </div>
      </div>
      <div className="space-y-4 p-5">
        <div className="flex flex-wrap gap-2">
          {[props.albumEra, props.memberTag, props.condition].map((chip) => (
            <span key={chip} className="rounded-full bg-[#f3e9f7] px-3 py-1 text-xs font-medium text-[#654f73]">{chip}</span>
          ))}
        </div>
        <div>
          <h3 className="text-lg font-bold leading-snug text-[#32283a]">{props.title}</h3>
          <p className="mt-2 text-sm leading-6 text-[#6f6677]">{props.meta}</p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <strong className="text-xl text-[#32283a]">{formatTwd(props.price)}</strong>
          <button className="rounded-full bg-[#efe7f3] px-4 py-2 text-sm font-semibold text-[#654f73] transition hover:bg-[#e6d8ed]">
            查看詳情
          </button>
        </div>
      </div>
    </article>
  );
}
