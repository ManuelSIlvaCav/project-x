import Skeleton from "@/components/Dashboard/Skeleton";
import { Suspense } from "react";
import CandidateTable from "./CandidateTable";

export default function CandidateList() {
  return (
    <div>
      <Suspense fallback={<Skeleton />}>
        <CandidateTable />
      </Suspense>
      {/* <StackedList options={candidatesProfiles} href="/profiles" /> */}
    </div>
  );
}
