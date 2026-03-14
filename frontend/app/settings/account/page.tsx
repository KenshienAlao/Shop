"use client"
import useProfile from "@/app/hooks/useProfile";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";





export default function Page() {
  const { username, email } = useProfile();




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
        }
      ]
    },
    {
      section: "Security",
      context: [
        {
          label: "Password",
          info: "Change Password",
        }
      ]
    }
  ]
  return (
    <>
      <div className="min-h-dvh bg-gray-500/10">
        <div className="container-parent bg-white">
          <div className="flex items-center gap-5 px-5 py-2">
            {/*header */}
            <div className="flex items-center gap-5">
              <Link href="/page/dashboard">
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
                <h1 className="text-md text-subforground px-5">{item.section}</h1>
              </div>
              <div className="bg-white flex-col">
                {item.context.map((subItem) => (
                  <div key={subItem.label}>
                    <div className="flex justify-between px-5 py-5">
                      <h1 className="text-forground">{subItem.label}</h1>
                      <h1 className="text-subforground">{subItem.info}</h1>
                    </div>
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
