"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Start() {
  const router = useRouter()
  useEffect(() => {
    router.replace("/page/dashboard")
  }, [router])
  return null;


}
