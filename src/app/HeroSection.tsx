"use client";

import Link from "next/link";
import Title from "../core/components/common/Title";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/core/components/ui/button";

export default function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                <Title size="3xl" />: Transform Your Teaching Experience
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Unleash the power of modern technology to streamline your
                classes, manage resources, and gain deeper insights into student
                progress.
              </p>
            </div>
          </div>
          <img
            src="/images/hero.jpeg"
            width="550"
            height="550"
            alt="Hero"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:aspect-square"
          />
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <SignedOut>
              <SignInButton>Get Started</SignInButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button>Dashboard</Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </div>
    </section>
  );
}
