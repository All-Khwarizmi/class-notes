import IDatabase from "@/core/data/idatabase";
import { DeleteStudentOptions } from "../../domain/entities/student-types";
import { getAppDataBase } from "@/core/data/get-app-db";

export default class StudentRepository {
  private readonly _db: IDatabase;

  constructor(db: IDatabase) {
    this._db = db;
  }

  async deleteStudent(options: DeleteStudentOptions) {
    return this._db.deleteStudent(options);
  }
}

export const studentRepository = new StudentRepository(getAppDataBase());
