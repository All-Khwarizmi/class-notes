import { create } from "zustand";

interface User {
  id: string;
}

interface AuthState {
  user: { user: User | null };
  isLoggedIn: () => boolean;
  setUser: ({ user }: { user: User | null }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
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
}));
