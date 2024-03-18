"use client";

import ErrorAlert from "@/components/Alerts/ErrorAlerts";
import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  callbackUrl?: string;
  error?: string;
};

export default function LoginComponent(props: Props) {
  const { error } = props;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [customError, setCustomError] = useState<string | null>(error ?? null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await signIn("credentials", {
        email: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
        general_role: "candidate",
        redirect: false,
      });
      if (res?.error) {
        setCustomError(res.error);
        return;
      }
      router.replace(
        props.callbackUrl ? `${props.callbackUrl}/profile` : "/profile"
      );
    } catch (error) {
    } finally {
      setLoading(false);
    }
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
        {customError ? (
          <ErrorAlert
            title={"Errors in credentials"}
            messages={[customError]}
          ></ErrorAlert>
        ) : null}
      </div>

      <Button
        type="submit"
        variant="solid"
        className="mt-8 w-full"
        loading={loading}
      >
        Sign in to account
      </Button>
    </form>
  );
}
