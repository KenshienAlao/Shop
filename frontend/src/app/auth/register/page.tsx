import { Suspense } from "react";
import RegisterPage from "./RegisterPage";

export default function Page() {
    return (
        <Suspense>
            <RegisterPage />
        </Suspense>
    );
}