import { GetClassesInfra } from "@/features/classe/infra/useGetClassesInfra";
import { useEffect, useState } from "react";

export default function useGetClassesUsecase({
  id,
  useGetClassesInfra,
}: {
  id: string;
  useGetClassesInfra: GetClassesInfra;
}) {
  const [loading, setLoading] = useState<boolean>(true);
  const { classes, error } = useGetClassesInfra({ id });
  useEffect(() => {
    if (classes) {
      setLoading(false);
    }
  }, [classes]);
  return {
    loading,
    classes,
    error,
  };
}
