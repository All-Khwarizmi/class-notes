import { Competence } from "@/features/comp-cat/domain/entities/schemas";
import useSaveCoursMetadata from "../../application/usecases/services/useSaveCoursMetadata";
import useSaveSequenceMetadata from "../../application/usecases/services/useSaveSequenceMetadata";
import useUpdateCoursMetadata from "../../application/usecases/services/useUpdateCoursMetadata";
import { Cours, Sequence } from "../../domain/entities/cours-schemas";
import { CoursSequenceForm } from "../views/AddCoursView";
import { UserAuth } from "@/core/auth/i-auth";

function useGetSubmitFunction(options: {
  edit?: boolean;
  type: "cours" | "sequence";
  sequenceId?: string;
  cours?: Cours;
  sequence?: Sequence;
  selectedCompetences: Competence[];
  authUser: UserAuth;
}) {
  const { setSaveCoursMetadata } = useSaveCoursMetadata();
  const { setSaveSequenceMetadata } = useSaveSequenceMetadata();
  const { setUpdateCoursMetadata } = useUpdateCoursMetadata();

  function onSubmitCours(data: CoursSequenceForm) {
    const newData = {
      ...data,
      competences: options.selectedCompetences.map((c) => c._id),
    };
    setSaveCoursMetadata({
      sequenceId: options.sequenceId!,
      cours: newData,
      userId: options.authUser.userId,
    });
  }

  function onEditCours(data: CoursSequenceForm) {
    const newData = {
      ...options.cours!,
      ...data,
      competences: options.selectedCompetences.map((c) => c._id),
    };
    setUpdateCoursMetadata({
      cours: newData,
    });
  }

  function onSubmitSequence(data: CoursSequenceForm) {
    const newData = {
      ...data,
      competencesIds: options.selectedCompetences.map((c) => c._id),
    };
    setSaveSequenceMetadata({
      sequence: newData,
      userId: options.authUser.userId,
    });
  }

  // retunr submit function based on options:  (data: CoursSequenceForm) => void
  return {
    onSubmit:
      options.edit && options.cours !== undefined
        ? onEditCours
        : options.sequence !== undefined
        ? onSubmitSequence //!!! if sequence is defined should be updating sequence
        : options.type === "cours"
        ? onSubmitCours
        : onSubmitSequence,
  };
}

export default useGetSubmitFunction;
