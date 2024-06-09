import { Competence } from "@/features/comp-cat/domain/entities/schemas";
import useSaveCoursMetadata from "../../application/usecases/services/useSaveCoursMetadata";
import useSaveSequenceMetadata from "../../application/usecases/services/useSaveSequenceMetadata";
import useUpdateCoursMetadata from "../../application/usecases/services/useUpdateCoursMetadata";
import { Cours, Sequence } from "../../domain/entities/cours-schemas";
import { CoursSequenceForm } from "../views/AddCoursView";
import { UserAuth } from "@/core/auth/i-auth";
import useUpdateSequenceMetadata from "../../application/usecases/services/useUpdateSequenceMetadata";

function useGetSubmitFunction(options: {
  edit?: boolean;
  type: "cours" | "sequence";
  sequenceId?: string;
  cours?: Cours;
  sequence?: Sequence;
  selectedCompetences: Competence[];
  authUser: UserAuth;
  sequenceType: "template" | "sequence";
}) {
  const { setSaveCoursMetadata } = useSaveCoursMetadata();
  const { setSaveSequenceMetadata } = useSaveSequenceMetadata();
  const { setUpdateCoursMetadata } = useUpdateCoursMetadata();
  const { setUpdateSequenceMetadata } = useUpdateSequenceMetadata();

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

  function onEditSequence(data: CoursSequenceForm) {
    const newData = {
      ...options.sequence!,
      ...data,

      competencesIds: options.selectedCompetences.map((c) => c._id),
    };
    setUpdateSequenceMetadata({
      sequence: newData,
      type: options.sequenceType,
    });
  }

  return {
    onSubmit:
      options.edit && options.cours !== undefined
        ? onEditCours
        : options.sequence !== undefined
        ? onEditSequence
        : options.type === "cours"
        ? onSubmitCours
        : onSubmitSequence,
  };
}

export default useGetSubmitFunction;
