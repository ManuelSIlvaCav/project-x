"use client";
import Card from "@/components/Card";
import NotificationToast from "@/components/NotificationToast";
import { useContext } from "react";
import toast from "react-hot-toast";
import { DetailsWizardContext } from "../context";
import CreateDetails from "./CreateDetails";

type Props = {};

export default function DetailsWizard(props: Props) {
  const detailsWizardContext = useContext(DetailsWizardContext);

  function onCreate() {
    toast.custom((t) => {
      return <NotificationToast t={t} title={"Education updated!"} />;
    });
    detailsWizardContext.setDetailsId(undefined);
    detailsWizardContext.setFormOpen(false);
  }

  return (
    <Card className={`${detailsWizardContext.formOpen ? "p-4" : "hidden"}`}>
      <CreateDetails onCreate={onCreate} />
    </Card>
  );
}
