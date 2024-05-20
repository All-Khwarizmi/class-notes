import { Either, left, right } from "fp-ts/lib/Either";
import TemplateEntity from "../../domain/entities/template-entity";
import Failure from "@/core/failures/failures";
import { TemplateSchema } from "../../domain/entities/template-schema";

export default class TemplateDto {
  static toDomain({
    props,
  }: {
    props: any;
  }): Either<Failure<string>, TemplateEntity> {
    if (!props) {
      return left(
        Failure.invalidValue({
          invalidValue: props,
          message: "No evaluation found",
        })
      );
    } else {
      const evaluationParsed = TemplateSchema.safeParse(props);
      if (evaluationParsed.success) {
        return right(TemplateEntity.create(evaluationParsed.data));
      } else {
        return left(
          Failure.invalidValue({
            invalidValue: props,
            message: "Invalid value",
          })
        );
      }
    }
  }
}
