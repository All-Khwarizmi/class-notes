import { useUser } from "@clerk/nextjs";
import { useAuthStore } from "./auth-store";
import { useEffect } from "react";

export default function useAuth() {
  const { user } = useUser();
  const {
    setUser,
    logout,
    isLoggedIn,
    onboarding,
    setOnboarding,
    preferences,
    setPreferences,
  } = useAuthStore((state) => ({
    setUser: state.setUser,
    logout: state.logout,
    isLoggedIn: state.isLoggedIn,
    onboarding: state.onboarding,
    preferences: state.preferences,
    setPreferences: state.setPreferences,
    setOnboarding: state.setOnboarding,
  }));
  useEffect(() => {
    console.log("user", user);
    if (user) {
      setUser({ user: { id: user.id } });
    } else {
      logout();
    }
  }, [user]);
  return { isLoggedIn, onboarding, setOnboarding, preferences, setPreferences };
}
