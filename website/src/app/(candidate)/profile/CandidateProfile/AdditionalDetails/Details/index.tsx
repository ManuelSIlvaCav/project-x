import { Education, Profile } from "../../interfaces/Profile";

type Props = {
  profile: Profile;
};

export default async function PastEducation(props: Props) {
  const { profile } = props;

  return (
    <>
      <div className="flex flex-col gap-4">
        {profile?.education?.map((education: Education) => {
          return <></>;
        })}
      </div>
    </>
  );
}
