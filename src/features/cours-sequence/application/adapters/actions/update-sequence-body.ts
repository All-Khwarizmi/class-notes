'use server';

import { coursUsecases } from '../../usecases/cours-usecases';

export default async function updateSequenceBody(options: {
  userId: string;
  sequenceId: string;
  body: string;
  type?: 'template' | 'sequence';
}) {
  return await coursUsecases.addBodyToSequence(options);
}
