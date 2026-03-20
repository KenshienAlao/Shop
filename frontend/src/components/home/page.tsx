import { Suspense } from "react";
import HomePage from "./HomePage";

export default function Page() {
  return (
    <Suspense>
      <HomePage />
    </Suspense>
  );
}