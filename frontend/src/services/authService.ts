export async function registerService(
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_AUTH}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      username,
      email,
      password,
      confirmpassword: confirmPassword,
    }),
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error);
  }
  return data;
}

export async function loginService(email: string, password: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_AUTH}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error);
    }
    localStorage.setItem("is_logged_in", "true");
    return data;
    } catch (err: unknown) {
    const error = err as Error;
    throw new Error(error.message);
  }
}

export async function logoutService() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_AUTH}/logout`, {
    method: "POST",
    credentials: "include",
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error);
  }
  localStorage.removeItem("is_logged_in");
  return data;
}
