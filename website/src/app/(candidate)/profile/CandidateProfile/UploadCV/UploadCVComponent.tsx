"use client";
import UploadFile from "@/components/UploadFile";
import { useEffect, useState } from "react";

type Props = {
  profile: any;
};

export default function UploadCVComponent(props: Props) {
  const { profile } = props;
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

  useEffect(() => {
    if (formData?.cv) {
      //We call the server action to upload it
      console.log("uploading cv", formData.cv);
    }
  }, [formData?.cv]);

  console.log("formData", formData);

  return (
    <UploadFile
      fieldName="cv"
      onChange={handleInputChange}
      file={formData.cv}
    />
  );
}
