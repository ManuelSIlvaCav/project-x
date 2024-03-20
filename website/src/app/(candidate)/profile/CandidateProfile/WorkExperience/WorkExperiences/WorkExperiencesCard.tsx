import Card from "@/components/Card";
import { monthValueName } from "@/utils/months";
import { WorkExperience } from "../../interfaces/Profile";

export default function WorkExperiencesCard({
  workExperience,
}: {
  workExperience: WorkExperience;
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

  function dateFormater(month: string, year: string) {
    return `${monthName(month)} ${year}`;
  }

  function monthName(month: string) {
    return monthValueName[month];
  }

  return (
    <div>
      <Card>
        <div className="flex flex-col gap-2 p-6">
          <div>
            <span className="text-2xl font-bold">{`${role}, ${company}`}</span>
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
