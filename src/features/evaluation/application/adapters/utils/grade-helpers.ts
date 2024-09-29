import { GRADE_TYPES } from '@/core/components/constants/grade-types';
import { GradeTypeUnionType } from '@/features/evaluation/domain/entities/evaluation-schema';

// Helper function to validate the selected grade type
export function isValidGradeType(selectedType: string) {
  return GRADE_TYPES.some((gradeType) => gradeType.type === selectedType);
}

export function getGradeTypeByName(gradeTypeName: GradeTypeUnionType['name']) {
  return (
    GRADE_TYPES.find((gradeType) => gradeType.name === gradeTypeName) || {
      name: 'Numeric',
      type: 'Numeric',
      range: '0-100',
      grade: 0,
    }
  );
}
