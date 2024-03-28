"use client";
import { uploadCV } from "@/app/lib/actions/uploadCV";
import ErrorAlert from "@/components/Alerts/ErrorAlerts";
import UploadFile from "@/components/UploadFile";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { Profile } from "../interfaces/Profile";

type Props = {
  profile: Profile;
};

export default function UploadCVComponent(props: Props) {
  const { profile } = props;
  const [data, setData] = useState({
    cv: undefined as File | undefined,
  });

  const [state, dispatch] = useFormState(uploadCV, null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;
    if (files?.length) {
      return setData((prevFormData) => ({
        ...prevFormData,
        cv: event.target.files?.[0],
      }));
    }
  };

  useEffect(() => {
    if (data?.cv && dispatch) {
      //We call the server action to upload it
      console.log("uploading cv", data.cv);
      const formData = new FormData();
      formData.append("cv", data.cv);
      dispatch(formData);
    }
  }, [data?.cv, dispatch]);

  useEffect(() => {
    if (!state?.success) {
      setData({ cv: undefined });
      //Notify the user of the error with toaster
    }
  }, [state]);

  return (
    <div>
      <UploadFile
        fieldName="cv"
        onChange={handleInputChange}
        file={profile?.cv || data.cv}
      />
      {state ? <ErrorAlert title={"Error uploading CV"} /> : null}
    </div>
  );
}
