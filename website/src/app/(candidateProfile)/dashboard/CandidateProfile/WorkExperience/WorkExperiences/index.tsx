import getProfile from "@/app/lib/actions/getProfile";
import WorkExperiencesCard from "./WorkExperiencesCard";

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  startDateMonth: string;
  startDateYear: string;
  endDateYear: string;
  endDateMonth: string;
  descriptions: { value: string }[];
}

export default async function WorkExperiences() {
  const profile = await getProfile();
  console.log("proifile in works", { profile });
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
