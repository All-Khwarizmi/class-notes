import { useEffect, useState } from "react";
import EvaluationEntity from "../../domain/entities/evaluation-entity";
import { api } from "../../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import EvaluationDto from "../dto/evaluations-dto";
import { isLeft } from "fp-ts/lib/Either";

export type GetEvaluationsByCreatorPayload = {
  evaluations: EvaluationEntity[] | false | "NO DATA";
  error: boolean;
} | null;
export default function useGetEvaluationsByCreatorInfra({
  userId,
}: {
  userId: string;
}): GetEvaluationsByCreatorPayload {
  const [getEvaluationsByCreatorPayload, setGetEvaluationsByCreatorPayload] =
    useState<GetEvaluationsByCreatorPayload>({
      evaluations: false,
      error: false,
    });

  const getEvaluationsByCreatorId = useQuery(
    api.evaluation_template.listEvaluationTemplatesByCreator,
    { userId: userId || "" }
  );

  useEffect(() => {
    if (getEvaluationsByCreatorId?.error) {
      setGetEvaluationsByCreatorPayload({
        evaluations: false,
        error: true,
      });
      return;
    } else if (getEvaluationsByCreatorId?.templates) {
      const eitherTemplates: EvaluationEntity[] = [];
      for (
        let index = 0;
        index < getEvaluationsByCreatorId.templates.length;
        index++
      ) {
        const element = getEvaluationsByCreatorId.templates[index];
        const eitherTemplate = EvaluationDto.toDomain({ props: element });
        if (isLeft(eitherTemplate)) {
          setGetEvaluationsByCreatorPayload({
            evaluations: false,
            error: true,
          });
          break;
        }
        eitherTemplates.push(eitherTemplate.right);
      }
      if (
        getEvaluationsByCreatorPayload?.error === false &&
        eitherTemplates.length > 0
      ) {
        setGetEvaluationsByCreatorPayload({
          evaluations: eitherTemplates,
          error: false,
        });
      } else if (eitherTemplates.length === 0) {
        setGetEvaluationsByCreatorPayload({
          evaluations: "NO DATA",
          error: false,
        });
      }
    }
  }, [getEvaluationsByCreatorId]);

  return getEvaluationsByCreatorPayload;
}

export type GetEvaluationsByCreator = typeof useGetEvaluationsByCreatorInfra;
