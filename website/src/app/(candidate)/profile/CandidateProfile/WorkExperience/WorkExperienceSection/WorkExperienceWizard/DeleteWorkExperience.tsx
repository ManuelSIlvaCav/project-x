import { deleteWorkExperience } from "@/app/lib/actions/candidateProfile/deleteWorkExperience";
import { Button } from "@/components/Button";
import { useContext, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { WorkExperienceWizardContext } from "../context";

export default function DeleteWorkExperience() {
  const workExperienceContext = useContext(WorkExperienceWizardContext);
  const [state, dispatch] = useFormState(deleteWorkExperience, null);
  const [loading, setLoading] = useState(false);

  function onDelete() {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("profileId", workExperienceContext.profileId as string);
      formData.append("id", workExperienceContext.workExperience?.id as string);
      dispatch(formData);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (state?.success) {
      workExperienceContext.setWorkExperience(null);
      workExperienceContext.setFormOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  if (
    !workExperienceContext.profileId ||
    !workExperienceContext.workExperience?.id
  ) {
    return null;
  }

  return (
    <div className="flex justify-end">
      <Button variant="danger" onClick={onDelete} loading={loading}>
        Delete
      </Button>
    </div>
  );
}
