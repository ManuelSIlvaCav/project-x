"use server";

function buildBody(formData: FormData) {
  return {
    base_details: {
      role_name: formData.get("role_name[label]"),
      company_function: formData.get("company_function[label]"),
      min_experience_level: Number(formData.get("min_experience_level")),
      max_experience_level: Number(formData.get("max_experience_level")),
    },
    work_details: {
      work_type: formData.get("work_type[label]"),
    },
  };
}

export async function newjob(prevState: any, formData: FormData) {
  const companyId = "";
  const url = `${process.env.API_PATH}/companies/${companyId}/newjob`;
  try {
    const body = buildBody(formData);

    console.log("sending", JSON.stringify(body));

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
      console.log("response not ok", {
        data,
        badResponse: JSON.stringify(badResponse),
      });
      return badResponse;
    }
  } catch (error) {
    console.error("Error:", { error, url, prevState });
    return { errors: [{ message: "Something went wrong" }] };
  }
}
