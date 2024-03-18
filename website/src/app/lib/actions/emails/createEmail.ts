"use server";
import authOptions from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function createEmail(prevState: any, formData: FormData) {
  const session = await getServerSession(authOptions);

  const user = session?.user;
  const jwtToken = user?.accessToken;

  try {
    const url = `${process.env.API_PATH}/email_templates`;

    const body = {
      name: formData.get("name") as string,
      subject: formData.get("subject") as string,
      design_content: formData.get("designContent") as string,
      html_content: formData.get("htmlContent") as string,
    };

    console.log({ body });

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const data = await res?.json();
      console.log("error in createEmail", res.status, data);
      return null;
    }
    const response = await res.json();
    console.log("response in createEmail", response);
    return response?.data;
  } catch (e) {
    console.log("error in createEmail", e);
  }
  return null;
}
