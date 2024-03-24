"use server";
import authOptions from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { cache } from "react";

interface PaginatedResponse {
  data: any[];
  total: number;
  limit: number;
  nextCursor: string | null;
}

const getCandidateRecommendation = cache(
  async (limit: number = 10): Promise<PaginatedResponse> => {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const jwtToken = user?.accessToken;

    const companyId = "65fc06367a0b7b8617734d26";

    try {
      const url = `${process.env.API_PATH}/candidate-recommendation?limit=${limit}&company_id=${companyId}`;
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        cache: "force-cache",
        next: {
          tags: ["candidates-recommendation"],
        },
      });
      if (!res.ok) {
        //throw new Error("Failed to fetch data");
        return { data: [], total: 0, limit: 0, nextCursor: null };
      }
      const response = await res.json();
      const objects = response.data?.candidates ?? [];
      const paginatedResponse = {
        data: objects,
        total: objects.length,
        limit: limit,
        nextCursor: response?.data?.next_cursor ?? null,
      };

      return paginatedResponse;
    } catch (e) {
      console.log("error in getProfile", e);
    }
    return { data: [], total: 0, limit: 0, nextCursor: null };
  }
);

export default getCandidateRecommendation;
