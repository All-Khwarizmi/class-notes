import { useTemplateCreationStore } from '../../common/template-store';

export default function useStartTemplateCreationUsecase() {
  const setIsCreating = useTemplateCreationStore(
    (state) => state.setIsCreating
  );

  return {
    setIsCreating,
  };
}
