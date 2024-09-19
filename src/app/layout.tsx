import { Inter } from "next/font/google";
import { Providers } from "./providers";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { ThemeProvider } from "@/core/components/common/theme-provider";
import QueryProvider from "@/core/query/QueryProvider";
import { Metadata } from "next";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "@/core/components/ui/sonner";
import LayoutServerLayer from "@/core/components/layout/LayoutServerLayer";
export const metadata: Metadata = {
  title: "La Classe - Votre nouveau carnet de notes.",
  description:
    "La Classe est un carnet de notes intelligent qui vous permet de suivre la progression de vos élèves. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en" suppressHydrationWarning>
        <head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover"
          />
        </head>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <NextTopLoader />
            <main className="flex fixed h-screen w-screen flex-col border-collapse overflow-scroll">
              <QueryProvider>{children}</QueryProvider>
            </main>

            <Toaster richColors expand />
          </ThemeProvider>
        </body>
      </html>
    </Providers>
  );
}
