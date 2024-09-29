import { userSchema } from '@/features/user/domain/entities/user-schema';
import { fetchQuery } from 'convex/nextjs';
import { none } from 'fp-ts/lib/Option';

import { api } from '../../../convex/_generated/api';
import { getUserHostDto } from './get-user-host';

export const getUserByHostname = async (hostname: string) => {
  const result = await fetchQuery(api.users.getUserByHostname, { hostname });
  if (!result) {
    return none;
  }
  const user = userSchema.safeParse(result);
  if (!user.success) {
    return none;
  }

  return getUserHostDto(user.data);
};
