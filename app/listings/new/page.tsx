import { AppHeader } from '@/components/app-header';
import { NewListingForm } from '@/components/listing/new-listing-form';

export default function NewListingPage() {
  return (
    <main className="min-h-screen px-5 py-6 sm:px-8 lg:px-10">
      <AppHeader />
      <section className="mx-auto max-w-4xl py-12">
        <div className="mb-8">
          <p className="font-semibold text-[#8f7aa2]">SELL / SWAP</p>
          <h1 className="mt-2 text-4xl font-black text-[#32283a]">建立商品草稿</h1>
          <p className="mt-4 leading-7 text-[#6f6677]">表單已串接 `POST /api/listings`。目前若 Vercel 尚未接資料庫，會顯示資料庫尚未連接提示。</p>
        </div>
        <NewListingForm />
      </section>
    </main>
  );
}
