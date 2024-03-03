import Card from "@/components/Card";
import TextArea from "@/components/TextArea";
import WorkExperienceForm from "../../../(candidateProfile)/dashboard/CandidateProfile/WorkExperience";

export default function CompanyOnboardingForm() {
  return (
    <>
      <form>
        <WorkExperienceForm />
        {/* Spacer div*/}
        <div className="h-9" />
        <Card>
          <h1 className="text-3xl font-bold">
            {"Please try uploading your Company Information"}
          </h1>
          <div className="mt-4">{"You will see the magic happen then! 2"}</div>
          {/* Spacer div*/}
          <div className="h-9" />
          <div className="space-y-12">
            <div className="border-b border-white/10 pb-12">
              <TextArea label="Label" name="name" />
            </div>
          </div>
        </Card>
      </form>
    </>
  );
}
