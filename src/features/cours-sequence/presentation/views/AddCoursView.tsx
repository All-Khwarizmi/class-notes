"use client";
import AddCoursOrSequenceForm from "../components/AddCoursOrSequenceForm";
import { Competence } from "@/features/comp-cat/domain/entities/schemas";
import { UserAuth } from "@/core/auth/i-auth";
import { useState } from "react";
import { Cours, Sequence } from "../../domain/entities/cours-schemas";
import useGetSelectedCompetences from "../hooks/useGetSelectedCompetences";
import useGetFormValues from "../hooks/useGetFormValues";
import useGetSubmitFunction from "../hooks/useGetSubmitFunction";
import ErrorDialog from "@/core/components/common/ErrorDialog";

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

  // add guard rails to prevent null values from being passed to the AddCoursOrSequenceForm component from the outer component

  if (edit && !cours && !sequence) {
    return (
      <ErrorDialog
        message={`
    You are trying to edit a ${type} but the ${type} is not available.
    `}
      />
    );
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
