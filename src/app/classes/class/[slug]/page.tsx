"use client";
import StudentsTable from "./StudentsTable";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import MessageFullScreen from "@/components/MessageFullScreen";
import useGetClasse from "@/hooks/class/useGetClasse";

export default function ClassPage({ params }: { params: { slug: string } }) {
  const { loading } = useGetClasse({ id: params.slug });
  if (loading) {
    return <MessageFullScreen message="Chargement..." />;
  }
  return <StudentsTable classId={params.slug} />;
}
