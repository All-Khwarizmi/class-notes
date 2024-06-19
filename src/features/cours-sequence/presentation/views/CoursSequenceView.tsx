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
import VisibilitySwitch from "../components/VisibilitySwitch";
import useUpdateSequenceBody from "../../application/adapters/services/useUpdateSequenceBody";
import useUpdateCoursBody from "../../application/adapters/services/useUpdateCoursBody";
import FloatingEditor from "@/core/components/common/editor/FloatingEditor";
import { useCallback } from "react";
import { debounce } from "lodash";

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
  const { mutate: updateSequenceBody } = useUpdateSequenceBody();
  const debounceUpdateSequenceBody = useCallback(
    () =>
      debounce(
        (content: string) =>
          updateSequenceBody({
            userId,
            sequenceId: sequence!._id,
            body: content,
            type: sequenceType,
          }),
        5000
      ),
    [sequence, sequenceType, updateSequenceBody, userId]
  );
  const { mutate: setUpdateCoursBodyOptions } = useUpdateCoursBody();
  const debounceUpdateCoursBody = useCallback(
    () =>
      debounce(
        (content: string) =>
          setUpdateCoursBodyOptions({
            userId,
            coursId: cours!._id,
            body: content,
          }),
        5000
      ),
    [cours, setUpdateCoursBodyOptions, userId]
  );
  if (type === "cours" && cours && complements) {
    return (
      <>
        <h1 className="text-2xl font-bold pb-4 dark:text-slate-300 text-slate-500 ">
          {cours.name}
        </h1>
        <EditorProviderWrapper
          content={cours.body}
          onUpdate={(content) => {
            setUpdateCoursBodyOptions({
              userId,
              coursId: cours._id,
              body: content,
            });
          }}
        >
          <FloatingEditor
            content={cours.body}
            debounceUpdateFn={debounceUpdateCoursBody()}
            afterMenuBar={
              <AfterMenuBar>
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
                  <VisibilitySwitch
                    userId={userId}
                    type="cours"
                    typeId={cours._id}
                  />
                </div>
              </AfterMenuBar>
            }
          />
          {/* <div className=" flex flex-col gap-4 ">
            <AfterMenuBar>
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
                <VisibilitySwitch
                  userId={userId}
                  type="cours"
                  typeId={cours._id}
                />
              </div>
            </AfterMenuBar>
          </div> */}
        </EditorProviderWrapper>
      </>
    );
  }
  if (type === "sequence" && sequence && coursFromSequence) {
    const viewPath =
      sequenceType === "sequence"
        ? `/spaces/sequences/${sequence._id}?user=${userId}`
        : `/spaces/sequences/${sequence._id}?user=${userId}&type=template`;
    return (
      <>
        <h1 className="text-2xl font-bold pb-4 dark:text-slate-300 text-slate-500 ">
          {sequence.name}
        </h1>
        <FloatingEditor
          content={sequence.body}
          debounceUpdateFn={debounceUpdateSequenceBody()}
          afterMenuBar={
            <AfterMenuBar>
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
                <VisibilitySwitch
                  userId={userId}
                  type="sequence"
                  typeId={sequence._id}
                />
              </div>
            </AfterMenuBar>
          }
        />
        {/* <div className="flex flex-col gap-4 ">
            <AfterMenuBar>
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
                <VisibilitySwitch
                  userId={userId}
                  type="sequence"
                  typeId={sequence._id}
                />
              </div>
            </AfterMenuBar>
          </div> */}
      </>
    );
  }

  return <div>Nothing to show</div>;
}
