import { QUERY_KEYS } from "@/core/query/ query-keys";
import { useQuery } from "@tanstack/react-query";
import { isLeft } from "fp-ts/lib/Either";
import { toast } from "sonner";
import { notesUsecases } from "../../usecases/note-usecases";

export default function useGetNotes(options: { parentId: string }) {
  return useQuery({
    queryKey: [QUERY_KEYS.NOTES.GET_ALL()],
    queryFn: async () => {
      return notesUsecases.getNotes({
        parentId: options.parentId,
      });
    },
  });
}
