import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/70 bg-white/55 px-5 py-3 shadow-sm backdrop-blur-xl">
      <Link href="/" className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-[#32283a] text-white"><Sparkles size={18} /></div>
        <div>
          <p className="text-sm font-bold">TXT Trading Platform</p>
          <p className="text-xs text-[#6f6677]">MOA 周邊買賣與交換</p>
        </div>
      </Link>
      <nav className="hidden items-center gap-6 text-sm font-medium text-[#6f6677] md:flex">
        <Link href="/listings">商品列表</Link>
        <Link href="/listings/new">我要上架</Link>
        <Link href="/auth">登入 / 註冊</Link>
      </nav>
      <Link href="/listings/new" className="rounded-full bg-[#32283a] px-4 py-2 text-sm font-semibold text-white">建立商品</Link>
    </header>
  );
}
