"use client";
import StudentsTable from "./StudentsTable";

export default function ClassPage({ params }: { params: { slug: string } }) {
  return <StudentsTable classId={params.slug} />;
}
