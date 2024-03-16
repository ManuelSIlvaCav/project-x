"use client";
import { register } from "@/app/lib/actions/register";
import ErrorAlert from "@/components/Alerts/ErrorAlerts";
import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";
import GithubLoginButton from "@/components/Login/GithubLoginButton";
import GoogleLoginButton from "@/components/Login/GoogleLoginButton";
import LinkedInLoginButton from "@/components/Login/LinkedInLoginButton";
import { useFormState } from "react-dom";

export default function RegisterComponent() {
  const [state, dispatch] = useFormState(register, null);

  return (
    <form action={dispatch}>
      <div className="grid grid-cols-2 gap-6">
        <TextField
          label="First name"
          name="firstName"
          type="text"
          autoComplete="given-name"
          required
        />
        <TextField
          label="Last name"
          name="lastName"
          type="text"
          autoComplete="family-name"
          required
        />
        <TextField
          className="col-span-full"
          label="Email address"
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
        {state?.error ? (
          <div className="col-span-full">
            <ErrorAlert title={"Errors in signup"} messages={[state.error]} />
          </div>
        ) : null}
      </div>
      <Button type="submit" variant="solid" className="mt-8 w-full">
        Register
      </Button>
      <div className="flex flex-col gap-4 p-10">
        <div className="flex items-center">Soon!</div>
        <GoogleLoginButton />
        <LinkedInLoginButton />
        <GithubLoginButton />
      </div>
    </form>
  );
}
