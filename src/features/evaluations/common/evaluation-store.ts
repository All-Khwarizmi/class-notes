import { create } from "zustand";
import { persist } from "zustand/middleware";

type EvaluationCreationState = {
  isCreating: boolean;
  setIsCreating: () => void;
};

export const useEvaluationCreationStore = create<EvaluationCreationState>()(
  persist(
    (set, get) => ({
      isCreating: false,
      setIsCreating: () => set((state) => ({ isCreating: !state.isCreating })),
    }),
    {
      name: "evaluation-creation",
      skipHydration: true,
    }
  )
);
