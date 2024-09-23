export default function Page({ params }: { params: { hostname: string } }) {
  const user = params.hostname;
  console.log(user);
  if (!user) {
    return <div>Not found</div>;
  }
  return <div>My Post: {user}</div>;
}
