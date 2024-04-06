import useGetEvaluationsByCreatorInfra from "../../infra/services/useGetEvaluationsByCreatorInfra";
import useGetEvaluationsByCreatorUsecase from "../usecases/useGetEvaluationsByCreatorUsecase";
import useStartEvaluationCreationUsecase from "../usecases/useStartEvaluationCreationUsecase";

export const evaluationsRepository = {
  useStartEvaluationCreation: () => useStartEvaluationCreationUsecase(),
  useGetEvaluationTemplatesByCreator: ({ userId }: { userId: string }) =>
    useGetEvaluationsByCreatorUsecase.bind(null, {
      userId,
      useGetEvaluationsByCreatorInfra,
    }),
};
