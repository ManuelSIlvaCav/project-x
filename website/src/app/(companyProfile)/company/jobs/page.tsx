import { type Metadata } from "next";
import JobsList from "./JobsList";

export const metadata: Metadata = {
  title: "Invitations",
};

export default function CompanyJobsPage() {
  return (
    <>
      <JobsList />
    </>
  );
}
