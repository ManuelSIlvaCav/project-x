import { createContext } from "react";

export const WorkExperienceWizardContext = createContext({
  workExperienceId: null as string | null,
  //TODO add properties to have full information for the current work experience
});
