import { z } from 'zod';

export const GermanEducationLevels = z.enum([
  'Grundschule1',
  'Grundschule2',
  'Grundschule3',
  'Grundschule4',
  'Orientierungsstufe5',
  'Orientierungsstufe6',
  'Hauptschule7',
  'Hauptschule8',
  'Hauptschule9',
  'Hauptschule10',
  'Realschule7',
  'Realschule8',
  'Realschule9',
  'Realschule10',
  'Gymnasium5',
  'Gymnasium6',
  'Gymnasium7',
  'Gymnasium8',
  'Gymnasium9',
  'Gymnasium10',
  'Gymnasium11',
  'Gymnasium12',
  'Gymnasium13',
  'Universitaet1',
  'Universitaet2',
  'Universitaet3',
  'Universitaet4',
  'Master1',
  'Master2',
  'Doktor',
]);

export type GermanEducationLevelsType = z.infer<typeof GermanEducationLevels>;

const GermanEducationLevelsMapping = {
  Kindergarten: 'Kindergarten',
  Grundschule1: '1. Klasse',
  Grundschule2: '2. Klasse',
  Grundschule3: '3. Klasse',
  Grundschule4: '4. Klasse',
  Orientierungsstufe5: '5. Klasse',
  Orientierungsstufe6: '6. Klasse',
  Hauptschule7: '7. Klasse',
  Hauptschule8: '8. Klasse',
  Hauptschule9: '9. Klasse',
  Hauptschule10: '10. Klasse',
  Realschule7: '7. Klasse',
  Realschule8: '8. Klasse',
  Realschule9: '9. Klasse',
  Realschule10: '10. Klasse',
  Gymnasium5: '5. Klasse',
  Gymnasium6: '6. Klasse',
  Gymnasium7: '7. Klasse',
  Gymnasium8: '8. Klasse',
  Gymnasium9: '9. Klasse',
  Gymnasium10: '10. Klasse',
  Gymnasium11: '11. Klasse',
  Gymnasium12: '12. Klasse',
  Gymnasium13: '13. Klasse (Abitur)',
  Universitaet1: '1. Studienjahr',
  Universitaet2: '2. Studienjahr',
  Universitaet3: '3. Studienjahr',
  Universitaet4: '4. Studienjahr',
  Master1: 'Master 1. Jahr',
  Master2: 'Master 2. Jahr',
  Doktor: 'Doktorandenprogramm',
};

export function getHumanReadableGermanGrade(
  gradeLevel: GermanEducationLevelsType
): string {
  const readableName = GermanEducationLevelsMapping[gradeLevel];
  if (!readableName) {
    throw new Error('Grade level not found in the German education system.');
  }

  return readableName;
}
