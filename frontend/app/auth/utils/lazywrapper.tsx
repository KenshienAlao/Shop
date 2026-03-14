import { ReactNode, Suspense } from "react";

interface LazyWrapperProps {
    children: ReactNode,
    fallback?: ReactNode
}

export default function LazyWrapper({ children, fallback = null }: LazyWrapperProps) {
    return <Suspense fallback={fallback}>{children}</Suspense>
}