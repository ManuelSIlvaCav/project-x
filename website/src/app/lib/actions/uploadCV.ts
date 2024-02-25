"use server";

export async function uploadCV(prevState: any, formData: FormData) {
  const url = `${process.env.API_PATH}/profiles/upload-cv`;
  try {
    const file = formData.get("cv") as File;
    const email = formData.get("email") as string;
    console.log("logging", { file, email });

    const formDataToSend = new FormData();
    formDataToSend.append("cv", file);
    formDataToSend.append("user_id", email);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formDataToSend,
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
