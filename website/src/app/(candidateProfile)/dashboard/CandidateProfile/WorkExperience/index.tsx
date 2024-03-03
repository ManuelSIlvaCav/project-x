import Skeleton from "@/components/Dashboard/Skeleton";
import { Suspense } from "react";
import SectionHeader from "./SectionHeader";
import WorkExperiences from "./WorkExperiences";

export default function WorkExperience() {
  return (
    <>
      <div className="flex flex-col gap-8">
        <SectionHeader />
        <Suspense fallback={<Skeleton />}>
          <WorkExperiences />
        </Suspense>
      </div>
    </>
  );
}
