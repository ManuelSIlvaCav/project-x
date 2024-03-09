import StackedList from "@/components/StackedList";

const candidatesProfiles = [
  {
    id: "1",
    title: "John Doe",
    description: "Google",
    imageUrl: "https://randomuser.me/api/portraits",
  },
  {
    id: "2",
    title: "Jane Doe",
    description: "Google",
    imageUrl: "https://randomuser.me/api/portraits",
  },
  {
    id: "3",
    title: "John Doe",
    description: "Google",
    imageUrl: "https://randomuser.me/api/portraits",
  },
  {
    id: "4",
    title: "Jane Doe",
    description: "Google",
    imageUrl: "https://randomuser.me/api/portraits",
  },
];

export default function CandidateList() {
  return (
    <div>
      <StackedList options={candidatesProfiles} isCompany={true} />
    </div>
  );
}
