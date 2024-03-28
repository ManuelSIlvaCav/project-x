"use client";
import { updateWorkExperience } from "@/app/lib/actions/candidateProfile/updateWorkExperience";
import ErrorAlert from "@/components/Alerts/ErrorAlerts";
import { Button } from "@/components/Button";
import Checkboxes from "@/components/Checkboxes";
import { TextField } from "@/components/Fields";
import Select from "@/components/Select";
import months, { getMonthObject } from "@/utils/months";
import years, { getYearObject } from "@/utils/years";
import { FormEvent, useContext, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { WorkExperience } from "../../../interfaces/Profile";
import { WorkExperienceWizardContext } from "../context";

export default function WorkExperienceOverviewForm(props: {
  handleNext: (workExperience?: WorkExperience) => void;
}) {
  const { handleNext } = props;
  const [state, dispatch] = useFormState(updateWorkExperience, null);

  const workExperienceWizardContext = useContext(WorkExperienceWizardContext);

  const [formData, setFormData] = useState<WorkExperience | null>(
    workExperienceWizardContext.workExperience ?? null
  );

  const [errors, setErrors] = useState<
    { fieldName?: string; message: string }[]
  >([]);

  useEffect(() => {
    setFormData(workExperienceWizardContext.workExperience);
  }, [workExperienceWizardContext.workExperience]);

  useEffect(() => {
    if (state?.success && state.workExperience) {
      return handleNext(state.workExperience);
    }
    if (state?.errors?.length) {
      return setErrors(
        state.errors.map((error) => {
          return {
            message: error.message,
          };
        })
      );
    }
  }, [state, handleNext]);

  async function onFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValid = areDateYearsAndMonthsValid(formData);
    if (formValid) {
      return setErrors([{ message: formValid }]);
    }

    formData.append(
      "profileId",
      workExperienceWizardContext?.profileId as string
    );
    //Append the id of the work experience if it exists
    //We can be on first creation or editing
    if (workExperienceWizardContext?.workExperience?.id) {
      formData.append(
        "id",
        workExperienceWizardContext?.workExperience?.id as string
      );
    }
    dispatch(formData);
  }

  function areDateYearsAndMonthsValid(formData: FormData): string | null {
    const startDateMonth = formData.get("startDateMonth[id]") as string;
    const startDateYear = formData.get("startDateYear[id]") as string;
    const endDateMonth = formData.get("endDateMonth[id]") as string;
    const endDateYear = formData.get("endDateYear[id]") as string;
    const currentJob = formData.get("currentJob") as string;

    if (startDateYear && startDateMonth && endDateYear && endDateMonth) {
      //Start Date have to be before End Date
      if (parseInt(startDateYear) > parseInt(endDateYear)) {
        return "Start year is after end year";
      }
      //Same year but start month is after end month
      if (
        parseInt(startDateYear) === parseInt(endDateYear) &&
        parseInt(startDateMonth) > parseInt(endDateMonth)
      ) {
        return "Start month is after end month";
      }

      return null;
    }
    return "Please fill all the date fields";
  }

  console.log("formData", { workExperienceWizardContext, formData });

  return (
    <form onSubmit={onFormSubmit}>
      <div className="space-y-12">
        <div className="border-b border-white/10 pb-12 flex flex-col gap-4">
          <TextField
            label="Role title"
            name="role"
            defaultValue={formData?.role}
          />
          <TextField
            label="Company name"
            name="company"
            defaultValue={formData?.company}
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2 ">
              <p className="text-sm font-bold">{"End Date"}</p>
              <div className="flex flex-col gap-4">
                <div className="flex space-x-4">
                  <Select
                    name="endDateYear"
                    label="Year"
                    options={years()}
                    defaultValue={getYearObject(formData?.end_date_year)}
                  />
                  <Select
                    name="endDateMonth"
                    label="Month"
                    options={months()}
                    defaultValue={getMonthObject(formData?.end_date_month)}
                  />
                </div>
                <div>
                  <Checkboxes
                    label={"I work here"}
                    options={[
                      { id: "1", label: "I work here", name: "currentJob" },
                    ]}
                    onChange={(e) => {}}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold">{"Start Date"}</p>
              <div className="flex space-x-4">
                <Select
                  name="startDateYear"
                  label="Year"
                  options={years()}
                  defaultValue={getYearObject(formData?.start_date_year)}
                />
                <Select
                  name="startDateMonth"
                  label="Month"
                  options={months()}
                  defaultValue={getMonthObject(formData?.start_date_month)}
                />
              </div>
            </div>
          </div>
          <div className="h-2" />
          {errors?.length ? (
            <ErrorAlert
              title={"Error filling experience"}
              messages={errors?.map((error) => {
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
