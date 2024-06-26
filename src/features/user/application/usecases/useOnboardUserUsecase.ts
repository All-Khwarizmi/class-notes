import { useAuthStore } from "@/core/auth/auth-store";
import { UseOnboardUserInfra } from "@/features/user/infra/services/useOnboardUserInfra";
import { useEffect, useState } from "react";
import { toast } from "sonner";
export type OnboarUserDataType = {
  userId: string;
  schoolSubject: string;
  name: string;
};
export default function useOnboardUserUsecase({
  useOnboardUserInfra,
}: {
  useOnboardUserInfra: UseOnboardUserInfra;
}) {
  const [onBoardingData, setOnBoardingData] =
    useState<OnboarUserDataType | null>();
  const { payload, setUserBoardingDataInfra } = useOnboardUserInfra();
  const { setOnboardingAppState: setOnboarding, setUser } = useAuthStore((state) => ({
    setOnboardingAppState: state.setOnboarding,
    setUser: state.setUser,
    user : state.user
  }));

  useEffect(() => {
    if (onBoardingData) {
      setUserBoardingDataInfra(onBoardingData);
    }
  }, [onBoardingData]);
  useEffect(() => {
    if (payload.userId) {
      setOnboarding(true);
      const user = {
        id: payload.userId,
        onboarding: true,
      };
     setUser({user});
    }
    if (payload.error) {
      toast.error(
        "Une erreur est survenue lors de l'onboarding de l'utilisateur"
      );
    }
  }, [payload]);

  return { error: payload.error, user: payload.userId, setOnBoardingData };
}
