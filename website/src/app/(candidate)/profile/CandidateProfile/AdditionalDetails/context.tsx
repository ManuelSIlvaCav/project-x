import { createContext } from "react";

export const DetailsWizardContext = createContext({
  detailsId: undefined as string | undefined,
  setDetailsId: (id: string | undefined) => {},
  profileId: null as string | null,
  formOpen: false,
  setFormOpen: (open: boolean) => {},
});
