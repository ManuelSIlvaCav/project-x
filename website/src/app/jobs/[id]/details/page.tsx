import NavigationFragmentTabs from "@/components/NavigationFragmentTabs";
import CandidateList from "./CandidatesList";

//Is better to implement each page Candidates, Recommended, etc
//And have an internal navigation between them on the same page
export default function JobDetailPage() {
  return (
    <>
      <div className="flex flex-col gap-10">
        {/* Main Card description of Job */}
        <NavigationFragmentTabs />

        <CandidateList />
      </div>
    </>
  );
}
