import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { OnboarUserDataType } from "@/application/user/usecases/useOnboardUserUsecase";

export default function useOnboardUserInfra() {
  const onboardUser = useMutation(api.users.onboarding);
  type OnboardUserReturnType = Awaited<ReturnType<typeof onboardUser>>;
  const [user, setUser] = useState<OnboardUserReturnType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userBoardingData, setUserBoardingData] =
    useState<OnboarUserDataType | null>();

  useEffect(() => {
    console.log({ userBoardingData });
    if (userBoardingData) {
      onboardUser(userBoardingData)
        .then((userInfra) => {
          setUser(userInfra);
        })
        .catch((error) => {
          setError(
            "Une erreur est survenue lors de l'onboarding de l'utilisateur"
          );
        });
    }
  }, [userBoardingData]);

  return {
    error,
    setUserBoardingData,
    user,
  };
}

export type UseOnboardUserInfra = typeof useOnboardUserInfra;
