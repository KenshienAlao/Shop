import { get, input } from "@/services/queryServices";
import { useCallback } from "react";

export function RecentQuery() {
  const saveRecentQuery = useCallback(async (query: string) => {
    if (!query?.trim()) return;
    try {
      await input(query.trim());
    } catch (err: any) {
      throw new Error(err.message);
    }
  }, []);

  return { saveRecentQuery };
}

export function GetRecentQuery() {
  const getRecentQuery = useCallback(async () => {
    try {
      const res = await get();
      return res.data;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }, []);

  return { getRecentQuery };
}
