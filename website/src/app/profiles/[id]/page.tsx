import ProfileView from "./ProfileView";

type Props = {
  params: {
    id: string;
  };
};

export default function ProfileDetailpage(props: Props) {
  console.log(props.params);
  //TODO get profile information based on the id

  return (
    <div>
      <ProfileView profileId={props.params?.id} />
    </div>
  );
}
