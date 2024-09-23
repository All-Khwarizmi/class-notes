export default async function BlogPage({
  params,
}: {
  params: { hostname: string };
}) {
  const hostname = params.hostname;
  return <div>Blog {hostname}</div>;
}
