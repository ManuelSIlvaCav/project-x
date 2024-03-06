"use client";

import UploadFile from "@/components/UploadFile";
import { useState } from "react";

export default function UploadCV() {
  const [formData, setFormData] = useState({
    email: "",
    cv: undefined as File | undefined,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;
    if (files?.length) {
      console.log("going in files", { name, value, files });
      return setFormData((prevFormData) => ({
        ...prevFormData,
        cv: event.target.files?.[0],
      }));
    }
  };

  return (
    <div>
      <div className="pb-2">
        <h3 className="text-2xl font-semibold leading-6 text-gray-900">
          Upload your CV
        </h3>
        <p className="mt-2 max-w-4xl text-sm text-gray-500 font-light">
          Upload your CV to get started.
        </p>
      </div>
      <UploadFile
        fieldName="cv"
        onChange={handleInputChange}
        file={formData.cv}
      />
    </div>
  );
}
