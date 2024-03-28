import { updateWorkExperience } from "@/app/lib/actions/candidateProfile/updateWorkExperience";
import ErrorAlert from "@/components/Alerts/ErrorAlerts";
import { Button } from "@/components/Button";
import TextArea from "@/components/TextArea";
import { FormEvent, useContext, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { WorkExperience } from "../../../interfaces/Profile";
import { WorkExperienceWizardContext } from "../context";

enum CharCodeEnum {
  SPACE = 32,
  NEWLINE = 10,
  TAB = 9,
  CR = 13,
  BULLET = 8226,
}

const bullet = "\u2022";
const bulletWithSpace = `${bullet} `;

export default function RoleOverviewForm(props: {
  handleNext: (workExperience: WorkExperience, successMessage?: string) => void;
}) {
  const { handleNext } = props;
  const [state, dispatch] = useFormState(updateWorkExperience, null);

  const workExperienceWizardContext = useContext(WorkExperienceWizardContext);

  const [formData, setFormData] = useState<WorkExperience | null>(
    workExperienceWizardContext.workExperience ?? null
  );

  useEffect(() => {
    setFormData(workExperienceWizardContext.workExperience);
  }, [workExperienceWizardContext.workExperience]);

  useEffect(() => {
    if (state?.success && state?.workExperience) {
      handleNext(state.workExperience);
    }
  }, [state, handleNext]);

  async function onFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    formData.append(
      "id",
      workExperienceWizardContext.workExperience?.id as string
    );
    formData.append(
      "profileId",
      workExperienceWizardContext.profileId as string
    );

    //We need to format the text area content into an array of strings separated by separator
    const roleDescription = formData.get("role_description") as string;
    const roleDescriptionArray = roleDescription
      .split("\u2022")
      .filter((item) => item !== "")
      .map((item) => item.trim());

    //Iterate and append to formData
    roleDescriptionArray.forEach((description) => {
      formData.append(`descriptions[]`, description);
    });

    dispatch(formData);
  }

  const handleInput = (e: FormEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget as HTMLTextAreaElement;
    const { code } = e as React.KeyboardEvent<HTMLTextAreaElement>;

    const { selectionStart, value } = target;

    if (code === "Enter") {
      target.value = [...(value as any)]
        .map((c, i) => (i === selectionStart - 1 ? `\n${bulletWithSpace}` : c))
        .join("");

      target.selectionStart = selectionStart + bulletWithSpace.length;
      target.selectionEnd = selectionStart + bulletWithSpace.length;
    }

    if (value[0] !== bullet) {
      target.value = `${bulletWithSpace}${value}`;
    }
  };

  const placeHolder = `• Joined as the 3rd software engineer and developed the engineering function...
• Built experiments that grew yearly revenue by 10%...
• Launched a new feature which increased conversion by 23%...`;

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <div className="flex flex-col gap-4">
          <div className="font-light text-sm">
            Write at least 3 bullet points describing your role. Focus on your
            achievements and help recruiters understand the context of the
            company.
          </div>
          <div className=" flex flex-col gap-2 border-b border-white/10">
            <TextArea
              label="Role description"
              name="role_description"
              placeholder={placeHolder}
              wrap={"hard"}
              cols={20}
              rows={6}
              onKeyUp={handleInput}
              defaultValue={formData?.descriptions
                ?.map((description, index) => {
                  return `${bullet} ${description.value} ${
                    index === formData?.descriptions?.length - 1 ? "" : "\n"
                  }`;
                })
                .join("")}
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
    </>
  );
}
