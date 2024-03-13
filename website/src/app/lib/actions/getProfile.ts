"use server";
import authOptions from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function getProfile() {
  const session = await getServerSession(authOptions);

  const user = session?.user;
  const userId = user?.userId;
  const jwtToken = user?.accessToken;

  try {
    const url = `${process.env.API_PATH}/profiles/${userId}`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      cache: "force-cache",
      next: {
        tags: ["profile"],
      },
    });

    if (!res.ok) {
      //throw new Error("Failed to fetch data");
      return null;
    }
    const response = await res.json();
    return response?.data;
  } catch (e) {
    console.log("error in getProfile", e);
  }
  return null;
}
