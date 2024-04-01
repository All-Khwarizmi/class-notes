import useCreateClasseInfra from "@/infrastructure/classe/useCreateClasseInfra";
import useCreateClasseUsecase from "../usecases/useCreateClasseUsecase";
import useDeleteClasseInfra from "@/infrastructure/classe/useDeleteClasseInfra";
import useDeleteClasseUsecase from "../usecases/useDeleteClasseUsecase";
import useGetClasseUsecase from "../usecases/useGetClasseUsecase";
import useGetClasseInfra from "@/infrastructure/classe/useGetClasseInfra";

export const classeRepository = {
  useCreateClasse: useCreateClasseUsecase.bind(null, { useCreateClasseInfra }),
  useDeleteClasse: useDeleteClasseUsecase.bind(null, { useDeleteClasseInfra }),
  useGetClasse: ({ id }: { id: string }) =>
    useGetClasseUsecase.bind(null, { useGetClasseInfra, id }),
  useUpdateClasse: {},
  useGetClasses: {},
};
