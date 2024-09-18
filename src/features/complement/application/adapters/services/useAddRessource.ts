import { QUERY_KEYS } from "@/core/query/ query-keys";
import { useMutation } from "@tanstack/react-query";
import { complementUsecases } from "../../usecases/complement-usecases";
import { Complement } from "@/features/complement/domain/complement-schemas";
export interface AddComplementBaseOptions {
  complementBaseOptions: Pick<
    Complement,
    "name" | "description" | "type" | "publish" | "contentType"
  >;
  coursId: string;
}
export default function useAddRessource() {
  return useMutation({
    mutationKey: [QUERY_KEYS.COMPLEMENT.ADD()],
    mutationFn: ({
      complement,
      coursId,
    }: {
      complement: AddComplementBaseOptions;
      coursId: string;
    }) =>
      complementUsecases.addCoursComplement({
        userId: coursId,
        complement: {
          name: complement.complementBaseOptions.name,
          description: complement.complementBaseOptions.description,
          type: complement.complementBaseOptions.type,
          publish: complement.complementBaseOptions.publish,
          contentType: complement.complementBaseOptions.contentType,
          coursId: complement.coursId,
          body: "",
        },
      }),
  });
}
