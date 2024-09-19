"use client";

import Link from "next/link";
import Title from "../core/components/common/Title";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/core/components/ui/button";
import RandomFadingImage from "@/core/components/layout/RandomFadingImage";
import Balancer from "react-wrap-balancer";

export default function Hero() {
  return (
    <section className="w-full relative flex justify-center hero-section h-screen py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex h-full items-center flex-col justify-center">
          <div className="flex z-10 text-center flex-col justify-center space-y-4">
            <div className="space-y-4 text-center">
              <h1 className="text-5xl font-bold tracking-tighter sm:text-7xl xl:text-9xl/none">
                <Title size="7xl" />
              </h1>
              <div className="pt-4 text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none max-w-[900px] mx-auto">
                <Balancer>
                  Simplifiez votre enseignement, amplifiez votre impact
                </Balancer>
              </div>
              <p className="max-w-[600px] text-zinc-500 md:text-xl dark:text-zinc-400 mx-auto">
                <Balancer>
                  Gagnez du temps sur les tâches administratives et
                  concentrez-vous sur ce qui compte vraiment : vos élèves.
                </Balancer>
              </p>
            </div>
          </div>

          <RandomFadingImage
            src="https://cdn.prod.website-files.com/645a9acecda2e0594fac6126/658054b9bde4219f7c818b9b_gradient-noise-purple-azure.png"
            alt="Hero"
          />
          <div className="flex flex-col z-10 mt-8 gap-4 min-[400px]:flex-row text-primary">
            <SignedOut>
              <div
                className="flex flex-col items-center justify-center gap-2 pt-4"
                data-testid="hero-cta"
              >
                <SignInButton redirectUrl="/dashboard">
                  <Button size="lg" className="w-full md:w-auto">
                    Commencez gratuitement
                  </Button>
                </SignInButton>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Pas de carte de crédit requise
                </p>
              </div>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button size="lg">Accéder à mon tableau de bord</Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </div>
    </section>
  );
}
