"use client";

import CircularPlusButton from "@/components/CircularPlusButton";

import { useState } from "react";
import { Profile } from "../interfaces/Profile";
import DetailsWizard from "./DetailsWizard";
import { DetailsWizardContext } from "./context";

type Props = {
  profile: Profile;
};

export default function DetailsSection(props: Props) {
  const [quickFormOpen, setQuickFormOpen] = useState(false);
  const [detailsId, setDetailsId] = useState<string | undefined>();

  return (
    <>
      <DetailsWizardContext.Provider
        value={{
          detailsId,
          setDetailsId: setDetailsId,
          profileId: props.profile?.id,
          formOpen: quickFormOpen,
          setFormOpen: setQuickFormOpen,
        }}
      >
        <div className="flex justify-between">
          <div className="pb-2">
            <h3 className="text-2xl font-semibold leading-6 text-gray-900">
              Additional Details
            </h3>
            <p className="mt-2 max-w-4xl text-sm text-gray-500 font-light">
              Add any additional details that you want to share with your
              employer. Phone number, address, languages and visa sponsorship
            </p>
          </div>
          <div className="flex flex-col ">
            <CircularPlusButton
              onClick={() => {
                setQuickFormOpen(!quickFormOpen);
              }}
            />
          </div>
        </div>
        <DetailsWizard />
      </DetailsWizardContext.Provider>
    </>
  );
}
