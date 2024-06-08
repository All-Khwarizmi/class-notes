/**
 * v0 by Vercel.
 * @see https://v0.dev/t/nbXquXk3gAV
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Button } from "@/core/components/ui/button";
import { ClassType } from "@/features/classe/domain/class-schema";
import UserSpaceClasseCard from "../components/UserSpaceClasseCard";

export default function UserSpaceClassesGridView(props: {
  classes: ClassType[];
}) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 md:p-6">
      {props.classes.map((classe) => (
        <UserSpaceClasseCard key={classe.id} classe={classe} />
      ))}
    </section>
  );
}
