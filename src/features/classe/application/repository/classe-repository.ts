import useCreateClasseInfra from "@/features/classe/infra/services/useCreateClasseInfra";
import useDeleteClasseInfra from "@/features/classe/infra/services/useDeleteClasseInfra";
import useGetClasseInfra from "@/features/classe/infra/services/useGetClasseInfra";
import useGetClassesInfra from "@/features/classe/infra/services/useGetClassesInfra";
import useCreateClasseUsecase from "../usecases/useCreateClasseUsecase";
import useDeleteClasseUsecase from "../usecases/useDeleteClasseUsecase";
import useGetClasseUsecase from "../usecases/useGetClasseUsecase";
import useGetClassesUsecase from "../usecases/useGetClassesUsecase";
import authRepository from "@/features/auth/application/repository/auth-repository";

export const classeRepository = {
  useCreateClasse: useCreateClasseUsecase.bind(null, { useCreateClasseInfra, authRepository }),
  useDeleteClasse: useDeleteClasseUsecase.bind(null, { useDeleteClasseInfra }),
  useGetClasse: ({ id }: { id: string }) =>
    useGetClasseUsecase.bind(null, { useGetClasseInfra, id }),
  useUpdateClasse: {},
  useGetClasses: ({ id }: { id: string }) =>
    useGetClassesUsecase.bind(null, { id, useGetClassesInfra }),
};
