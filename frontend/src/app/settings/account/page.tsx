import { Suspense } from "react";
import AccountPage from "./AccountPage";
import Loading from "@/components/Loading";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <AccountPage />
    </Suspense>
  );
}