import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { siteConfig } from "@/config/site";
import SiteHeader from "@/components/shared/site-header";
import { SiteFooter } from "@/components/shared/site-footer";

const inter = Inter({ subsets: ["latin"] });

/**
 * Metadata for the application.
 */
export const metadata: Metadata = {
  title: `${siteConfig.name}`,
  description: `${siteConfig.description}`,
};


/**
 * Root layout component for the application.
 * Provides the base HTML structure with theme provider, header, main content, and footer.
 * @param {Object} props - Props for RootLayout component.
 * @param {React.ReactNode} props.children - The children components to render within the layout.
 * @returns {JSX.Element} - RootLayout component.
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <head>
      <title>{siteConfig.name}</title>
    </head>
    <body className={inter.className}>
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      disableTransitionOnChange
    >
      <SiteHeader />
      <main className="flex min-h-screen w-full flex-col items-center justify-between p-6 lg:py-10">
        {children}
      </main>
      <SiteFooter />
    </ThemeProvider>
    </body>
    </html>
  );
}
