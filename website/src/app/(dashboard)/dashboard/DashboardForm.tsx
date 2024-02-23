"use client";

import { uploadCV } from "@/app/lib/actions/uploadCV";
import { Button } from "@/components/Button";
import UploadFile from "@/components/UploadFile";
import { useFormState } from "react-dom";

export default function DashboardForm() {
  const [state, dispatch] = useFormState(uploadCV, null);
  console.log({ state });
  return (
    <form
      action={dispatch}
      onChange={(e) => {
        console.log("form changed", { data: e.target });
      }}
    >
      <div className="flex flex-col space-y-4">
        <UploadFile title="Upload your CV" fieldName="upload_file" />
        <Button type="submit" variant="solid">
          {"Submit"}
        </Button>
      </div>
    </form>
  );
}
