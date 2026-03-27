"use client"
import { ArrowLeft, User2 } from "lucide-react";
import { useProfile } from "@/contexts/ProfileContext";
import Link from "next/link";


const sections = [
    {
        section: "My Account",
        context: [
            { name: "Account & Security", href: "/settings/account" },
            { name: "My Address", href: "/settings/addresses" },
        ],
    },
    {
        section: "Support",
        context: [
            { name: "About", href: "/about" },
        ],
    }
]

export default function Account() {
    const { username } = useProfile();

    return (
        <>
            <div className="container-parent">
                {/* header */}
                <div className="bg-accent">
                    <div className="mt-5 py-5 px-7 flex items-center gap-5 text-main">
                        <div className="bg-white rounded-full p-5">
                            <User2 className="text-accent" size={50} />
                        </div>
                        <span className="text-lg font-semibold">{username}</span>
                    </div>
                </div>
                <div className="container-parent bg-gray-500/10">
                    {sections.map((item) => (
                        <div key={item.section} className="flex flex-col gap-2">
                            <div className="mt-5">
                                <h1 className="text-md text-subforground px-5">{item.section}</h1>
                            </div>
                            <div className="bg-white flex-col">
                                {item.context.map((subItem) => (
                                    <div key={subItem.name}>
                                        <Link href={subItem.href} className="flex justify-between px-5 py-5">
                                            <h1 className="text-forground">{subItem.name}</h1>
                                            <ArrowLeft className="text-subforground" />
                                        </Link>
                                        <div className="h-px bg-gray-200" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
