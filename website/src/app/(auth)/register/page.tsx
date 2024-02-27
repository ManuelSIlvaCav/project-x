import Link from "next/link";
import { AuthLayout } from "../login/AuthLayout";
import RegisterComponent from "./RegisterComponent";

export default function Register() {
  return (
    <AuthLayout
      title="Create an account"
      subtitle={
        <>
          Already have an account?{" "}
          <Link href="/login" className="text-cyan-600">
            Sign in
          </Link>{" "}
          to your account.
        </>
      }
    >
      <RegisterComponent />
    </AuthLayout>
  );
}
