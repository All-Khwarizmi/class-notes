"use client";
import AddCoursOrSequenceForm from "../components/AddCoursOrSequenceForm";
import { Competence } from "@/features/comp-cat/domain/entities/schemas";
import { UserAuth } from "@/core/auth/i-auth";
import useSaveCoursMetadata from "../../application/usecases/services/useSaveCoursMetadata";
import { useState } from "react";
import { Cours } from "../../domain/entities/cours-schemas";
import { useForm } from "react-hook-form";
import useSaveSequenceMetadata from "../../application/usecases/services/useSaveSequenceMetadata";

export interface CoursSequenceForm
  extends Pick<
    Cours,
    "description" | "category" | "name" | "competences" | "imageUrl"
  > {}
export default function AddCoursOrSequenceView({
  competences,
  authUser,
  type,
  title,
  sequenceId,
}: {
  competences: Competence[];
  authUser: UserAuth;
  type: "cours" | "sequence";
  title: string;
  sequenceId?: string;
}) {
  const [selectedCompetences, setSelectedCompetences] = useState<Competence[]>(
    []
  );
  const { setSaveCoursMetadata } = useSaveCoursMetadata();
  const { setSaveSequenceMetadata } = useSaveSequenceMetadata();
  const [open, setOpen] = useState(false);
  const form = useForm<CoursSequenceForm>({
    defaultValues: {
      description: "",
      category: "",
      name: "",
      competences: [],
    },
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

  function onSubmitCours(data: CoursSequenceForm) {
    const newData = {
      ...data,
      competences: selectedCompetences.map((c) => c._id),
    };
    setSaveCoursMetadata({
      sequenceId: sequenceId!,
      cours: newData,
      userId: authUser.userId,
    });
  }

  function onSubmitSequence(data: CoursSequenceForm) {
    const newData = {
      ...data,
      competencesIds: selectedCompetences.map((c) => c._id),
    };
    setSaveSequenceMetadata({
      sequence: newData,
      userId: authUser.userId,
    });
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
        onSubmit={
          type === "cours"
            ? sequenceId !== null
              ? onSubmitCours
              : () => {
                  throw new Error("sequenceId is required for cours");
                }
            : onSubmitSequence
        }
        title={title}
      />
    </div>
  );
}
