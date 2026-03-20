"use client";
import { login } from "@/services/authServices";
import { useProfileContext } from "@/contexts/ProfileContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const { refreshProfile } = useProfileContext();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmitLogin = async (
    e: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    try {
      e.preventDefault();
      await login(email, password);
      await refreshProfile();
      router.replace("/dashboard");
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  const form = [
    {
      label: "Email",
      type: "email",
      value: email,
      onchange: setEmail,
    },
    {
      label: "Password",
      type: "password",
      value: password,
      onchange: setPassword,
    },
  ];
  return (
    <>
      <div className="flex min-h-dvh items-center justify-center p-5">
        <div className="border px-2 py-5">
          <h1 className="text-center text-2xl font-bold">Login</h1>
          <form action="" onSubmit={handleSubmitLogin}>
            <div className="flex flex-col gap-5">
              {form.map((item) => (
                <div key={item.label} className="flex flex-col gap-1">
                  <label htmlFor={item.type}>{item.label}</label>
                  <input
                    value={item.value}
                    type={item.type}
                    placeholder={item.label}
                    onChange={(e) => item.onchange(e.target.value)}
                    className="px-2 ring"
                  />
                </div>
              ))}
              <a className="text-end text-sm text-blue-400">Forgot Password?</a>
            </div>
            <button
              type="submit"
              className="mt-5 w-full bg-blue-500 px-2 py-1 text-white"
            >
              Login
            </button>
          </form>
          <div className="mt-5">
            <p className="text-center text-sm">
              Don't have an account?{" "}
              <Link href="/auth/register" className="text-blue-500">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
