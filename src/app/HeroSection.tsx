"use client";

import Link from "next/link";
import Title from "./Title";
import { SignInButton, useSession } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useLandingRedirect } from "@/hooks/useLandingRedirect";

export default function Hero() {
  useLandingRedirect();

  const { isSignedIn } = useSession();

  return (
    <section className="w-full h-[90vh] py-6 md:py-12 flex items-center">
      <div className="container h-full flex flex-col justify-center items-center px-4 space-y-4 md:px-6">
        <h1 className="text-4xl font-extrabold tracking-tighter/none text-center sm:text-5xl md:text-6xl">
          <Title size="5-xl" />, votre nouveau carnet de notes.
        </h1>
        <p className="max-w-[700px] text-center text-gray-500 md:text-xl dark:text-gray-400">
          Avec{" "}
          <span>
            <Title size="text-lg" />
          </span>
          , le suivi de vos notes n&apos;a jamais été aussi simple.
        </p>
        {isSignedIn ? (
          <Link href="/classes">
            <Button>Acceder</Button>
          </Link>
        ) : (
          <SignInButton>
            <Button>Se connecter</Button>
          </SignInButton>
        )}
      </div>
    </section>
  );
}
