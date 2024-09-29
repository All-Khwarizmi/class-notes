import { Section } from '@/core/components/common/Craft';
import RandomFadingImage from '@/core/components/layout/RandomFadingImage';
import { Button } from '@/core/components/ui/button';
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import Balancer from 'react-wrap-balancer';

import Title from '../core/components/common/Title';

export default function Hero() {
  return (
    <Section className="w-full relative flex justify-center hero-section min-h-[70vh] pt-12 md:pt-24 lg:pt-32">
      <div className="container px-4 md:px-6">
        <div className="flex w-full h-full items-center flex-col justify-center">
          <div className="flex z-10 text-center flex-col justify-center space-y-4">
            <div className="space-y-8 mx-auto w-full max-w-[900px] flex flex-col items-center">
              <div className="text-5xl font-bold mx-auto tracking-tighter sm:text-7xl xl:text-9xl/none">
                <Balancer>Votre site de prof en quelques clics</Balancer>
              </div>
              <p className="max-w-[600px] w-full text-zinc-500 md:text-xl dark:text-zinc-400 mx-auto">
                <Balancer>
                  Créez votre site web professionnel sans effort. Centralisez
                  vos ressources, dynamisez votre enseignement et modernisez
                  votre présence en ligne.
                </Balancer>
              </p>
            </div>
          </div>

          {/* <RandomFadingImage
            src="https://cdn.prod.website-files.com/645a9acecda2e0594fac6126/658054b9bde4219f7c818b9b_gradient-noise-purple-azure.png"
            alt="Hero"
          /> */}

          <div className="flex flex-col z-10 mt-8 gap-4 min-[400px]:flex-row text-primary">
            <SignedOut>
              <div
                className="flex flex-col items-center justify-center gap-2 pt-4"
                data-testid="hero-cta"
              >
                <SignInButton redirectUrl="/dashboard">
                  <Button
                    size="lg"
                    className="w-full md:w-auto text-lg px-8 py-4"
                  >
                    Créer mon site gratuitement{' '}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </SignInButton>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Pas de carte de crédit requise • Configurez en quelques
                  minutes
                </p>
              </div>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button size="lg" className="text-lg px-8 py-4">
                  Accéder à mon tableau de bord
                </Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </div>
    </Section>
  );
}
