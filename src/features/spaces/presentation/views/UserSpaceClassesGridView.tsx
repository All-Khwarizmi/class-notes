import { ClassType } from "@/features/classe/domain/class-schema";
import UserSpaceClasseCard from "../components/UserSpaceClasseCard";

export default function UserSpaceClassesGridView(props: {
  classes: ClassType[];
  userId: string;
}) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-6 p-4 md:p-6">
      {props.classes.map((classe) => (
        <UserSpaceClasseCard
          key={classe.id}
          classe={classe}
          userId={props.userId}
        />
      ))}
    </section>
  );
}
