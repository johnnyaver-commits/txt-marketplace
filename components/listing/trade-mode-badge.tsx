const labelMap = {
  SELL: '可售',
  SWAP: '可換',
  BOTH: '售換皆可',
} as const;

export type TradeMode = keyof typeof labelMap;

export function TradeModeBadge({ mode }: { mode: TradeMode }) {
  return (
    <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#654f73] shadow-sm ring-1 ring-[#8f7aa2]/15">
      {labelMap[mode]}
    </span>
  );
}
