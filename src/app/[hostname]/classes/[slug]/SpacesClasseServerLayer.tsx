import React from "react";
import { isLeft } from "fp-ts/lib/Either";
import { Book } from "lucide-react";
import NotFound from "@/app/not-found";
import ErrorDialog from "@/core/components/common/ErrorDialog";
import EmptyUserSpace from "@/features/spaces/presentation/components/EmptyUserSpace";
import getVisibility from "@/features/classe/application/adapters/actions/get-visibility";
import { coursUsecases } from "@/features/cours-sequence/application/usecases/cours-usecases";
import { Sequence } from "@/features/cours-sequence/domain/entities/cours-schemas";
import SequencesListViewSpaces from "@/features/cours-sequence/presentation/views/SeqquenceListViewSpaces";
import { profileUseCases } from "@/features/profile/application/usecases/profile-usecases";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { NavItem } from "@/lib/types";

async function SpacesClasseServerLayer(props: {
  slug: string;
  searchParams: { [key: string]: string | undefined };
}) {
  const userId = props.searchParams.user;

  if (!userId) {
    return <NotFound />;
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

  const eitherSequences = await coursUsecases.getClasseSequences({
    classeId: props.slug,
  });

  if (isLeft(eitherSequences)) {
    return (
      <ErrorDialog
        message="Une erreur s'est produite lors de la récupération des séquences"
        code={eitherSequences.left.code}
        description={
          process.env.NODE_ENV === "development"
            ? eitherSequences.left.message
            : ""
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

  const sequences: Sequence[] = eitherSequences.right.filter((sequence) => {
    const sequenceVisibility = eitherVisibility.right.sequences.find(
      (visibility) => visibility.id === sequence._id
    );
    return (
      sequenceVisibility?.classe === true &&
      sequenceVisibility?.publish === true
    );
  });

  if (sequences.length === 0) {
    return (
      <EmptyUserSpace
        isOwner={isOwner}
        userName={user.right.name ?? "Utilisateur inconnu"}
        userEmail={user.right.email}
        contentType="séquence"
      />
    );
  }

  const sequenceNavItems: NavItem[] = sequences.map((sequence) => ({
    title: sequence.name,
    href: `/spaces/sequences/${sequence._id}?user=${userId}`,
    icon: <Book size={16} className="text-green-500" aria-hidden="true" />,
    color: "text-blue-300",
  }));

  return (
    <SequencesListViewSpaces
      userName={user.right.name ?? "Utilisateur inconnu"}
      navItems={sequenceNavItems}
      sequences={sequences}
      spacesMode={true}
      userId={userId}
    />
  );
}

export default SpacesClasseServerLayer;
