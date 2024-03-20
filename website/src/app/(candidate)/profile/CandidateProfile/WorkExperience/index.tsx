import getProfile from "@/app/lib/actions/getProfile";
import WorkExperienceSection from "./WorkExperienceSection";
import WorkExperiences from "./WorkExperiences";

export default async function WorkExperience() {
  const profile = await getProfile();
  return (
    <>
      <div className="flex flex-col gap-8">
        <WorkExperienceSection profile={profile} />
        <WorkExperiences profile={profile} />
      </div>
    </>
  );
}
