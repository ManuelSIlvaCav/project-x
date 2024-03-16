import { AuthLayout } from "@/app/(auth)/AuthLayout";
import { type Metadata } from "next";
import Link from "next/link";
import LoginComponent from "./LoginComponent";

export const metadata: Metadata = {
  title: "Sign In",
};

type Props = {
  searchParams?: Record<"callbackUrl" | "error", string>;
};

export default function Login(props: Props) {
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
      <LoginComponent
        error={props.searchParams?.error}
        callbackUrl={props.searchParams?.callbackUrl}
      />
    </AuthLayout>
  );
}
