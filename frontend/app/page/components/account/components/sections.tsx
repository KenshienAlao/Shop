import { ChevronRight } from "lucide-react";
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

export function Sections() {

  return (
    <>
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
                  <ChevronRight className="text-subforground" />
                </Link>
                <div className="h-px bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}