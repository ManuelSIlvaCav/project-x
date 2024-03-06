import Job from "@/features/Job";
import { CustomModal } from "./modal";

export default function InvitationJobModal() {
  console.log({ InvitationJobModal: true });
  return (
    <CustomModal>
      <Job />
    </CustomModal>
  );
}
