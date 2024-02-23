import { AuthLayout } from "@/app/(auth)/login/AuthLayout";
import { type Metadata } from "next";
import Link from "next/link";
import LoginComponent from "./LoginComponent";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function Login() {
  return (
    <AuthLayout
      title="Sign in to account"
      subtitle={
        <>
          Don’t have an account?{" "}
          <Link href="/register" className="text-cyan-600">
            Sign up
          </Link>{" "}
          for a free trial.
        </>
      }
    >
      <LoginComponent />
    </AuthLayout>
  );
}
