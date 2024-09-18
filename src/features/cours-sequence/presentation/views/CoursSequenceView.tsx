"use client";
import { Cours, Sequence } from "../../domain/entities/cours-schemas";
import CoursSaveButton from "../../../../core/components/common/editor/CoursSaveButton";
import SaveSequenceBodyButton from "../components/SaveSequenceBodyButton";
import Link from "next/link";
import { Eye, Settings } from "lucide-react";
import AfterMenuButton from "@/core/components/common/editor/AfterMenuButton";
import { Complement } from "@/features/complement/domain/complement-schemas";
import useUpdateSequenceBody from "../../application/adapters/services/useUpdateSequenceBody";
import useUpdateCoursBody from "../../application/adapters/services/useUpdateCoursBody";
import FloatingEditor from "@/core/components/common/editor/FloatingEditor";
import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
import dynamic from "next/dynamic";
import Embed from "../components/Embed";
import EmbedWithInput from "../components/Embed";
const ExcalidrawCanvas = dynamic(
  () =>
    import(
      "@/features/complement/presentation/components/ExcalidrawCanvas"
    ).then((mod) => mod.ExcalidrawCanvas),
  { ssr: false, loading: () => <LoadingSkeleton /> }
);

export default function CoursSequenceView({
  cours,
  sequence,
  userId,
  type,

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
  const { debounceUpdateSequenceBody } = useUpdateSequenceBody();

  const { debounceUpdateCoursBody } = useUpdateCoursBody();

  if (type === "cours" && cours) {
    if (cours.contentType === "Diagram") {
      return (
        <>
          <ExcalidrawCanvas
            initialData={cours.body}
            saveComplement={debounceUpdateCoursBody({
              userId,
              coursId: cours._id,
            })}
          />
        </>
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
      <>
        <FloatingEditor
          content={cours.body}
          debounceUpdateFn={debounceUpdateCoursBody({
            userId,
            coursId: cours._id,
          })}
          afterMenuBar
        >
          {" "}
          <div className="flex items-center justify-between w-full gap-4 ">
            <div className="flex items-center gap-1">
              <CoursSaveButton userId={userId} cours={cours} />
              <AfterMenuButton>
                <Link href={`/spaces/cours/${cours._id}?user=${userId}`}>
                  <Eye size={12} />
                </Link>
              </AfterMenuButton>
              <AfterMenuButton>
                <Link href={`/cours/edit/${cours._id}`}>
                  <Settings size={12} />
                </Link>
              </AfterMenuButton>
            </div>
            {/* <VisibilitySwitch userId={userId} type="cours" typeId={cours._id} /> */}
          </div>
        </FloatingEditor>
      </>
    );
  }
  if (type === "sequence" && sequence) {
    if (sequence.contentType === "Diagram") {
      return (
        <>
          <ExcalidrawCanvas
            initialData={sequence.body}
            saveComplement={debounceUpdateSequenceBody({
              userId,
              sequenceId: sequence._id,
              type: sequenceType,
            })}
          />
        </>
      );
    }
    const viewPath =
      sequenceType === "sequence"
        ? `/spaces/sequences/${sequence._id}?user=${userId}`
        : `/spaces/sequences/${sequence._id}?user=${userId}&type=template`;
    return (
      <>
        <FloatingEditor
          content={sequence.body}
          debounceUpdateFn={debounceUpdateSequenceBody({
            userId,
            sequenceId: sequence._id,
            type: sequenceType,
          })}
          afterMenuBar
        >
          <div className="flex items-center justify-between w-full gap-4 ">
            <div className="flex items-center gap-1">
              <SaveSequenceBodyButton
                userId={userId}
                sequence={sequence}
                type={sequenceType}
              />
              <AfterMenuButton>
                <Link href={viewPath}>
                  <Eye size={12} />
                </Link>
              </AfterMenuButton>
              <AfterMenuButton>
                <Link
                  href={
                    sequenceType === "sequence"
                      ? `/sequences/edit/${sequence._id}?type=sequence`
                      : `/sequences/edit/${sequence._id}`
                  }
                >
                  <Settings size={12} />
                </Link>
              </AfterMenuButton>
            </div>
            {/* <VisibilitySwitch
              userId={userId}
              type="sequence"
              typeId={sequence._id}
            /> */}
          </div>
        </FloatingEditor>
      </>
    );
  }

  return <div>Nothing to show</div>;
}
