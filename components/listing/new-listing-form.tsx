
'use client';

import { useState } from 'react';

const fields = [
  ['title', '商品名稱', '例如：TXT Blue Hour 太顯小卡'],
  ['price', '價格', '可交換商品可先留空'],
  ['albumEra', '期別 / 專輯', 'Blue Hour / Freeze / Minisode 3'],
  ['memberTag', '成員', '秀彬 / 誠俊 / 杋圭 / 太顯 / 休寧凱'],
  ['conditionGrade', '保存狀況', '全新 / A級 / 有瑕疵'],
  ['imageUrl', '圖片 URL', '先貼圖片網址，後續串上傳'],
] as const;

export function NewListingForm() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(formData: FormData) {
    setLoading(true);
    setMessage('');
    const price = String(formData.get('price') ?? '').trim();
    const imageUrl = String(formData.get('imageUrl') ?? '').trim();
    const body = {
      title: String(formData.get('title') ?? ''),
      category: String(formData.get('category') ?? 'PHOTOCARD'),
      tradeMode: String(formData.get('tradeMode') ?? 'BOTH'),
      price: price ? Number(price) : null,
      conditionGrade: String(formData.get('conditionGrade') ?? ''),
      albumEra: String(formData.get('albumEra') ?? ''),
      memberTag: String(formData.get('memberTag') ?? ''),
      isOfficial: true,
      description: String(formData.get('description') ?? ''),
      imageUrls: imageUrl ? [imageUrl] : ['https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=900&auto=format&fit=crop'],
    };
    const res = await fetch('/api/listings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const result = await res.json();
    setLoading(false);
    setMessage(result.success ? '商品已建立' : (result.error?.message ?? '建立失敗'));
  }

  return (
    <form action={submit} className="k-card space-y-6 rounded-[36px] p-6 sm:p-8">
      {message ? <div className="rounded-2xl bg-white/75 px-4 py-3 text-sm font-bold text-[#654f73] ring-1 ring-[#8f7aa2]/15">{message}</div> : null}
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map(([name, label, placeholder]) => (
          <label key={name} className="space-y-2">
            <span className="text-sm font-bold text-[#654f73]">{label}</span>
            <input name={name} placeholder={placeholder} className="w-full rounded-2xl border-0 bg-white/75 px-4 py-3 text-sm text-[#32283a] outline-none ring-1 ring-[#8f7aa2]/15 focus:ring-2 focus:ring-[#8f7aa2]/40" />
          </label>
        ))}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-bold text-[#654f73]">交易模式</span>
          <select name="tradeMode" className="w-full rounded-2xl border-0 bg-white/75 px-4 py-3 text-sm outline-none ring-1 ring-[#8f7aa2]/15">
            <option value="BOTH">售換皆可</option><option value="SELL">只販售</option><option value="SWAP">只交換</option>
          </select>
        </label>
        <label className="space-y-2">
          <span className="text-sm font-bold text-[#654f73]">分類</span>
          <select name="category" className="w-full rounded-2xl border-0 bg-white/75 px-4 py-3 text-sm outline-none ring-1 ring-[#8f7aa2]/15">
            <option value="PHOTOCARD">照片卡</option><option value="CD">CD / 專輯</option><option value="GOODS">周邊小物</option><option value="OTHER">其他</option>
          </select>
        </label>
      </div>
      <label className="block space-y-2">
        <span className="text-sm font-bold text-[#654f73]">商品描述</span>
        <textarea name="description" rows={6} placeholder="請描述官方/非官方、是否拆封、瑕疵、交換條件、可否提供購買證明。" className="w-full rounded-2xl border-0 bg-white/75 px-4 py-3 text-sm outline-none ring-1 ring-[#8f7aa2]/15 focus:ring-2 focus:ring-[#8f7aa2]/40" />
      </label>
      <button disabled={loading} className="w-full rounded-full bg-[#32283a] px-6 py-4 font-black text-white shadow-lg shadow-[#32283a]/20 disabled:opacity-50">儲存商品草稿</button>
    </form>
  );
}
