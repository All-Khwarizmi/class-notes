import useDeleteSequence from '@/features/complement/application/adapters/services/useDeleteSequence';
import { isLeft } from 'fp-ts/lib/Either';
import { useEffect, useMemo, useState } from 'react';

import useAddClasseSequence from '../../application/adapters/services/useAddClasseSequence';
import useGetAllSequences from '../../application/adapters/services/useGetAllSequences';
import { useGetAllClasseSequences } from './useGetAllClasseSequences';

export const useClasseSequencesLogic = (options: {
  userId: string;
  classeId: string;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{
    message: string;
    description: string;
    error: boolean;
  }>({
    message: '',
    description: '',
    error: false,
  });
  const { mutate } = useAddClasseSequence();
  const { mutate: deleteSequence } = useDeleteSequence();
  const {
    refetch: refetchAllSequences,
    data: baseSequences,
    isLoading: isLoadingSequences,
    isError: isErrorSequences,
  } = useGetAllSequences(options.userId);
  const {
    refetch: refetchClasseSequences,
    data: classeSequences,
    isLoading: isLoadingClasseSequences,
    isError: isErrorClasseSequences,
  } = useGetAllClasseSequences({ classeId: options.classeId });
  function addClasseSequence(options: {
    classeId: string;
    sequenceId: string;
    userId: string;
  }) {
    mutate(options, {
      onSuccess: () => {
        refetchAllSequences();
        refetchClasseSequences();
      },
    });
  }
  const handleDelete = async (sequenceId: string) => {
    deleteSequence(
      {
        sequenceId,
        type: 'sequence',
        userId: options.userId,
      },
      {
        onSuccess: () => {
          refetchAllSequences();
          refetchClasseSequences();
        },
      }
    );
  };
  useEffect(() => {
    if (isLoadingSequences || isLoadingClasseSequences) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [baseSequences, classeSequences]);

  useEffect(() => {
    if (
      isErrorSequences ||
      isErrorClasseSequences ||
      (baseSequences && isLeft(baseSequences)) ||
      (classeSequences && isLeft(classeSequences))
    ) {
      setError({
        message: 'An error occurred',
        description: 'An error occurred while fetching sequences',
        error: true,
      });
    } else {
      setError({
        message: '',
        description: '',
        error: false,
      });
    }
  }, [isErrorSequences, isErrorClasseSequences]);

  return {
    addClasseSequence,
    handleDelete,
    deleteSequence,
    baseSequences,
    classeSequences,
    loading,
  };
};
