import Card from "@/components/Card";
import { useState } from "react";
import CreateEducation from "./CreateEducation";

type Props = {
  open: boolean;
  setEducationId: (id: string | undefined) => void;
  setOpen: (open: boolean) => void;
};

export default function EducationWizard(props: Props) {
  const { open, setEducationId, setOpen } = props;
  const [step, setStep] = useState(1);

  return (
    <Card className={`${open ? "p-4" : "hidden"}`}>
      <CreateEducation />
    </Card>
  );
}
