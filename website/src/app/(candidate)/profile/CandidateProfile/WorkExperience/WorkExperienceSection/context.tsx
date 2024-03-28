import { createContext } from "react";
import { WorkExperience } from "../../interfaces/Profile";

export const WorkExperienceWizardContext = createContext({
  workExperience: null as WorkExperience | null,
  setWorkExperience: (workExperience: WorkExperience | null) => {},
  profileId: null as string | null,
  formOpen: false,
  setFormOpen: (open: boolean) => {},
  //TODO add properties to have full information for the current work experience
});
