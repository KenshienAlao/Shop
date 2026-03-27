import { notifySuccess } from "@/utils/toast";

export async function register(
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

  notifySuccess("Successfully Registered");
  return data;
}

export async function login(email: string, password: string) {
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

    notifySuccess("Successfully Logged In");
    return data;
  } catch (err: unknown) {
    const error = err as Error;
    throw new Error(error.message);
  }
}

export async function logout() {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL_AUTH}/logout`, {
    method: "POST",
    credentials: "include",
  });
}
