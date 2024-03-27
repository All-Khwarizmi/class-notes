"use client";
import StudentsTable from "./StudentsTable";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import MessageFullScreen from "@/components/MessageFullScreen";

export default function ClassPage({ params }: { params: { slug: string } }) {
  //! TODO: Refactor the delete mutation to use the new api
  const classe = useQuery(api.classes.getClass, { id: params.slug });

  return (
    <>
      {classe ? (
        <>
          <StudentsTable classId={params.slug} />
        </>
      ) : (
        <MessageFullScreen message="Chargement..." />
      )}
    </>
  );
}
