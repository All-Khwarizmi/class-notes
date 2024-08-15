import ErrorDialog from "@/core/components/common/ErrorDialog";
import NothingToShow from "@/core/components/common/editor/NothingToShow";
import getVisibility from "@/features/classe/application/adapters/actions/get-visibility";
import { complementUsecases } from "@/features/complement/application/usecases/complement-usecases";
import ContentViewer from "@/features/cours-sequence/presentation/views/ContentViewer";
import { isLeft } from "fp-ts/lib/Either";
import React from "react";

async function SpacesComplementServerLayer(props: {
  slug: string;
  searchParams: { [key: string]: string | undefined };
}) {
  if (!props.slug || !props.searchParams.user) {
    return (
      <ErrorDialog
        message={`
        The user id or the course id is missing
        `}
      />
    );
  }
  const userId = props.searchParams.user;
  const eitherVibility = await getVisibility({ userId });
  if (isLeft(eitherVibility)) {
    return (
      <ErrorDialog
        message="An error occured while fetching the visibility"
        code={eitherVibility.left.code}
        description={
          process.env.NODE_ENV === "development"
            ? eitherVibility.left.message
            : ""
        }
      />
    );
  }
  const eitherComplement = await complementUsecases.getCoursComplement({
    id: props.slug,
  });
  if (isLeft(eitherComplement)) {
    return (
      <ErrorDialog
        message="An error occured while fetching the complement"
        code={eitherComplement.left.code}
        description={
          process.env.NODE_ENV === "development"
            ? eitherComplement.left.message
            : ""
        }
      />
    );
  }
  const visibilityComplement = eitherVibility.right.complement.find(
    (complement) => complement.id === props.slug
  );
  const isVisible =
    visibilityComplement?.publish === true &&
    visibilityComplement.classe &&
    visibilityComplement.sequence &&
    visibilityComplement.cours;
  if (isVisible === false) {
    return <NothingToShow />;
  }
  return <ContentViewer content={eitherComplement.right.body} />;
}

export default SpacesComplementServerLayer;
