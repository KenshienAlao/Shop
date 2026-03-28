export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const defaultOptions: RequestInit = {
    ...options,
    credentials: "include",
  };

  let res = await fetch(url, defaultOptions);

  if (res.status === 401) {
    const refreshRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_PROFILE}/refresh`,
      {
        method: "POST",
        credentials: "include",
      },
    );

    if (refreshRes.ok) {
      res = await fetch(url, defaultOptions);
    } else {
      localStorage.removeItem("is_logged_in");
    }
  }

  return res;
}
