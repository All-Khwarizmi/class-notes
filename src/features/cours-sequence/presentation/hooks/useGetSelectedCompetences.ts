import { Competence } from '@/features/comp-cat/domain/entities/schemas';
import { useState } from 'react';

import { Cours, Sequence } from '../../domain/entities/cours-schemas';

/**
 * Retrieves the selected competences based on the provided options.
 *
 * @param {Object} options - The options for retrieving the selected competences.
 * @param {boolean} [options.edit] - Indicates whether it is in edit mode.
 * @param {Cours} [options.cours] - The cours object.
 * @param {Sequence} [options.sequence] - The sequence object.
 * @param {"cours" | "sequence"} options.type - The type of selection.
 * @param {Competence[]} options.competences - The array of competences.
 * @returns {{ selectedCompetences: Competence[], setSelectedCompetences: Function }} An object containing the selected competences and a function to set the selected competences.
 */
function useGetSelectedCompetences(options: {
  edit?: boolean;
  cours?: Cours;
  sequence?: Sequence;
  type: 'cours' | 'sequence';
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

  /**
   * Filters an array of competences based on the selected competences.
   *
   * @param {Object} options - The options for filtering.
   * @param {Competence[]} options.competences - The array of competences to filter.
   * @param {string[]} options.selectedCompetences - The array of selected competences.
   * @returns {Competence[]} The filtered array of competences.
   */
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
