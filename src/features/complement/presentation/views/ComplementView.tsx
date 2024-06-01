"use client";
import Editor from "@/core/components/common/editor/Editor";
import React from "react";
import { Complement } from "../../domain/complement-schemas";
import AfterMenuBar from "@/core/components/common/editor/AfterMunuBar";
import UpdateComplement from "../components/UpdateComplement";

function ComplementView(props: { slug: string; complement: Complement }) {
  //! Check complement type and return the right component
  return (
    <Editor
      content={props.complement.body}
      slotafter={
        <div className=" flex flex-col gap-4 ">
          <AfterMenuBar>
            <UpdateComplement complement={props.complement} />
          </AfterMenuBar>
        </div>
      }
    />
  );
}

export default ComplementView;
