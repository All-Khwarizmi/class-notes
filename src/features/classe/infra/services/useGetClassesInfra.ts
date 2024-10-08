import ClassEntity from '@/features/classe/domain/class-entity';
import { ClasseEntityDto } from '@/features/classe/infra/dtos/classe-dto';
import { useQuery } from 'convex/react';
import { isRight } from 'fp-ts/lib/Either';
import { useEffect, useState } from 'react';

import { api } from '../../../../../convex/_generated/api';

export type GetClassesPayload = {
  classes: ClassEntity[] | null;
  error: boolean;
} | null;

export default function useGetClassesInfra({ id }: { id: string }) {
  const [getGlassesPayloadInfra, setGetClassesPayloadInfra] =
    useState<GetClassesPayload>(null);
  const rawClasses = useQuery(api.classes.getClasses, {
    id,
  });
  useEffect(() => {
    if (rawClasses) {
      //!TODO: refactor this. -Now we are using the Either monad to handle the error by filtering the invalid values. But we should do something about the fault classes if any
      const classeEntities = rawClasses.map((c) => {
        const classEntity = ClasseEntityDto.toDomain({
          ...c,
          educationLevel: c.educationLevel as any,
          educationSystem: c.educationSystem as any,
        });
        if (isRight(classEntity)) {
          return classEntity.right;
        }
        return ClassEntity.create({
          id: 'Invalid',
          name: 'Invalid',
          description: 'Invalid',
          imageUrl: 'Invalid',
          educationLevel: 'Bachillerato1',
          educationSystem: 'Chinese',
        });
      });
      setGetClassesPayloadInfra({ classes: classeEntities, error: false });
    }
  }, [rawClasses]);

  return {
    getGlassesPayloadInfra,
  };
}

export type GetClassesInfra = typeof useGetClassesInfra;
