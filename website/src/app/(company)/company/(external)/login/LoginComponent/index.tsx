"use client";

import ErrorAlert from "@/components/Alerts/ErrorAlerts";
import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";
import { signIn } from "next-auth/react";

type Props = {
  callbackUrl?: string;
  error?: string;
};

export default function CompanyLoginComponent(props: Props) {
  const { error } = props;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await signIn("credentials", {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
      redirect: true,
      callbackUrl: "/profile",
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-6">
        <TextField
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </div>

      {error ? (
        <ErrorAlert title="Error login" messages={[error]}></ErrorAlert>
      ) : null}

      <Button type="submit" variant="solid" className="mt-8 w-full">
        Sign in to account
      </Button>
    </form>
  );
}
