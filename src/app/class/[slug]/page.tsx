import Header from "@/components/Header";
import StudentsTable from "./StudentsTable";

export default function ClassPage({ params }: { params: { slug: string } }) {
  return (
    <>
      <Header />
      <main>
        <h1>Class {params.slug} </h1>
        <StudentsTable classId={params.slug} />
      </main>
    </>
  );
}
