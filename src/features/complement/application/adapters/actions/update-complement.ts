'use server';

import { Complement } from '@/features/complement/domain/complement-schemas';

import { complementUsecases } from '../../usecases/complement-usecases';

export default async function updateComplement(options: Complement) {
  return complementUsecases.updateCoursComplement({
    coursComplement: options,
  });
}
