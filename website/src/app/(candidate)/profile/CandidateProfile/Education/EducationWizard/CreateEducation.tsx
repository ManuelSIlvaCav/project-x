"use client";
import { updateEducation } from "@/app/lib/actions/candidateProfile/updateEducation";
import ErrorAlert from "@/components/Alerts/ErrorAlerts";
import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";
import Select from "@/components/Select";
import TextArea from "@/components/TextArea";
import years from "@/utils/years";
import { FormEvent, useContext, useEffect } from "react";
import { useFormState } from "react-dom";
import { EducationWizardContext } from "../context";

const placeHolder = `Describe your degree, courses you took, and any other relevant information.`;

export default function CreateEducation({
  onCreate,
}: {
  onCreate: () => void;
}) {
  const educationContext = useContext(EducationWizardContext);
  const [state, dispatch] = useFormState(updateEducation, null);

  function onFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("profileId", educationContext?.profileId as string);
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
          <TextField label="Establishment name" name="schoolName" />
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold">{"Start Date"}</p>
              <div className="flex space-x-4">
                <Select name="startDateYear" options={years()} />
              </div>
            </div>
            <div className="flex flex-col gap-2 ">
              <p className="text-sm font-bold">{"End Date"}</p>
              <div className="flex space-x-4">
                <Select name="endDateYear" options={years()} />
              </div>
            </div>
          </div>
          <TextArea
            label="Degree description"
            name="description"
            placeholder={placeHolder}
            wrap={"hard"}
            cols={20}
            rows={3}
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
