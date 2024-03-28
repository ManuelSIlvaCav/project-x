import MainBody from "./MainBody";
import MainHeaderCard from "./MainHeaderCard";

export default function ProfileView({ profileId }: { profileId: string }) {
  return (
    <div>
      <MainHeaderCard />
      <MainBody />
    </div>
  );
}
