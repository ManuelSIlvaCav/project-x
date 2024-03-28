import EducationComponent from "./EducationComponent";
import ExperienceComponent from "./ExperienceComponent";

export default function ProfileInfo() {
  return (
    <div className="flex flex-col gap-4 pt-2">
      <ExperienceComponent />
      <EducationComponent />
    </div>
  );
}
