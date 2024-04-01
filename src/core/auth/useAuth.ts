import { useUser } from "@clerk/nextjs";
import { useAuthStore } from "./auth-store";
import { useEffect } from "react";
import { userRepositry } from "@/application/user/repository/user-repository";

export default function useAuth() {
  const { user: userAuth } = useUser();
  const { user, error } = userRepositry.useGetUser({
    id: userAuth?.id || "",
  })();
  const { setUser, logout, setOnboarding } = useAuthStore((state) => ({
    setUser: state.setUser,
    logout: state.logout,
    setOnboarding: state.setOnboarding,
  }));

  useEffect(() => {
    console.log("user", user);
    if (userAuth) {
      setUser({ user: { id: userAuth.id } });
    } else {
      logout();
    }
  }, [userAuth]);

  useEffect(() => {
    if (user && !user.onboarding) {
      setOnboarding(true);
    } else {
      setOnboarding(false);
    }
  }, [user]);
}
