import Card from "@/components/Card";
import { monthValueName } from "@/utils/months";
import { WorkExperience } from ".";

export default function WorkExperiencesCard({
  workExperience,
}: {
  workExperience: WorkExperience;
}) {
  const {
    role,
    company,
    startDateMonth,
    startDateYear,
    endDateMonth,
    endDateYear,
    descriptions,
  } = workExperience;

  function dateFormater(month: string, year: string) {
    return `${monthName(month)} ${year}`;
  }

  function monthName(month: string) {
    return monthValueName[month];
  }

  return (
    <>
      <Card>
        <div className="flex flex-col gap-2">
          <div>
            <span className="text-2xl font-bold">{`${role}, ${company}`}</span>
          </div>
          <div>
            <span className="font-light text-sm">{`${dateFormater(
              startDateMonth,
              startDateYear
            )} - ${dateFormater(endDateMonth, endDateYear)}`}</span>
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
    </>
  );
}
