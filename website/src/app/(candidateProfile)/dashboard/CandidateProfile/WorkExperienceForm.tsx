"use client";
import Card from "@/components/Card";
import CircularPlusButton from "@/components/CircularPlusButton";
import DropDown from "@/components/Dropdown";
import { TextField } from "@/components/Fields";
import TextArea from "@/components/TextArea";
import { useState } from "react";

function WorkExperienceQuickForm({ open }: { open: boolean }) {
  return (
    <Card className={`${open ? "" : "hidden"}`}>
      <form>
        <div className="space-y-12">
          <div className="border-b border-white/10 pb-12">
            <TextField label="Role title" name="rol" />
            <TextField label="Role title" name="company" />
            <DropDown />
            <TextArea label="Label" name="name" />
          </div>
        </div>
      </form>
    </Card>
  );
}

export default function WorkExperienceForm() {
  const [quickFormOpen, setQuickFormOpen] = useState(false);
  return (
    <>
      <div className="flex justify-between">
        <div>
          <h3 className="text-3xl font-bold">{"Work Experience"}</h3>
          <p className="italic font-light">
            {
              "Describe at least 3 of your work experiences, each with 3 or more bullet points."
            }
          </p>
        </div>
        <div className="flex flex-col r">
          <CircularPlusButton
            onClick={() => {
              console.log("adding new quick form");
              setQuickFormOpen(!quickFormOpen);
            }}
          />
        </div>
      </div>
      {/* Spacer div*/}
      <div className="h-4" />
      <WorkExperienceQuickForm open={quickFormOpen} />
      {/* Spacer div*/}
      <div className="h-4" />
      <Card>
        <p className="italic font-light">
          {
            "Describe at least 3 of your work experiences, each with 3 or more bullet points."
          }
        </p>

        <div className="space-y-12">
          <div className="border-b border-white/10 pb-12">
            <TextArea label="Label" name="name" />
          </div>
        </div>
      </Card>
    </>
  );
}
