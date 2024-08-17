import { Competence } from "@/features/comp-cat/domain/entities/schemas";
import useSaveCoursMetadata from "../../application/adapters/services/useSaveCoursMetadata";
import useSaveSequenceMetadata from "../../application/adapters/services/useSaveSequenceMetadata";
import useUpdateCoursMetadata from "../../application/adapters/services/useUpdateCoursMetadata";
import { Cours, Sequence } from "../../domain/entities/cours-schemas";
import { CoursSequenceForm } from "../views/AddCoursView";
import { UserAuth } from "@/core/auth/i-auth";
import useUpdateSequenceMetadata from "../../application/adapters/services/useUpdateSequenceMetadata";

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
      competences: data.competences,
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
      competences: data.competences,
    };
    setUpdateCoursMetadata({
      cours: newData,
    });
  }

  function onSubmitSequence(data: CoursSequenceForm) {
    const newData = {
      ...data,
      competencesIds: data.competences,
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

      competencesIds: data.competences,
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
