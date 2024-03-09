import Education from "./Education";
import UploadCV from "./UploadCV";
import WorkExperience from "./WorkExperience";

export default function CandidateProfile() {
  return (
    <div className="flex flex-col gap-16">
      <UploadCV />
      <WorkExperience />
      <Education />
    </div>
  );
}
