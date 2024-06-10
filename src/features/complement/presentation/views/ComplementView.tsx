"use client";
import Editor from "@/core/components/common/editor/Editor";
import React from "react";
import { Complement } from "../../domain/complement-schemas";
import AfterMenuBar from "@/core/components/common/editor/AfterMunuBar";
import UpdateComplement from "../components/UpdateComplement";
import { Eye } from "lucide-react";
import Link from "next/link";
import AfterMenuButton from "@/core/components/common/editor/AfterMenuButton";

function ComplementView(props: {
  slug: string;
  complement: Complement;
  userId: string;
}) {
  //! Check complement type and return the right component
  return (
    <Editor
      content={props.complement.body}
      slotafter={
        <div className=" flex flex-col gap-4 ">
          <AfterMenuBar>
            <UpdateComplement complement={props.complement} />
            <AfterMenuButton>
              <Link
                href={`/spaces/complement/${props.complement.id}?user=${props.userId}`}
              >
                <Eye size={12} />
              </Link>
            </AfterMenuButton>
          </AfterMenuBar>
        </div>
      }
    />
  );
}

export default ComplementView;
