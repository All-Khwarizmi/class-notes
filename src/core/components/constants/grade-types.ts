import { GradeTypeUnionType } from '@/features/evaluation/domain/entities/evaluation-schema';

export const GRADE_TYPES: GradeTypeUnionType[] = [
  {
    name: 'Competence-Based Evaluation',
    type: 'Competence',
    grade: 'Expertise',
  },
  {
    name: 'Numeric',
    type: 'Numeric',
    range: '0-100',
    grade: 0,
  },
  { name: 'Percentage', type: 'Percentage', grade: 0 },
  {
    name: 'US Letter Grades',
    type: 'A/B/C/D/F',
    grade: 'A',
  },
  {
    name: 'US Letter Grades with Pass/Fail',
    type: 'A/B/C/D/F/Pass/Fail',
    grade: 'A',
  },
  {
    name: 'US Letter Grades with Pass/Fail/None',
    type: 'A/B/C/D/F/Pass/Fail/None',
    grade: 'A',
  },
  { name: 'Pass/Fail', type: 'Pass/Fail', grade: 'Pass' },

  { name: 'US 4.0 Scale', type: '4.0 Scale', grade: 0 },

  { name: '10-point Scale', type: '10-point Scale', grade: 0 },
  { name: '20-point Scale', type: '20-point Scale', grade: 0 },
  { name: 'Grade Points', type: 'Grade Points', grade: 0 },
  { name: 'French Grading', type: '20-point Scale', grade: 0 },
  { name: 'German Grading', type: 'Numeric', range: '1-5', grade: 0 },

  { name: 'Spanish Grading', type: '10-point Scale', grade: 0 },
  {
    name: 'Sport Points',
    type: 'Points',
    range: '0-100',
    grade: 0,
  },
  {
    name: 'Sport Ranking',
    type: 'Ranking',
    grade: '10th',
  },
  { name: 'Sport Result', type: 'Win/Loss/Tie', grade: 'Win' },
  {
    name: 'Sport Performance',
    type: 'Performance Level',
    grade: 'Excellent',
  },
];
