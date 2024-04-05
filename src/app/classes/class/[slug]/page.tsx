"use client";
import StudentsTable from "../../../../features/classe/presentation/components/StudentsTable";

export default function ClassPage({ params }: { params: { slug: string } }) {
  return <StudentsTable classId={params.slug} />;
}
