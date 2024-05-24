import { fetchQuery } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
export default async function Page() {
  const user = await fetchQuery(api.users.getUserQuery, {
    userId: "user_2eBWORVbe9p5HUGoR9JjAtBRGpU",
  });

  if (!user) {
    return <h1>User not found</h1>;
  }
  return (
    <div>
      <h1>{user.name}</h1>
      <h2>{user.schoolSubject}</h2>
    </div>
  );
}
