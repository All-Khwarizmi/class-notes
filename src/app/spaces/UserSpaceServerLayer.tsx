import NotFound from "@/app/not-found";
import { classeUsecases } from "@/features/classe/application/usecases";
import { isLeft } from "fp-ts/lib/Either";
import { ClassType } from "@/features/classe/domain/class-schema";
import ErrorDialog from "@/core/components/common/ErrorDialog";
import UserSpaceClassesGridView from "@/features/spaces/presentation/views/UserSpaceClassesGridView";
import { NavItem } from "@/lib/types";
import { Presentation } from "lucide-react";
import getVisibility from "@/features/classe/application/adapters/actions/get-visibility";
import NothingToShow from "@/core/components/common/editor/NothingToShow";
import LayoutWithProps from "@/core/components/layout/LayoutWithProps";

async function UserSpaceServerLayer(props: {
  slug: string;
  searchParams: { [key: string]: string | undefined };
}) {
  if (!props.searchParams.user) {
    return (
      <LayoutWithProps isEmpty>
        <NotFound />
      </LayoutWithProps>
    );
  }
  const userId = props.searchParams.user;

  const eitherVisibility = await getVisibility({
    userId: userId,
  });
  if (isLeft(eitherVisibility)) {
    return (
      <LayoutWithProps isEmpty>
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
      </LayoutWithProps>
    );
  }
  const eitherClasses = await classeUsecases.getClasses({
    id: userId,
  });
  if (isLeft(eitherClasses)) {
    return (
      <LayoutWithProps isEmpty>
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
      </LayoutWithProps>
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
    <LayoutWithProps navItems={userSpaceNavItems}>
      {classes.length > 0 ? (
        <UserSpaceClassesGridView userId={userId} classes={classes} />
      ) : (
        <NothingToShow />
      )}
    </LayoutWithProps>
  );
}

export default UserSpaceServerLayer;
