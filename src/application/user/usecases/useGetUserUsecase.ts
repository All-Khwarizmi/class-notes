import { UserType } from "@/domain/user/user-schema";
import { UseGetUserInfra } from "@/infrastructure/user/useGetUserInfra";
import UserDto from "@/infrastructure/user/user-dto";
import { isLeft, isRight } from "fp-ts/lib/Either";
import { is } from "immutable";
import { set } from "lodash";
import { useEffect, useState } from "react";

export default function useGetUserUsecase({
  useGetUserInfra,
  id,
}: {
  useGetUserInfra: UseGetUserInfra;
  id: string;
}) {
  const { user: userInfra, error: errorInfra } = useGetUserInfra({ id });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserType | null>();

  useEffect(() => {
    if (user) {
      const eitherUser = UserDto.fromInfra({ userInfra });
      if (isLeft(eitherUser)) {
        setIsLoading(false);
        setError("L'utilisateur n'a pas pu être récupéré");
      }
      if (isRight(eitherUser)) {
        setIsLoading(false);
        setError(null);
        setUser(eitherUser.right);
      }
    }
  }, [user]);

  return {
    user,
    error,
    isLoading,
  };
}
