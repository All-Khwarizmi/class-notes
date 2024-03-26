import Failure from "@/core/failures/failures";
import ClassRepository from "@/usecases/class/class-repository";
import { Either, right } from "fp-ts/lib/Either";
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";
import ClassEntity from "@/domain/class/class-entity";
import { Id } from "../../../convex/_generated/dataModel";
import { Option, isSome, none, some } from "fp-ts/lib/Option";
import { left } from "fp-ts/lib/Either";
import { optionPiper } from "@/core/piper";

export default class ClassRepositoryImpl extends ClassRepository {
  useCreateClass(props: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  updateClass(props: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  deleteClass(props: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  getClass(classId: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  useGetClasses(): Either<Failure, ClassEntity[]> {
    const classes = useQuery(api.classes.getClasses);
    const classEntities = ClassEntityDto.toDomain(classes);
    const isClasses = isSome(classEntities);
    if (!isClasses) {
      return left(Failure.invalidValue(classes, "No classes found"));
    }
    const pippedClasses = optionPiper(classEntities);

    return right(pippedClasses);
  }
}

export class ClassEntityDto {
  static toDomain(props: ClassInfra): Option<ClassEntity[]> {
    if (!props) {
      return none;
    }
    return some(
      props.map((c) => {
        const props = {
          id: c._id,
          description: c.description,
          imageUrl: c.imageUrl,
          students: c.students,
          name: c.name,
        };
        return ClassEntity.create(props);
      })
    );
  }
}

type ClassInfra =
  | {
      _id: Id<"Classes">;
      _creationTime: number;
      description?: string | undefined;
      imageUrl?: string | undefined;
      students?: any[] | undefined;
      name: string;
      userId: string;
    }[]
  | undefined;
