import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lean AI Music',
  description: 'Text-to-music with Suno AI',
  manifest: '/manifest.webmanifest',
  themeColor: '#6D28D9',
  icons: [{ rel: 'icon', url: '/icons/icon-192.png' }],
};

import Navbar from "@/components/Navbar";
import PWARegister from "@/components/PWARegister";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-black text-white antialiased">
        <Navbar />
        <PWARegister />
        {children}
      </body>
    </html>
  );
}
