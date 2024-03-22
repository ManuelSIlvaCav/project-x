import getCandidateRecommendation from "@/app/lib/actions/company/getCandidateRecommendations";
import Table from "@/components/Table";

const candidatesProfiles = [
  {
    id: "1",
    title: "John Doe",
    description: "Google",
    imageUrl: "https://randomuser.me/api/portraits",
    href: "/details",
  },
  {
    id: "2",
    title: "Jane Doe",
    description: "Google",
    imageUrl: "https://randomuser.me/api/portraits",
    href: "/details",
  },
  {
    id: "3",
    title: "John Doe",
    description: "Google",
    imageUrl: "https://randomuser.me/api/portraits",
    href: "/details",
  },
  {
    id: "4",
    title: "Jane Doe",
    description: "Google",
    imageUrl: "https://randomuser.me/api/portraits",
    href: "/details",
  },
];

export default function CandidateList() {
  return (
    <div>
      <Table
        title={""}
        description={""}
        topRightButton={undefined}
        columns={[]}
        query={getCandidateRecommendation}
      />
      {/* <StackedList options={candidatesProfiles} href="/profiles" /> */}
    </div>
  );
}
