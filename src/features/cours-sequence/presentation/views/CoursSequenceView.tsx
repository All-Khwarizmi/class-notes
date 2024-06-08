"use client";
import { Cours, Sequence } from "../../domain/entities/cours-schemas";
import EditorProviderWrapper from "../../../../core/components/common/editor/EditorProvider";
import CoursSaveButton from "../../../../core/components/common/editor/CoursSaveButton";
import SaveSequenceBodyButton from "../components/SaveSequenceBodyButton";
import Link from "next/link";
import { Eye, Settings } from "lucide-react";
import AfterMenuButton from "@/core/components/common/editor/AfterMenuButton";
import AfterMenuBar from "@/core/components/common/editor/AfterMunuBar";
import { Complement } from "@/features/complement/domain/complement-schemas";

export default function CoursSequenceView({
  cours,
  sequence,
  userId,
  type,
  coursFromSequence,
  complements,
  sequenceType,
}: {
  type: "cours" | "sequence";
  cours?: Cours;
  sequence?: Sequence;
  userId: string;
  coursFromSequence?: Cours[];
  complements?: Complement[];
  sequenceType?: "template" | "sequence";
}) {
  if (type === "cours" && cours && complements) {
    return (
      <>
        <h1 className="text-2xl font-bold pb-4 dark:text-slate-300 text-slate-500 ">
          {cours.name}
        </h1>
        <EditorProviderWrapper content={cours.body}>
          <div className=" flex flex-col gap-4 ">
            <AfterMenuBar>
              <CoursSaveButton userId={userId} cours={cours} />
              <AfterMenuButton>
                <Link href={`/cours/edit/${cours._id}`}>
                  <Settings size={12} />
                </Link>
              </AfterMenuButton>
            </AfterMenuBar>
          </div>
        </EditorProviderWrapper>

        {/* <ComplementsTable complements={complements} coursId={cours._id} /> */}
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
            <AfterMenuBar>
              <SaveSequenceBodyButton
                userId={userId}
                sequence={sequence}
                type={sequenceType}
              />
              <AfterMenuButton>
                <Link href={`/sequences/show/${sequence._id}`}>
                  <Eye size={12} />
                </Link>
              </AfterMenuButton>
              <AfterMenuButton>
                <Link href={`/sequences/edit/${sequence._id}`}>
                  <Settings size={12} />
                </Link>
              </AfterMenuButton>
            </AfterMenuBar>
            {/* <section>
              <CollapsibleCoursList
                cours={coursFromSequence}
                sequenceId={sequence._id}
              />
            </section> */}
          </div>
        </EditorProviderWrapper>
      </>
    );
  }

  return <div>Nothing to show</div>;
}
