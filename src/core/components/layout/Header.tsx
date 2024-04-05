"use client";
import { UserButton, SignInButton, useSession } from "@clerk/nextjs";
import { ModeToggle } from "../common/ModeToggle";
import { Button } from "../ui/button";
import Navigation from "../common/Navigation";
import { usePathname } from "next/navigation";
import Title from "@/core/components/common/Title";
import { cn } from "@/lib/utils";
import { MobileSidebar } from "./MobileSidebar";
import { useAuthStore } from "@/core/auth/auth-store";

export default function Header() {
  const { isLoggedIn } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
  }));
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
          {isLoggedIn() ? (
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
