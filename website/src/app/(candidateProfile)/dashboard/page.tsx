import Card from "@/components/Card";
import { type Metadata } from "next";
import CandidateProfile from "./CandidateProfile";
import DashboardForm from "./DashboardForm";
import { DashboardLayout } from "./DashboardLayout";

export const metadata: Metadata = {
  title: "Profile",
};

function PrevComponent() {
  return;
  <>
    <Card>
      <h1 className="text-3xl font-bold">{"Please try uploading your CV"}</h1>
      <div className="mt-4">{"You will see the magic happen then!"}</div>
      {/* Spacer div*/}
      <div className="h-9" />
      <DashboardForm />
    </Card>

    {/* Spacer div*/}
    <div className="h-8" />
  </>;
}

export default function Login() {
  return (
    <DashboardLayout>
      <>
        <CandidateProfile />
      </>
    </DashboardLayout>
  );
}
