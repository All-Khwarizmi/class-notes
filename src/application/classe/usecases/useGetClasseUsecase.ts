import { UseGetClasseInfra } from "@/infrastructure/classe/useGetClasseInfra";
import { use } from "chai";
import { useEffect, useState } from "react";

export default function useGetClasseUsecase({
  useGetClasseInfra,
  id,
}: {
  useGetClasseInfra: UseGetClasseInfra;
  id: string;
}) {
  const { classe, error: errorInfra } = useGetClasseInfra({ id });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (classe) {
      setLoading(false);
    }
  }, [classe]);

  useEffect(() => {
    if (error) {
      setError("Une erreur est survenue lors de la récupération de la classe");
      setLoading(false);
    }
  }, [errorInfra]);
  return { loading, classe, error };
}
