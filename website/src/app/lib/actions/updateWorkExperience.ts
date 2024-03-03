"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

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
      start_date_month: startDateMonth,
      start_date_year: startDateYear,
      end_date_month: endDateMonth,
      end_date_year: endDateYear,
    };
  }

  if (descriptions && descriptions.length > 0) {
    console.log("roleDescription in acion", descriptions);
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

export async function updateWorkExperience(prevState: any, formData: FormData) {
  const jwtToken = cookies().get("jwt_token")?.value ?? null;
  const userId = cookies().get("userId")?.value ?? null;

  const url = `${process.env.API_PATH}/profiles/${userId}/work-experience`;
  try {
    const body = buildBody(formData);
    console.log("logging", { body, url });

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response?.json();

    if (!response.ok) {
      console.log("something wrong", { data });
      return { message: data?.message ?? "Something went wrong" };
    }

    console.log("response", { status: response.status, data });

    //Important we do not return for the last step of the wizard could change in the future
    if (!body.company_overview) {
      const workExperiencesArray = data?.data?.workExperiences;
      //We will have a return for the full profile we need to keep track of the last one
      return workExperiencesArray[workExperiencesArray.length - 1]?.id;
    }
  } catch (error) {
    console.error("Error:", { error, url });
    return { message: "Error: Something went wrong. Please try again." };
  }

  revalidatePath(`/dashboard/`);
  return "success";
}
