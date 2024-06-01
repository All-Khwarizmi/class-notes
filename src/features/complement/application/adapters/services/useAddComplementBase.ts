import { useEffect, useState } from "react";
import { toast } from "sonner";
import { complementUsecases } from "../../usecases/complement-usecases";
import { Complement } from "@/features/complement/domain/complement-schemas";
import { isLeft } from "fp-ts/lib/Either";
import { useRouter } from "next/navigation";
export interface AddComplementBaseOptions {
  complementBaseOptions: Pick<
    Complement,
    "name" | "description" | "type" | "publish" | "contentType"
  >;
  coursId: string;
}

function useAddComplementBase() {
  const router = useRouter();
  const [complementBaseOptions, setComplementBaseOptions] =
    useState<AddComplementBaseOptions | null>(null);
  useEffect(() => {
    if (complementBaseOptions) {
      const loadingToast = toast.loading("Adding...", {
        position: "top-center",
      });

      complementUsecases
        .addCoursComplement({
          userId: "userId",
          complement: {
            name: complementBaseOptions.complementBaseOptions.name,
            description:
              complementBaseOptions.complementBaseOptions.description,
            publish: complementBaseOptions.complementBaseOptions.publish,
            type: complementBaseOptions.complementBaseOptions.type,
            body: "",
            coursId: complementBaseOptions.coursId,
            contentType:
              complementBaseOptions.complementBaseOptions.contentType,
          },
        })
        .then((eitherComplement) => {
          if (isLeft(eitherComplement)) {
            toast.error("Error adding complement", {
              position: "top-center",
            });
            toast.dismiss(loadingToast);
            return;
          }
          toast.success("Complement added", {
            position: "top-center",
          });
          toast.dismiss(loadingToast);
          router.push(`/complements/${eitherComplement.right}`);
        })
        .finally(() => {
          setComplementBaseOptions(null);
        });
    }
  }, [complementBaseOptions]);

  return {
    setComplementBaseOptions,
  };
}

export default useAddComplementBase;
