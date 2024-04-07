import { create } from "zustand";
import { persist } from "zustand/middleware";

type TemplateCreationState = {
  isCreating: boolean;
  setIsCreating: () => void;
};

export const useTemplateCreationStore = create<TemplateCreationState>()(
  persist(
    (set, get) => ({
      isCreating: false,
      setIsCreating: () => set((state) => ({ isCreating: !state.isCreating })),
    }),
    {
      name: "template-creation",
      skipHydration: true,
    }
  )
);
