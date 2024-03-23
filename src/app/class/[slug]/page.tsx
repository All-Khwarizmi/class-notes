"use client";
import Header from "@/components/Header";
import StudentsTable from "./StudentsTable";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import MessageFullScreen from "@/components/MessageFullScreen";

export default function ClassPage({ params }: { params: { slug: string } }) {
  const classe = useQuery(api.classes.getClass, { id: params.slug });

  return (
    <>
      <Header />
      {classe ? (
        <main>
          <h1>{} </h1>
          <StudentsTable classId={params.slug} />
        </main>
      ) : (
        <MessageFullScreen message="Chargement..." />
      )}
    </>
  );
}
