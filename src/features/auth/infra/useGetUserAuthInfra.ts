import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

export default function useGetUserAuthInfra() {
  const { user } = useUser();
  const [userIdAuthInfra, setUserIdAuthInfra] = useState<string | null>(null);
  useEffect(() => {
    if (user) {
      setUserIdAuthInfra(user.id);
    }
  }, [user]);
  return { userIdAuthInfra };
}

export type GetUserAuthInfraType = typeof useGetUserAuthInfra;
