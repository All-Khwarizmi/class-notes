"use client";
import { UserButton, SignInButton, useSession } from "@clerk/nextjs";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import Navigation from "./Navigation";

export default function Header() {
  const { isSignedIn } = useSession();
  return (
    <header className="flex flex-row gap-4 border-b items-center justify-between border-b-slate-300 p-4">
      <Navigation />
      <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text animate-gradient">
        ClassAI
      </h1>
      <div className="flex flex-row gap-4 items-center">
        <div>
          {isSignedIn ? (
            <UserButton />
          ) : (
            <SignInButton>
              <Button>Sign in</Button>
            </SignInButton>
          )}
        </div>
        <ModeToggle />
      </div>
    </header>
  );
}
