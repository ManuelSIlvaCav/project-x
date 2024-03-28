import Skeleton from "@/components/Dashboard/Skeleton";
import { Suspense } from "react";
import AdditionalDetails from "./AdditionalDetails";
import Education from "./Education";
import UploadCV from "./UploadCV";
import WorkExperience from "./WorkExperience";

type Props = {};

export default function CandidateProfileWrapper(props: Props) {
  return (
    <div className="flex flex-col gap-16">
      <UploadCV />
      <Suspense fallback={<Skeleton />}>
        <WorkExperience />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <Education />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <AdditionalDetails />
      </Suspense>
    </div>
  );
}
