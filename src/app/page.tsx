"use client";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";
import { useAuth, currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
export default function Home() {
  const { isLoaded, isSignedIn } = useAuth();
  return (
    <>
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
    </>
  );
}
