import NotFound from "@/app/not-found";
import { classeUsecases } from "@/features/classe/application/usecases";
import { isLeft } from "fp-ts/lib/Either";
import { ClassType } from "@/features/classe/domain/class-schema";
import ErrorDialog from "@/core/components/common/ErrorDialog";
import UserSpaceClassesGridView from "@/features/spaces/presentation/views/UserSpaceClassesGridView";
import { NavItem } from "@/lib/types";
import { GraduationCap } from "lucide-react";
import getVisibility from "@/features/classe/application/adapters/actions/get-visibility";
import NothingToShow from "@/core/components/common/editor/NothingToShow";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { profileUseCases } from "@/features/profile/application/usecases/profile-usecases";

async function UserSpaceServerLayer(props: {
  slug: string;
  searchParams: { [key: string]: string | undefined };
}) {
  if (!props.searchParams.user) {
    return <NotFound />;
  }
  const userId = props.searchParams.user;
  const user = await profileUseCases.getUser({ userId });

  if (isLeft(user)) {
    return (
      <ErrorDialog
        message="An error occured while fetching the user"
        code={user.left.code}
        description={
          process.env.NODE_ENV === "development" ? user.left.message : ""
        }
      />
    );
  }
  const eitherVisibility = await getVisibility({
    userId: userId,
  });
  if (isLeft(eitherVisibility)) {
    return (
      <ErrorDialog
        message="An error occured while fetching the visibility of the classes"
        code={eitherVisibility.left.code}
        description={
          process.env.NODE_ENV === "development"
            ? eitherVisibility.left.message
            : ""
        }
      />
    );
  }
  const eitherClasses = await classeUsecases.getClasses({
    id: userId,
  });
  if (isLeft(eitherClasses)) {
    return (
      <ErrorDialog
        message="An error occured while fetching the classes"
        code={eitherClasses.left.code}
        description={
          process.env.NODE_ENV === "development"
            ? eitherClasses.left.message
            : ""
        }
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
    icon: <GraduationCap size={16} className="text-blue-500" />,
    color: "text-blue-300",
  }));
  return (
    <>
      {classes.length > 0 ? (
        <UserSpaceClassesGridView
          userName={user.right.name ?? "Unknown"}
          navItems={userSpaceNavItems}
          userId={userId}
          classes={classes}
        />
      ) : (
        <NothingToShow />
      )}
    </>
  );
}

export default UserSpaceServerLayer;
