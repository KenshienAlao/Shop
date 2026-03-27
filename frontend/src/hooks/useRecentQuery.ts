import { addSearchQuery, getSearchQueries } from "@/services/queryService";
import { useCallback } from "react";

export function useSearchHistory() {
  const saveSearchQuery = useCallback(async (query: string) => {
    if (!query?.trim()) return;
    try {
      await addSearchQuery(query.trim());
    } catch (err: unknown) {
      const error = err as Error;
      throw new Error(error.message || "Failed to save search query");
    }
  }, []);

  const fetchSearchHistory = useCallback(async () => {
    try {
      const res = await getSearchQueries();
      return res.data;
    } catch (err: unknown) {
      const error = err as Error;
      throw new Error(error.message || "Failed to fetch search history");
    }
  }, []);

  return { saveSearchQuery, fetchSearchHistory };
}
