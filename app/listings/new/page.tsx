import { AppHeader } from '@/components/app-header';

const fields = [
  ['title', '商品名稱', '例如：TXT Blue Hour 太顯小卡'],
  ['price', '價格', '可交換商品可先留空'],
  ['albumEra', '期別 / 專輯', 'Blue Hour / Freeze / Minisode 3'],
  ['memberTag', '成員', '秀彬 / 誠俊 / 杋圭 / 太顯 / 休寧凱'],
  ['conditionGrade', '保存狀況', '全新 / A級 / 有瑕疵'],
  ['imageUrl', '圖片 URL', '先貼圖片網址，後續串上傳'],
];

export default function NewListingPage() {
  return (
    <main className="min-h-screen px-5 py-6 sm:px-8 lg:px-10">
      <AppHeader />
      <section className="mx-auto max-w-4xl py-12">
        <div className="mb-8">
          <p className="font-semibold text-[#8f7aa2]">SELL / SWAP</p>
          <h1 className="mt-2 text-4xl font-black text-[#32283a]">建立商品草稿</h1>
          <p className="mt-4 leading-7 text-[#6f6677]">此頁先完成前端表單 UI；接上資料庫後會直接呼叫 `POST /api/listings` 上架。</p>
        </div>
        <form className="k-card space-y-6 rounded-[36px] p-6 sm:p-8">
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
              <select className="w-full rounded-2xl border-0 bg-white/75 px-4 py-3 text-sm outline-none ring-1 ring-[#8f7aa2]/15">
                <option value="BOTH">售換皆可</option>
                <option value="SELL">只販售</option>
                <option value="SWAP">只交換</option>
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-sm font-bold text-[#654f73]">分類</span>
              <select className="w-full rounded-2xl border-0 bg-white/75 px-4 py-3 text-sm outline-none ring-1 ring-[#8f7aa2]/15">
                <option value="PHOTOCARD">照片卡</option>
                <option value="CD">CD / 專輯</option>
                <option value="GOODS">周邊小物</option>
                <option value="OTHER">其他</option>
              </select>
            </label>
          </div>
          <label className="block space-y-2">
            <span className="text-sm font-bold text-[#654f73]">商品描述</span>
            <textarea rows={6} placeholder="請描述官方/非官方、是否拆封、瑕疵、交換條件、可否提供購買證明。" className="w-full rounded-2xl border-0 bg-white/75 px-4 py-3 text-sm outline-none ring-1 ring-[#8f7aa2]/15 focus:ring-2 focus:ring-[#8f7aa2]/40" />
          </label>
          <button type="button" className="w-full rounded-full bg-[#32283a] px-6 py-4 font-black text-white shadow-lg shadow-[#32283a]/20">儲存商品草稿</button>
        </form>
      </section>
    </main>
  );
}
