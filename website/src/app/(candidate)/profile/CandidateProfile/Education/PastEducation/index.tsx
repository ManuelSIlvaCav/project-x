import { Education, Profile } from "../../interfaces/Profile";
import EducationCard from "./EducationCard";

type Props = {
  profile: Profile;
};

export default async function PastEducation(props: Props) {
  const { profile } = props;

  return (
    <>
      <div className="flex flex-col gap-4">
        {profile?.education?.map((education: Education) => {
          return <EducationCard key={education.id} education={education} />;
        })}
      </div>
    </>
  );
}
