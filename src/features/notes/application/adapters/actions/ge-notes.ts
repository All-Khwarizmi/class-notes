"use server";

import { notesUsecases } from "../../usecases/note-usecases";

export default async function getNotes(options: {
  slug: string;
  userId: string;
  type: "profile" | "sequence" | "cours" | "class" | "student";
}) {
  return notesUsecases.getNotes({
    parentId: options.type === "profile" ? options.userId : options.slug,
  });
}
