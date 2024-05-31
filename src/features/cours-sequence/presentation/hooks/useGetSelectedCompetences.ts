import { Competence } from "@/features/comp-cat/domain/entities/schemas";
import { useState } from "react";
import { Cours, Sequence } from "../../domain/entities/cours-schemas";

function useGetSelectedCompetences(options: {
  edit?: boolean;
  cours?: Cours;
  sequence?: Sequence;
  type: "cours" | "sequence";
  competences: Competence[];
}) {
  const [selectedCompetences, setSelectedCompetences] = useState<Competence[]>(
    options.edit && options.cours !== undefined
      ? filterCompetences({
          competences: options.competences,
          selectedCompetences: options.cours!.competences,
        })
      : options.sequence !== undefined
      ? filterCompetences({
          competences: options.competences,
          selectedCompetences: options.sequence!.competencesIds,
        })
      : []
  );

  function filterCompetences({
    competences,
    selectedCompetences,
  }: {
    competences: Competence[];
    selectedCompetences: string[];
  }) {
    return competences.filter((c) =>
      selectedCompetences.some((sc) => sc === c._id)
    );
  }

  return { selectedCompetences, setSelectedCompetences };
}

export default useGetSelectedCompetences;
