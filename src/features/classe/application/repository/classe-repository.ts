import authRepository from '@/features/auth/application/repository/old-auth-repository';
import useCreateClasseInfra from '@/features/classe/infra/services/useCreateClasseInfra';
import useDeleteClasseInfra from '@/features/classe/infra/services/useDeleteClasseInfra';
import useGetClasseInfra from '@/features/classe/infra/services/useGetClasseInfra';
import useGetClassesInfra from '@/features/classe/infra/services/useGetClassesInfra';

import useCreateClasseUsecase from '../adapters/services/useCreateClasseUsecase';
import useDeleteClasseUsecase from '../adapters/services/useDeleteClasseUsecase';
import useGetClasseUsecase from '../adapters/services/useGetClasseUsecase';
import useGetClassesUsecase from '../adapters/services/useGetClassesUsecase';

export const classeRepository = {
  useCreateClasse: useCreateClasseUsecase.bind(null, {
    useCreateClasseInfra,
    authRepository,
  }),
  useDeleteClasse: useDeleteClasseUsecase.bind(null, { useDeleteClasseInfra }),
  useGetClasse: ({ id }: { id: string }) =>
    useGetClasseUsecase.bind(null, { useGetClasseInfra, id }),
  useUpdateClasse: {},
  useGetClasses: ({ id }: { id: string }) =>
    useGetClassesUsecase.bind(null, { id, useGetClassesInfra }),
};

export type ClasseRepository = typeof classeRepository;
