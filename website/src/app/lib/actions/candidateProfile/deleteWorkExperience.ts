"use server";

import authOptions from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";
import { CustomError } from "../../interfaces/Error";

export async function deleteWorkExperience(
  prevState: any,
  formData: FormData
): Promise<{
  success: boolean;
  deletedWorkExperienceId?: string;
  errors: CustomError[];
}> {
  const session = await getServerSession(authOptions);

  const user = session?.user;
  const jwtToken = user?.accessToken;

  const profileId = formData.get("profileId") as string;
  const workExperienceId = formData.get("id") as string;

  if (!profileId) {
    return {
      success: false,
      errors: [{ message: "Profile not found." }],
    };
  }

  const url = `${process.env.API_PATH}/profiles/${profileId}/work-experience/${workExperienceId}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    const data: any | CustomError = await response?.json();

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

    const deletedId = data.data;
    revalidateTag("profile");
    //We return the current work experience first in the array but the correct one should be the one that was updated looking at the id
    return {
      success: true,
      deletedWorkExperienceId: deletedId,
      errors: [],
    };
  } catch (error) {
    console.error("Error:", { error, url });
    return {
      success: false,
      errors: [{ message: "Error: Something went wrong. Please try again." }],
    };
  }
}
