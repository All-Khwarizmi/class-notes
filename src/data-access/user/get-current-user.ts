import { profileUseCases } from "@/features/profile/application/usecases/profile-usecases";
import {
  getCurrentUserDto,
  GetCurrentUserResponse,
} from "./get-current-user-dto";

export const getCurrentUser = async (
  userId: string
): Promise<GetCurrentUserResponse> => {
  const user = await profileUseCases.getUser({
    userId,
  });
  return getCurrentUserDto(user);
};
