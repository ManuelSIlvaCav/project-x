"use client";

import dayjs from "dayjs";
import { useRouter } from "next/navigation";

function formatDate(date: Date) {
  return dayjs(date).format("MMMM D, YYYY");
}

function getItemName(item: Record<string, any>, key: string) {
  if (key === "Applicant") {
    return item?.candidate?.full_name;
  } else if (key === "Company") {
    return item?.candidate?.work_experiences[0]?.company;
  } else if (key === "Status") {
    return item?.status;
  } else if (key === "Date") {
    return formatDate(item?.created_at);
  } else {
    return null;
  }
}

export default function CandidateRow({
  index,
  columns,
  item,
}: {
  index: number;
  columns: string[];
  item: any;
}) {
  const router = useRouter();

  return (
    <tr
      key={index}
      className="cursor-pointer hover:bg-gray-50"
      onClick={() => {
        console.log("row clicked");
        router.push(`/profiles/${item.candidate_profile_id}`);
      }}
    >
      {columns.map((column, index: number) => {
        return (
          <td key={index} className="px-3 py-4 text-sm text-gray-900">
            {getItemName(item, column)}
          </td>
        );
      })}
    </tr>
  );
}
