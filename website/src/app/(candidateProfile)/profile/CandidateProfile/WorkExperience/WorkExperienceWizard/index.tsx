"use client";

import Card from "@/components/Card";
import NotificationToast from "@/components/NotificationToast";
import { useState } from "react";
import toast from "react-hot-toast";
import CompanyOverview from "./CompanyOverview";
import WorkExperienceOverviewForm from "./ExperienceOverview";
import RoleOverviewForm from "./RoleOverview";

/* This is a 3 step wizard for creating the work experience of a candidate */
export default function WorkExperienceWizard({
  open,
  setWorkExperienceId,
  setOpen,
}: {
  open: boolean;
  setWorkExperienceId: (id: string) => void;
  setOpen: (open: boolean) => void;
}) {
  const [step, setStep] = useState(1);

  const handleNext = (workExperienceId?: string, successMessage?: string) => {
    if (workExperienceId) {
      setWorkExperienceId(workExperienceId);
    }
    if (step === 3) {
      toast.custom((t) => {
        return <NotificationToast t={t} title={successMessage ?? "Sucess!"} />;
      });
      setStep(1);
      return setOpen(false);
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
    <Card className={`${open ? "p-4" : "hidden"}`}>
      {componentMap[step]() as JSX.Element}
    </Card>
  );
}
