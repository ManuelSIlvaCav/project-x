"use client";
import CircularPlusButton from "@/components/CircularPlusButton";
import { useState } from "react";
import WorkExperienceWizard from "./WorkExperienceWizard";

export default function WorkExperienceSection() {
  const [quickFormOpen, setQuickFormOpen] = useState(false);
  return (
    <>
      <div className="flex justify-between">
        <div className="pb-2">
          <h3 className="text-2xl font-semibold leading-6 text-gray-900">
            Work Experience
          </h3>
          <p className="mt-2 max-w-4xl text-sm text-gray-500 font-light">
            Describe at least 3 of your work experiences, each with 3 or more
            bullet points.
          </p>
        </div>
        <div className="flex flex-col ">
          <CircularPlusButton
            onClick={() => {
              console.log("adding new quick form");
              setQuickFormOpen(!quickFormOpen);
            }}
          />
        </div>
      </div>
      <WorkExperienceWizard open={quickFormOpen} />
    </>
  );
}
