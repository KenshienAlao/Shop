export async function input(search: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_QUERY}/input`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ search }),
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error);
  }
}

export async function get() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_QUERY}/get`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error);
  }
  return data;
}
