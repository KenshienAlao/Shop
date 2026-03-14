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
        name: "Mall",
        icon: ShoppingBag,
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
        <nav className="container-shadow sticky">
            <div className="flex justify-around py-3">
                {tab.map((item) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.name}
                            onClick={() => setIsActive(item.name)}
                            className={`flex flex-col items-center gap-1 active:opacity-50 ${isActive === item.name ? "text-accent" : "text-subforground"}`}
                        >
                            <Icon className="w-full text-center" />
                            <p className="w-full text-center">{item.name}</p>
                        </button>

                    );
                })}
            </div>
        </nav>
    );
}
export default memo(Navbar);
