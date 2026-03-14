"use client";
import { useEffect, useState } from "react";
import { fetchProfile } from "@/app/services/profileServices";

export default function useProfile() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    fetchProfile()
      .then((data) => {
        setUsername(data.username);
        setEmail(data.email);
      })
      .catch((err) => alert(err.message));
  }, []);

  return { username, email };
}
