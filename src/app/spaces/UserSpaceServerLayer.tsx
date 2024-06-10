import NotFound from "@/app/not-found";
import { classeUsecases } from "@/features/classe/application/usecases";
import { isLeft } from "fp-ts/lib/Either";
import { ClassType } from "@/features/classe/domain/class-schema";
import ErrorDialog from "@/core/components/common/ErrorDialog";
import UserSpaceClassesGridView from "@/features/spaces/presentation/views/UserSpaceClassesGridView";
import SpacesHeader from "@/core/components/layout/SpacesHeader";
import Sidebar from "@/core/components/layout/Sidebar";
import { NavItem } from "@/lib/types";
import { Presentation } from "lucide-react";
import getVisibility from "@/features/classe/application/adapters/actions/get-visibility";
import NothingToShow from "@/core/components/common/editor/NothingToShow";

async function UserSpaceServerLayer(props: {
  slug: string;
  searchParams: { [key: string]: string | undefined };
}) {
  if (!props.slug || !props.searchParams.user) {
    return <NotFound />;
  }
  const userId = props.searchParams.user;

  const eitherVisibility = await getVisibility({
    userId: userId,
  });
  if (isLeft(eitherVisibility)) {
    return (
      <ErrorDialog
        message={`
         Une erreur s'est produite lors du chargement des classes
         ${
           process.env.NODE_ENV === "development"
             ? eitherVisibility.left.message
             : ""
         }
        `}
        code={eitherVisibility.left.code}
        description={eitherVisibility.left.message}
      />
    );
  }
  const eitherClasses = await classeUsecases.getClasses({
    id: userId,
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
    const isVisible = eitherVisibility.right.classe.find(
      (vis) => vis.id === classe.id
    )?.publish;
    if (isVisible === true) {
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
          {classes.length > 0 ? (
            <UserSpaceClassesGridView userId={userId} classes={classes} />
          ) : (
            <NothingToShow />
          )}
        </div>
      </section>
    </>
  );
}

export default UserSpaceServerLayer;