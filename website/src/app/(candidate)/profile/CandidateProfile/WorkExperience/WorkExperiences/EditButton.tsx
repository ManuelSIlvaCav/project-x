"use client";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useContext, useRef } from "react";
import { WorkExperienceWizardContext } from "../WorkExperienceSection/context";

type Props = {
  workExperience: any;
};

export default function EditButton(props: Props) {
  const workExperienceContext = useContext(WorkExperienceWizardContext);
  let timeoutRef = useRef<number | null>(null);

  return (
    <Link
      href={"#work-experience"}
      className="relative -mx-3 -my-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors delay-150 hover:text-gray-900 hover:delay-0"
      onMouseEnter={() => {
        if (timeoutRef.current) {
          window?.clearTimeout(timeoutRef.current);
        }
      }}
      onMouseLeave={() => {
        timeoutRef.current = window?.setTimeout(() => {}, 200);
      }}
    >
      <PencilSquareIcon
        className="cursor-pointer"
        onClick={() => {
          workExperienceContext.setWorkExperience(props.workExperience);
          workExperienceContext.setFormOpen(true);
        }}
      />
    </Link>
  );
}
