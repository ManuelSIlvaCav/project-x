"use client";

import { Button } from "@/components/Button";
import FieldErrorMessage from "@/components/FieldErrorMessage";
import { TextField } from "@/components/Fields";
import { signIn } from "next-auth/react";

type Props = {
  callbackUrl?: string;
  error?: string;
};

export default function LoginComponent(props: Props) {
  const { callbackUrl, error } = props;
  const hasError = false;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await signIn("credentials", {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
      redirect: true,
      callbackUrl: callbackUrl ?? "/profile",
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
          errorMessage={hasError ? "Please enter a valid email address." : null}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          errorMessage={hasError ? "Please enter a valid email address." : null}
        />
      </div>

      {error ? <FieldErrorMessage>{error}</FieldErrorMessage> : null}

      <Button type="submit" variant="solid" className="mt-8 w-full">
        Sign in to account
      </Button>
    </form>
  );
}
