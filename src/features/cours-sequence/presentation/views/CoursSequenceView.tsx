"use client";
import { Cours, Sequence } from "../../domain/entities/cours-schemas";
import EditorProviderWrapper from "../components/EditorProvider";
import EditorChild from "../components/EditorChild";
import CoursSaveButton from "../components/CoursSaveButton";

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
  return (
    <EditorProviderWrapper content={""}>
      <div></div>
    </EditorProviderWrapper>
  );
}
