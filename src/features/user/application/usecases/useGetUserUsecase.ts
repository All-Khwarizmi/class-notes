import { UserType } from "@/features/user/domain/entities/user-schema";
import { UseGetUserInfra } from "@/features/user/infra/services/useGetUserInfra";
import UserDto from "@/features/user/infra/dto/user-dto";
import { useUser } from "@clerk/nextjs";
import { isLeft, isRight } from "fp-ts/lib/Either";
import { useEffect, useState } from "react";

export default function useGetUserUsecase({
  useGetUserInfra,
}: {
  useGetUserInfra: UseGetUserInfra;
}) {
  const { user: userInfra, error: errorInfra, setId } = useGetUserInfra();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserType | null>(null);
  const { user: userAuth } = useUser();

  useEffect(() => {
    if (userAuth) {
      setId(userAuth.id);
    }
  }, [userAuth]);

  useEffect(() => {
    if (userInfra) {
      const eitherUser = UserDto.fromInfra({ userInfra });
      if (isLeft(eitherUser)) {
        setIsLoading(false);
      } else if (isRight(eitherUser)) {
        setIsLoading(false);
        setError(null);
        setUser(eitherUser.right);
      }
    } else if (errorInfra && !userInfra) {
      setIsLoading(false);
      setError(
        "Une erreur est survenue lors de la récupération de l'utilisateur"
      );
    }
  }, [userInfra]);

  useEffect(() => {
    if (errorInfra) {
      setIsLoading(false);

      setError(
        "Une erreur est survenue lors de la récupération de l'utilisateur"
      );
    }
  }, [errorInfra]);

  return {
    user,
    error,
    isLoading,
  };
}
