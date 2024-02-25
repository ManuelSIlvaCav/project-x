import { DashboardLayout } from "@/app/(candidateProfile)/dashboard/DashboardLayout";
import { type Metadata } from "next";
import CompanyOnboardingForm from "./CompanyOnboardingForm";

export const metadata: Metadata = {
  title: "Company Profile",
};

export default function Login() {
  return (
    <DashboardLayout>
      <>
        <CompanyOnboardingForm />
      </>
    </DashboardLayout>
  );
}
