import { QUERY_KEYS } from '@/core/query/ query-keys';
import { toastWrapper } from '@/core/utils/toast-wrapper';
import { UserType } from '@/features/user/domain/entities/user-schema';
import { useMutation } from '@tanstack/react-query';
import { isRight } from 'fp-ts/lib/Either';
import { useRouter } from 'next/navigation';

import { profileUseCases } from '../../usecases/profile-usecases';

export interface SaveUserOptions {
  schoolSubject: UserType['schoolSubject'];
  country: UserType['country'];
  educationSystem: UserType['educationSystem'];
  name?: string;
  userId: string;
  hostname: string;
}

export default function useSaveUser() {
  const router = useRouter();
  return useMutation({
    mutationKey: [QUERY_KEYS.PROFILE.SAVE_USER()],
    mutationFn: (args: SaveUserOptions) =>
      profileUseCases.saveUser({
        userId: args.userId,
        user: {
          schoolSubject: args.schoolSubject,
          country: args.country,
          educationSystem: args.educationSystem,
          name: args.name,
          hostname: args.hostname,
        },
      }),
    onError: (error) => {
      toastWrapper.error(error.message);
    },
    onSuccess: (data) => {
      if (isRight(data)) {
        toastWrapper.success('Profil mis à jour');
        window.location.reload();
      } else {
        toastWrapper.error('Erreur lors de la mise à jour du profil');
      }
    },
  });
}
