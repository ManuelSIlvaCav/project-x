"use client";

import { Button } from "@/components/Button";
import Checkboxes from "@/components/Checkboxes";
import CustomSelectCheck from "@/components/CustomSelectCheck";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/16/solid";
import classNames from "classnames";
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
    return (
      <div
        className={classNames(
          `${t.visible ? "animate-enter" : "animate-leave"}`,
          "bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5  w-full max-w-sm overflow-hidden"
        )}
      >
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <CheckCircleIcon
                className="h-6 w-6 text-green-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium text-gray-900">
                Successfully saved!
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Anyone with a link can now view this file.
              </p>
            </div>
            <div className="ml-4 flex flex-shrink-0">
              <button
                type="button"
                className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => toast.dismiss(t.id)}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  });
};

export default function JobPostingForm() {
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        <h1 className="flex align-center font-bold text-2xl ">
          Tell us more about your job posting!
        </h1>
        <div className="">
          <CustomSelectCheck label="Function" name="role" options={roles} />
        </div>
        <div className="py-8">
          <Checkboxes
            label="Experience level"
            name="experience_level"
            options={[]}
          />
        </div>
        <div className="">
          <CustomSelectCheck
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
