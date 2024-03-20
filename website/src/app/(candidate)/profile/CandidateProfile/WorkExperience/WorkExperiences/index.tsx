import { Profile, WorkExperience } from "../../interfaces/Profile";
import WorkExperiencesCard from "./WorkExperiencesCard";

type Props = {
  profile: Profile;
};

export default async function WorkExperiences(props: Props) {
  return (
    <>
      <div className="flex flex-col gap-4">
        {props?.profile?.work_experiences?.map(
          (workExperience: WorkExperience) => {
            return (
              <WorkExperiencesCard
                key={workExperience.id}
                workExperience={workExperience}
              />
            );
          }
        )}
      </div>
    </>
  );
}
