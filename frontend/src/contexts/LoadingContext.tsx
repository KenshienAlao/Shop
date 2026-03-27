"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { loadingManager } from "@/utils/loadingState";
import Loading from "@/components/Loading";

interface LoadingContextType {
  startLoading: () => void;
  stopLoading: () => void;
  isLoading: boolean;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const remove = loadingManager.addListener((isLoading) => {
      setActive(isLoading);
    });
    return () => {
      remove();
    };
  }, []);

  const value = {
    startLoading: () => loadingManager.startLoading(),
    stopLoading: () => loadingManager.stopLoading(),
    isLoading: active,
  };

  return (
    <LoadingContext.Provider value={value}>
      {active && <Loading />}
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
