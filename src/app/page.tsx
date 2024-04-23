"use client";

import { Suspense } from "react";
import Laureates from "./components/Laureates";

export default function Home() {
  return (
    <main className="bg-gray-100 mx-auto px-4 sm:px-6">
      <Suspense>
        <Laureates />
      </Suspense>
    </main>
  );
}
