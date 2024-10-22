import { Main } from '@/core/components/common/Craft';
import { ThemeProvider } from '@/core/components/common/theme-provider';
import { Toaster } from '@/core/components/ui/sonner';
import QueryProvider from '@/core/query/QueryProvider';
import { cn } from '@/lib/utils';
import { Analytics } from '@vercel/analytics/react';
import { Metadata, Viewport } from 'next';
import { Inter as FontSans } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';

import './globals.css';
import { Providers } from './providers';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: '#000000',
};

export const metadata: Metadata = {
  title: 'La Classe - Votre site de prof en quelques clics',
  description:
    'La Classe permet aux enseignants de créer leur site web professionnel sans effort. Centralisez vos ressources, dynamisez votre enseignement et modernisez votre présence en ligne avec notre solution simple et intuitive.',
  keywords:
    'La Classe, site web enseignant, ressources pédagogiques, enseignement en ligne, modernisation éducative, création site prof, plateforme enseignement, outils pédagogiques, présence numérique enseignant',
  metadataBase: new URL('https://laclasse.app'),
  openGraph: {
    title: "La Classe - Créez votre site d'enseignant facilement",
    description:
      'La Classe permet aux enseignants de créer leur site web professionnel sans effort. La solution simple et intuitive pour les enseignants qui veulent se démarquer.',
    url: 'https://laclasse.app',
    siteName: 'La Classe',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'La Classe - Plateforme pour enseignants',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'La Classe - Solution web pour enseignants',
    description:
      "Créez votre site web professionnel d'enseignant facilement. Centralisez vos ressources et modernisez votre enseignement.",
    images: ['/images/og-image.png'],
    creator: '@LaClasse',
    site: '@LaClasseApp',
  },
  alternates: {
    canonical: 'https://laclasse.app',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="fr" suppressHydrationWarning>
        <body
          className={cn(
            'min-h-screen font-sans antialiased',
            fontSans.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <NextTopLoader />
            <Main>
              <QueryProvider>{children}</QueryProvider>
            </Main>
            <Toaster richColors expand />
          </ThemeProvider>
          <Analytics />
        </body>
      </html>
    </Providers>
  );
}
