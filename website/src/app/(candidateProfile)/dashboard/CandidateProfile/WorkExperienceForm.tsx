"use client";
import { updateWorkExperience } from "@/app/lib/actions/updateWorkExperience";
import { Button } from "@/components/Button";
import Card from "@/components/Card";
import CircularPlusButton from "@/components/CircularPlusButton";
import { TextField } from "@/components/Fields";
import Select from "@/components/Select";
import TextArea from "@/components/TextArea";
import months from "@/utils/months";
import years from "@/utils/years";
import { FormEvent, useState } from "react";
import { useFormState } from "react-dom";

function CompaneOverviewForm() {
  return (
    <>
      <form>
        <div className="space-y-12">
          <div className="border-b border-white/10 pb-12 flex flex-col gap-2">
            <TextArea label="Company description" name="company_description" />
            <TextField label="Company website" name="company_website" />

            <Button type="submit">{"Save and continue"}</Button>
          </div>
        </div>
      </form>
    </>
  );
}

function RoleOverviewForm() {
  return (
    <>
      <form>
        <div className="space-y-12">
          <div className="border-b border-white/10 pb-12 flex flex-col gap-2">
            <TextArea label="Role description" name="role_description" />

            <Button type="submit">{"Save and continue"}</Button>
          </div>
        </div>
      </form>
    </>
  );
}

function WorkExperienceOverviewForm() {
  const [state, dispatch] = useFormState(updateWorkExperience, null);
  console.log({ workState: state });

  async function onFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("form submitted", { e });
    const formData = new FormData(e.currentTarget);
    dispatch(formData);
  }

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

{
  /* This is a 3 step wizard for creating the work experience of a candidate */
}
function WorkExperienceWizard({ open }: { open: boolean }) {
  return (
    <>
      <Card className={`${open ? "" : "hidden"}`}>
        <WorkExperienceOverviewForm />
        <RoleOverviewForm />
        <CompaneOverviewForm />
      </Card>
    </>
  );
}

export default function WorkExperienceForm() {
  const [quickFormOpen, setQuickFormOpen] = useState(false);
  return (
    <>
      <div className="flex justify-between">
        <div>
          <h3 className="text-3xl font-bold">{"Work Experience"}</h3>
          <p className="italic font-light">
            {
              "Describe at least 3 of your work experiences, each with 3 or more bullet points."
            }
          </p>
        </div>
        <div className="flex flex-col r">
          <CircularPlusButton
            onClick={() => {
              console.log("adding new quick form");
              setQuickFormOpen(!quickFormOpen);
            }}
          />
        </div>
      </div>
      {/* Spacer div*/}
      <div className="h-4" />
      <WorkExperienceWizard open={quickFormOpen} />

      <Card>
        <p className="italic font-light">
          {
            "Describe at least 3 of your work experiences, each with 3 or more bullet points."
          }
        </p>

        <div className="space-y-12">
          <div className="border-b border-white/10 pb-12">
            <TextArea label="Label" name="name" />
          </div>
        </div>
      </Card>
    </>
  );
}
