import { input } from "@/services/queryServices";
import { useCallback } from "react";

export function useRecentQuery() {
  const saveRecentQuery = useCallback(async (query: string) => {
    if (!query?.trim()) return;
    try {
      await input(query.trim());
    } catch (err: any) {
      console.error(err.message);
    }
  }, []);

  return { saveRecentQuery };
}
