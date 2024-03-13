import Link from "next/link";
import { CompanyLayout } from "../CompanyLayout";
import RegisterComponent from "./RegisterComponent";

export default function CompanySignupPage() {
  return (
    <CompanyLayout
      title="Sign in to account"
      subtitle={
        <>
          Already have an account?{" "}
          <Link href="/company/login" className="text-cyan-600">
            Sign in
          </Link>{" "}
          to your account.
        </>
      }
    >
      <RegisterComponent />
    </CompanyLayout>
  );
}
