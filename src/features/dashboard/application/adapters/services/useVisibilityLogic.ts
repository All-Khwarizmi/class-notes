import useGetVisibility from "@/features/classe/application/adapters/services/useGetVisibility";
import {
  FlatVisibilityType,
  flatVisibilityType,
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
  } = useGetVisibility({ userId: options.userId });
  useEffect(() => {
    if (visibility && !isLoading && !isError && isRight(visibility)) {
      setVisibilityState(flatVisibilityType(visibility.right));
    }
  }, [visibility]);

  return {
    visibilityState,
    setVisibilityState,
    isLoading,
    isError,
    error,
  };
}
