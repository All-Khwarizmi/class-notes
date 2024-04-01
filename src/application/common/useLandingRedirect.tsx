import { useAuthStore } from "@/core/auth/auth-store";
import { useSession } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useLandingRedirect() {
  const router = useRouter();

  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (isLoggedIn()) {
      router.push("/classes");
    } else {
      router.push("/");
    }
  }, []);
}
