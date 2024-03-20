"use server";

import authOptions from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";

export async function updateEducation(
  prevState: any,
  formData: FormData
): Promise<{ success: boolean; id?: string; errors?: any[] }> {
  const session = await getServerSession(authOptions);

  const user = session?.user;
  const jwtToken = user?.accessToken;

  const profileId = formData.get("profileId") as string;
  if (!profileId) {
    return {
      success: false,
      errors: [{ message: "Profile not found." }],
    };
  }

  const url = `${process.env.API_PATH}/profiles/${profileId}/education`;

  try {
    const body = {
      id: formData.get("id") as string,
      start_date_year: formData.get("startDateYear[id]") as string,
      end_date_year: formData.get("endDateYear[id]") as string,
      school_name: formData.get("schoolName") as string,
      description: formData.get("description") as string,
    };
    console.log("body", body);

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) {
      const badResponse = {
        success: false,
        errors: data?.errors,
        ...(!data?.errors && {
          errors: [{ message: data?.message ?? "Something went wrong" }],
        }),
      };
      console.log("something wrong", {
        data,
        badResponse: JSON.stringify(badResponse),
      });
      return badResponse;
    }
  } catch (error) {
    console.log("errors", error);
  }
  revalidateTag("profile");
  return { success: true };
}
