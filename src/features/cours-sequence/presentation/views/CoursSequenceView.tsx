"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Cours, Sequence } from "../../domain/entities/cours-schemas";
import { Complement } from "@/features/complement/domain/complement-schemas";
import useUpdateSequenceBody from "../../application/adapters/services/useUpdateSequenceBody";
import useUpdateCoursBody from "../../application/adapters/services/useUpdateCoursBody";
import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
import EmbedWithInput from "../components/Embed";
import BlogEditor from "@/core/components/common/editor/BlogEditor";

const ExcalidrawCanvas = dynamic(
  () =>
    import(
      "@/features/complement/presentation/components/ExcalidrawCanvas"
    ).then((mod) => mod.ExcalidrawCanvas),
  { ssr: false, loading: () => <LoadingSkeleton /> }
);

interface CoursSequenceViewProps {
  type: "cours" | "sequence";
  cours?: Cours;
  sequence?: Sequence;
  userId: string;
  coursFromSequence?: Cours[];
  complements?: Complement[];
  sequenceType?: "template" | "sequence";
}

export default function CoursSequenceView({
  cours,
  sequence,
  userId,
  type,
  sequenceType,
}: CoursSequenceViewProps) {
  const { debounceUpdateSequenceBody } = useUpdateSequenceBody();
  const { debounceUpdateCoursBody } = useUpdateCoursBody();

  if (type === "cours" && cours) {
    if (cours.contentType === "Diagram") {
      return (
        <ExcalidrawCanvas
          initialData={cours.body}
          saveComplement={debounceUpdateCoursBody({
            userId,
            coursId: cours._id,
          })}
        />
      );
    }
    if (cours.contentType === "Embed") {
      return (
        <EmbedWithInput
          onUrlUpdate={debounceUpdateCoursBody({
            userId,
            coursId: cours._id,
          })}
          initialUrl={cours.body}
          title={cours.name}
        />
      );
    }
    return (
      <BlogEditor
        content={cours.body}
        onUpdate={debounceUpdateCoursBody({
          userId,
          coursId: cours._id,
        })}
        type="cours"
        item={cours}
        userId={userId}
      />
    );
  }

  if (type === "sequence" && sequence) {
    if (sequence.contentType === "Diagram") {
      return (
        <ExcalidrawCanvas
          initialData={sequence.body}
          saveComplement={debounceUpdateSequenceBody({
            userId,
            sequenceId: sequence._id,
            type: sequenceType,
          })}
        />
      );
    }
    return (
      <BlogEditor
        content={sequence.body}
        onUpdate={debounceUpdateSequenceBody({
          userId,
          sequenceId: sequence._id,
          type: sequenceType,
        })}
        type="sequence"
        item={sequence}
        userId={userId}
        sequenceType={sequenceType}
      />
    );
  }

  return <div>Rien à afficher</div>;
}
