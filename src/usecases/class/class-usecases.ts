import { isRight } from "fp-ts/lib/Either";
import ClassRepository from "./class-repository";
import ClassEntity from "@/domain/class/class-entity";
import { UseCaseResult } from "@/types/usecase";

export default class ClassUsecases {
  private classRepository: ClassRepository;
  constructor(classRepository: ClassRepository) {
    this.classRepository = classRepository;
  }

  /**
   * Retrieves the list of classes.
   * @returns An object containing the error message (if any) and the list of classes.
   */
  public useGetClasses(): UseCaseResult<ClassEntity[]> {
    const classes = this.classRepository.useGetClasses();
    const isClasses = isRight(classes);
    if (!isClasses) {
      const error = classes.left;
      return {
        state: "failure",
        error: error.message,
      };
    }
    const data = classes.right;
    return {
      state: "success",
      data: data,
    };
  }
}
