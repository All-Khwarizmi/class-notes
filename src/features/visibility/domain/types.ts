import { VisibilityType } from '@/features/classe/domain/visibility-schema';

export type GetVisibilityOptions = {
  userId: string;
};

export type VisibilityEntityTypes =
  | 'classe'
  | 'sequence'
  | 'cours'
  | 'complement';

export type UpdateVisibilityOptions = {
  userId: string;
  visibilityTable: Omit<VisibilityType, '_id'>;
};

export type AddClasseToVisibilityOptions = {
  userId: string;
  entity: {
    id: string;
    name: string;
    description: string;
    publish: boolean;
  };
};

export type AddSequenceToVisibilityOptions = {
  userId: string;
  entity: {
    id: string;
    name: string;
    description: string;
    publish: boolean;
    classe: boolean;
    classeId: string;
  };
};

export type AddCoursToVisibilityOptions = {
  userId: string;
  entity: {
    id: string;
    name: string;
    description: string;
    publish: boolean;
    sequence: boolean;
    sequenceId: string;
    classeId: string;
    classe: boolean;
  };
};

export type AddComplementToVisibilityOptions = {
  userId: string;
  entity: {
    id: string;
    name: string;
    description: string;
    publish: boolean;
    sequence: boolean;
    sequenceId: string;
    classeId: string;
    classe: boolean;
    coursId: string;
    cours: boolean;
  };
};

export type DeleteEntityFromVisibilityOptions = {
  userId: string;
  typeId: string;
  type: VisibilityEntityTypes;
};
