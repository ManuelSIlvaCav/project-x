import { cookies } from "next/headers";

export default async function getProfile() {
  const jwtToken = cookies().get("jwt_token")?.value ?? null;
  const userId = cookies().get("userId")?.value ?? null;

  const url = `${process.env.API_PATH}/profiles/${userId}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });

  if (!res.ok) {
    console.log({ res });
    //throw new Error("Failed to fetch data");
    return "";
  }
  const response = await res.json();
  return response?.data;
}
