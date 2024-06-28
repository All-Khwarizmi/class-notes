export const QUERY_KEYS = {
  STUDENT: {
    DELETE: (options: string[] = []) => ["DELETE_STUDENT", ...options],
    UPDATE: (options: string[] = []) => ["UPDATE_STUDENT", ...options],
  },
  CLASSE: {
    DELETE: (options: string[] = []) => ["DELETE_CLASSE", ...options],
    // UPDATE: (options: string[] = []) => ["UPDATE_CLASSE", ...options],
    // GET: (options: string[] = []) => ["GET_CLASSE", ...options],
    // GET_ALL: (options: string[] = []) => ["GET_ALL_CLASSES", ...options],
    CREATE: (options: string[] = []) => ["CREATE_CLASSE", ...options],
  },
};
