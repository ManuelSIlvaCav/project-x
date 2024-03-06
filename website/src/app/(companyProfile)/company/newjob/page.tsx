import { type Metadata } from "next";
import { CompanyLayout } from "./CompanyLayout";
import JobPostingForm from "./JobPostingForm";

export const metadata: Metadata = {
  title: "Company Profile",
};

export default function CompanyNewJobPage() {
  return (
    <CompanyLayout>
      <>
        <JobPostingForm />
      </>
    </CompanyLayout>
  );
}
