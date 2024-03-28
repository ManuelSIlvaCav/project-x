"use server";

import { WorkExperience } from "@/app/(candidate)/profile/CandidateProfile/interfaces/Profile";
import authOptions from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";
import { CustomError } from "../../interfaces/Error";

function buildBody(formData: FormData) {
  const id = formData.get("id") as string;
  const role = formData.get("role") as string;
  const company = formData.get("company") as string;
  const startDateMonth = formData.get("startDateMonth[id]") as string;
  const startDateYear = formData.get("startDateYear[id]") as string;
  const endDateMonth = formData.get("endDateMonth[id]") as string;
  const endDateYear = formData.get("endDateYear[id]") as string;

  const descriptions = formData.getAll("descriptions[]") as string[] | null;

  const body: {
    id: string | null;
    work_experience_overview: null | Record<string, any>;
    role_overview: null | Record<string, Array<string>>;
    company_overview: null | Record<string, string>;
  } = {
    id,
    work_experience_overview: null,
    role_overview: null,
    company_overview: null,
  };

  if (role && company) {
    body["work_experience_overview"] = {
      company,
      role,
      start_date_month: parseInt(startDateMonth),
      start_date_year: parseInt(startDateYear),
      end_date_month: parseInt(endDateMonth),
      end_date_year: parseInt(endDateYear),
    };
  }

  if (descriptions && descriptions.length > 0) {
    body["role_overview"] = {
      descriptions: descriptions,
    };
  }

  if (formData.get("company_description") || formData.get("company_website")) {
    body["company_overview"] = {
      ...(formData.get("company_description") && {
        company_description: formData.get("company_description") as string,
      }),
      ...(formData.get("company_website") && {
        company_website: formData.get("company_website") as string,
      }),
    };
  }

  return body;
}

export async function updateWorkExperience(
  prevState: any,
  formData: FormData
): Promise<{
  success: boolean;
  workExperience?: WorkExperience;
  errors: CustomError[];
}> {
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

  const url = `${process.env.API_PATH}/profiles/${profileId}/work-experience`;
  try {
    const body = buildBody(formData);

    console.log("bidy", JSON.stringify(body));
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(body),
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

    const workExperiencesArray = data?.data?.work_experiences;
    revalidateTag("profile");
    //We return the current work experience first in the array but the correct one should be the one that was updated looking at the id
    if (!formData.get("id")) {
      return {
        success: true,
        workExperience: workExperiencesArray[0],
        errors: [],
      };
    }

    const workExperience = workExperiencesArray.find(
      (workExperience: WorkExperience) =>
        workExperience.id === formData.get("id")
    );

    return {
      success: true,
      workExperience,
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
