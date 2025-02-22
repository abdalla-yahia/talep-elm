import { lazy, Suspense } from "react";

const MoshafPage = lazy(() => import("@/Moshaf/MoshafPage"));

export default function Moshaf() {

  return (
    <>
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <MoshafPage />
      </Suspense>
    </div>
    </>
  )
}
