import Skeleton from "@/components/Dashboard/Skeleton";
import { Suspense } from "react";
import WorkExperienceSection from "./WorkExperienceSection";
import WorkExperiences from "./WorkExperiences";

export default function WorkExperience() {
  return (
    <>
      <div className="flex flex-col gap-8">
        <WorkExperienceSection />
        <Suspense fallback={<Skeleton />}>
          <WorkExperiences />
        </Suspense>
      </div>
    </>
  );
}
