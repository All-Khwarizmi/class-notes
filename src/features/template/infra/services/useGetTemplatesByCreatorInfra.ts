import { useQuery } from 'convex/react';
import { isLeft } from 'fp-ts/lib/Either';
import { useEffect, useState } from 'react';

import { api } from '../../../../../convex/_generated/api';
import TemplateEntity from '../../domain/entities/template-entity';
import TemplateDto from '../dto/template-dto';

export type GetTemplatesByCreatorPayload = {
  templates: TemplateEntity[] | false | 'NO DATA';
  error: boolean;
} | null;
export default function useGetEvaluationsByCreatorInfra({
  userId,
}: {
  userId: string;
}): GetTemplatesByCreatorPayload {
  const [getTemplatesByCreatorPayload, setGetTemplatesByCreatorPayload] =
    useState<GetTemplatesByCreatorPayload>({
      templates: false,
      error: false,
    });

  const getTemplatesByCreatorId = useQuery(
    api.template.listTemplatesByCreator,
    { userId: userId || '' }
  );

  useEffect(() => {
    if (getTemplatesByCreatorId?.error) {
      setGetTemplatesByCreatorPayload({
        templates: false,
        error: true,
      });
      return;
    } else if (getTemplatesByCreatorId?.templates) {
      const eitherTemplates: TemplateEntity[] = [];
      for (
        let index = 0;
        index < getTemplatesByCreatorId.templates.length;
        index++
      ) {
        const element = getTemplatesByCreatorId.templates[index];
        const eitherTemplate = TemplateDto.toDomain({ props: element });
        if (isLeft(eitherTemplate)) {
          setGetTemplatesByCreatorPayload({
            templates: false,
            error: true,
          });
          break;
        }
        eitherTemplates.push(eitherTemplate.right);
      }
      if (
        getTemplatesByCreatorPayload?.error === false &&
        eitherTemplates.length > 0
      ) {
        setGetTemplatesByCreatorPayload({
          templates: eitherTemplates,
          error: false,
        });
      } else if (eitherTemplates.length === 0) {
        setGetTemplatesByCreatorPayload({
          templates: 'NO DATA',
          error: false,
        });
      }
    }
  }, [getTemplatesByCreatorId]);

  return getTemplatesByCreatorPayload;
}

export type GetTemplatesByCreator = typeof useGetEvaluationsByCreatorInfra;
