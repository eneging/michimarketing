"use client";

import { Suspense } from "react";
import SearchPage from "./SearchPage"; // mueve tu lógica aquí

export default function Page() {
  return (
    <Suspense fallback={<div>Cargando búsqueda...</div>}>
      <SearchPage />
    </Suspense>
  );
}
