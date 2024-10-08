import {
  EvaluationCriteriaType,
  GradeTypeUnionType,
} from './evaluation-schema';

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

export interface AssignEvaluationOptions {
  evaluationId: string;
  classeId: string;
}

export interface DeleteEvaluationBase {
  evaluationId: string;
}

export interface IsEvaluationAssigned {
  evaluationId: string;
}
export interface GetEvaluationsWithGradesByEvalauationBaseIdOptions {
  evaluationBaseId: string;
}

export interface DeleteEvaluationWithGradesOptions {
  evaluationId: string;
}
export interface UpdateGradeOptions {
  evaluationId: string;
  studentId: string;
  feedback: string;
  grades: {
    criteriaId: string;
    grade: number | string;
    gradeType: GradeTypeUnionType;
  }[];
}

export interface GetEvaluationOptions {
  evaluationId: string;
}

export interface GetEvaluationsListOptions {
  classeId: string;
}
