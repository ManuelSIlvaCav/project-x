"use client";

import CircularPlusButton from "@/components/CircularPlusButton";
import { useState } from "react";

export default function EducationSection() {
  const [quickFormOpen, setQuickFormOpen] = useState(false);

  return (
    <div className="flex justify-between">
      <div className="pb-2">
        <h3 className="text-2xl font-semibold leading-6 text-gray-900">
          Education
        </h3>
        <p className="mt-2 max-w-4xl text-sm text-gray-500 font-light">
          Add your education details.
        </p>
      </div>
      <div className="flex flex-col ">
        <CircularPlusButton
          onClick={() => {
            setQuickFormOpen(!quickFormOpen);
          }}
        />
      </div>
    </div>
  );
}
