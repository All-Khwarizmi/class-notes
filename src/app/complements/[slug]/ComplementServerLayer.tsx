import ErrorDialog from "@/core/components/common/ErrorDialog";
import { TypographyH3 } from "@/core/components/common/Typography";
import LayoutWithProps from "@/core/components/layout/LayoutWithProps";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { complementUsecases } from "@/features/complement/application/usecases/complement-usecases";
import ComplementView from "@/features/complement/presentation/views/ComplementView";
import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";
import React from "react";

async function ComplementServerLayer(props: { slug: string }) {
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/");
  }
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
        userId={authUser.right.userId}
      />
    </div>
  );
}

export default ComplementServerLayer;
