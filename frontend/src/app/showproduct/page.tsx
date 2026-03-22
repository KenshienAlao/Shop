import { Suspense } from "react";
import ShowProductPage from "./ShowProductPage";

export default function Page() {
    return (
        <Suspense>
            <ShowProductPage />
        </Suspense>
    );
}