import { convexDatabase } from "@/core/data/convex/convex-impl";
import IDatabase from "@/core/data/idatabase";

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

  async saveUser({ userId, user }: { userId: string; user: any }) {
    return this._db.saveUser({ userId, user });
  }


  
}

export const profileRepository = new ProfileRepository({ db: convexDatabase });
