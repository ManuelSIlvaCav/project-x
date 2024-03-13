"use server";
import { redirect } from "next/navigation";

export async function register(prevState: any, formData: FormData) {
  const url = `${process.env.API_PATH}/users/register`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: formData.get("firstName"),
        last_name: formData.get("lastName"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    const data = await response?.json();

    if (!response.ok) {
      return { message: data?.message ?? "Something went wrong" };
    }
  } catch (error) {
    console.error("Error:", { error, url, prevState });
    return { message: "Error: Something went wrong. Please try again." };
  }
  redirect("/login/");
}
