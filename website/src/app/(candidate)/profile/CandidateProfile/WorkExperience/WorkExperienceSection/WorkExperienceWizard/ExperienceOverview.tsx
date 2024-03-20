"use client";
import { updateWorkExperience } from "@/app/lib/actions/updateWorkExperience";
import ErrorAlert from "@/components/Alerts/ErrorAlerts";
import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";
import Select from "@/components/Select";
import months from "@/utils/months";
import years from "@/utils/years";
import { FormEvent, useContext, useEffect } from "react";
import { useFormState } from "react-dom";
import { WorkExperienceWizardContext } from "../context";

export default function WorkExperienceOverviewForm(props: {
  handleNext: (workExperienceId?: string) => void;
}) {
  const { handleNext } = props;
  const [state, dispatch] = useFormState(updateWorkExperience, null);

  const workExperienceWizardData = useContext(WorkExperienceWizardContext);

  async function onFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValid = areDateYearsAndMonthsValid(formData);
    console.log("formValid", formValid);
    formData.append("profileId", workExperienceWizardData?.profileId as string);
    dispatch(formData);
  }

  function areDateYearsAndMonthsValid(formData: FormData) {
    const startDateYear = formData.get("startDateYear") as string;
    const startDateMonth = formData.get("startDateMonth") as string;
    const endDateYear = formData.get("endDateYear") as string;
    const endDateMonth = formData.get("endDateMonth") as string;

    if (startDateYear && startDateMonth && endDateYear && endDateMonth) {
      //Start Date have to be before End Date
      return true;
    }
    return false;
  }

  useEffect(() => {
    if (state?.success && state?.id) {
      handleNext(state.id);
    }
  }, [state, handleNext]);

  return (
    <form onSubmit={onFormSubmit}>
      <div className="space-y-12">
        <div className="border-b border-white/10 pb-12 flex flex-col gap-4">
          <TextField label="Role title" name="role" />
          <TextField label="Company name" name="company" />

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold">{"Start Date"}</p>
              <div className="flex space-x-4">
                <Select name="startDateYear" label="Year" options={years()} />
                <Select
                  name="startDateMonth"
                  label="Month"
                  options={months()}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 ">
              <p className="text-sm font-bold">{"End Date"}</p>
              <div className="flex space-x-4">
                <Select name="endDateYear" label="Year" options={years()} />
                <Select name="endDateMonth" label="Month" options={months()} />
              </div>
            </div>
          </div>
          <div className="h-2" />
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
