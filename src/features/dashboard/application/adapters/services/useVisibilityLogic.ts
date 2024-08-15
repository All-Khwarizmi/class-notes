import { toastWrapper } from "@/core/utils/toast-wrapper";
import useGetVisibility from "@/features/classe/application/adapters/services/useGetVisibility";
import useUpdateVisibility from "@/features/classe/application/adapters/services/useUpdateVisibility";
import {
  FlatVisibilityType,
  flatVisibilityType,
  structuredVisibilityType,
  toggleVisibility,
} from "@/features/classe/domain/visibility-schema";
import { isLeft, isRight } from "fp-ts/lib/Either";
import { is } from "immutable";
import { useState, useEffect } from "react";

export function useVisibilityLogic(options: { userId: string }) {
  const [visibilityState, setVisibilityState] = useState<FlatVisibilityType>();
  const {
    data: visibility,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetVisibility({ userId: options.userId });
  const { mutate: updateVisibility, isPending } = useUpdateVisibility();
  useEffect(() => {
    if (visibility && !isLoading && !isError && isRight(visibility)) {
      setVisibilityState(flatVisibilityType(visibility.right));
    } else if (isError && error) {
      console.error(error);
    } else if (visibility && isLeft(visibility)) {
      console.error(visibility.left);
    }
  }, [visibility, isLoading, isError, error]);
  const toggleStateVisibility = (args: {
    type: "classe" | "sequence" | "cours" | "complement";
    typeId: string;
    publish: boolean;
  }) => {
    if (isPending) return;
    const newVisibility = toggleVisibility(visibilityState!, {
      type: args.type,
      typeId: args.typeId,
      publish: args.publish,
    });
    updateVisibility(
      {
        userId: options.userId,
        visibilityTable: structuredVisibilityType(
          options.userId,
          newVisibility
        ),
      },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  useEffect(() => {
    let loader: string | number;
    if (isPending) {
      loader = toastWrapper.loading();
    }

    return () => {
      if (loader) {
        toastWrapper.dismiss(loader);
      }
    };
  }, [isPending]);
  return {
    visibilityState,
    toggleStateVisibility,
    isLoading,
    isError,
    error,
  };
}
