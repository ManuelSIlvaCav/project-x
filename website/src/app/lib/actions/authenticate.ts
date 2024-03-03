"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function authenticate(prevState: any, formData: FormData) {
  const url = `${process.env.API_PATH}/auth/login`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    const data = await response?.json();

    if (!response?.ok) {
      console.log("something wrong");
      return { message: data?.message ?? "Something went wrong" };
    }

    console.log("response", data);
    if (!data?.token) {
      return { message: "Error: Something went wrong. Please try again." };
    }
    //Save token to cookie
    cookies().set({
      name: "jwt_token",
      value: data?.token,
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });
    cookies().set("userId", data?.userId);
  } catch (error) {
    console.error("Error:", { error, url, prevState });
    return { message: "Error: Something went wrong. Please try again." };
  }

  redirect("/dashboard/");
}
