import { convexDatabase } from './convex/convex-impl';
import IDatabase from './idatabase';

export function getAppDataBase(): IDatabase {
  return convexDatabase;
}
