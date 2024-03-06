"use client";
import { updateWorkExperience } from "@/app/lib/actions/updateWorkExperience";
import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";
import TextArea from "@/components/TextArea";
import { FormEvent, useContext, useEffect } from "react";
import { useFormState } from "react-dom";
import { WorkExperienceWizardContext } from "./context";

export default function CompanyOverview(props: {
  handleNext: (workExperienceId?: string) => void;
}) {
  const { handleNext } = props;
  const [state, dispatch] = useFormState(updateWorkExperience, null);
  const workExperienceWizardData = useContext(WorkExperienceWizardContext);

  async function onFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("id", workExperienceWizardData.workExperienceId as string);
    dispatch(formData);
  }

  useEffect(() => {
    if (state) {
      handleNext(state);
    }
  }, [state, handleNext]);

  return (
    <>
      <form onSubmit={onFormSubmit}>
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
