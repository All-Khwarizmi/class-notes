"use client";
import { Cours, Sequence } from "../../domain/entities/cours-schemas";
import EditorProviderWrapper from "../../../../core/components/common/editor/EditorProvider";
import CoursSaveButton from "../../../../core/components/common/editor/CoursSaveButton";
import SaveSequenceBodyButton from "../components/SaveSequenceBodyButton";
import { Button } from "@mui/material";
import Link from "next/link";
import CollapsibleCoursList from "../components/CallapsibleCoursList";
import { Eye } from "lucide-react";
import MenuButton from "@/core/components/common/editor/MenuButton";
import AfterMenuButton from "@/core/components/common/editor/AfterMenuButton";

export default function CoursSequenceView({
  cours,
  sequence,
  userId,
  type,
  coursFromSequence,
}: {
  type: "cours" | "sequence";
  cours?: Cours;
  sequence?: Sequence;
  userId: string;
  coursFromSequence?: Cours[];
}) {
  if (type === "cours" && cours) {
    return (
      <>
        <h1 className="text-2xl font-bold pb-4 dark:text-slate-300 text-slate-500 ">
          {cours.name}
        </h1>
        <EditorProviderWrapper content={cours.body}>
          <div className="flex gap-2 mt-2">
            <CoursSaveButton userId={userId} cours={cours} />
          </div>
        </EditorProviderWrapper>
      </>
    );
  }
  if (type === "sequence" && sequence && coursFromSequence) {
    return (
      <>
        <h1 className="text-2xl font-bold pb-4 dark:text-slate-300 text-slate-500 ">
          {sequence.name}
        </h1>
        <EditorProviderWrapper content={sequence.body}>
          <div className="flex flex-col gap-4 ">
            <div className="flex gap-2 bg-muted p-2">
              <SaveSequenceBodyButton userId={userId} sequence={sequence} />
              {/* Add button to add a cours  */}

              <AfterMenuButton>
                <Link href={`/cours/add/${sequence._id}`}>Add Cours</Link>
              </AfterMenuButton>
              <AfterMenuButton>
                <Link href={`/sequences/show/${sequence._id}`}>
                  <Eye size={12} />
                </Link>
              </AfterMenuButton>
            </div>
            <section>
              <CollapsibleCoursList cours={coursFromSequence} />
            </section>
          </div>
        </EditorProviderWrapper>
      </>
    );
  }

  return <div>Nothing to show</div>;
}
