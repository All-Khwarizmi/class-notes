import { Edit } from "lucide-react";
import { Cours } from "../../domain/entities/cours-schemas";
import EditorProviderWrapper from "../components/EditorProvider";

export default async function CoursView({
  cours,
}: {
  cours: Cours;
  userId: string;
}) {
  return (
    <EditorProviderWrapper>
      <div>
        <h1>{cours.name}</h1>
        <p>{cours.description}</p>
      </div>
    </EditorProviderWrapper>
  );
}
