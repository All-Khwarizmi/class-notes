import { useEffect, useState } from "react";
import { GetUserAuthInfraType } from "../../infra/useGetUserAuthInfra";

export default function useGetUserAuthUsecase({
  useGetUserAuthInfra,
}: {
  useGetUserAuthInfra: GetUserAuthInfraType;
}) {
  const { userIdAuthInfra } = useGetUserAuthInfra();
  const [authUserId, setAuthUserId] = useState<string | null>(null);

  useEffect(() => {
    if (userIdAuthInfra) {
      setAuthUserId(userIdAuthInfra);
    }
  }, [userIdAuthInfra]);

  return { authUserId };
}
