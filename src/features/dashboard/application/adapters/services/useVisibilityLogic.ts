import useGetVisibility from "@/features/classe/application/adapters/services/useGetVisibility";
import useUpdateVisibility from "@/features/classe/application/adapters/services/useUpdateVisibility";
import {
  FlatVisibilityType,
  flatVisibilityType,
  toggleVisibility,
} from "@/features/classe/domain/visibility-schema";
import { isRight } from "fp-ts/lib/Either";
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
  const { mutate: updateVisibility } = useUpdateVisibility();
  useEffect(() => {
    if (visibility && !isLoading && !isError && isRight(visibility)) {
      setVisibilityState(flatVisibilityType(visibility.right));
    }
  }, [visibility]);
  const toggleStateVisibility = (args: {
    type: "classe" | "sequence" | "cours" | "complement";
    typeId: string;
    publish: boolean;
  }) => {
    setVisibilityState(
      toggleVisibility(visibilityState!, {
        type: args.type,
        typeId: args.typeId,
        publish: args.publish,
      })
    );
    updateVisibility(
      {
        userId: options.userId,
        type: args.type,
        typeId: args.typeId,
        publish: args.publish,
      },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };
  return {
    visibilityState,
    toggleStateVisibility,
    isLoading,
    isError,
    error,
  };
}
