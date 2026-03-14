export async function register(
  username: string,
  email: string,
  password: string,
  confirmpassword: string,
) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_AUTH}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      email,
      password,
      confirmpassword,
    }),
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error);
  }

  alert("Success Register");
  return data;
}

export async function login(email: string, password: string) {
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

  alert("Success Login");
  return data;
}

export async function logout() {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL_AUTH}/logout`, {
    method: "POST",
    credentials: "include",
  });
}
