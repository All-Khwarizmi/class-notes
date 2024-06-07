import useCreateClasseInfra from "@/features/classe/infra/services/useCreateClasseInfra";
import useDeleteClasseInfra from "@/features/classe/infra/services/useDeleteClasseInfra";
import useGetClasseInfra from "@/features/classe/infra/services/useGetClasseInfra";
import useGetClassesInfra from "@/features/classe/infra/services/useGetClassesInfra";
import useCreateClasseUsecase from "../usecases/services/useCreateClasseUsecase";
import useDeleteClasseUsecase from "../usecases/services/useDeleteClasseUsecase";
import useGetClasseUsecase from "../usecases/services/useGetClasseUsecase";
import useGetClassesUsecase from "../usecases/services/useGetClassesUsecase";
import authRepository from "@/features/auth/application/repository/old-auth-repository";

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
