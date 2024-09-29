import getStudents from '@/features/classe/application/adapters/actions/get-students';
import { ClasseTableType } from '@/features/classe/domain/class-schema';
import { coursUsecases } from '@/features/cours-sequence/application/usecases/cours-usecases';
import { NavItem } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import { isRight } from 'fp-ts/lib/Either';
import { useEffect, useState } from 'react';

import getEvaluationCompoundList from '../actions/get-evaluation-compound-list';
import getClassNavItems from '../utils/get-classe-nav-items';

export default function useGetStudentTableData(options: { classeId: string }) {
  const {
    data: students,
    isPending: isStudentsPending,
    refetch: refetchStudents,
  } = useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      return getStudents(options);
    },
  });
  const {
    data: sequences,
    isPending: isSequencesPending,
    refetch: refetchSequences,
  } = useQuery({
    queryKey: ['classe-sequences', options.classeId],
    queryFn: async () => {
      return coursUsecases.getClasseSequences(options);
    },
    refetchOnWindowFocus: false,
  });
  const {
    data: compoundEvaluations,
    isPending: isCompoundEvaluationsPending,
    refetch: refetchCompoundEvaluations,
  } = useQuery({
    queryKey: ['compound-evaluations'],
    queryFn: () => getEvaluationCompoundList(options),
  });
  const [classeNavItems, setClasseNavItems] = useState<NavItem[]>([]);
  useEffect(() => {
    if (sequences && isRight(sequences)) {
      setClasseNavItems(
        getClassNavItems({
          sequences: sequences.right,
          ...options,
        })
      );
    }
  }, [sequences]);
  const [tableData, setTableData] = useState<ClasseTableType | null>(null);
  useEffect(() => {
    if (
      students &&
      isRight(students) &&
      compoundEvaluations &&
      isRight(compoundEvaluations)
    ) {
      setTableData({
        students: students.right,
        evaluations: compoundEvaluations.right,
      });
    }
  }, [students, compoundEvaluations]);

  return {
    tableData,
    refetchStudents,
    refetchSequences,
    refetchCompoundEvaluations,
    classeNavItems,
    isLoading:
      isStudentsPending || isSequencesPending || isCompoundEvaluationsPending,
  };
}
