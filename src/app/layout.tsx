import { Inter } from "next/font/google";
import { Providers } from "./providers";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { ThemeProvider } from "@/core/components/common/theme-provider";
import QueryProvider from "@/core/query/QueryProvider";
import { Metadata } from "next";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "@/core/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import LayoutServerLayer from "@/core/components/layout/LayoutServerLayer";

export const metadata: Metadata = {
  title: "La Classe - Votre site de prof en quelques clics",
  description:
    "Créez votre site web professionnel sans effort. Centralisez vos ressources, dynamisez votre enseignement et modernisez votre présence en ligne. La Classe, la solution simple pour les enseignants qui veulent se démarquer.",
  keywords:
    "site web enseignant, ressources pédagogiques, enseignement en ligne, modernisation éducative",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://laclasse.app",
    siteName: "La Classe",
    title: "La Classe - Votre site de prof en quelques clics",
    description:
      "Créez votre site web professionnel sans effort. La solution simple pour les enseignants qui veulent se démarquer.",
    images: [
      {
        url: "https://laclasse.app/og-image.jpg", // Assurez-vous de créer cette image
        width: 1200,
        height: 630,
        alt: "La Classe - Votre site de prof",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "La Classe - Votre site de prof en quelques clics",
    description:
      "Créez votre site web professionnel sans effort. La solution simple pour les enseignants qui veulent se démarquer.",
    images: ["https://laclasse.app/og-image.jpg"], // Utilisez la même image que pour OpenGraph
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="fr" suppressHydrationWarning>
        <head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover"
          />
          <link rel="canonical" href="https://laclasse.app" />
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
          <Analytics />
        </body>
      </html>
    </Providers>
  );
}
