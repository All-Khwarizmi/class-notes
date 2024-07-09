export const QUERY_KEYS = {
  STUDENT: {
    DELETE: (options: string[] = []) => ["DELETE_STUDENT", ...options],
    UPDATE: (options: string[] = []) => ["UPDATE_STUDENT", ...options],
    ADD: (options: string[] = []) => ["ADD_STUDENT", ...options],
    ADD_MANY: (options: string[] = []) => ["ADD_MANY_STUDENTS", ...options],
  },
  CLASSE: {
    DELETE: (options: string[] = []) => ["DELETE_CLASSE", ...options],
    // UPDATE: (options: string[] = []) => ["UPDATE_CLASSE", ...options],
    // GET: (options: string[] = []) => ["GET_CLASSE", ...options],
    GET_ALL: (options: string[] = []) => ["GET_ALL_CLASSES", ...options],
    CREATE: (options: string[] = []) => ["CREATE_CLASSE", ...options],
  },
  SEQUENCE: {
    DELETE: (options: string[] = []) => ["DELETE_SEQUENCE", ...options],
    GET_ALL: (options: string[] = []) => ["GET_ALL_SEQUENCES", ...options],
    CREATE: (options: string[] = []) => ["CREATE_SEQUENCE", ...options],
  },
};
