"use client";
import React, { useEffect, useState, useRef } from "react";
import { Complement } from "../../domain/complement-schemas";
import UpdateComplement from "../components/UpdateComplement";
import { Eye } from "lucide-react";
import Link from "next/link";
import AfterMenuButton from "@/core/components/common/editor/AfterMenuButton";
import useUpdateComplement from "../../application/adapters/services/useUpdateComplement";
import FloatingEditor from "@/core/components/common/editor/FloatingEditor";
import dynamic from "next/dynamic";
import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";

const ExcalidrawCanvas = dynamic(
  () =>
    import("../components/ExcalidrawCanvas").then(
      (mod) => mod.ExcalidrawCanvas
    ),
  { ssr: false, loading: () => <LoadingSkeleton /> }
);

function ComplementView(props: {
  slug: string;
  complement: Complement;
  userId: string;
}) {
  const { debounceUpdateComplement } = useUpdateComplement();
  const [isClient, setIsClient] = useState(false);
  const [debug, setDebug] = useState<string>("Initializing...");
  const renderCount = useRef(0);

  useEffect(() => {
    setIsClient(true);
    setDebug("Component mounted, isClient set to true");
  }, []);


  if (props.complement.contentType === "Diagram") {
    if (!isClient) {
      return <LoadingSkeleton />;
    }
    return (
      <div>
        <ExcalidrawCanvas
          initialData={props.complement.body}
          saveComplement={debounceUpdateComplement(props.complement)}
        />
     
      </div>
    );
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
        </div>
      </FloatingEditor>
     
    </div>
  );
}

export default ComplementView;
