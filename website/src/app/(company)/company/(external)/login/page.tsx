import Link from "next/link";
import { CompanyLayout } from "../CompanyLayout";
import LoginComponent from "./LoginComponent";

export default function CompanySignupPage() {
  return (
    <CompanyLayout
      title="Sign in to account"
      subtitle={
        <>
          Don’t have an account?{" "}
          <Link href="/company/signup" className="text-cyan-600">
            Sign up
          </Link>{" "}
        </>
      }
    >
      <LoginComponent />
    </CompanyLayout>
  );
}
