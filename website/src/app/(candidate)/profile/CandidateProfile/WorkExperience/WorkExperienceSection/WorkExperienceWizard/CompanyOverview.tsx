"use client";
import { updateWorkExperience } from "@/app/lib/actions/updateWorkExperience";
import ErrorAlert from "@/components/Alerts/ErrorAlerts";
import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";
import TextArea from "@/components/TextArea";
import { FormEvent, useContext, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { WorkExperienceWizardContext } from "../context";

export default function CompanyOverview(props: {
  handleNext: (workExperienceId?: string, successMessage?: string) => void;
}) {
  const { handleNext } = props;
  const [state, dispatch] = useFormState(updateWorkExperience, null);
  const [loading, setLoading] = useState(false);
  const workExperienceWizardData = useContext(WorkExperienceWizardContext);

  async function onFormSubmit(e: FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      setLoading(true);
      const formData = new FormData(e.currentTarget);
      formData.append(
        "id",
        workExperienceWizardData.workExperienceId as string
      );
      formData.append(
        "profileId",
        workExperienceWizardData.profileId as string
      );
      dispatch(formData);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (state?.success) {
      //We want to restart the wizard
      handleNext(undefined, "Work experience added successfully");
    }
  }, [state, handleNext]);

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <div className="space-y-12">
          <div className="border-b border-white/10 pb-12 flex flex-col gap-2">
            <TextArea label="Company description" name="company_description" />
            <TextField label="Company website" name="company_website" />
            {state?.errors?.length ? (
              <ErrorAlert
                title={"Error filling experience"}
                messages={state?.errors?.map((error) => {
                  return error.message;
                })}
              />
            ) : null}
            <Button type="submit" loading={loading}>
              {"Save and continue"}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
