import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TXT Trading Platform',
  description: '以 TXT 周邊為主的繁體中文買賣與交換平台',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
