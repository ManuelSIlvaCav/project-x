"use server";

import authOptions from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";

export async function uploadCV(prevState: any, formData: FormData) {
  const url = `${process.env.API_PATH}/profiles/upload-cv`;
  try {
    const session = await getServerSession(authOptions);

    const user = session?.user;
    const userId = user?.userId;

    if (!userId) {
      return "You need to be logged in to upload your CV";
    }

    const file = formData.get("cv") as File;

    const formDataToSend = new FormData();
    formDataToSend.append("cv", file);
    formDataToSend.append("user_id", userId);

    const response = await fetch(url, {
      method: "POST",
      body: formDataToSend,
    });
    const data = await response?.json();

    if (!response.ok) {
      console.log("something wrong", { data });
      return data?.message ?? "Something went wrong";
    }
  } catch (error) {
    console.error("Error:", { error, url });
    return { message: "Error: Something went wrong. Please try again." };
  }

  revalidateTag("profile");
}
