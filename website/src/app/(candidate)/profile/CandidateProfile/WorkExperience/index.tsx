import getProfile from "@/app/lib/actions/getProfile";
import WorkExperienceWrapper from "./WorkExperienceWrapper";

export default async function WorkExperience() {
  const profile = await getProfile();
  return (
    <>
      <WorkExperienceWrapper profile={profile} />
    </>
  );
}
