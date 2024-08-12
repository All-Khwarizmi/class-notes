import { convexDatabase } from "@/core/data/convex/convex-impl";
import { getAppDataBase } from "@/core/data/get-app-db";
import IDatabase from "@/core/data/idatabase";
import { UserType } from "@/features/user/domain/entities/user-schema";
import { SaveUserOptions } from "@/features/user/domain/types/types";

export interface ProfileRepositoryOptions {
  db: IDatabase;
}

export class ProfileRepository {
  private readonly _db: IDatabase;

  constructor(options: ProfileRepositoryOptions) {
    this._db = options.db;
  }

  async getUser({ userId }: { userId: string }) {
    return this._db.getUser({ userId });
  }

  async saveUser({ userId, user }: SaveUserOptions) {
    return this._db.saveUser({ userId, user });
  }
}

export const profileRepository = new ProfileRepository({
  db: getAppDataBase(),
});
