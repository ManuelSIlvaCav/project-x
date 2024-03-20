import getProfile from "@/app/lib/actions/getProfile";
import EducationSection from "./EducationSection";
import PastEducation from "./PastEducation";

export default async function Education() {
  const profile = await getProfile();
  return (
    <>
      <div className="flex flex-col gap-8">
        <EducationSection profile={profile} />
        <PastEducation profile={profile} />
      </div>
    </>
  );
}
