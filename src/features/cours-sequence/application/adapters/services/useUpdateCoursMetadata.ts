import { QUERY_KEYS } from '@/core/query/ query-keys';
import { toastWrapper } from '@/core/utils/toast-wrapper';
import { Cours } from '@/features/cours-sequence/domain/entities/cours-schemas';
import { useMutation } from '@tanstack/react-query';
import { isLeft } from 'fp-ts/lib/Either';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { coursUsecases } from '../../usecases/cours-usecases';

export interface SaveCoursMetadataOptions {
  cours: Cours;
}

export default function useUpdateCoursMetadata() {
  const router = useRouter();
  return useMutation({
    mutationKey: [QUERY_KEYS.COURS.UPDATE()],
    mutationFn: async (saveCoursMetadata: SaveCoursMetadataOptions) => {
      return coursUsecases.updateCours({
        cours: saveCoursMetadata.cours,
      });
    },
    onSuccess: async (eitherCours) => {
      if (isLeft(eitherCours)) {
        toast.error('An error occurred');
        return;
      }
      toastWrapper.success('Cours updated successfully');
      router.push(`/cours/${eitherCours.right}`);
    },
  });
}
