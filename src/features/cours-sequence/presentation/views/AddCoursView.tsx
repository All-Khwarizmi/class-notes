'use client';

import { UserAuth } from '@/core/auth/i-auth';
import ErrorDialog from '@/core/components/common/ErrorDialog';
import { Competence } from '@/features/comp-cat/domain/entities/schemas';
import { useState } from 'react';

import { Cours, Sequence } from '../../domain/entities/cours-schemas';
import AddCoursOrSequenceForm from '../components/AddCoursOrSequenceForm';
import useGetFormValues from '../hooks/useGetFormValues';
import useGetSelectedCompetences from '../hooks/useGetSelectedCompetences';
import useGetSubmitFunction from '../hooks/useGetSubmitFunction';

export interface CoursSequenceForm
  extends Pick<
    Cours,
    | 'description'
    | 'category'
    | 'name'
    | 'competences'
    | 'imageUrl'
    | 'publish'
    | 'contentType'
  > {}
export default function AddUpdateCoursSequenceView({
  competences,
  type,
  title,
  sequenceId,
  edit,
  cours,
  userId,
  sequence,
  sequenceType,
}: {
  competences: Competence[];
  userId: string;
  type: 'cours' | 'sequence';
  edit?: boolean;
  cours?: Cours;
  sequence?: Sequence;
  title: string;
  sequenceId?: string;
  sequenceType?: 'sequence' | 'template';
}) {
  const { selectedCompetences, setSelectedCompetences } =
    useGetSelectedCompetences({
      edit,
      cours,
      sequence,
      type,
      competences,
    });

  const [open, setOpen] = useState(false);
  const { form } = useGetFormValues({
    edit,
    cours,
    sequence,
    type,
    competences,
  });
  const { onSubmit } = useGetSubmitFunction({
    edit,
    type,
    sequenceId,
    cours,
    sequence,
    selectedCompetences,
    userId,
    sequenceType: sequenceType || 'template',
  });

  function selectCompetences({
    competence,
    remove,
  }: {
    competence: Competence;
    remove?: boolean;
  }) {
    if (remove) {
      setSelectedCompetences((prev) =>
        prev.filter((c) => c._id !== competence._id)
      );
    } else {
      setSelectedCompetences((prev) => [...prev, competence]);
    }
  }

  if (edit && !cours && !sequence) {
    return (
      <ErrorDialog
        message={`
    You are trying to edit a ${type} but the ${type} is not available.
    `}
      />
    );
  }

  return (
    <div>
      <AddCoursOrSequenceForm
        competences={competences}
        form={form}
        open={open}
        setOpen={setOpen}
        selectedCompetences={selectedCompetences}
        setSelectedCompetences={selectCompetences}
        onSubmit={onSubmit}
        title={title}
        imageUrl={
          type === 'cours'
            ? cours?.imageUrl
            : type === 'sequence'
              ? sequence?.imageUrl
              : undefined
        }
      />
    </div>
  );
}
