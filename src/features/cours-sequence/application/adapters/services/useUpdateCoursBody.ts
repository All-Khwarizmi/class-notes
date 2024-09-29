import {
  EDITOR_DEBOUNCE_TIME,
  EDITOR_ERROR_TOAST_DURATION,
  EDITOR_TOAST_UPDATE_DURATION,
} from '@/core/components/constants/editor-constants';
import { useMutation } from '@tanstack/react-query';
import { isLeft } from 'fp-ts/lib/Either';
import { debounce } from 'lodash';
import { useCallback } from 'react';
import { toast } from 'sonner';

import updateCourseBody from '../actions/update-course-body';

export default function useUpdateCoursBody() {
  const { mutate } = useMutation({
    mutationKey: ['update-course-body'],
    mutationFn: async (options: {
      userId: string;
      coursId: string;
      body: string;
    }) => {
      const result = await updateCourseBody(options);
      if (isLeft(result)) {
        toast.error('Failed to update the course body', {
          duration: EDITOR_ERROR_TOAST_DURATION,
        });
      } else {
        toast.success('Course body updated successfully', {
          duration: EDITOR_TOAST_UPDATE_DURATION,
        });
      }
    },
  });
  const debounceUpdateCoursBody = useCallback(
    (options: { userId: string; coursId: string }) => {
      return debounce(
        (content: string) =>
          mutate({
            userId: options.userId,
            coursId: options.coursId,
            body: content,
          }),
        EDITOR_DEBOUNCE_TIME
      );
    },
    [mutate]
  );
  return { debounceUpdateCoursBody };
}
