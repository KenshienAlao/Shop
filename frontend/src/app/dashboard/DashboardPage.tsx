"use client"

import { useCallback, useState, useTransition } from "react";
import LazyWrapper from "@/utils/lazywrapper";
import Navbar from "@/components/navbar";
import Home from "@/components/home/page";
import Cart from "@/components/cart/page";
import Account from "@/components/account/page";
import Loading from "@/components/Loading";

export default function Dashboard() {
    const [isActive, setIsActive] = useState<string>("Home");
    const [isPending, startTransition] = useTransition();

    const handleSetActive = useCallback((tab: string) => {
        startTransition(() => {
            setIsActive(tab);
        });
    }, [])

    return (
        <div className="h-dvh flex flex-col relative mx-auto w-full">
            {isPending && <Loading />}
            <LazyWrapper>
                <main className="flex-1 overflow-y-auto">
                    {isActive === "Home" && <Home />}
                    {isActive === "Cart" && <Cart />}
                    {isActive === "Me" && <Account />}
                </main>
                <Navbar isActive={isActive} setIsActive={handleSetActive} />
            </LazyWrapper>
        </div>
    )
}

