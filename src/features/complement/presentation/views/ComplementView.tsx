"use client";
import Editor from "@/core/components/common/editor/Editor";
import React from "react";
import { Complement } from "../../domain/complement-schemas";
import AfterMenuBar from "@/core/components/common/editor/AfterMunuBar";
import UpdateComplement from "../components/UpdateComplement";
import { Eye } from "lucide-react";
import Link from "next/link";
import AfterMenuButton from "@/core/components/common/editor/AfterMenuButton";
import VisibilitySwitch from "@/features/cours-sequence/presentation/components/VisibilitySwitch";
import useUpdateComplement from "../../application/adapters/services/useUpdateComplement";

function ComplementView(props: {
  slug: string;
  complement: Complement;
  userId: string;
}) {
  const { setComplementOptions } = useUpdateComplement();
  //! Check complement type and return the right component
  return (
    <Editor
      onUpdate={(content) => {
        setComplementOptions({
          ...props.complement,
          body: content,
        });
      }}
      content={props.complement.body}
      slotafter={
        <div className=" flex flex-col gap-4 ">
          <AfterMenuBar>
            <div className="flex items-center justify-between w-full gap-4 ">
              <div className="flex items-center gap-1">
                <UpdateComplement complement={props.complement} />
                <AfterMenuButton>
                  <Link
                    href={`/spaces/complement/${props.complement.id}?user=${props.userId}`}
                  >
                    <Eye size={12} />
                  </Link>
                </AfterMenuButton>
              </div>
              <VisibilitySwitch
                userId={props.userId}
                type="complement"
                typeId={props.complement.id}
              />
            </div>
          </AfterMenuBar>
        </div>
      }
    />
  );
}

export default ComplementView;
