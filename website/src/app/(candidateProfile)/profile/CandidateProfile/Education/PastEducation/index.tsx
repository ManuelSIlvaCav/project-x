import getProfile from "@/app/lib/actions/getProfile";
import { WorkExperience } from "../../WorkExperience/WorkExperiences";
import WorkExperiencesCard from "../../WorkExperience/WorkExperiences/WorkExperiencesCard";

export default async function PastEducation() {
  const profile = await getProfile();
  return (
    <>
      <div className="flex flex-col gap-4">
        {profile?.workExperiences?.map((workExperience: WorkExperience) => {
          return (
            <WorkExperiencesCard
              key={workExperience.id}
              workExperience={workExperience}
            />
          );
        })}
      </div>
    </>
  );
}
