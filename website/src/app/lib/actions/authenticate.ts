"use server";

export async function authenticate(prevState: any, formData: FormData) {
  const url = `${process.env.API_PATH}/auth/login`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    const data = await response?.json();

    if (!response.ok) {
      console.log("something wrong", { data });
      return { message: data?.message ?? "Something went wrong" };
    }

    console.log("response", response.statusText);
  } catch (error) {
    console.error("Error:", { error, url, prevState });
    return { message: "Error: Something went wrong. Please try again." };
  }
}
