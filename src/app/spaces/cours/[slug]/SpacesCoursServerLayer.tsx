import React from "react";
import { isLeft } from "fp-ts/lib/Either";
import { CheckSquare } from "lucide-react";
import ErrorDialog from "@/core/components/common/ErrorDialog";
import EmptyUserSpace from "@/features/spaces/presentation/components/EmptyUserSpace";
import getVisibility from "@/features/classe/application/adapters/actions/get-visibility";
import { complementUsecases } from "@/features/complement/application/usecases/complement-usecases";
import { Complement } from "@/features/complement/domain/complement-schemas";
import { coursUsecases } from "@/features/cours-sequence/application/usecases/cours-usecases";
import ContentViewer from "@/features/cours-sequence/presentation/views/ContentViewer";
import { profileUseCases } from "@/features/profile/application/usecases/profile-usecases";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { NavItem } from "@/lib/types";

async function SpacesCoursServerLayer(props: {
  slug: string;
  searchParams: { [key: string]: string | undefined };
}) {
  const { slug, searchParams } = props;
  const userId = searchParams.user;

  if (!slug || !userId) {
    return (
      <ErrorDialog
        message="L'identifiant de l'utilisateur ou du cours est manquant"
        code="MISSING_PARAMS"
      />
    );
  }

  const user = await profileUseCases.getUser({ userId });
  if (isLeft(user)) {
    return (
      <ErrorDialog
        message="Une erreur s'est produite lors de la récupération des informations de l'utilisateur"
        code={user.left.code}
        description={
          process.env.NODE_ENV === "development" ? user.left.message : ""
        }
      />
    );
  }

  const isOwner = await authUseCases.isCurrentUser(userId);

  const eitherCours = await coursUsecases.getSingleCours({
    userId: "",
    coursId: slug,
  });
  if (isLeft(eitherCours)) {
    return (
      <ErrorDialog
        message="Une erreur s'est produite lors de la récupération du cours"
        code={eitherCours.left.code}
        description={
          process.env.NODE_ENV === "development" ? eitherCours.left.message : ""
        }
      />
    );
  }

  const eitherVisibility = await getVisibility({ userId });
  if (isLeft(eitherVisibility)) {
    return (
      <ErrorDialog
        message="Une erreur s'est produite lors de la récupération des paramètres de visibilité"
        code={eitherVisibility.left.code}
        description={
          process.env.NODE_ENV === "development"
            ? eitherVisibility.left.message
            : ""
        }
      />
    );
  }

  const coursVisibility = eitherVisibility.right.cours.find(
    (visibility) => visibility.id === slug
  );
  const isCoursVisible =
    coursVisibility?.publish === true &&
    coursVisibility.classe &&
    coursVisibility.sequence;

  if (!isCoursVisible) {
    return (
      <EmptyUserSpace
        isOwner={isOwner}
        userName={user.right.name ?? "Utilisateur inconnu"}
        userEmail={user.right.email}
        contentType="cours"
      />
    );
  }

  const eitherComplements = await complementUsecases.getAllCoursComplement({
    coursId: slug,
  });

  if (isLeft(eitherComplements)) {
    return (
      <ErrorDialog
        message="Une erreur s'est produite lors de la récupération des compléments"
        code={eitherComplements.left.code}
        description={
          process.env.NODE_ENV === "development"
            ? eitherComplements.left.message
            : ""
        }
      />
    );
  }

  const complements: Complement[] = eitherComplements.right.filter(
    (complement) => {
      const visibilityComplement = eitherVisibility.right.complement.find(
        (vis) => vis.id === complement.id
      );
      return visibilityComplement?.publish === true;
    }
  );

  const complementNavItems: NavItem[] = complements.map((complement) => ({
    title: complement.name,
    href: `/spaces/complement/${complement.id}?user=${userId}`,
    icon: (
      <CheckSquare
        size={16}
        className="text-red-500 inline mr-1"
        aria-hidden="true"
      />
    ),
    color: "text-blue-300",
  }));

  return (
    <ContentViewer
      content={eitherCours.right.body}
      navItems={complementNavItems}
    />
  );
}

export default SpacesCoursServerLayer;
