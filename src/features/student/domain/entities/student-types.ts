export interface DeleteStudentOptions {
  id: string;
}

export interface UpdateStudentOptions {
  id: string;
  name?: string;
  imageUrl?: string;
}

export interface CreateStudentOptions {
  name: string;
  imageUrl?: string;
  classId: string;
}