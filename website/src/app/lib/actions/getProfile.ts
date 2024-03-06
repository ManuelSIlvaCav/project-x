import { cookies } from "next/headers";

export default async function getProfile() {
  const jwtToken = cookies().get("jwt_token")?.value ?? null;
  const userId = cookies().get("userId")?.value ?? null;

  try {
    const url = `${process.env.API_PATH}/profiles/${userId}`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
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
