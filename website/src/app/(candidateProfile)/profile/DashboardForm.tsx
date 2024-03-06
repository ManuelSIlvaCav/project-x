"use client";

import { uploadCV } from "@/app/lib/actions/uploadCV";
import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";
import UploadFile from "@/components/UploadFile";
import { useState } from "react";
import { useFormState } from "react-dom";

export default function DashboardForm() {
  const [state, dispatch] = useFormState(uploadCV, null);
  console.log({ state });

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
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  async function onSubmit() {
    const newFormData = new FormData();
    newFormData.append("email", formData.email);
    newFormData.append("cv", formData.cv as File);

    dispatch(newFormData);
  }

  return (
    <form action={onSubmit}>
      <div className="flex flex-col space-y-4">
        <TextField
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          required
          onChange={handleInputChange}
        />
        <UploadFile
          title="Upload your CV"
          fieldName="cv"
          onChange={handleInputChange}
          file={formData.cv}
        />
        <Button type="submit" variant="solid">
          {"Submit"}
        </Button>
      </div>
    </form>
  );
}
