"use client"

import { memo, useState } from "react";
import LazyWrapper from "@/app/auth/utils/lazywrapper";
import Navbar from "@/app/page/components/navbar";
import Home from "@/app/page/components/home";
import Mall from "@/app/page/components/mall";
import Cart from "@/app/page/components/cart";
import Account from "@/app/page/components/account";


export default function Dashboard() {
    const [isActive, setIsActive] = useState<string>("Home");

    return (
        <LazyWrapper>
            <main>
                {isActive === "Home" && <Home />}
                {isActive === "Mall" && <Mall />}
                {isActive === "Cart" && <Cart />}
                {isActive === "Me" && <Account />}

            </main>
            <Navbar activeTab={setIsActive} />
        </LazyWrapper>
    )
}

