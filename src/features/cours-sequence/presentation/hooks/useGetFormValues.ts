import { Competence } from "@/features/comp-cat/domain/entities/schemas";
import React from "react";
import { Cours, Sequence } from "../../domain/entities/cours-schemas";
import { useForm } from "react-hook-form";
import { CoursSequenceForm } from "../views/AddCoursView";

function useGetFormValues(options: {
  edit?: boolean;
  cours?: Cours;
  sequence?: Sequence;
  type: "cours" | "sequence";
  competences: Competence[];
}) {
  const form = useForm<CoursSequenceForm>({
    defaultValues:
      options.edit && options.cours !== undefined
        ? {
            description: options.cours?.description,
            category: options.cours?.category,
            name: options.cours?.name,
            competences: options.cours?.competences || [],
            imageUrl: options.cours?.imageUrl,
          }
        : options.sequence !== undefined
        ? {
            description: options.sequence?.description,
            category: options.sequence?.category,
            name: options.sequence?.name,
            competences: options.sequence?.competencesIds || [],
            imageUrl: options.sequence?.imageUrl,
          }
        : {
            description: "",
            category: "",
            name: "",
            competences: [],
            imageUrl: "",
          },
  });
  return { form };
}

export default useGetFormValues;
