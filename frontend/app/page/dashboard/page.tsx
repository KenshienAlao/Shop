"use client"

import { useCallback, useState } from "react";
import LazyWrapper from "@/app/utils/lazywrapper";
import Navbar from "@/app/page/components/navbar";
import Home from "@/app/page/components/home";
import Mall from "@/app/page/components/mall";
import Cart from "@/app/page/components/cart";
import Account from "@/app/page/components/account/page";
import { isatty } from "tty";


export default function Dashboard() {
    const [isActive, setIsActive] = useState<string>("Home");

    const handleSetActive = useCallback((tab: string) => {
        setIsActive(tab)

    }, [])

    return (

        <div className="h-dvh flex flex-col relative">
            <LazyWrapper>
                <main className="flex-1">
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

