import {
  EvaluationCriteriaType,
  GradeTypeUnionType,
} from "./evaluation-schema";

export interface CreateEvaluationOptions {
  name: string;
  createdBy: string;
  description?: string;
  isGraded: boolean;
  gradeType: GradeTypeUnionType;
  criterias: EvaluationCriteriaType[];
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
  isGraded: boolean;
  description?: string;
  gradeType: GradeTypeUnionType;
  criterias: EvaluationCriteriaType[];
}
