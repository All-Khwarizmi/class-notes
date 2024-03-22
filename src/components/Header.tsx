"use client";
import { UserButton, SignInButton, useSession } from "@clerk/nextjs";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";

export default function Header() {
  const { isSignedIn } = useSession();
  return (
    <header className="flex flex-row gap-4 border-b justify-between border-b-slate-300 p-4">
      <h1>ClassAI</h1>
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
