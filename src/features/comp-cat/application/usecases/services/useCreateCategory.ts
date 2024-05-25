import { Category } from "@/features/comp-cat/domain/entities/schemas";
import { useEffect, useState } from "react";
import { compCatUsecases } from "../comp-cat-usecases";
import { isLeft } from "fp-ts/lib/Either";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function useCreateCategory() {
  const [createCategoryOptions, setCreateCategoryOptions] = useState<Omit<
    Category,
    "_id"
  > | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!createCategoryOptions) return;
    const loadingToast = toast.loading("Adding category", {
      position: "top-center",
    });
    compCatUsecases
      .addCategory({
        userId: createCategoryOptions.createdBy,
        category: createCategoryOptions,
      })
      .then((result) => {
        if (isLeft(result)) {
          toast.error("Failed to add category", {
            position: "top-center",
            duration: 3000,
          });
          return;
        }
        toast.dismiss(loadingToast);
        toast.success("Category added", {
          position: "top-center",
          duration: 3000,
        });
        router.refresh();
      })
      .finally(() => {
        setCreateCategoryOptions(null);
        toast.dismiss(loadingToast);
      });
  }, [createCategoryOptions]);

  return {
    setCreateCategoryOptions,
  };
}
