export async function fetchProfile() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_PROFILE}/profile`,
    {
      credentials: "include",
    },
  );
  console.log(process.env.NEXT_PUBLIC_API_URL_PROFILE);
  if (!res.ok) alert("Failed to fetch profile");

  const data = await res.json();
  console.log(data.username);

  return data;
}
