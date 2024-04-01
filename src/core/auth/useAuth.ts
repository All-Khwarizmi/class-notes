import { useUser } from "@clerk/nextjs";
import { useAuthStore } from "./auth-store";
import { useEffect } from "react";
import { userRepositry } from "@/application/user/repository/user-repository";
import { toast } from "sonner";

export default function useAuth() {
  const { user: userAuth } = useUser();
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
    if (userAuth) {
      setUser({ user: { id: userAuth.id } });
    } else {
      logout();
    }
  }, [userAuth]);

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
