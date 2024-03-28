"use client";

import Card from "@/components/Card";
import NotificationToast from "@/components/NotificationToast";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { WorkExperience } from "../../../interfaces/Profile";
import { WorkExperienceWizardContext } from "../context";
import CompanyOverview from "./CompanyOverview";
import DeleteWorkExperience from "./DeleteWorkExperience";
import WorkExperienceOverviewForm from "./ExperienceOverview";
import RoleOverviewForm from "./RoleOverview";

/* This is a 3 step wizard for creating the work experience of a candidate */
export default function WorkExperienceWizard() {
  const workExperienceContext = useContext(WorkExperienceWizardContext);
  const [step, setStep] = useState(1);

  const handleNext = (
    workExperience?: WorkExperience,
    successMessage?: string
  ) => {
    if (workExperience) {
      //workExperienceContext.setWorkExperienceId(workExperienceId);
      workExperienceContext.setWorkExperience(workExperience);
    }
    if (step === 3) {
      toast.custom((t) => {
        return <NotificationToast t={t} title={successMessage ?? "Sucess!"} />;
      });
      workExperienceContext.setWorkExperience(null);
      setStep(1);
      return workExperienceContext.setFormOpen(false);
    }
    setStep((prev) => prev + 1);
  };

  const componentMap: Record<number, () => JSX.Element> = {
    1: () => <WorkExperienceOverviewForm handleNext={handleNext} />,
    2: () => <RoleOverviewForm handleNext={handleNext} />,
    3: () => <CompanyOverview handleNext={handleNext} />,
  };

  useEffect(() => {
    if (workExperienceContext.workExperience === null && step !== 1) {
      setStep(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workExperienceContext?.workExperience?.id]);

  return (
    <section id="work-experience">
      <Card className={`${workExperienceContext.formOpen ? "p-4" : "hidden"}`}>
        <DeleteWorkExperience />
        {componentMap[step]() as JSX.Element}
      </Card>
    </section>
  );
}
