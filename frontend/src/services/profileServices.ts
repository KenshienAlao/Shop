export async function profileServices() {
  let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_PROFILE}/profile`, {
    credentials: "include",
  });

  if (res.status === 401) {
    const refreshRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_PROFILE}/refresh`,
      {
        method: "POST",
        credentials: "include",
      },
    );

    if (!refreshRes.ok) {
      throw new Error("Failed to refresh the token");
      return false;
    }

    res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_PROFILE}/profile`, {
      credentials: "include",
    });
  }

  if (!res.ok) throw new Error("Failed to fetch profile");

  const data = await res.json();

  return data;
}
