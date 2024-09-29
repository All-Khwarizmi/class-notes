import { EducationsSystemsType } from '@/features/user/domain/entities/education-systems/education-system';
import {
  EducationLevelsType,
  EducationLevelsTypeUnion,
} from '@/features/user/domain/entities/education-systems/niveaux/niveaux';

export interface DeleteClasseOptions {
  classeId: string;
}

export interface CreateClasseOptions {
  userId: string;
  name: string;
  description?: string;
  imageUrl?: string;
  educationLevel: EducationLevelsTypeUnion & string;
  educationSystem: EducationsSystemsType & string;
}

export interface GetClasseListOptions {
  userId: string;
}
