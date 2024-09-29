'use server';

import Failure from '@/core/failures/failures';
import { Either } from 'fp-ts/lib/Either';

import { classeUsecases } from '../../usecases';

export default async function updateVisibility(options: {
  userId: string;
  type: 'classe' | 'sequence' | 'cours' | 'complement';
  typeId: string;
  publish: boolean;
}): Promise<Either<Failure<string>, void>> {
  throw new Error('Not implemented');
  // return classeUsecases.updateVisibility({
  //   userId: options.userId,
  //   type: options.type,
  //   typeId: options.typeId,
  //   publish: options.publish,
  // });
}
