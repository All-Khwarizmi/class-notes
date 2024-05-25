export default async function Page({ params }: { params: { slug: string } }) {
  return <div>Cours Page: {params.slug}</div>;
}
