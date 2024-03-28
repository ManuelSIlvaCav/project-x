import getProfile from "@/app/lib/actions/getProfile";
import DetailsSection from "./DetailsSection";

export default async function AdditionalDetails() {
  const profile = await getProfile();
  return (
    <>
      <div className="flex flex-col gap-8">
        <DetailsSection profile={profile} />
      </div>
    </>
  );
}
