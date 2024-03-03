import { type Metadata } from "next";
import CandidateProfile from "./CandidateProfile";
import { DashboardLayout } from "./DashboardLayout";

export const metadata: Metadata = {
  title: "Profile",
};

export default function Login() {
  return (
    <DashboardLayout>
      <>
        <CandidateProfile />
      </>
    </DashboardLayout>
  );
}
