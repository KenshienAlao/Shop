"use client"

import { useCallback, useState } from "react";
import LazyWrapper from "@/utils/lazywrapper";
import Navbar from "@/components/navbar";
import Home from "@/components/home/page";
import Mall from "@/components/mall";
import Cart from "@/components/cart";
import Account from "@/components/account/page";

export default function Dashboard() {
    const [isActive, setIsActive] = useState<string>("Home");

    const handleSetActive = useCallback((tab: string) => {
        setIsActive(tab)

    }, [])

    return (

        <div className="h-dvh flex flex-col relative">
            <LazyWrapper>
                <main className="flex-1 overflow-y-auto">
                    {isActive === "Home" && <Home />}
                    {isActive === "Mall" && <Mall />}
                    {isActive === "Cart" && <Cart />}
                    {isActive === "Me" && <Account />}
                </main>
                <Navbar isActive={isActive} setIsActive={handleSetActive} />
            </LazyWrapper>
        </div>
    )


}

