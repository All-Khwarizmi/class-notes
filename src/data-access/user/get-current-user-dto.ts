import Failure from '@/core/failures/failures';
import { UserType } from '@/features/user/domain/entities/user-schema';
import { Either, isLeft } from 'fp-ts/lib/Either';
import { none, Option, some } from 'fp-ts/lib/Option';

export type GetCurrentUserDto = UserType;

export type GetCurrentUserResponse = Option<GetCurrentUserDto>;
export function getCurrentUserDto(
  user: Either<Failure<string>, UserType>
): GetCurrentUserResponse {
  if (isLeft(user)) {
    return none;
  }
  return some(user.right);
}
