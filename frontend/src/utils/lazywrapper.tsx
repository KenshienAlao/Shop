import Loading from "@/components/Loading";
import { ReactNode, Suspense } from "react";

interface LazyWrapperProps {
    children: ReactNode,
    fallback?: ReactNode
}

export default function LazyWrapper({ children, fallback = <Loading /> }: LazyWrapperProps) {
    return <Suspense fallback={fallback}>{children}</Suspense>
}