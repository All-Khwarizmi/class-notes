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
          <header className="flex justify-center pt-8">
            <h1 className="font-bold text-xl">{classe.name} </h1>
          </header>
          <StudentsTable classId={params.slug} />
        </main>
      ) : (
        <MessageFullScreen message="Chargement..." />
      )}
    </>
  );
}
