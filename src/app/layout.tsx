"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import Sidebar from "@/components/layout/Sidebar";
const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "ClassAI",
//   description: "ClassAI is a platform for AI-powered education.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Providers>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <div className="flex h-screen border-collapse overflow-hidden">
              <Sidebar />
              <div className="flex-1 overflow-y-auto overflow-x-hidden pt-16 bg-secondary/10 pb-1">
                {children}
              </div>
            </div>
          </ThemeProvider>
        </body>
      </Providers>
    </html>
  );
}
