import Header from "@/components/Header";

export default function ClassPage({ params }: { params: { slug: string } }) {
  return (
    <>
      <Header />
      <main>
        <h1>Class {params.slug} </h1>
      </main>
    </>
  );
}
