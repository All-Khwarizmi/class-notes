import { isRight } from "fp-ts/lib/Either";
import ClassRepository from "./class-repository";
import ClassEntity from "@/domain/class/class-entity";

export default class ClassUsecases {
  private classRepository: ClassRepository;
  constructor(classRepository: ClassRepository) {
    this.classRepository = classRepository;
  }

/**
 * Retrieves the list of classes.
 * @returns An object containing the error message (if any) and the list of classes.
 */
  public useGetClasses(): {
    error: string | undefined;
    data: ClassEntity[] | undefined;
  } {
    const classes = this.classRepository.useGetClasses();
    const isClasses = isRight(classes);
    if (!isClasses) {
      const error = classes.left;
      return { error: error.message, data: undefined };
    }
    const data = classes.right;
    return { error: undefined, data };
  }
}
