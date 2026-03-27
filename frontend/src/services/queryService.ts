import { fetchWithAuth } from "./apiClient";

export async function addSearchQuery(search: string) {
  const res = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL_QUERY}/input`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ search }),
    },
  );
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to add search query");
  }
}

export async function getSearchQueries() {
  const res = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL_QUERY}/get`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    },
  );
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch search queries");
  }
  return data;
}

export async function removeSearchQuery(search: string) {
  const res = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL_QUERY}/remove`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ search }),
    },
  );
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to remove search query");
  }
}

export async function clearSearchQueries() {
  const res = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL_QUERY}/clear`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    },
  );
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to clear search queries");
  }
}
