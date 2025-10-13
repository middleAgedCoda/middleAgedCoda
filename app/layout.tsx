import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "MyFrontPage.ai",
  description: "AI-Powered Personal Context Engine",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">
        {/* Global client providers */}
        <Providers>
          <div className="container-max py-8">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
