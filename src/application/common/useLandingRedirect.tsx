import authRepositoy from "@/features/auth/application/repository/auth-repository";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useLandingRedirect() {
  const router = useRouter();
  const { authUserId } = authRepositoy.useGetUserId();

  useEffect(() => {
    if (authUserId) {
      router.push("/dashboard");
    } else {
      router.push("/");
    }
  }, [authUserId]);
}
