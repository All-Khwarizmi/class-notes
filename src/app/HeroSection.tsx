"use client";

import Link from "next/link";
import Title from "../core/components/common/Title";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/core/components/ui/button";
import RandomFadingImage from "@/core/components/layout/RandomFadingImage";

export default function Hero() {
  return (
    <section className="w-full relative flex justify-center hero-section h-screen py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex h-full items-center flex-col justify-center">
          <div className="flex z-10 text-center flex-col justify-center space-y-4">
            <div className="space-y-4 text-center">
              <h1 className="text-3xl  font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                <Title size="3xl" />: Transform Your Teaching Experience
              </h1>
              <div>
                <div className="w-full text-slate-300 md:text-xl flex items-center">
                  <p className=" px-12">
                    Unleash the power of modern technology to streamline your
                    classes, manage resources, and gain deeper insights into
                    student progress.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <RandomFadingImage
            src="https://cdn.prod.website-files.com/645a9acecda2e0594fac6126/658054b9bde4219f7c818b9b_gradient-noise-purple-azure.png"
            alt="Hero"
          />
          <div className="flex flex-col  z-10 mt-4 gap-2 min-[400px]:flex-row text-primary  ">
            <SignedOut>
              <div
                className="flex flex-col items-center justify-center gap-2 bg-white rounded-lg shadow-lg p-4 w-full md:w-1/2 lg:w-1/3"
                data-testid="hero-cta"
              >
                <SignInButton redirectUrl="/dashboard">
                  Get Started
                </SignInButton>
              </div>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button className="">Dashboard</Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </div>
    </section>
  );
}
