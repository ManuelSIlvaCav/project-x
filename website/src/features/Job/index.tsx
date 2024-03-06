import Card from "@/components/Card";
import JobContent from "./JobContent";
import JobHeaderCard from "./JobHeaderCard";

export default function Job() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col px-4 sm:px-6">
      <Card className="p-8">
        <div className="flex flex-col gap-4">
          <JobHeaderCard />
          <JobContent />
        </div>
      </Card>
    </div>
  );
}
