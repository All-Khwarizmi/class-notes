import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { SignedOut, SignInButton, SignedIn } from "@clerk/nextjs";

function ContactCTO() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 border-t">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
            Ready to Transform Your Teaching?
          </h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl lg:text-base xl:text-xl">
            Sign up for La Classe and experience the future of education.
          </p>
        </div>
        <div className="mx-auto w-full max-w-sm space-y-2">
          <SignedOut>
            <SignInButton>Get Started</SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard">
              <Button>Dashboard</Button>
            </Link>
          </SignedIn>
          <p className="text-xs text-muted-foreground">
            Sign up to experience the power of La Classe.{" "}
            <Link
              href="#"
              className="underline underline-offset-2"
              prefetch={false}
            >
              Terms &amp; Conditions
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default ContactCTO;
