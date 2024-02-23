"use client";

import { authenticate } from "@/app/lib/actions/authenticate";
import { Button } from "@/components/Button";
import FieldErrorMessage from "@/components/FieldErrorMessage";
import { TextField } from "@/components/Fields";
import { useFormState } from "react-dom";

export default function LoginComponent() {
  const [state, dispatch] = useFormState(authenticate, null);
  console.log("state", state);
  const hasError = state?.message;
  return (
    <form action={dispatch}>
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

      {hasError ? <FieldErrorMessage>{state.message}</FieldErrorMessage> : null}

      <Button type="submit" color="cyan" className="mt-8 w-full">
        Sign in to account
      </Button>
    </form>
  );
}
