import NotFound from "@/app/not-found";
import { coursUsecases } from "@/features/cours-sequence/application/usecases/cours-usecases";
import { isLeft } from "fp-ts/lib/Either";
import React from "react";

async function SpacesClasseServerLayer(props: { slug: string }) {
  const eitherSequence = await coursUsecases.getSingleSequence({
    userId: "",
    sequenceId: props.slug,
    type: "sequence",
  });
  if (isLeft(eitherSequence)) {
    console.log(eitherSequence.left);
    return <NotFound />;
  }
  return <div>SpacesClasse</div>;
}

export default SpacesClasseServerLayer;
