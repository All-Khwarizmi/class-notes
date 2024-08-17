export const QUERY_KEYS = {
  STUDENT: {
    DELETE: (options: string[] = []) => ["DELETE_STUDENT", ...options],
    UPDATE: (options: string[] = []) => ["UPDATE_STUDENT", ...options],
    ADD: (options: string[] = []) => ["ADD_STUDENT", ...options],
    ADD_MANY: (options: string[] = []) => ["ADD_MANY_STUDENTS", ...options],
    GET_ALL: (options: string[] = []) => ["GET_ALL_STUDENTS", ...options],
  },
  CLASSE: {
    DELETE: (options: string[] = []) => ["DELETE_CLASSE", ...options],
    // UPDATE: (options: string[] = []) => ["UPDATE_CLASSE", ...options],
    // GET: (options: string[] = []) => ["GET_CLASSE", ...options],
    GET_ALL: (options: string[] = []) => ["GET_ALL_CLASSES", ...options],
    CREATE: (options: string[] = []) => ["CREATE_CLASSE", ...options],
    CLASSE_SEQUENCES_GET_ALL: (options: string[] = []) => [
      "GET_ALL_CLASSE_SEQUENCES",
      ...options,
    ],
    CLASSE_SEQUENCE_ADD: (options: string[] = []) => [
      "ADD_CLASSE_SEQUENCE",
      ...options,
    ],
  },
  SEQUENCE: {
    DELETE: (options: string[] = []) => ["DELETE_SEQUENCE", ...options],
    GET_ALL: (options: string[] = []) => ["GET_ALL_SEQUENCES", ...options],
    CREATE: (options: string[] = []) => ["CREATE_SEQUENCE", ...options],
    UPDATE: (options: string[] = []) => ["UPDATE_SEQUENCE", ...options],
  },
  EVALUATIONS: {
    BASE_GET_ALL: (options: string[] = []) => [
      "GET_ALL_EVALUATIONS_BASE",
      ...options,
    ],
    COMPOUND_GET_ALL: (options: string[] = []) => [
      "GET_ALL_EVALUATIONS_COMPOUND",
      ...options,
    ],
    // CREATE: (options: string[] = []) => ["CREATE_EVALUATION", ...options],
    // DELETE: (options: string[] = []) => ["DELETE_EVALUATION", ...options],
  },
  NOTES: {
    GET_ALL: (options: string[] = []) => ["GET_ALL_NOTES", ...options],
    DELETE: (options: string[] = []) => ["DELETE_NOTE", ...options],
    CREATE: (options: string[] = []) => ["CREATE_NOTE", ...options],
  },
  VISIBILITY: {
    GET_ALL: (options: string[] = []) => ["GET_ALL_VISIBILITY", ...options],
    UPDATE: (options: string[] = []) => ["UPDATE_VISIBILITY", ...options],
  },
  COURS: {
    CREATE: (options: string[] = []) => ["CREATE_COURS", ...options],
    UPDATE: (options: string[] = []) => ["UPDATE_COURS", ...options],
  },
  COMPETENCES: {
    GET_ALL: (options: string[] = []) => ["GET_ALL_COMPETENCES", ...options],
    CREATE: (options: string[] = []) => ["CREATE_COMPETENCE", ...options],
    UPDATE: (options: string[] = []) => ["UPDATE_COMPETENCE", ...options],
  },
  COMP_CAT: {
    UPDATE: (options: string[] = []) => [
      "UPDATE_COMPETENCE_CATEGORY",
      ...options,
    ],
  },
};
