import { QUERY_KEYS } from '@/core/query/ query-keys';
import { toastWrapper } from '@/core/utils/toast-wrapper';
import { CoursSequenceForm } from '@/features/cours-sequence/presentation/views/AddCoursView';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { isLeft } from 'fp-ts/lib/Either';
import { useRouter } from 'next/navigation';

import { coursUsecases } from '../../usecases/cours-usecases';

interface SequenceFormOptions extends CoursSequenceForm {
  competencesIds: string[];
}
export interface SaveSequenceMetadataOptions {
  sequence: SequenceFormOptions;
  userId: string;
}
export default function useSaveSequenceMetadata() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationKey: [QUERY_KEYS.SEQUENCE.CREATE()],
    mutationFn: async (saveSequenceMetadata: SaveSequenceMetadataOptions) => {
      return coursUsecases.addSequence({
        sequence: {
          ...saveSequenceMetadata.sequence,
          body: '',
          createdBy: saveSequenceMetadata.userId,
        },
        userId: saveSequenceMetadata.userId,
      });
    },
    onSuccess: async (eitherSequence) => {
      if (isLeft(eitherSequence)) {
        toastWrapper.error('An error occurred');
        return;
      }
      toastWrapper.success('Sequence created successfully');
      router.push(`/sequences/${eitherSequence.right}?type=template`);
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SEQUENCE.GET_ALL(),
      });
    },
  });
}
