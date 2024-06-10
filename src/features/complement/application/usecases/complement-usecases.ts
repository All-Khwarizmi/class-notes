import { Either, isLeft, left, right } from "fp-ts/lib/Either";
import { Complement, ComplementSchema } from "../../domain/complement-schemas";
import ComplementRepository, {
  complementRepository,
} from "../repositories/complement-repository";
import Failure from "@/core/failures/failures";

export default class ComplementUsecases {
  private readonly _repository: ComplementRepository;

  constructor({ repository }: { repository: ComplementRepository }) {
    this._repository = repository;
  }

  async addCoursComplement({
    userId,
    complement,
  }: {
    userId: string;
    complement: Pick<
      Complement,
      | "name"
      | "description"
      | "type"
      | "publish"
      | "coursId"
      | "body"
      | "contentType"
    >;
  }) {
    return this._repository.addComplement({
      userId,
      complement,
    });
  }

  async getAllCoursComplement({
    coursId,
  }: {
    coursId: string;
  }): Promise<Either<Failure<string>, Complement[]>> {
    const eitherComplements = await this._repository.getAllComplement({
      coursId,
    });
    if (isLeft(eitherComplements)) {
      return eitherComplements;
    }
    let complements: Complement[] = [];
    let failures: Failure<string>[] = [];

    for (const complement of eitherComplements.right) {
      const parsedComplement = {
        ...complement,
        id: complement._id,
        createdAt: complement._creationTime,
      };
      const validateComplement = ComplementSchema.safeParse(parsedComplement);
      if (!validateComplement.success) {
        failures.push(
          Failure.invalidValue({
            invalidValue: complement,
            message: `
            Unable to validate complement with id: ${complement.id}
            
            ${JSON.stringify(validateComplement.error)}
            `,
          })
        );
        break;
      }
      complements.push(validateComplement.data);
    }
    if (failures.length > 0) {
      return left(
        Failure.invalidValue({
          invalidValue: failures,
          message: " Could not validate complements ",
          code: "APP203",
        })
      );
    }
    return right(complements);
  }

  async getCoursComplement({ id }: { id: string }) {
    const eitherComplement = await this._repository.getComplement({ id });
    if (isLeft(eitherComplement)) {
      return eitherComplement;
    }
    const parsedComplement = {
      ...eitherComplement.right,
      id: eitherComplement.right._id,
      createdAt: eitherComplement.right._creationTime,
    };
    const validatedComplement = ComplementSchema.safeParse(parsedComplement);
    if (!validatedComplement.success) {
      return left(
        Failure.invalidValue({
          invalidValue: eitherComplement.right,
          message: `
          Unable to validate complement with id: ${eitherComplement.right.id}
          
          ${JSON.stringify(validatedComplement.error)}
          
          `,
          code: "APP203",
        })
      );
    }
    return right(validatedComplement.data);
  }

  async updateCoursComplement({
    coursComplement,
  }: {
    coursComplement: Complement;
  }) {
    return this._repository.updateComplement({ coursComplement });
  }
}

export const complementUsecases = new ComplementUsecases({
  repository: complementRepository,
});
