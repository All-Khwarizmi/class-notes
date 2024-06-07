import NotFound from "@/app/not-found";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { classeUsecases } from "@/features/classe/application/usecases";
import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";
import { ClassType } from "@/features/classe/domain/class-schema";
import ErrorDialog from "@/core/components/common/ErrorDialog";
import UserSpaceClassesGridView from "@/features/spaces/presentation/views/UserSpaceClassesGridView";
import SpacesHeader from "@/core/components/layout/SpacesHeader";
import Sidebar from "@/core/components/layout/Sidebar";
import { NavItem } from "@/lib/types";
import { Presentation } from "lucide-react";

async function UserSpaceServerLayer(props: { slug: string }) {
  if (!props.slug) {
    return <NotFound />;
  }
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/login");
  }
  const eitherClasses = await classeUsecases.getClasses({
    id: authUser.right.userId,
  });
  if (isLeft(eitherClasses)) {
    return (
      <ErrorDialog
        message={`
         Une erreur s'est produite lors du chargement des classes
         ${
           process.env.NODE_ENV === "development"
             ? eitherClasses.left.message
             : ""
         }
        `}
        code={eitherClasses.left.code}
        description={eitherClasses.left.message}
      />
    );
  }
  const classes: ClassType[] = [];

  for (const classe of eitherClasses.right) {
    if (classe.publish === true) {
      classes.push(classe);
    }
  }
  const userSpaceNavItems: NavItem[] = classes.map((classe) => ({
    title: classe.name,
    href: `/spaces/classes/${classe.id}`,
    icon: <Presentation size={16} />,
  }));
  return (
    <>
      <SpacesHeader navItems={userSpaceNavItems} />
      <section className="flex h-full w-full border-collapse overflow-hidden">
        <Sidebar navItems={userSpaceNavItems} />
        <div className="h-full w-full py-8 px-6">
          <UserSpaceClassesGridView classes={classes} />
        </div>
      </section>
    </>
  );
}

export default UserSpaceServerLayer;
