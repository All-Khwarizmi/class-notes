import React from "react";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";
import { complementUsecases } from "@/features/complement/application/usecases/complement-usecases";
import {
  Complement,
  ComplementSchema,
} from "@/features/complement/domain/complement-schemas";
import ErrorDialog from "@/core/components/common/ErrorDialog";

import ComplementsView from "@/features/complement/presentation/views/ComplementsView";
import LayoutWithProps from "@/core/components/layout/LayoutWithProps";

async function ComplementsServerLayer(props: { slug: string }) {
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/login");
  }
  let complements: Complement[] = [];

  const eitherComplements = await complementUsecases.getAllCoursComplement({
    coursId: props.slug,
  });
  if (isLeft(eitherComplements)) {
    return (
      <LayoutWithProps isEmpty>
        <ErrorDialog
          message={`
            Unable to fetch cours with id: ${props.slug}
            
                ${eitherComplements.left}
            `}
        />
      </LayoutWithProps>
    );
  }
  for (const complement of eitherComplements.right) {
    const validateComplement = ComplementSchema.safeParse(complement);
    if (!validateComplement.success) {
      return (
        <LayoutWithProps isEmpty>
          <ErrorDialog
            message={`
            Unable to validate complement with id: ${complement.id}
            
            ${JSON.stringify(validateComplement.error)}
            `}
          />
        </LayoutWithProps>
      );
    }
    complements.push(validateComplement.data);
  }

  return (
      <ComplementsView
        complements={complements}
        coursId={props.slug}
        userId={authUser.right.userId}
      />
  );
}

export default ComplementsServerLayer;
