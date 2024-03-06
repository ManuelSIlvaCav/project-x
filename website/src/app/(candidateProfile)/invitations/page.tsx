import { type Metadata } from "next";
import InvitationsList from "./InvitationsList";

export const metadata: Metadata = {
  title: "Invitations",
};

export default function Invitations() {
  return (
    <>
      <InvitationsList />
    </>
  );
}
