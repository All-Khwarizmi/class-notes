import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { OnboarUserDataType } from "@/application/user/usecases/useOnboardUserUsecase";
import { Id } from "../../../convex/_generated/dataModel";

export type IUserInfra =
  | {
      userId: Id<"Users">;
      error: boolean;
    }
  | { userId: boolean; error: boolean };
export default function useOnboardUserInfra() {
  const onboardUser = useMutation(api.users.onboarding);
  const [payload, setPayload] = useState<IUserInfra>({
    userId: false,
    error: false,
  });
  const [userBoardingDataInfra, setUserBoardingDataInfra] =
    useState<OnboarUserDataType | null>();

  useEffect(() => {
    console.log({ userBoardingData: userBoardingDataInfra });
    if (userBoardingDataInfra) {
      onboardUser(userBoardingDataInfra)
        .then((userInfra) => {
          setPayload(userInfra);
        })
        .catch((error) => {
          setPayload({ userId: false, error: true });
        });
    }
  }, [userBoardingDataInfra]);

  return {
    payload,
    setUserBoardingDataInfra,
  };
}

export type UseOnboardUserInfra = typeof useOnboardUserInfra;
