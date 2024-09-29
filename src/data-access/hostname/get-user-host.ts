import Failure from '@/core/failures/failures';
import { UserType } from '@/features/user/domain/entities/user-schema';
import { Either, isLeft } from 'fp-ts/lib/Either';
import { none, Option, some } from 'fp-ts/lib/Option';

export type GetUserHostDto = Pick<
  UserType,
  'hostname' | 'userId' | 'name' | 'image' | 'schoolSubject'
>;

export type GetUserHostResponse = Option<GetUserHostDto>;
export function getUserHostDto(user: UserType | null): GetUserHostResponse {
  if (!user) {
    return none;
  }
  return some(user);
}
