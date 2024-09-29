import {
  spanishGradingCalc,
  tenPointsScaleCase,
} from '@/features/evaluation/application/adapters/utils/ten-points-scale-case';
import { EvaluationCriteriaType } from '@/features/evaluation/domain/entities/evaluation-schema';
import { Grade } from '@/features/evaluation/domain/entities/evaluation-with-grades-schema';
import { describe, it, expect } from 'vitest';

import { gradeType } from '../../convex/fields/grade_type';

describe('spanishGradingCalc', () => {
  it('returns numeric grade when valid', () => {
    const grade: Grade = {
      grade: 9,
      criteriaId: 'criteria1',
      gradeType: {
        grade: 9,
        name: '10-point Scale',
        type: '10-point Scale',
      },
    };
    expect(spanishGradingCalc({ grade })).toBe(9);
  });

  it('returns special grade type when applicable', () => {
    const grade: Grade = { grade: 'N/A', criteriaId: 'criteria2' } as any; // Cast to any to simulate special grade type
    expect(spanishGradingCalc({ grade })).toBe('N/A');
  });

  it('returns "Error" for invalid grade types', () => {
    const grade: Grade = { grade: 'invalid', criteriaId: 'criteria3' } as any; // Invalid grade type not covered by schema
    expect(spanishGradingCalc({ grade })).toBe('Error');
  });
});

describe('tenPointsScaleCase', () => {
  const criterias: EvaluationCriteriaType[] = [
    {
      id: 'criteria1',
      weight: 4,
      description: 'Test Criteria',
      createdBy: 'user1',
      isGraded: true,
      name: 'Test Criteria',
      gradeType: { type: '10-point Scale', name: '10-point Scale', grade: 10 },
    },
  ];

  it('Should return error if the grade exceeds the weight', () => {
    const grades: Grade[] = [
      {
        criteriaId: 'criteria1',
        grade: 5,
        gradeType: {
          grade: 5,
          name: '10-point Scale',
          type: '10-point Scale',
        },
      },
    ];
    expect(tenPointsScaleCase(grades, criterias)).toBe('Error');
  });

  it('Should return error if the grade is not between 0 and 10', () => {
    const grades: Grade[] = [
      {
        criteriaId: 'criteria1',
        grade: 11,
        gradeType: {
          grade: 11,
          name: '10-point Scale',
          type: '10-point Scale',
        },
      },
    ];
    expect(tenPointsScaleCase(grades, criterias)).toBe('Error');
  });

  it('calculates average points correctly on ten-point scale', () => {
    const grades: Grade[] = [
      {
        criteriaId: 'criteria1',
        grade: 3,
        gradeType: {
          grade: 3,
          name: '10-point Scale',
          type: '10-point Scale',
        },
      },
      {
        criteriaId: 'criteria1',
        grade: 1,
        gradeType: {
          grade: 1,
          name: '10-point Scale',
          type: '10-point Scale',
        },
      },
    ];
    expect(tenPointsScaleCase(grades, criterias)).toBe(5); // Assumes weights are 1 for simplicity
  });

  it('returns "Error" for invalid grade entries', () => {
    const grades: Grade[] = [
      { criteriaId: 'criteria1', grade: 'invalid' } as any, // Invalid grade for schema
    ];
    expect(tenPointsScaleCase(grades, criterias)).toBe('Error');
  });

  it('handles special grade types and returns them immediately', () => {
    const grades: Grade[] = [
      {
        criteriaId: 'criteria1',
        grade: 'N/G',
        gradeType: {
          grade: 'N/G',
          name: '10-point Scale',
          type: '10-point Scale',
        },
      } as any, // Assuming "N/A" is a special type handled by the system
    ];
    expect(tenPointsScaleCase(grades, criterias)).toBe('N/G');
  });
});
