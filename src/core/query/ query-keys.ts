export const QUERY_KEYS = {
  STUDENT: {
    DELETE: (options: string[] = []) => ["DELETE_STUDENT", ...options],
    UPDATE: (options: string[] = []) => ["UPDATE_STUDENT", ...options],
  },
};
