import {
  EDITOR_DEBOUNCE_TIME,
  EDITOR_ERROR_TOAST_DURATION,
  EDITOR_TOAST_UPDATE_DURATION,
} from '@/core/components/constants/editor-constants';
import { Complement } from '@/features/complement/domain/complement-schemas';
import { useMutation } from '@tanstack/react-query';
import { isLeft } from 'fp-ts/lib/Either';
import { debounce } from 'lodash';
import { useCallback } from 'react';
import { toast } from 'sonner';

import updateComplement from '../actions/update-complement';

function useUpdateComplement() {
  const { mutate } = useMutation({
    mutationKey: ['update-complement'],
    mutationFn: async (options: Complement) => {
      const result = await updateComplement(options);
      if (isLeft(result)) {
        toast.error('Failed to update the complement', {
          duration: EDITOR_ERROR_TOAST_DURATION,
        });
      } else {
        toast.success('Complement updated successfully', {
          duration: EDITOR_TOAST_UPDATE_DURATION,
        });
      }
    },
  });
  const debounceUpdateComplement = useCallback(
    (options: Complement) => {
      return debounce((content: string) => {
        return mutate({ ...options, body: content });
      }, EDITOR_DEBOUNCE_TIME);
    },
    [mutate]
  );
  return { debounceUpdateComplement };
}

export default useUpdateComplement;
