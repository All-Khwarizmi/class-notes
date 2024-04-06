import { useEvaluationCreationStore } from "../../common/evaluation-store";

export default function useStartEvaluationCreationUsecase() {
  const setIsCreating = useEvaluationCreationStore(
    (state) => state.setIsCreating
  );

  return {
    setIsCreating,
  };
}
