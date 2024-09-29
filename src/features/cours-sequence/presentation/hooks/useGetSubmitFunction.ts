import { UserAuth } from '@/core/auth/i-auth';
import { Competence } from '@/features/comp-cat/domain/entities/schemas';

import useSaveCoursMetadata from '../../application/adapters/services/useSaveCoursMetadata';
import useSaveSequenceMetadata from '../../application/adapters/services/useSaveSequenceMetadata';
import useUpdateCoursMetadata from '../../application/adapters/services/useUpdateCoursMetadata';
import useUpdateSequenceMetadata from '../../application/adapters/services/useUpdateSequenceMetadata';
import { Cours, Sequence } from '../../domain/entities/cours-schemas';
import { CoursSequenceForm } from '../views/AddCoursView';

function useGetSubmitFunction(options: {
  edit?: boolean;
  type: 'cours' | 'sequence';
  sequenceId?: string;
  cours?: Cours;
  sequence?: Sequence;
  selectedCompetences: Competence[];
  userId: string;
  sequenceType: 'template' | 'sequence';
}) {
  const { mutate: setSaveCoursMetadata } = useSaveCoursMetadata();
  const { mutate: setSaveSequenceMetadata } = useSaveSequenceMetadata();
  const { mutate: setUpdateCoursMetadata } = useUpdateCoursMetadata();
  const { mutate: setUpdateSequenceMetadata } = useUpdateSequenceMetadata();

  function onSubmitCours(data: CoursSequenceForm) {
    const newData = {
      ...data,
      competences: data.competences,
    };
    console.log('In onSubmitCours', newData);
    setSaveCoursMetadata({
      sequenceId: options.sequenceId!,
      cours: newData,
      userId: options.userId,
    });
  }

  function onEditCours(data: CoursSequenceForm) {
    const newData = {
      ...options.cours!,
      ...data,
      competences: data.competences,
    };
    setUpdateCoursMetadata({
      cours: newData,
    });
  }

  function onSubmitSequence(data: CoursSequenceForm) {
    const newData = {
      ...data,
      competencesIds: data.competences,
    };
    setSaveSequenceMetadata({
      sequence: newData,
      userId: options.userId,
    });
  }

  function onEditSequence(data: CoursSequenceForm) {
    const newData = {
      ...options.sequence!,
      ...data,

      competencesIds: data.competences,
    };
    setUpdateSequenceMetadata({
      sequence: newData,
      type: options.sequenceType,
    });
  }

  return {
    onSubmit:
      options.edit && options.cours !== undefined
        ? onEditCours
        : options.sequence !== undefined
          ? onEditSequence
          : options.type === 'cours'
            ? onSubmitCours
            : onSubmitSequence,
  };
}

export default useGetSubmitFunction;
