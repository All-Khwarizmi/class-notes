import { useUser } from "@clerk/nextjs";
import { useAuthStore } from "./auth-store";
import { useEffect } from "react";

export default function useAuth() {
  const { user } = useUser();
  const { setUser, logout, isLoggedIn } = useAuthStore((state) => ({
    setUser: state.setUser,
    logout: state.logout,
    isLoggedIn: state.isLoggedIn,
  }));
  useEffect(() => {
    console.log("user", user);
    if (user) {
      setUser({ user: { id: user.id } });
    } else {
      logout();
    }
  }, [user]);
  return { isLoggedIn };
}
