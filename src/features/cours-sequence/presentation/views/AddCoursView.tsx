"use client";
import AddCoursOrSequenceForm from "../components/AddCoursOrSequenceForm";
import { Competence } from "@/features/comp-cat/domain/entities/schemas";
import { UserAuth } from "@/core/auth/i-auth";
import useSaveCoursMetadata from "../../application/usecases/services/useSaveCoursMetadata";
import { useState } from "react";
import { Cours } from "../../domain/entities/cours-schemas";
import { useForm } from "react-hook-form";
import useSaveSequenceMetadata from "../../application/usecases/services/useSaveSequenceMetadata";
import useUpdateCoursMetadata from "../../application/usecases/services/useUpdateCoursMetadata";

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
}: {
  competences: Competence[];
  authUser: UserAuth;
  type: "cours" | "sequence";
  edit?: boolean;
  cours?: Cours;
  title: string;
  sequenceId?: string;
}) {
  const [selectedCompetences, setSelectedCompetences] = useState<Competence[]>(
    edit && cours !== undefined
      ? competences.filter((c) => cours.competences.includes(c._id))
      : []
  );
  const { setSaveCoursMetadata } = useSaveCoursMetadata();
  const { setSaveSequenceMetadata } = useSaveSequenceMetadata();
  const { setUpdateCoursMetadata } = useUpdateCoursMetadata();
  const [open, setOpen] = useState(false);
  const form = useForm<CoursSequenceForm>({
    defaultValues: edit
      ? {
          description: cours?.description,
          category: cours?.category,
          name: cours?.name,
          competences: cours?.competences || [],
          imageUrl: cours?.imageUrl,
        }
      : {
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

  function onEditCours(data: CoursSequenceForm) {
    console.log({ submitImg: data.imageUrl });
    const newData = {
      ...cours!,
      ...data,
      competences: selectedCompetences.map((c) => c._id),
    };
    setUpdateCoursMetadata({
      cours: newData,
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
          onSubmit={onEditCours}
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
