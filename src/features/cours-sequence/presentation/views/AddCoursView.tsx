"use client";
import AddCoursOrSequenceForm from "../components/AddCoursOrSequenceForm";
import { Competence } from "@/features/comp-cat/domain/entities/schemas";
import { UserAuth } from "@/core/auth/i-auth";
import useSaveCoursMetadata from "../../application/usecases/services/useSaveCoursMetadata";
import { useState } from "react";
import { Cours, Sequence } from "../../domain/entities/cours-schemas";
import { useForm } from "react-hook-form";
import useSaveSequenceMetadata from "../../application/usecases/services/useSaveSequenceMetadata";
import useUpdateCoursMetadata from "../../application/usecases/services/useUpdateCoursMetadata";
import useGetSelectedCompetences from "../hooks/useGetSelectedCompetences";
import useGetFormValues from "../hooks/useGetFormValues";
import useGetSubmitFunction from "../hooks/useGetSubmitFunction";

export interface CoursSequenceForm
  extends Pick<
    Cours,
    "description" | "category" | "name" | "competences" | "imageUrl"
  > {}
export default function AddUpdateCoursSequenceView({
  competences,
  authUser,
  type,
  title,
  sequenceId,
  edit,
  cours,
  sequence,
}: {
  competences: Competence[];
  authUser: UserAuth;
  type: "cours" | "sequence";
  edit?: boolean;
  cours?: Cours;
  sequence?: Sequence;
  title: string;
  sequenceId?: string;
}) {
  const { selectedCompetences, setSelectedCompetences } =
    useGetSelectedCompetences({
      edit,
      cours,
      sequence,
      type,
      competences,
    });

  const [open, setOpen] = useState(false);
  const { form } = useGetFormValues({
    edit,
    cours,
    sequence,
    type,
    competences,
  });
  const { onSubmit } = useGetSubmitFunction({
    edit,
    type,
    sequenceId,
    cours,
    sequence,
    selectedCompetences,
    authUser,
  });

  function selectCompetences({
    competence,
    remove,
  }: {
    competence: Competence;
    remove?: boolean;
  }) {
    if (remove) {
      setSelectedCompetences((prev) =>
        prev.filter((c) => c._id !== competence._id)
      );
    } else {
      setSelectedCompetences((prev) => [...prev, competence]);
    }
  }

  if (edit && cours !== undefined && type === "cours") {
    return (
      <div>
        <AddCoursOrSequenceForm
          competences={competences}
          form={form}
          open={open}
          setOpen={setOpen}
          selectedCompetences={selectedCompetences}
          setSelectedCompetences={selectCompetences}
          onSubmit={onSubmit}
          title={title}
          imageUrl={cours.imageUrl}
        />
      </div>
    );
  }
  if (edit && cours !== undefined && type === "sequence") {
    return (
      <div>
        <p>
          Not implemented yet. Sequence selected while passing cours as prop
        </p>
      </div>
    );
  }
  if (edit && cours === undefined) {
    return <p>Edit is true but cours is not passed as a prop</p>;
  }

  return (
    <div>
      <AddCoursOrSequenceForm
        competences={competences}
        form={form}
        open={open}
        setOpen={setOpen}
        selectedCompetences={selectedCompetences}
        setSelectedCompetences={selectCompetences}
        onSubmit={onSubmit}
        title={title}
      />
    </div>
  );
}
