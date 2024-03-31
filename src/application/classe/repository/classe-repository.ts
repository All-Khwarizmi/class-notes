import useCreateClasseInfra from "@/infrastructure/classe/useCreateClasseInfra";
import useCreateClasseUsecase from "../usecases/useCreateClasseUsecase";
import useDeleteClasseInfra from "@/infrastructure/classe/useDeleteClasseInfra";
import useDeleteClasseUsecase from "../usecases/useDeleteClasseUsecase";

export const classeRepository = {
  useCreateClasse: useCreateClasseUsecase.bind(null, { useCreateClasseInfra }),
  useDeleteClasse: useDeleteClasseUsecase.bind(null, { useDeleteClasseInfra }),
  useGetClasse: {},
  useUpdateClasse: {},
  useGetClasses: {},
};
