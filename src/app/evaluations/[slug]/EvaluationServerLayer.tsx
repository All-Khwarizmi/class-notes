import ErrorDialog from '@/core/components/common/ErrorDialog';
import checkAuthAndRedirect from '@/data-access/auth/check-and-redirect';
import getEvaluation from '@/features/evaluation/application/adapters/actions/get-evaluation';
import EvaluationBaseForm from '@/features/evaluation/presentation/views/EvaluationBaseForm';
import { isLeft } from 'fp-ts/lib/Either';
import React from 'react';

async function EvaluationServerLayer(props: { evaluationId: string }) {
  const { userId } = await checkAuthAndRedirect();

  //! TODO: @DATA-ACCESS
  const eitherEval = await getEvaluation({
    evaluationId: props.evaluationId,
  });
  if (isLeft(eitherEval)) {
    return (
      <ErrorDialog
        message={eitherEval.left.message}
        code={eitherEval.left.code}
      />
    );
  }
  return <EvaluationBaseForm evaluation={eitherEval.right} userId={userId} />;
}

export default EvaluationServerLayer;
