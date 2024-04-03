import { useAuthStore } from "./auth-store";
import { useEffect } from "react";
import { userRepositry } from "@/application/user/repository/user-repository";
import { toast } from "sonner";
import authRepositoy from "@/features/auth/application/repository/auth-repository";

export default function useAuth() {
  const { authUserId } = authRepositoy.useGetUserId();
  const { user, error } = userRepositry.useGetUser();
  const { setUser, logout, setOnboarding, onboarding } = useAuthStore(
    (state) => ({
      setUser: state.setUser,
      logout: state.logout,
      setOnboarding: state.setOnboarding,
      onboarding: state.onboarding,
    })
  );

  useEffect(() => {
    if (authUserId) {
      setUser({ user: { id: authUserId } });
    } else {
      logout();
    }
  }, [authUserId]);

  useEffect(() => {
    if (!onboarding) {
      if (user && user.onboarding) {
        setOnboarding(true);
      }
    }

    if (error) {
      toast.error(
        "Une erreur est survenue lors de la récupération de vos informations"
      );
    }
  }, [user, error]);
}
