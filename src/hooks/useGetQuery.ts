import { useEffect, useState } from "react";

export const useGetQuery = <T>(query: string, mapFunction: (newData: any) => T, disabled?: boolean) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (disabled) {
      setLoading(false);
      return;
    }

    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(query, {
          signal: abortController.signal,
        });
        const json = await response.json();

        if (response.ok) {
          setError(null);
          setData(mapFunction(json));
        } else {
          setError(json.message);
        }

        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();

    return () => abortController.abort();
  }, [query, mapFunction, disabled]);

  return { data, loading, error };
};
