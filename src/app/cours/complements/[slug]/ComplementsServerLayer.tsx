import ErrorDialog from '@/core/components/common/ErrorDialog';
import checkAuthAndRedirect from '@/data-access/auth/check-and-redirect';
import { complementUsecases } from '@/features/complement/application/usecases/complement-usecases';
import {
  Complement,
  ComplementSchema,
} from '@/features/complement/domain/complement-schemas';
import ComplementsView from '@/features/complement/presentation/views/ComplementsView';
import { isLeft } from 'fp-ts/lib/Either';
import React from 'react';

async function ComplementsServerLayer(props: { slug: string }) {
  const { userId } = await checkAuthAndRedirect();

  //! TODO: @DATA-ACCESS

  let complements: Complement[] = [];

  const eitherComplements = await complementUsecases.getAllCoursComplement({
    coursId: props.slug,
  });
  if (isLeft(eitherComplements)) {
    return (
      <ErrorDialog
        message={`
            Unable to fetch complements with id: ${props.slug}
            `}
        code={eitherComplements.left.code}
        description={
          process.env.NODE_ENV === 'development'
            ? eitherComplements.left.message
            : 'An error occurred while fetching complements.'
        }
      />
    );
  }
  for (const complement of eitherComplements.right) {
    const validateComplement = ComplementSchema.safeParse(complement);
    if (!validateComplement.success) {
      return (
        <ErrorDialog
          message={`
            Unable to validate complement with id: ${complement.id}
            `}
          code={validateComplement.error.message}
          description={
            process.env.NODE_ENV === 'development'
              ? validateComplement.error.message
              : 'An error occurred while validating complement.'
          }
        />
      );
    }
    complements.push(validateComplement.data);
  }

  return (
    <ComplementsView
      complements={complements}
      coursId={props.slug}
      userId={userId}
    />
  );
}

export default ComplementsServerLayer;
