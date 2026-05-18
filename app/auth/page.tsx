import { AppHeader } from '@/components/app-header';
import { AuthForms } from '@/components/auth/auth-forms';

export default function AuthPage() {
  return (
    <main className="min-h-screen px-5 py-6 sm:px-8 lg:px-10">
      <AppHeader />
      <section className="mx-auto grid max-w-6xl items-center gap-8 py-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="font-semibold text-[#8f7aa2]">MEMBER CENTER</p>
          <h1 className="mt-2 text-4xl font-black leading-tight text-[#32283a] sm:text-5xl">登入後即可收藏、上架與提出交換</h1>
          <p className="mt-5 leading-8 text-[#6f6677]">API 已完成 Argon2id + HttpOnly Cookie JWT；若線上尚未設定資料庫，表單會顯示資料庫尚未連接提示。</p>
        </div>
        <AuthForms />
      </section>
    </main>
  );
}
