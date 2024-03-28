"use client";
import CircularPlusButton from "@/components/CircularPlusButton";
import { useContext } from "react";
import { Profile } from "../../interfaces/Profile";
import WorkExperienceWizard from "./WorkExperienceWizard";
import { WorkExperienceWizardContext } from "./context";

type Props = {
  profile: Profile;
};

export default function WorkExperienceSection(props: Props) {
  const workExperienceContext = useContext(WorkExperienceWizardContext);

  return (
    <>
      <div className="flex justify-between">
        <div className="pb-2">
          <span className="text-2xl font-semibold leading-6 text-gray-900">
            Work Experience
          </span>
          <p className="mt-2 max-w-4xl text-sm text-gray-500 font-light">
            Describe at least 3 of your work experiences, each with 3 or more
            bullet points.
          </p>
        </div>
        <div className="flex flex-col ">
          <CircularPlusButton
            onClick={() => {
              //We clean anything that was left in the form
              workExperienceContext.setWorkExperience(null);
              workExperienceContext.setFormOpen(
                !workExperienceContext.formOpen
              );
            }}
          />
        </div>
      </div>
      <WorkExperienceWizard />
    </>
  );
}
