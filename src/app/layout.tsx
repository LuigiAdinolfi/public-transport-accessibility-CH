import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { siteConfig } from "@/config/site";
import SiteHeader from "@/components/shared/site-header";
import { SiteFooter } from "@/components/shared/site-footer";
import "@smastrom/react-rating/style.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

/**
 * Metadata for the application.
 * Contains the title and description for the site, which are used in the HTML head.
 *
 * @type {Metadata}
 */
export const metadata: Metadata = {
  title: `${siteConfig.name}`,
  description: `${siteConfig.description}`,
};

/**
 * Root layout component for the application.
 * Provides the base HTML structure including the theme provider, site header, main content area, and site footer.
 *
 * @param {Object} props - Props for the RootLayout component.
 * @param {React.ReactNode} props.children - The child components to render within the layout.
 * @returns {React.ReactElement} The root layout component with a theme provider, header, main content, and footer.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
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
          <main className="flex min-h-screen w-full flex-col items-center justify-between p-5 lg:py-8">
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
