"use server";
import { redirect } from "next/navigation";

export async function companySignup(
  prevState: any,
  formData: FormData
): Promise<{ errors: any[] }> {
  const url = `${process.env.API_PATH}/companies/signup`;
  try {
    const body = {
      company_name: formData.get("companyName"),
      company_website: formData.get("companyWebsite"),
      admin_email: formData.get("email"),
      password: formData.get("password"),
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response?.json();

    if (!response.ok) {
      const badResponse = {
        errors: data?.errors,
        ...(!data?.errors && { errors: [{ message: "Something went wrong" }] }),
      };
      console.log("response not ok", { data, badResponse });
      return badResponse;
    }
  } catch (error) {
    console.error("Error:", { error, url, prevState });
    return { errors: [{ message: "Something went wrong" }] };
  }
  redirect("/company/login");
}
