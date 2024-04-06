import useStartEvaluationCreationUsecase from "../usecases/useStartEvaluationCreationUsecase";

export const evaluationsRepository = {
  useStartEvaluationCreation: () => useStartEvaluationCreationUsecase(),
};
