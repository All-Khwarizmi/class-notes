import { Button } from "@/core/components/ui/button";
import Link from "next/link";

export default async function AllCoursView() {
  return (
    <div>
      <h1>Cours</h1>

      <Button>
        <Link href={"/cours/add"}> Add Cours</Link>{" "}
      </Button>
    </div>
  );
}
