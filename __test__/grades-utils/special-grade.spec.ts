import checkSpecialGradeType from '@/features/evaluation/application/adapters/utils/checkSpecialGradeType';
import { Grade } from '@/features/evaluation/domain/entities/evaluation-with-grades-schema';
import { describe, it, expect } from 'vitest';
import { aa } from 'vitest/dist/reporters-yx5ZTtEV.js';

describe('checkSpecialGradeType', () => {
  it('returns special grade type when grade is a predefined special type', () => {
    const grades: Grade[] = [
      {
        criteriaId: 'criteria1',
        grade: 'N/G',
        gradeType: {
          grade: 'N/G',
          name: '10-point Scale',
          type: '10-point Scale',
        },
      }, // Not Graded
      {
        criteriaId: 'criteria1',
        grade: 'M',
        gradeType: {
          grade: 'M',
          name: '10-point Scale',
          type: '10-point Scale',
        },
      }, // Missing
      {
        criteriaId: 'criteria1',
        grade: 'N/D',
        gradeType: {
          grade: 'N/D',
          name: '10-point Scale',
          type: '10-point Scale',
        },
      }, // Not Done
    ];

    grades.forEach((grade) => {
      const result = checkSpecialGradeType([grade]);
      expect(result.shouldReturn).toBe(true);
      expect(result.returnValue).toBe(grade.grade);
    });
  });

  it('returns false for normal numeric grades', () => {
    const grades: Grade[] = [
      {
        criteriaId: 'criteria1',
        grade: 85,
        gradeType: {
          grade: 85,
          name: '10-point Scale',
          type: '10-point Scale',
        },
      },
      {
        criteriaId: 'criteria1',
        grade: '95',
        gradeType: {
          grade: '95',
          name: '10-point Scale',
          type: '10-point Scale',
        } as any,
      }, // Testing string number
    ];

    grades.forEach((grade) => {
      const result = checkSpecialGradeType([grade]);
      expect(result.shouldReturn).toBe(false);
    });
  });

  it('returns false for normal string grades', () => {
    const grades: Grade[] = [
      {
        criteriaId: 'criteria1',
        grade: 'Pass',
        gradeType: {
          grade: 'Pass',
          name: 'Pass/Fail',
          type: 'Pass/Fail',
        },
      },
    ];
    const result = checkSpecialGradeType(grades);
    expect(result.shouldReturn).toBe(false);
    expect(result.returnValue).toBe('Pass');
  });

  it('returns "N/A" for grades not fitting any schema', () => {
    const grades: Grade[] = [
      { criteriaId: 'criteria1', grade: { complex: 'object' } } as any,
    ]; // Invalid grade
    const result = checkSpecialGradeType(grades);
    expect(result.shouldReturn).toBe(true);
    expect(result.returnValue).toBe('N/A');
  });

  it('handles empty grade array by returning "N/A"', () => {
    const grades: Grade[] = [];
    const result = checkSpecialGradeType(grades);
    expect(result.shouldReturn).toBe(true);
    expect(result.returnValue).toBe('N/A');
  });
});
