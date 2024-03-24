import { useSession } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useLandingRedirect() {
  const router = useRouter();

  const { isSignedIn } = useSession();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/classes");
    }
  }, []);
}
