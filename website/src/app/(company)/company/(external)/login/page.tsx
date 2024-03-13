import LoginComponent from "@/app/(auth)/login/LoginComponent";
import Link from "next/link";
import { CompanyLayout } from "../CompanyLayout";

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
      <LoginComponent />
    </CompanyLayout>
  );
}
