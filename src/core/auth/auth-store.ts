import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
}

interface AuthState {
  user: { user: User | null };
  onboarding: boolean;
  preferences: {
    theme: string;
    materia: string;
    language: string;
  };
  setOnboarding: (onboarding: boolean) => void;
  setPreferences: (preferences: {
    theme: string;
    materia: string;
    language: string;
  }) => void;
  isLoggedIn: () => boolean;
  setUser: ({ user }: { user: User | null }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      onboarding: true,
      setOnboarding: (onboarding) => set({ onboarding }),
      setPreferences: (preferences) =>
        set(() => ({
          preferences,
        })),
      preferences: {
        theme: "",
        materia: "",
        language: "",
      },
      user: {
        user: null,
      },
      isLoggedIn: () => {
        const { user } = get();
        return !!user.user;
      },
      setUser: (user) =>
        set(() => ({
          user,
        })),
      logout: () => set({ user: { user: null } }),
    }),
    {
      name: "auth-storage",
      skipHydration: true,
    }
  )
);
