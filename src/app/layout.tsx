import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { siteConfig } from "@/config/site";
import SiteHeader from "@/components/shared/site-header";
import { SiteFooter } from "@/components/shared/site-footer";
import dotenv from "dotenv";

const inter = Inter({ subsets: ["latin"] });
dotenv.config();

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
 * @returns {React.ReactElement} The root layout component.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>): React.ReactElement {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>{siteConfig.name}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
