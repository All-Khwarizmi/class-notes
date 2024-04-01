import { useAuthStore } from "@/core/auth/auth-store";
import { UseOnboardUserInfra } from "@/infrastructure/user/useOnboardUserInfra";
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
  const { error, setUserBoardingData, user } = useOnboardUserInfra();
  const { setOnboarding } = useAuthStore((state) => ({
    setOnboarding: state.setOnboarding,
  }));

  useEffect(() => {
    console.log({ user, onBoardingData });
    if (onBoardingData) {
      setUserBoardingData(onBoardingData);
    }
  }, [onBoardingData]);
  useEffect(() => {
    if (user) {
      setOnboarding(true);
    }
    if (error) {
      toast.error(
        "Une erreur est survenue lors de l'onboarding de l'utilisateur"
      );
    }
  }, [user, error]);

  return { error, user, setOnBoardingData };
}
