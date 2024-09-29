import oldAuthRepositoy from '@/features/auth/application/repository/old-auth-repository';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useLandingRedirect() {
  const router = useRouter();
  const { authUserId } = oldAuthRepositoy.useGetUserId();

  useEffect(() => {
    if (authUserId) {
      router.push('/dashboard');
    } else {
      router.push('/');
    }
  }, [authUserId]);
}
