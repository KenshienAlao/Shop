import { fetchWithAuth } from "./apiClient";

export async function getProfile() {
  const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL_PROFILE}/profile`);

  if (!res.ok) {
    throw new Error("Failed to fetch user profile");
  }

  const data = await res.json();
  return data;
}

