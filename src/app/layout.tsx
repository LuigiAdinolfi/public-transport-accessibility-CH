import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/config/site";
import SiteHeader from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${siteConfig.name}`,
  description: `${siteConfig.description}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>{siteConfig.name}</title>
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SiteHeader />
          <main className="flex min-h-screen flex-col items-center justify-between lg:py-14 p-6 w-full">
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
