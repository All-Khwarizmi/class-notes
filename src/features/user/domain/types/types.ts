import { UserType } from "../entities/user-schema";

export type SaveUserOptions = {
  userId: string;
  user: Pick<
    UserType,
    "name" | "schoolSubject" | "country" | "educationSystem"
  >;
};
