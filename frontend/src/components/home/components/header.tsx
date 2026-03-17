import { MessageCircleMore, Search } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <div className="container-parent bg-accent sticky top-0 flex">
        <div className="flex w-full items-center justify-around px-2 py-3">
          <Link
            href="/search"
            className="bg-main flex w-90 items-center gap-2 rounded-lg p-3"
          >
            <Search className="text-subforground" />
            <span className="text-accent">Search</span>
          </Link>
          <button>
            <MessageCircleMore className="text-main" size={40} />
          </button>
        </div>
      </div>
    </>
  );
}
