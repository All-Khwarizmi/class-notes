import { convexDatabase } from "./convex/convex-impl";
import IDatabase from "./idatabase";

export function getAppDataBase(db: IDatabase): IDatabase {
  return convexDatabase;
}
