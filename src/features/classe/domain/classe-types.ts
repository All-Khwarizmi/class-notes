export interface DeleteClasseOptions {
  classeId: string;
}

export interface CreateClasseOptions {
  userId: string;
  name: string;
  description?: string;
  imageUrl?: string;
}
