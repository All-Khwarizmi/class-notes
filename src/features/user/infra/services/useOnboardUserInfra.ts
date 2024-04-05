import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { OnboarUserDataType } from "@/features/user/application/usecases/useOnboardUserUsecase";
import { Id } from "../../../../../convex/_generated/dataModel";
import { cons } from "fp-ts/lib/ReadonlyNonEmptyArray";

export type IUserInfra = {
  userId: Id<"Users"> | false | string;
  error: boolean;
};
export default function useOnboardUserInfra() {
  const onboardUser = useMutation(api.users.onboarding);
  const [payload, setPayload] = useState<IUserInfra>({
    userId: false,
    error: false,
  });
  const [userBoardingDataInfra, setUserBoardingDataInfra] =
    useState<OnboarUserDataType | null>();

  useEffect(() => {

    if (userBoardingDataInfra) {
      onboardUser(userBoardingDataInfra)
        .then((userInfra) => {
          setPayload(userInfra);
        })
        .catch((error) => {
          setPayload({ userId: false, error: true });
        })
        .finally(() => {
          setUserBoardingDataInfra(null);
        });
    }
  }, [userBoardingDataInfra]);

  return {
    payload,
    setUserBoardingDataInfra,
  };
}

export type UseOnboardUserInfra = typeof useOnboardUserInfra;
