import { UseGetClasseInfra } from "@/features/classe/infra/services/useGetClasseInfra";
import { useEffect, useState } from "react";

export default function useGetClasseUsecase({
  useGetClasseInfra,
  id,
}: {
  useGetClasseInfra: UseGetClasseInfra;
  id: string;
}) {
  const { getClassePayloadInfra } = useGetClasseInfra({ id });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (getClassePayloadInfra) {
      setLoading(false);
    }
     if (getClassePayloadInfra?.error) {
       setError("Une erreur est survenue lors de la récupération de la classe");
       setLoading(false);
     }
  }, [getClassePayloadInfra]);

 
  return { loading, classe: getClassePayloadInfra?.classe, error };
}
