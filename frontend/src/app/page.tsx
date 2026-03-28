"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useProfile } from "@/contexts/ProfileContext";

export default function Start() {
  const router = useRouter()
  const { isLoading, username } = useProfile();

  useEffect(() => {
    if (!isLoading) {
      if (username) {
        router.push("/dashboard")
      } else {
        router.push("/auth/login")
      }
    }
  }, [isLoading, username, router])
  return null;


}
