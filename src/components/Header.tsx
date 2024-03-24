"use client";
import { UserButton, SignInButton, useSession } from "@clerk/nextjs";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import Navigation from "./Navigation";
import { usePathname } from "next/navigation";
import Title from "@/app/Title";
import { cn } from "@/lib/utils";
import { MobileSidebar } from "./layout/MobileSidebar";

export default function Header() {
  const { isSignedIn } = useSession();
  const pathName = usePathname();
  return (
    <header className="flex flex-row gap-4 border-b items-center justify-between border-b-slate-300 p-4">
      <Navigation />
      <div className={cn("block md:!hidden")}>
        <MobileSidebar />
      </div>
      {pathName === "/" ? null : <Title />}

      <div className="flex flex-row gap-4 items-center">
        <div>
          {isSignedIn ? (
            <UserButton />
          ) : (
            <SignInButton>
              <Button>Se Connecter</Button>
            </SignInButton>
          )}
        </div>
        <ModeToggle />
      </div>
    </header>
  );
}
