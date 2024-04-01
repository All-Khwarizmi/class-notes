import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function useGetUserInfra({ id }: { id: string }) {
  const getUser = useMutation(api.users.getUser);
  type UserExistReturnType = Awaited<ReturnType<typeof getUser>>;

  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<UserExistReturnType>();
  useEffect(() => {
    getUser({ userId: id })
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        setError(
          "Une erreur est survenue lors de la récupération de l'utilisateur"
        );
      });
  }, []);

  return { user, error };
}

export type UseGetUserInfra = typeof useGetUserInfra;
