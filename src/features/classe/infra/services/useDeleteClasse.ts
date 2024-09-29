import { useMutation } from '@tanstack/react-query';
import { isLeft } from 'fp-ts/lib/Either';
import { toast } from 'sonner';

import { classeUsecases } from '../../application';

export default function useDeleteClasse() {
  return useMutation({
    mutationKey: ['delete-classe'],
    mutationFn: async (id: string) => {
      const operationResult = await classeUsecases.deleteClasse({ id });
      if (isLeft(operationResult)) {
        toast.error('An error occurred while deleting the classe', {
          duration: 3000,
        });
        return;
      }
      toast.success('Classe deleted successfully', { duration: 3000 });
    },
  });
}
