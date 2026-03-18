"use client";
import { Home, ShoppingBag, ShoppingCart, User2 } from "lucide-react";
import { memo } from "react";

interface NavbarProps {
  isActive: string;
  setIsActive: (tab: string) => void;
}

const tab = [
  {
    name: "Home",
    icon: Home,
  },
  {
    name: "Cart",
    icon: ShoppingCart,
  },
  {
    name: "Me",
    icon: User2,
  },
];

function Navbar({ isActive, setIsActive }: NavbarProps) {
  return (
    <nav className="container-shadow sticky bottom-0 z-50 bg-white">
      <div className="mx-auto flex w-full max-w-7xl justify-around py-3 md:py-4">
        {tab.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              onClick={() => setIsActive(item.name)}
              className={`flex flex-col items-center gap-1 active:opacity-50 md:gap-1.5 ${isActive === item.name ? "text-accent" : "text-subforground"}`}
            >
              <Icon className="w-full text-center md:h-7 md:w-7" />
              <p className="w-full text-center text-xs md:text-sm">
                {item.name}
              </p>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
export default memo(Navbar);
