"use server";

export async function updateWorkExperience(prevState: any, formData: FormData) {
  const userId = formData.get("user_id") as string;
  const url = `${process.env.API_PATH}/profiles/${userId}/work-experience`;
  try {
    const role = formData.get("role") as string;
    const company = formData.get("company") as string;
    const startDateMonth = formData.get("startDateMonth[id]") as string;
    const startDateYear = formData.get("startDateYear[id]") as string;
    const endDateMonth = formData.get("endDateMonth[id]") as string;
    const endDateYear = formData.get("endDateYear[id]") as string;

    const body = {
      work_experience_overview: {
        company,
        role,
        start_date_month: startDateMonth,
        start_date_year: startDateYear,
        end_date_month: endDateMonth,
        end_date_year: endDateYear,
      },
    };
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
  } catch (error) {
    console.error("Error:", { error, url });
    return { message: "Error: Something went wrong. Please try again." };
  }
}
