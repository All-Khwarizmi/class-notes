import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

import { Metadata } from "next";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "ClassAI - Votre nouveau carnet de notes.",
  description:
    "ClassAI est un carnet de notes intelligent qui vous permet de suivre la progression de vos élèves. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover"
        />
      </head>
      <Providers>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main className="flex fixed h-screen w-screen flex-col border-collapse overflow-scroll">
              {children}
              <Footer />
            </main>

            <Toaster richColors expand />
          </ThemeProvider>
        </body>
      </Providers>
    </html>
  );
}
