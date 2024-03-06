import Education from "./Education";
import UploadCV from "./UploadCV";
import WorkExperience from "./WorkExperience";

export default async function CandidateProfile() {
  return (
    <div className="flex flex-col gap-8">
      <UploadCV />
      <WorkExperience />
      <Education />
    </div>
  );
}
