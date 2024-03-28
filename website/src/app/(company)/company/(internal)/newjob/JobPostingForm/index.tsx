"use client";

import { newjob } from "@/app/lib/actions/company/newjob";
import { Button } from "@/components/Button";
import CustomSelect from "@/components/CustomSelect";
import DescriptionInput from "@/components/DescriptionInput";
import NotificationToast from "@/components/NotificationToast";
import MultiRangeSlider from "@/components/RangeSlider";
import SectionHeader from "@/components/SectionHeader";
import { useRef } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import companyFunctions from "./consts/companyFunctions";
import roles from "./consts/roles";
import workTypes from "./consts/workTypes";

const locations = [
  { id: "1", label: "Remote" },
  { id: "2", label: "San Francisco" },
  { id: "3", label: "New York" },
  { id: "4", label: "London" },
];

const experienceLevels = {
  0: "Intern",
  1: "Junior",
  2: "Semi Senior",
  3: "Senior",
  4: "Lead",
  5: "Director",
  6: "VP",
  7: "C-level",
};

export default function JobPostingForm() {
  const [state, dispatch] = useFormState(newjob, null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log({ data });
    dispatch(formData);

    toast.custom((t) => {
      return <NotificationToast t={t} title="Job posting created" />;
    });
  };

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <>
      <h1 className="flex align-center font-bold text-3xl pb-8">
        Tell us more about your job posting!
      </h1>
      <form onSubmit={onSubmit} ref={formRef}>
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-2">
            <SectionHeader
              title="First things first, tell us about the role"
              description="Please include role name, experience level and a role description"
            />
            <div className="flex flex-col gap-4">
              <div className="col-span-full">
                <CustomSelect
                  label="Company area"
                  name="company_function"
                  options={companyFunctions}
                  itemRef=""
                />
              </div>
              <div className="col-span-full">
                <CustomSelect
                  label="Role name"
                  name="role_name"
                  options={roles}
                />
              </div>

              <div className="py-8 h-3/5">
                <MultiRangeSlider
                  title="Experience level"
                  step={1}
                  min={0}
                  max={Object.entries(experienceLevels).length - 1}
                  onChange={() => {}}
                  valuesName={experienceLevels}
                  minName="min_experience_level"
                  maxName="max_experience_level"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <SectionHeader
              title="Now tell us about the location of the role"
              description="Please include if the job is remote/hybrid/in-office and the location of the office if required"
            />

            <div className="flex flex-col gap-4">
              <div className="">
                <CustomSelect
                  label="Where is this job based?"
                  name="work_type"
                  options={workTypes}
                />
              </div>
              {/* <div className="">
                <AddressField />
              </div> */}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <SectionHeader
              title="Tell us the details of the role"
              description="Please include the role description, responsibilities and requirements"
            />

            <div>
              <div className="">
                <DescriptionInput
                  label="Role description"
                  name="role_description"
                />
              </div>
              <div className="">
                <DescriptionInput
                  label="Role requirements"
                  name="role_requirements"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <SectionHeader
              title="Finally what you offer"
              description="Please include company benefits, salary and any other perks"
            />
          </div>

          <Button className="mt-4" type="submit">
            {"Save and continue"}
          </Button>
        </div>
      </form>
    </>
  );
}
