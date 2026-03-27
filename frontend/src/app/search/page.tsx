import { Suspense } from "react";
import SearchPage from "./SearchPage";
import Loading from "@/components/Loading";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <SearchPage />
    </Suspense>
  );
}