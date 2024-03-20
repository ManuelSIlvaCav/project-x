"use client";
import { companySignup } from "@/app/lib/actions/company/signup";
import ErrorAlert from "@/components/Alerts/ErrorAlerts";
import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";
import { useFormState } from "react-dom";

export default function RegisterComponent() {
  const [state, dispatch] = useFormState(companySignup, null);

  return (
    <form action={dispatch}>
      <div className="flex flex-col gap-6">
        <TextField
          label="Company name"
          name="companyName"
          type="text"
          required
        />
        <TextField
          label="Company website"
          name="companyWebsite"
          type="text"
          required
        />
        <TextField
          className="col-span-full"
          label="Admin email address"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        <TextField
          className="col-span-full"
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
        />
        {state?.errors?.length ? (
          <ErrorAlert
            title={"Error in signup"}
            messages={state?.errors.map((error) => {
              return error.message;
            })}
          />
        ) : null}
      </div>
      <Button type="submit" variant="solid" className="mt-8 w-full">
        Register
      </Button>
    </form>
  );
}
