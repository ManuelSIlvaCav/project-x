import { createContext } from "react";

export const EducationWizardContext = createContext({
  educationId: undefined as string | undefined,
  profileId: null as string | null,
});
