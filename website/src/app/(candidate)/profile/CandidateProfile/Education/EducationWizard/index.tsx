import Card from "@/components/Card";
import NotificationToast from "@/components/NotificationToast";
import toast from "react-hot-toast";
import CreateEducation from "./CreateEducation";

type Props = {
  open: boolean;
  setEducationId: (id: string | undefined) => void;
  setOpen: (open: boolean) => void;
};

export default function EducationWizard(props: Props) {
  const { open, setEducationId, setOpen } = props;

  function onCreate() {
    toast.custom((t) => {
      return <NotificationToast t={t} title={"Education updated!"} />;
    });
    setEducationId(undefined);
    setOpen(false);
  }

  return (
    <Card className={`${open ? "p-4" : "hidden"}`}>
      <CreateEducation onCreate={onCreate} />
    </Card>
  );
}
