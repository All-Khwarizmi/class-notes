import { GradeTypeUnionType } from "./evaluation-schema";

export interface CreateEvaluationOptions {
  name: string;
  createdBy: string;
  description: string;
  gradeType: GradeTypeUnionType;
}

export interface GetEvaluationBaseOptions {
  evaluationId: string;
}

export interface GetEvaluationBasesOptions {
  createdBy: string;
}

export interface UpdateEvaluationBaseOptions {
  evaluationId: string;
  name: string;
  description: string;
  gradeType: GradeTypeUnionType;
}
