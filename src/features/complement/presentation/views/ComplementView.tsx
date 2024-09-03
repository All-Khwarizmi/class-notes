"use client";
import React, { useEffect, useState } from "react";
import { Complement } from "../../domain/complement-schemas";
import UpdateComplement from "../components/UpdateComplement";
import { Eye } from "lucide-react";
import Link from "next/link";
import AfterMenuButton from "@/core/components/common/editor/AfterMenuButton";
import useUpdateComplement from "../../application/adapters/services/useUpdateComplement";
import FloatingEditor from "@/core/components/common/editor/FloatingEditor";
import { ExcalidrawCanvas } from "../components/ExcalidrawCanvas";
import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";

function ComplementView(props: {
  slug: string;
  complement: Complement;
  userId: string;
}) {
  const { debounceUpdateComplement } = useUpdateComplement();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  //! Check complement type and return the right component
  if (props.complement.contentType === "Diagram" && isLoaded) {
    return (
      <ExcalidrawCanvas
        initialData={props.complement.body}
        saveComplement={debounceUpdateComplement(props.complement)}
      />
    );
  }

  if (props.complement.contentType === "Diagram" && !isLoaded) {
    return <LoadingSkeleton />;
  }
  return (
    <div>
      <FloatingEditor
        debounceUpdateFn={debounceUpdateComplement(props.complement)}
        content={props.complement.body}
        afterMenuBar
      >
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
          {/* <VisibilitySwitch
            userId={props.userId}
            type="complement"
            typeId={props.complement.id}
          /> */}
        </div>
      </FloatingEditor>
    </div>
  );
}

export default ComplementView;
