import { AppHeader } from '@/components/app-header';

export default function AuthPage() {
  return (
    <main className="min-h-screen px-5 py-6 sm:px-8 lg:px-10">
      <AppHeader />
      <section className="mx-auto grid max-w-6xl items-center gap-8 py-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="font-semibold text-[#8f7aa2]">MEMBER CENTER</p>
          <h1 className="mt-2 text-4xl font-black leading-tight text-[#32283a] sm:text-5xl">登入後即可收藏、上架與提出交換</h1>
          <p className="mt-5 leading-8 text-[#6f6677]">API 已完成 Argon2id + HttpOnly Cookie JWT；待接上 Neon PostgreSQL 後，這裡會改成可送出的正式表單。</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {['登入', '註冊'].map((title) => (
            <form key={title} className="k-card rounded-[32px] p-6">
              <h2 className="text-2xl font-black text-[#32283a]">{title}</h2>
              <div className="mt-6 space-y-4">
                {title === '註冊' ? <input placeholder="暱稱" className="w-full rounded-2xl border-0 bg-white/75 px-4 py-3 text-sm outline-none ring-1 ring-[#8f7aa2]/15" /> : null}
                <input type="email" placeholder="Email" className="w-full rounded-2xl border-0 bg-white/75 px-4 py-3 text-sm outline-none ring-1 ring-[#8f7aa2]/15" />
                <input type="password" placeholder="密碼" className="w-full rounded-2xl border-0 bg-white/75 px-4 py-3 text-sm outline-none ring-1 ring-[#8f7aa2]/15" />
              </div>
              <button type="button" className="mt-6 w-full rounded-full bg-[#32283a] px-5 py-3 font-bold text-white">{title}</button>
            </form>
          ))}
        </div>
      </section>
    </main>
  );
}
