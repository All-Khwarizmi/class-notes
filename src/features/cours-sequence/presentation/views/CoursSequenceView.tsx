"use client";
import { Cours, Sequence } from "../../domain/entities/cours-schemas";
import EditorProviderWrapper from "../components/EditorProvider";
import EditorChild from "../components/EditorChild";
import CoursSaveButton from "../components/CoursSaveButton";
import SaveSequenceBodyButton from "../components/SaveSequenceBodyButton";
import { Button } from "@mui/material";

export default function CoursSequenceView({
  cours,
  sequence,
  userId,
  type,
}: {
  type: "cours" | "sequence";
  cours?: Cours;
  sequence?: Sequence;
  userId: string;
}) {
  if (type === "cours" && cours) {
    return (
      <EditorProviderWrapper content={cours.body}>
        <EditorChild>
          <CoursSaveButton userId={userId} cours={cours} />
        </EditorChild>
      </EditorProviderWrapper>
    );
  }
  if (type === "sequence" && sequence) {
    return (
      <>
        <h1 className="text-2xl font-bold pb-4 dark:text-slate-300 text-slate-500 ">
          {sequence.name}
        </h1>
        <EditorProviderWrapper content={sequence.body}>
          <div>
            <SaveSequenceBodyButton userId={userId} sequence={sequence} />
            {/* Add button to add a cours  */}

            <Button
              LinkComponent={() => <a href={`cours/add/${sequence._id}`} />}
              className="mt-2"
              onClick={() => {
                console.log("Add a cours");
              }}
            >
              Add a cours
            </Button>
          </div>
        </EditorProviderWrapper>
      </>
    );
  }

  return null;
}
