"use client";
import { Cours } from "../../domain/entities/cours-schemas";
import EditorProviderWrapper from "../components/EditorProvider";
import EditorChild from "../components/EditorChild";

export default function CoursView({
  cours,
  userId,
}: {
  cours: Cours;
  userId: string;
}) {
  return (
    <EditorProviderWrapper content={cours.body}>
      <EditorChild userId={userId} cours={cours} />
    </EditorProviderWrapper>
  );
}
