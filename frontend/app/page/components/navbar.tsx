import { Home, ShoppingBag, ShoppingCart, User2 } from "lucide-react";
import { memo } from "react";

interface NavbarProps {
    activeTab: (tab: string) => void
}

function Navbar({ activeTab }: NavbarProps) {

    console.log("navbar rendered")

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
        }
    ];

    return (
        <>
            <nav className="sticky border">
                <div className="flex justify-around py-5">
                    {tab.map((item) => {
                        const Icon = item.icon


                        return (
                            <button key={item.name}
                                onClick={() => activeTab(item.name)}
                                className="flex flex-col items-center hover:opacity-50 ">
                                <Icon className="w-full text-center" />
                                <p className="w-full text-center">{item.name}</p>
                            </button>
                        );
                    })}
                </div>
            </nav>
        </>
    );
}
export default memo(Navbar)