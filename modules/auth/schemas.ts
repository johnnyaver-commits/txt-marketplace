import { z } from 'zod';

const emailSchema = z.string().trim().toLowerCase().email('Email 格式不正確');
const passwordSchema = z.string().min(10, '密碼至少 10 碼').regex(/[A-Z]/, '密碼需包含大寫字母').regex(/[a-z]/, '密碼需包含小寫字母').regex(/[0-9]/, '密碼需包含數字');

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  nickname: z.string().trim().min(2, '暱稱至少 2 個字').max(30, '暱稱最多 30 個字'),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, '請輸入密碼'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
