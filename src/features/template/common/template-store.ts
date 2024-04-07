import { GradeType } from "@/core/domain/grades/grade-schema";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TemplateCreation = {
  name: string;
  description: string;
  gradeType: GradeType;
};
type TemplateCreationState = {
  isCreating: boolean;
  templateCreation: TemplateCreation;
  setTemplateCreation: (template: TemplateCreation) => void;
  setIsCreating: ({ isCreating }: { isCreating: boolean }) => void;
};

export const useTemplateCreationStore = create<TemplateCreationState>()(
  persist(
    (set, get) => ({
      isCreating: false,
      templateCreation: {
        name: "",
        description: "",
        gradeType: "ungraded",
      },
      setTemplateCreation: (template) =>
        set(() => ({ templateCreation: template })),
      setIsCreating: ({ isCreating }) => set((state) => ({ isCreating })),
    }),
    {
      name: "template-creation",
      skipHydration: false,
    }
  )
);
