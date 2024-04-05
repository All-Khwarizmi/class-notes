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
    console.log({ userBoardingDataInfra });
    console.log({ payloadInfra: payload });

    if (userBoardingDataInfra) {
      onboardUser(userBoardingDataInfra)
        .then((userInfra) => {
          console.log({ userInfra });
          setPayload(userInfra);
        })
        .catch((error) => {
          console.log({ errorInfra: error });
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
