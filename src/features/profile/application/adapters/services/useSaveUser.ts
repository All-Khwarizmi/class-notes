import useFetchingState from "@/core/application/common/useFetchingState";
import { useEffect, useState } from "react";
import { profileUseCases } from "../../usecases/profile-usecases";

import { useRouter } from "next/navigation";
import { isLeft } from "fp-ts/lib/Either";
import { toast } from "sonner";
import { UserType } from "@/features/user/domain/entities/user-schema";

export interface SaveUserOptions {
  schoolSubject: UserType["schoolSubject"];
  country: UserType["country"];
  educationSystem: UserType["educationSystem"];
  name?: string;
  userId: string;
}

export default function useSaveUser() {
  const [saveUserOptions, setSaveUserOptions] =
    useState<SaveUserOptions | null>();
  const { loading, error, startFetching, endFetching, setFetchingError } =
    useFetchingState();
  const router = useRouter();

  useEffect(() => {
    if (!saveUserOptions) {
      return;
    }
    const loaddindToast = toast.loading("Saving user...", {
      position: "top-center",
    });

    startFetching();

    profileUseCases
      .saveUser({ userId: saveUserOptions.userId, user: saveUserOptions })
      .then((result) => {
        if (isLeft(result)) {
          setFetchingError(result.left.message);
          return;
        }

        toast.dismiss(loaddindToast);
        toast.success("User saved successfully", { position: "top-center" });

        endFetching();
        router.refresh();
      })

      .finally(() => {
        toast.dismiss(loaddindToast);
      });
  }, [saveUserOptions]);

  return {
    setSaveUserOptions,
    loading,
    error,
  };
}
