import { useState } from "react";

export default function useFetchingState() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const startFetching = () => {
    setLoading(true);
    setError(null);
  };

  const endFetching = () => {
    setLoading(false);
  };

  const setFetchingError = (error: string) => {
    setError(error);
    setLoading(false);
  };

  return {
    loading,
    error,
    startFetching,
    endFetching,
    setFetchingError,
  };
}
