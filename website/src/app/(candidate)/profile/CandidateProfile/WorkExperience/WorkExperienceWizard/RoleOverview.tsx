import { updateWorkExperience } from "@/app/lib/actions/updateWorkExperience";
import { Button } from "@/components/Button";
import TextArea from "@/components/TextArea";
import { FormEvent, useContext, useEffect } from "react";
import { useFormState } from "react-dom";
import { WorkExperienceWizardContext } from "../WorkExperienceSection/context";

enum CharCodeEnum {
  SPACE = 32,
  NEWLINE = 10,
  TAB = 9,
  CR = 13,
  BULLET = 8226,
}

const bullet = "\u2022";

export default function RoleOverviewForm(props: { handleNext: () => void }) {
  const { handleNext } = props;
  const workExperienceWizardData = useContext(WorkExperienceWizardContext);
  const [state, dispatch] = useFormState(updateWorkExperience, null);

  useEffect(() => {
    if (state) {
      handleNext();
    }
  }, [state, handleNext]);

  async function onFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    formData.append("id", workExperienceWizardData.workExperienceId as string);

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
    const newLength = e.currentTarget.value.length;

    const characterCode = e.currentTarget.value
      .substring(newLength - 1, newLength)
      .charCodeAt(0);

    const previousCharacterCode = e.currentTarget.value
      .substring(newLength - 2, newLength - 1)
      .charCodeAt(0);

    if (newLength === 1) {
      return (e.currentTarget.value = `${bullet} ${e.currentTarget.value}`);
    }

    //Charcode enter
    if (characterCode === CharCodeEnum.NEWLINE) {
      if (
        previousCharacterCode === CharCodeEnum.SPACE ||
        previousCharacterCode === CharCodeEnum.TAB ||
        previousCharacterCode === CharCodeEnum.BULLET
      ) {
        return (e.currentTarget.value = e.currentTarget.value.substring(
          0,
          newLength - 1
        ));
      }
      e.currentTarget.value = `${e.currentTarget.value}${bullet} `;
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
              rows={4}
              onInput={handleInput}
            />
            <Button type="submit">{"Save and continue"}</Button>
          </div>
        </div>
      </form>
    </>
  );
}
