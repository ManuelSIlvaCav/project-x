"use client";
import { updateEducation } from "@/app/lib/actions/candidateProfile/updateEducation";
import ErrorAlert from "@/components/Alerts/ErrorAlerts";
import { Button } from "@/components/Button";
import CustomSelect from "@/components/CustomSelect";
import { TextField } from "@/components/Fields";
import { FormEvent, useContext, useEffect } from "react";
import { useFormState } from "react-dom";
import { DetailsWizardContext } from "../context";

const placeHolder = `Describe your degree, courses you took, and any other relevant information.`;

export default function CreateDetails({ onCreate }: { onCreate: () => void }) {
  const detailsContext = useContext(DetailsWizardContext);
  const [state, dispatch] = useFormState(updateEducation, null);

  function onFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("profileId", detailsContext?.profileId as string);
    dispatch(formData);
  }

  useEffect(() => {
    if (state?.success) {
      onCreate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.success]);

  return (
    <form onSubmit={onFormSubmit}>
      <div className="space-y-12">
        <div className="border-b border-white/10 pb-12 flex flex-col gap-4">
          <TextField label="Phone number" name="phone" />
          <CustomSelect
            label="Visa status"
            name="visaStatus"
            options={[
              { id: "1", label: "EU" },
              { id: "2", label: "UK" },
              { id: "3", label: "US" },
            ]}
            multiple={true}
          />
          <CustomSelect
            label="Languages"
            name="languages"
            options={[
              { id: "1", label: "English" },
              { id: "2", label: "Spanish" },
              { id: "3", label: "Mandarin" },
            ]}
            multiple={true}
          />
          {state?.errors?.length ? (
            <ErrorAlert
              title={"Error filling experience"}
              messages={state?.errors?.map((error) => {
                return error.message;
              })}
            />
          ) : null}
          <Button type="submit">{"Save and continue"}</Button>
        </div>
      </div>
    </form>
  );
}
