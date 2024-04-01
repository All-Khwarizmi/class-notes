import { useAuthStore } from "@/core/auth/auth-store";
import { useSession, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useLandingRedirect() {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      router.push("/classes");
    } else {
      router.push("/");
    }
  }, []);
}
