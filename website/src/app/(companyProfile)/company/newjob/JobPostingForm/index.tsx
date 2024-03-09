"use client";

import { Button } from "@/components/Button";
import Checkboxes from "@/components/Checkboxes";
import CustomSelect from "@/components/CustomSelect";
import DescriptionInput from "@/components/DescriptionInput";
import NotificationToast from "@/components/NotificationToast";
import SectionHeader from "@/components/SectionHeader";
import toast from "react-hot-toast";

const roles = [
  { id: "1", label: "Software Engineer" },
  { id: "2", label: "Product Manager" },
  { id: "3", label: "Data Scientist" },
  { id: "4", label: "UX Designer" },
];

const locations = [
  { id: "1", label: "Remote" },
  { id: "2", label: "San Francisco" },
  { id: "3", label: "New York" },
  { id: "4", label: "London" },
];

const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  //toast.success("Job posting saved"); // Displays a success message
  toast.custom((t) => {
    return <NotificationToast t={t} />;
  });
};

export default function JobPostingForm() {
  return (
    <form onSubmit={onSubmit}>
      <h1 className="flex align-center font-bold text-3xl pb-8">
        Tell us more about your job posting!
      </h1>
      <div className="flex flex-col gap-4">
        <SectionHeader
          title="First things first, tell us about the rol"
          description="Please include role name, experience level and a role description"
        />
        <div>
          <div className="">
            <CustomSelect label="Function" name="role" options={roles} />
          </div>
          <div className="py-8">
            <Checkboxes
              label="Experience level"
              name="experience_level"
              options={[]}
            />
          </div>

          <DescriptionInput label="Role description" name="role_description" />
        </div>

        <SectionHeader
          title="Now tell us about the location of the role"
          description="Please include if the job is remote/hybrid/in-office and the location of the office if required"
        />

        <div className="">
          <CustomSelect
            label="Where is this job based?"
            name="role"
            options={locations}
          />
        </div>
        <Button className="mt-4" type="submit">
          {"Save and continue"}
        </Button>
      </div>
    </form>
  );
}
