import ErrorDialog from "@/core/components/common/ErrorDialog";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { complementUsecases } from "@/features/complement/application/usecases/complement-usecases";
import { ComplementSchema } from "@/features/complement/domain/complement-schemas";
import ComplementView from "@/features/complement/presentation/views/ComplementView";
import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";
import React from "react";

async function ComplementServerLayer(props: { slug: string }) {
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/login");
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
  const parsedComplement = {
    ...complement.right,
    createdAt: complement.right._creationTime,
    id: complement.right._id,
  };
  const validatedComplement = ComplementSchema.safeParse(parsedComplement);
  if (!validatedComplement.success) {
    return (
      <ErrorDialog
        message={`Unable to fetch complement with id: ${props.slug}
            ${validatedComplement.error}
            Code: APP203
          `}
      />
    );
  }

  return (
    <ComplementView slug={props.slug} complement={validatedComplement.data} />
  );
}

export default ComplementServerLayer;
