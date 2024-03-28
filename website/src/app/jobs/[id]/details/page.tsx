import NavigationFragmentTabs from "@/components/NavigationFragmentTabs";
import CandidateList from "./CandidatesList";

type Props = {
  searchParams: {
    cursor?: string;
    page?: string;
  };
};
//Is better to implement each page Candidates, Recommended, etc
//And have an internal navigation between them on the same page
export default function JobDetailPage(props: Props) {
  //TODO important validate access to this section and redirect if not allowed (Only company should be able to see)

  //TODO get job information from server (company, job title, etc)
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
