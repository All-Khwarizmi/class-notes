import useCreateClasseInfra from "@/infrastructure/classe/useCreateClasseInfra";
import useCreateClasseUsecase from "../usecases/useCreateClasseUsecase";

export const classeRepository = {
  useCreateClasse: useCreateClasseUsecase.bind(null, { useCreateClasseInfra }),
};
