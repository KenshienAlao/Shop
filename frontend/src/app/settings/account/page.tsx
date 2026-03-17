"use client";
import { useProfileContext } from "@/contexts/ProfileContext";
import { logout } from "@/services/authServices";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Page() {
  const { username, email } = useProfileContext();
  const router = useRouter();
  const sections = [
    {
      section: "Account",
      context: [
        {
          label: "Username",
          info: username,
        },
        {
          label: "Email",
          info: email,
        },
      ],
    },
    {
      section: "Security",
      context: [
        {
          label: "Password",
          info: "Change Password",
        },
      ],
    },
  ];

  const HandleSubmitLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await logout();
      router.replace("/auth/login")
    } catch (err: any) {
      alert(err.message)
    }
  }

  return (
    <>
      <div className="min-h-dvh bg-initial">
        <div className="container-parent bg-white">
          <div className="flex items-center gap-5 px-5 py-2">
            {/*header */}
            <div className="flex items-center gap-5">
              <Link href="/dashboard">
                <ArrowLeft className="text-accent" size={30} />
              </Link>
              <h1 className="text-foreground text-2xl"> Account & Security</h1>
            </div>
          </div>
        </div>
        <div className="container-parent">
          {sections.map((item) => (
            <div key={item.section} className="flex flex-col gap-2">
              <div className="mt-5">
                <h1 className="text-md text-subforground px-5">
                  {item.section}
                </h1>
              </div>
              <div className="flex-col bg-white">
                {item.context.map((subItem) => (
                  <div key={subItem.label}>
                    <div className="flex justify-between px-5 py-5">
                      <h1 className="text-forground">{subItem.label}</h1>
                      <h1 className="text-subforground">{subItem.info}</h1>
                    </div>
                    <div className="h-px bg-initial" />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={HandleSubmitLogout}
            className="bg-accent hover:bg-accent/80 active:bg-accent/50 mx-auto mt-10 w-70 rounded-sm px-5 py-2 text-white">
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
