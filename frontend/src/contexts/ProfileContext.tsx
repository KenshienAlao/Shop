"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import { getProfile } from "@/services/profileService";
import { useRouter } from "next/navigation";

interface UserProfile {
  username: string;
  email: string;
}

interface ProfileContextType extends UserProfile {
  isLoading: boolean;
  refreshProfile: () => Promise<void>;
  clearProfile: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>({ username: "", email: "" });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const handleFetchProfile = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getProfile();
      if (data) {
        setProfile({ username: data.username, email: data.email });
      } else {
        router.push("/auth/login");
      }
    } catch (err: any) {
      console.error("[ProfileContext] Fetch error:", err);
      router.push("/auth/login");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    handleFetchProfile();
  }, [handleFetchProfile]);

  const clearProfile = useCallback(() => {
    setProfile({ username: "", email: "" });
  }, []);

  const contextValue = useMemo(
    () => ({
      ...profile,
      isLoading,
      refreshProfile: handleFetchProfile,
      clearProfile,
    }),
    [profile, isLoading, handleFetchProfile, clearProfile],
  );

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};

