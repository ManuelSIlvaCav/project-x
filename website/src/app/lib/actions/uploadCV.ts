"use server";

import authOptions from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";
import { CustomError } from "../interfaces/Error";

export async function uploadCV(
  prevState: any,
  formData: FormData
): Promise<{
  success: boolean;
  cvFileId?: string;
  errors: CustomError[];
}> {
  const url = `${process.env.API_PATH}/profiles/upload-cv`;
  try {
    const session = await getServerSession(authOptions);

    const user = session?.user;
    const userId = user?.userId;

    if (!userId) {
      return { success: false, errors: [{ message: "User not found" }] };
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
      return { success: false, errors: data.errors };
    }
  } catch (error) {
    console.error("Error:", { error, url });
    return { success: false, errors: [{ message: "Something went wrong" }] };
  }

  revalidateTag("profile");
  return { success: true, cvFileId: "1", errors: [] };
}
