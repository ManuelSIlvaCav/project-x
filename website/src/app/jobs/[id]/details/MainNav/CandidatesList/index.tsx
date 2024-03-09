import StackedList from "@/components/StackedList";

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
      <StackedList options={candidatesProfiles} href="/profiles" />
    </div>
  );
}
