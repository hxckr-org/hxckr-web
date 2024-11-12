import type { Metadata } from "next";
import "./globals.css";

import { Inter } from "next/font/google";

import { SessionContext } from "@/contexts/session";
import SiteLayout from "@/app/components/layout/site-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LMS",
  description: "A learning management system for technical bitcoin education.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionContext>
          <SiteLayout>{children}</SiteLayout>
        </SessionContext>
      </body>
    </html>
  );
}
