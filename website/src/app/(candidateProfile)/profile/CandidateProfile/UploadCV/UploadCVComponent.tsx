"use client";
import UploadFile from "@/components/UploadFile";
import { useState } from "react";

type Props = {
  profile: any;
};

export default function UploadCVComponent(props: Props) {
  const { profile } = props;
  console.log("profile", profile);
  const [formData, setFormData] = useState({
    cv: undefined as File | undefined,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;
    if (files?.length) {
      console.log("going in files", { name, value, files, event });
      return setFormData((prevFormData) => ({
        ...prevFormData,
        cv: event.target.files?.[0],
      }));
    }
  };

  return (
    <UploadFile
      fieldName="cv"
      onChange={handleInputChange}
      file={formData.cv}
    />
  );
}
