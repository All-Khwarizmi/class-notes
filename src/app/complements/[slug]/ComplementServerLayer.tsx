import ErrorDialog from "@/core/components/common/ErrorDialog";
import { TypographyH3 } from "@/core/components/common/Typography";
import checkAuthAndRedirect from "@/data-access/auth/check-and-redirect";
import { complementUsecases } from "@/features/complement/application/usecases/complement-usecases";
import ComplementView from "@/features/complement/presentation/views/ComplementView";
import { isLeft } from "fp-ts/lib/Either";
import React from "react";

async function ComplementServerLayer(props: { slug: string }) {
  const { userId } = await checkAuthAndRedirect();

  const complement = await complementUsecases.getCoursComplement({
    id: props.slug,
  });
  if (isLeft(complement)) {
    return (
      <ErrorDialog
        message={`Unable to fetch complement with id: ${props.slug}
            ${complement.left}
            Code: ${complement.left.code}
        `}
      />
    );
  }

  return (
    <div className=" space-y-4 px-4">
      <TypographyH3 text={complement.right.name} />

      <ComplementView
        slug={props.slug}
        complement={complement.right}
        userId={userId}
      />
    </div>
  );
}

export default ComplementServerLayer;
