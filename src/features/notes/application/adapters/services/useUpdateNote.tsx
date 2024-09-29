import { QUERY_KEYS } from '@/core/query/ query-keys';
import { toastWrapper } from '@/core/utils/toast-wrapper';
import { Note } from '@/features/notes/domain/notes-schemas';
import { useMutation } from '@tanstack/react-query';
import { isLeft } from 'fp-ts/lib/Either';

import saveNote from '../actions/save-note';

function useUpdateNote() {
  return useMutation({
    mutationKey: [QUERY_KEYS.NOTES.UPDATE],
    mutationFn: async (note: Note) => {
      const result = await saveNote({
        note,
      });
      if (isLeft(result)) {
        return toastWrapper.error('Erreur lors de la sauvegarde de la note');
      }
      toastWrapper.success('Note sauvegardée');
      return result.right;
    },
  });
}

export default useUpdateNote;
