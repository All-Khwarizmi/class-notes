import useCreateClasseInfra from "@/features/classe/infra/services/useCreateClasseInfra";
import useCreateClasseUsecase from "../usecases/useCreateClasseUsecase";
import useDeleteClasseInfra from "@/features/classe/infra/services/useDeleteClasseInfra";
import useDeleteClasseUsecase from "../usecases/useDeleteClasseUsecase";
import useGetClasseUsecase from "../usecases/useGetClasseUsecase";
import useGetClasseInfra from "@/features/classe/infra/services/useGetClasseInfra";
import useGetClassesInfra from "@/features/classe/infra/services/useGetClassesInfra";
import useGetClassesUsecase from "../usecases/useGetClassesUsecase";

export const classeRepository = {
  useCreateClasse: useCreateClasseUsecase.bind(null, { useCreateClasseInfra }),
  useDeleteClasse: useDeleteClasseUsecase.bind(null, { useDeleteClasseInfra }),
  useGetClasse: ({ id }: { id: string }) =>
    useGetClasseUsecase.bind(null, { useGetClasseInfra, id }),
  useUpdateClasse: {},
  useGetClasses: ({ id }: { id: string }) =>
    useGetClassesUsecase.bind(null, { id, useGetClassesInfra }),
};
