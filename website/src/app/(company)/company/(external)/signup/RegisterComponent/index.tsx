"use client";
import { register } from "@/app/lib/actions/register";
import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";
import { useFormState } from "react-dom";

export default function RegisterComponent() {
  const [state, dispatch] = useFormState(register, null);

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
      </div>
      <Button type="submit" variant="solid" className="mt-8 w-full">
        Register
      </Button>
    </form>
  );
}
