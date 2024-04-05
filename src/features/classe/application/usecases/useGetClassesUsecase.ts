import { GetClassesInfra } from "@/features/classe/infra/services/useGetClassesInfra";
import { useEffect, useState } from "react";

export default function useGetClassesUsecase({
  id,
  useGetClassesInfra,
}: {
  id: string;
  useGetClassesInfra: GetClassesInfra;
}) {
  const [loading, setLoading] = useState<boolean>(true);
  const { getGlassesPayloadInfra } = useGetClassesInfra({ id });
  useEffect(() => {
    if (getGlassesPayloadInfra) {
      setLoading(false);
    }
  }, [getGlassesPayloadInfra]);
  return {
    loading,
    classes: getGlassesPayloadInfra?.classes,
    error: getGlassesPayloadInfra?.error,
  };
}
