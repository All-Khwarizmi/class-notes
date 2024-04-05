import Failure from "@/core/failures/failures";
import { Either, right } from "fp-ts/lib/Either";
import ClasseEntity from "@/features/classe/domain/class-entity";
import { Id } from "../../../../../convex/_generated/dataModel";
import { left } from "fp-ts/lib/Either";

export class ClasseEntityDto {
  static toDomain(props: ClasseInfra): Either<Failure, ClasseEntity> {
    if (!props) {
      return left(
        Failure.invalidValue({
          invalidValue: props,
          message: "No class found",
        })
      );
    }
    const classeEntity = ClasseEntity.create({
      id: props._id,
      name: props.name,
      description: props.description,
      imageUrl: props.imageUrl,
    });
    if (classeEntity.values._tag === "Left") {
      return left(
        Failure.invalidValue({
          invalidValue: classeEntity.values.left,
          message: "Invalid value",
        })
      );
    }
    return right(classeEntity);
  }
}

type ClasseInfra =
  | {
      _id: Id<"Classes">;
      _creationTime: number;
      description?: string | undefined;
      imageUrl?: string | undefined;
      students?: any[] | undefined;
      name: string;
      userId: string;
    }
  | undefined;
