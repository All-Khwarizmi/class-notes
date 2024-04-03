import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function useGetUserInfra() {
  const [id, setId] = useState<string | null>(null);
  const getUser = useMutation(api.users.getUser);
  type UserExistReturnType = Awaited<ReturnType<typeof getUser>>;

  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<UserExistReturnType | "NO USER">(null);
  useEffect(() => {
    if (id) {
      getUser({ userId: id })
        .then((user) => {
          if (!user) {
            setUser("NO USER");
          } else {
            setUser(user);
          }
        })
        .catch((error) => {
          setError(
            "Une erreur est survenue lors de la récupération de l'utilisateur"
          );
        });
    }
  }, [id]);

  return { user, error, setId };
}

export type UseGetUserInfra = typeof useGetUserInfra;
