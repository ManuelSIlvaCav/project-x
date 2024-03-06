"use client";

import Card from "@/components/Card";
import { useState } from "react";
import CompanyOverview from "./CompanyOverview";
import WorkExperienceOverviewForm from "./ExperienceOverview";
import RoleOverviewForm from "./RoleOverview";
import { WorkExperienceWizardContext } from "./context";

/* This is a 3 step wizard for creating the work experience of a candidate */
export default function WorkExperienceWizard({ open }: { open: boolean }) {
  const [step, setStep] = useState(1);
  const [workExperienceId, setWorkExperienceId] = useState<string | null>(null);

  const handleNext = (workExperienceId?: string) => {
    if (workExperienceId) {
      setWorkExperienceId(workExperienceId);
    }
    if (step === 3) {
      return setStep(1);
    }
    setStep((prev) => prev + 1);
  };

  const componentMap: Record<number, () => JSX.Element> = {
    1: () => <WorkExperienceOverviewForm handleNext={handleNext} />,
    2: () => <RoleOverviewForm handleNext={handleNext} />,
    3: () => <CompanyOverview handleNext={handleNext} />,
  };

  // We need to keep track of the work experience object
  // So we can make updates on that object from now on

  return (
    <WorkExperienceWizardContext.Provider
      value={{ workExperienceId: workExperienceId }}
    >
      <Card className={`${open ? "p-4" : "hidden"}`}>
        {componentMap[step]() as JSX.Element}
      </Card>
    </WorkExperienceWizardContext.Provider>
  );
}
