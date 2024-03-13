import getProfile from "@/app/lib/actions/getProfile";
import Skeleton from "@/components/Dashboard/Skeleton";
import { Suspense } from "react";
import UploadCVComponent from "./UploadCVComponent";

async function InnerUploadCV() {
  const profile = await getProfile();
  return <UploadCVComponent profile={profile} />;
}

export default async function UploadCV() {
  return (
    <div>
      <div className="pb-2">
        <h3 className="text-2xl font-semibold leading-6 text-gray-900">
          Upload your CV
        </h3>
        <p className="mt-2 max-w-4xl text-sm text-gray-500 font-light">
          Upload your CV to get started.
        </p>
      </div>
      <Suspense fallback={<Skeleton />}>
        <InnerUploadCV />
      </Suspense>
    </div>
  );
}
