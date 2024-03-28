"use client";

import { useState } from "react";
import { Profile, WorkExperience } from "../interfaces/Profile";
import WorkExperienceSection from "./WorkExperienceSection";
import { WorkExperienceWizardContext } from "./WorkExperienceSection/context";
import WorkExperiences from "./WorkExperiences";

type Props = {
  profile: Profile;
};

export default function WorkExperienceWrapper(props: Props) {
  const [quickFormOpen, setQuickFormOpen] = useState(false);

  const [workExperience, setWorkExperience] = useState<WorkExperience | null>(
    null
  );

  return (
    <WorkExperienceWizardContext.Provider
      value={{
        profileId: props.profile?.id,
        formOpen: quickFormOpen,
        setFormOpen: setQuickFormOpen,
        setWorkExperience: setWorkExperience,
        workExperience: workExperience,
      }}
    >
      <>
        <div className="flex flex-col gap-8">
          <WorkExperienceSection profile={props.profile} />
          <WorkExperiences profile={props.profile} canEdit={true} />
        </div>
      </>
    </WorkExperienceWizardContext.Provider>
  );
}
