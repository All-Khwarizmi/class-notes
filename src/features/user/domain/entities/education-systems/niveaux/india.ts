import { z } from 'zod';

export const IndianEducationLevels = z.enum([
  'Nursery',
  'LKG',
  'UKG',
  'Class1',
  'Class2',
  'Class3',
  'Class4',
  'Class5',
  'Class6',
  'Class7',
  'Class8',
  'Class9',
  'Class10',
  'Class11',
  'Class12',
  'UndergraduateYear1',
  'UndergraduateYear2',
  'UndergraduateYear3',
  'UndergraduateYear4',
  'PostgraduateYear1',
  'PostgraduateYear2',
  'DoctoralYear1',
  'DoctoralYear2',
  'DoctoralYear3',
  'DoctoralYear4',
]);

export type IndianEducationLevelsType = z.infer<typeof IndianEducationLevels>;

const IndianEducationLevelsMapping = {
  Nursery: 'Nursery',
  LKG: 'Lower Kindergarten',
  UKG: 'Upper Kindergarten',
  Class1: 'Class 1',
  Class2: 'Class 2',
  Class3: 'Class 3',
  Class4: 'Class 4',
  Class5: 'Class 5',
  Class6: 'Class 6',
  Class7: 'Class 7',
  Class8: 'Class 8',
  Class9: 'Class 9',
  Class10: 'Class 10',
  Class11: 'Class 11',
  Class12: 'Class 12',
  UndergraduateYear1: 'First Year of College',
  UndergraduateYear2: 'Second Year of College',
  UndergraduateYear3: 'Third Year of College',
  UndergraduateYear4: 'Fourth Year of College',
  PostgraduateYear1: 'First Year of Postgraduate',
  PostgraduateYear2: 'Second Year of Postgraduate',

  DoctoralYear1: 'First Year of Doctorate',
  DoctoralYear2: 'Second Year of Doctorate',
  DoctoralYear3: 'Third Year of Doctorate',
  DoctoralYear4: 'Fourth Year of Doctorate',
};

export function getHumanReadableIndianGrade(
  gradeLevel: IndianEducationLevelsType
): string {
  const readableName = IndianEducationLevelsMapping[gradeLevel];
  if (!readableName) {
    throw new Error('Grade level not found in the Indian education system.');
  }

  return readableName;
}
