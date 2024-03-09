"use client";
import { updateWorkExperience } from "@/app/lib/actions/updateWorkExperience";
import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";
import Select from "@/components/Select";
import months from "@/utils/months";
import years from "@/utils/years";
import { FormEvent, useEffect } from "react";
import { useFormState } from "react-dom";

export default function WorkExperienceOverviewForm(props: {
  handleNext: (workExperienceId?: string) => void;
}) {
  const { handleNext } = props;
  const [state, dispatch] = useFormState(updateWorkExperience, null);

  async function onFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    dispatch(formData);
  }

  useEffect(() => {
    if (state) {
      handleNext(state);
    }
  }, [state, handleNext]);

  return (
    <form onSubmit={onFormSubmit}>
      <div className="space-y-12">
        <div className="border-b border-white/10 pb-12 flex flex-col gap-4">
          <TextField label="Role title" name="role" />
          <TextField label="Company name" name="company" />

          <div className="flex flex-col gap-2">
            <p className="text-sm font-bold">{"Start Date"}</p>
            <div className="flex space-x-4">
              <Select name="startDateMonth" label="Month" options={months()} />
              <Select name="startDateYear" label="Year" options={years()} />
            </div>
          </div>
          {/* Spacer div*/}
          <div className="h-2" />
          <div className="flex flex-col gap-2">
            <p className="text-sm font-bold">{"End Date"}</p>
            <div className="flex space-x-4">
              <Select name="endDateMonth" label="Month" options={months()} />
              <Select name="endDateYear" label="Year" options={years()} />
            </div>
          </div>
          <div className="h-2" />
          <Button type="submit">{"Save and continue"}</Button>
        </div>
      </div>
    </form>
  );
}
