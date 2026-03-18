import { Suspense } from "react";
import Dashboard from "./DashboardPage";

export default function Page() {
    return (
        <Suspense>
            <Dashboard />
        </Suspense>
    );
}