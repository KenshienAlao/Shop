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
import { profileServices } from "../services/profileServices";
import { useRouter } from "next/navigation";

interface Profile {
  username: string;
  email: string;
}

interface ProfileContextType extends Profile {
  isLoading: boolean;
  refreshProfile: () => Promise<void>;
  clearProfile: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile>({ username: "", email: "" });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const loadProfile = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await profileServices();
      if (data) {
        setProfile({ username: data.username, email: data.email });
      } else {
        router.push("/auth/login");
      }
    } catch (err: any) {
      console.error("Profile fetch error:", err);
      router.push("/auth/login");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const clearProfile = useCallback(() => {
    setProfile({ username: "", email: "" });
  }, []);

  const value = useMemo(
    () => ({
      ...profile,
      isLoading,
      refreshProfile: loadProfile,
      clearProfile,
    }),
    [profile, isLoading, loadProfile, clearProfile],
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfileContext must be used within a ProfileProvider");
  }
  return context;
};
