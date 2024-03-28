import Card from "@/components/Card";
import { monthValueName } from "@/utils/months";
import { WorkExperience } from "../../interfaces/Profile";
import EditButton from "./EditButton";

export default function WorkExperiencesCard({
  workExperience,
  canEdit,
}: {
  workExperience: WorkExperience;
  canEdit?: boolean;
}) {
  const {
    role,
    company,
    start_date_month,
    start_date_year,
    end_date_year,
    end_date_month,
    descriptions,
  } = workExperience;

  function dateFormater(month: number, year: number) {
    return `${monthName(month)} ${year}`;
  }

  function monthName(month: number) {
    return monthValueName[month];
  }

  return (
    <div>
      <Card>
        <div className="flex flex-col gap-2 p-6">
          <div className="flex flex-row space-x-0 justify-between">
            <div>
              <span className="text-xl font-bold">{`${role}, ${company}`}</span>
            </div>
            {canEdit ? (
              <div className="h-4 w-4">
                <EditButton workExperience={workExperience} />
              </div>
            ) : null}
          </div>

          <div>
            <span className="font-light text-sm">{`${dateFormater(
              start_date_month,
              start_date_year
            )} - ${dateFormater(end_date_month, end_date_year)}`}</span>
          </div>
          <div>
            <ul>
              {descriptions?.map((description, index) => {
                return (
                  <li key={index}>{"\u2022" + " " + description?.value}</li>
                );
              })}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
