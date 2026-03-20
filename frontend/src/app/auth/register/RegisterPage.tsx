"use client";
import { register } from "@/services/authServices";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmpassword, setConfirmPassword] = useState<string>("")
    const router = useRouter();


    const handeleSubmiRegister = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await register(username, email, password, confirmpassword);
            router.replace("/auth/login");
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    const form = [
        {
            label: "Username",
            type: "text",
            value: username,
            onChange: setUsername,
        },
        {
            label: "Email",
            type: "email",
            value: email,
            onChange: setEmail,
        },
        {
            label: "Password",
            type: "password",
            value: password,
            onChange: setPassword,
        },
        {
            label: "Confirm Password",
            type: "password",
            value: confirmpassword,
            onChange: setConfirmPassword,
        },
    ];

    return (
        <>
            <div className="flex min-h-dvh items-center justify-center p-5">
                <div className="border px-2 py-5">
                    <h1 className="text-center text-2xl font-bold">Register</h1>
                    <form onSubmit={handeleSubmiRegister}>
                        <div className="flex flex-col gap-5">
                            {form.map((item) => (
                                <div key={item.label} className="flex flex-col gap-1">
                                    <label htmlFor={item.type}>{item.label}</label>
                                    <input
                                        type={item.type}
                                        value={item.value}
                                        placeholder={item.label}
                                        className="px-2 ring"
                                        onChange={(e) => item.onChange(e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>
                        <button
                            type="submit"
                            className="mt-5 w-full bg-blue-500 px-2 py-1 text-white"
                        >
                            Register
                        </button>
                    </form>
                    <div className="mt-5">
                        <p className="text-center text-sm">
                            Already have an account?{" "}
                            <Link href="/auth/login" className="text-blue-500">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
