"use server";

export async function uploadCV(prevState: any, formData: FormData) {
  const url = `${process.env.API_PATH}/profiles/upload-cv`;
  try {
    const file = formData.get("upload_file") as File;
    console.log("file", file);
    const body = JSON.stringify({
      upload_file: file,
      user_id: "user_id", //formData.get("user_id"),
    });

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    const data = await response?.json();

    if (!response.ok) {
      console.log("something wrong", { data, formData: body });
      return { message: data?.message ?? "Something went wrong" };
    }

    console.log("response", response.statusText);
  } catch (error) {
    console.error("Error:", { error, url, prevState });
    return { message: "Error: Something went wrong. Please try again." };
  }
}
