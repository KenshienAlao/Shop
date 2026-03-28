"use client";

import { useProfile } from "@/contexts/ProfileContext";
import { useLogout } from "@/hooks/useAuth";
import { notifyFailed } from "@/utils/toast";
import { ArrowLeft, User, Shield, ChevronRight, LogOut, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AccountPage() {
    const { username, email, clearProfile } = useProfile();
    const router = useRouter();
    const { logout } = useLogout();

    interface AccountSectionItem {
        label: string;
        value: string;
        icon?: React.ReactNode;
        action?: boolean;
    }

    interface AccountSection {
        title: string;
        icon: React.ReactNode;
        items: AccountSectionItem[];
    }

    const sections: AccountSection[] = [
        {
            title: "Account Information",
            icon: <User className="text-blue-500" size={20} />,
            items: [
                {
                    label: "Username",
                    value: username,
                    icon: <User size={16} />
                },
                {
                    label: "Email",
                    value: email,
                    icon: <Mail size={16} />
                },
            ],
        },
        {
            title: "Security Settings",
            icon: <Shield className="text-green-500" size={20} />,
            items: [
                {
                    label: "Password",
                    value: "Change Password",
                    action: true
                },
            ],
        },
    ];


    const handleLogout = async () => {
        try {
            await logout();
            localStorage.clear();
            clearProfile();
            router.replace("/auth/login");
        } catch (err: any) {
            notifyFailed(err.message);
        }
    };

    return (
        <div className="min-h-dvh bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-3xl mx-auto flex items-center gap-4 px-5 py-4">
                    <Link
                        href="/dashboard"
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ArrowLeft className="text-gray-800" size={24} />
                    </Link>
                    <h1 className="text-xl font-black text-gray-900 tracking-tight">
                        Account & Security
                    </h1>
                </div>
            </div>

            <main className="flex-1 max-w-3xl mx-auto w-full px-5 py-8 space-y-8">
                {sections.map((section) => (
                    <section key={section.title} className="space-y-4">
                        <div className="flex items-center gap-2 px-1">
                            {section.icon}
                            <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest">
                                {section.title}
                            </h2>
                        </div>

                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                            {section.items.map((item, index) => (
                                <div key={item.label}>
                                    <div className="flex items-center justify-between px-6 py-5 group cursor-pointer hover:bg-gray-50/50 transition-colors">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">
                                                {item.label}
                                            </p>
                                            <p className="text-sm font-bold text-gray-800">
                                                {item.value}
                                            </p>
                                        </div>
                                        {item.action && (
                                            <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
                                        )}
                                    </div>
                                    {index < section.items.length - 1 && (
                                        <div className="mx-6 h-px bg-gray-50" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                ))}

                <div className="pt-8">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-3 bg-red-50 text-red-600 border border-red-100 py-4 rounded-2xl font-black text-sm hover:bg-red-100 active:scale-[0.98] transition-all"
                    >
                        <LogOut size={18} />
                        SIGN OUT
                    </button>
                    <p className="text-center mt-6 text-[10px] font-medium text-gray-300 uppercase tracking-[0.2em]">
                        Version 1.0.4 Pre-Release
                    </p>
                </div>
            </main>
        </div>
    );
}

