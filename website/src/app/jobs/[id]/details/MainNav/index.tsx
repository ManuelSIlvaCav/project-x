import NavigationFragmentTabs from "@/components/NavigationFragmentTabs";
import CandidateList from "./CandidatesList";

//TODO build a context to handle the state of the tabs
export default function MainNavigation() {
  return (
    <div className="flex flex-col gap-10">
      <NavigationFragmentTabs />
      <CandidateList />
    </div>
  );
}
