"use server";
import authOptions from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function getEmails() {
  const session = await getServerSession(authOptions);

  const user = session?.user;
  const jwtToken = user?.accessToken;

  try {
    const url = `${process.env.API_PATH}/email_templates`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      cache: "force-cache",
      next: {
        tags: ["emailTemplates"],
      },
    });

    if (!res.ok) {
      console.log("error in getEmails", res.status);
      return null;
    }
    const response = await res.json();
    return response?.data;
  } catch (e) {
    console.log("error in getEmails", e);
  }
  return null;
}
