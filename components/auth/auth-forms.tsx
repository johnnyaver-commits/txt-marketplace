
'use client';

import { useState } from 'react';

type ApiResult = { success: boolean; error?: { message: string }; data?: unknown };

async function postJson(path: string, body: unknown): Promise<ApiResult> {
  const res = await fetch(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  return res.json();
}

export function AuthForms() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(formData: FormData, mode: 'login' | 'register') {
    setLoading(true);
    setMessage('');
    const body = {
      email: String(formData.get(`${mode}-email`) ?? ''),
      password: String(formData.get(`${mode}-password`) ?? ''),
      ...(mode === 'register' ? { nickname: String(formData.get('register-nickname') ?? '') } : {}),
    };
    const result = await postJson(`/api/auth/${mode}`, body);
    setLoading(false);
    setMessage(result.success ? `${mode === 'login' ? '登入' : '註冊'}成功` : (result.error?.message ?? '操作失敗'));
  }

  return (
    <div>
      {message ? <div className="mb-5 rounded-2xl bg-white/75 px-4 py-3 text-sm font-bold text-[#654f73] ring-1 ring-[#8f7aa2]/15">{message}</div> : null}
      <div className="grid gap-5 md:grid-cols-2">
        <form action={(data) => submit(data, 'login')} className="k-card rounded-[32px] p-6">
          <h2 className="text-2xl font-black text-[#32283a]">登入</h2>
          <div className="mt-6 space-y-4">
            <input name="login-email" type="email" placeholder="Email" className="w-full rounded-2xl border-0 bg-white/75 px-4 py-3 text-sm outline-none ring-1 ring-[#8f7aa2]/15" />
            <input name="login-password" type="password" placeholder="密碼" className="w-full rounded-2xl border-0 bg-white/75 px-4 py-3 text-sm outline-none ring-1 ring-[#8f7aa2]/15" />
          </div>
          <button disabled={loading} className="mt-6 w-full rounded-full bg-[#32283a] px-5 py-3 font-bold text-white disabled:opacity-50">登入</button>
        </form>
        <form action={(data) => submit(data, 'register')} className="k-card rounded-[32px] p-6">
          <h2 className="text-2xl font-black text-[#32283a]">註冊</h2>
          <div className="mt-6 space-y-4">
            <input name="register-nickname" placeholder="暱稱" className="w-full rounded-2xl border-0 bg-white/75 px-4 py-3 text-sm outline-none ring-1 ring-[#8f7aa2]/15" />
            <input name="register-email" type="email" placeholder="Email" className="w-full rounded-2xl border-0 bg-white/75 px-4 py-3 text-sm outline-none ring-1 ring-[#8f7aa2]/15" />
            <input name="register-password" type="password" placeholder="密碼（至少 10 碼，含大小寫與數字）" className="w-full rounded-2xl border-0 bg-white/75 px-4 py-3 text-sm outline-none ring-1 ring-[#8f7aa2]/15" />
          </div>
          <button disabled={loading} className="mt-6 w-full rounded-full bg-[#32283a] px-5 py-3 font-bold text-white disabled:opacity-50">註冊</button>
        </form>
      </div>
    </div>
  );
}
