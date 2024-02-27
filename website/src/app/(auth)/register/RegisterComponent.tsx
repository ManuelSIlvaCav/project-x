"use client";
import { register } from "@/app/lib/actions/register";
import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";
import { useFormState } from "react-dom";

export default function RegisterComponent() {
  const [state, dispatch] = useFormState(register, null);
  console.log("state", state);
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
      </div>
      <Button type="submit" variant="solid" className="mt-8 w-full">
        Register
      </Button>
    </form>
  );
}
