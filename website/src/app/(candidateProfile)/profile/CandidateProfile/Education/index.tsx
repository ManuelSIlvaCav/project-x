import Skeleton from "@/components/Dashboard/Skeleton";
import { Suspense } from "react";
import EducationSection from "./EducationSection";
import PastEducation from "./PastEducation";

export default function Education() {
  return (
    <>
      <div className="flex flex-col gap-8">
        <EducationSection />
        <Suspense fallback={<Skeleton />}>
          <PastEducation />
        </Suspense>
      </div>
    </>
  );
}
