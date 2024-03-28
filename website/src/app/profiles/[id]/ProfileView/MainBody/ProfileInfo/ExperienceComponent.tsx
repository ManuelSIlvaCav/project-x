import WorkExperiences from "@/app/(candidate)/profile/CandidateProfile/WorkExperience/WorkExperiences";
import getProfile from "@/app/lib/actions/getProfile";

export default async function ExperienceComponent() {
  const profile = await getProfile("6600857902d6d0c53e655d12");
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Experience</h1>
      <WorkExperiences profile={profile} />
    </div>
  );
}
