import Card from "@/components/Card";
import ProfileInfo from "./ProfileInfo";
import Toggle from "./Toggle";

export default function MainBody() {
  return (
    <div>
      <Card className="p-6">
        <Toggle />
        <ProfileInfo />
      </Card>
    </div>
  );
}
