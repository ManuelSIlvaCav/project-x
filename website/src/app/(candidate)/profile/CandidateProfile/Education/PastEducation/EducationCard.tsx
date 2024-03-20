import Card from "@/components/Card";
import { Education } from "../../interfaces/Profile";

type Props = {
  education: Education;
};

export default function EducationCard({ education }: Props) {
  const { school_name, end_date_year, start_date_year, description } =
    education;

  return (
    <div>
      <Card>
        <div className="flex flex-col gap-2 p-6">
          <div>
            <span className="text-2xl font-bold">{`${school_name}`}</span>
          </div>
          <div>
            <span className="font-light text-sm">{`${start_date_year} - ${end_date_year}`}</span>
          </div>
          <div>
            <ul>
              <li>{"\u2022" + " " + description}</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
