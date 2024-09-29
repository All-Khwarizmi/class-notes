'use server';

import { complementUsecases } from '../../usecases/complement-usecases';

export default async function deleteComplement(options: { id: string }) {
  return complementUsecases.deleteCoursComplement(options);
}
