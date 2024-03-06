import StackedList from "@/components/StackedList";

const jobInviteList = [
  {
    id: "1",
    title: "Senior Software Engineer",
    subtitle: "Google",
    imageUrl: "https://picsum.photos/200",
    description:
      "We are looking for a Senior Software Engineer to join our team.",
  },
  {
    id: "2",
    title: "Product Designer",
    subtitle: "Facebook",
    imageUrl: "https://picsum.photos/200",
    description: "We are looking for a Product Designer to join our team.",
  },
  {
    id: "3",
    title: "Data Scientist",
    subtitle: "Amazon",
    imageUrl: "https://picsum.photos/200",
    description: "We are looking for a Data Scientist to join our team.",
  },
  {
    id: "4",
    title: "Senior Software Engineer",
    subtitle: "Google",
    imageUrl: "https://picsum.photos/200",
    description:
      "We are looking for a Senior Software Engineer to join our team.",
  },
  {
    id: "5",
    title: "Product Designer",
    subtitle: "Facebook",
    imageUrl: "https://picsum.photos/200",
    description: "We are looking for a Product Designer to join our team.",
  },
  {
    id: "6",
    title: "Data Scientist",
    subtitle: "Amazon",
    imageUrl: "https://picsum.photos/200",
    description: "We are looking for a Data Scientist to join our team.",
  },
];

export default function JobsList() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Your Job postings</h1>
      <StackedList options={jobInviteList} href="/jobs/" />
    </div>
  );
}
