import StackedList from "@/components/StackedList";

const jobInviteList = [
  {
    id: "1",
    title: "Senior Software Engineer",
    subtitle: "Google",
    imageUrl: "https://picsum.photos/200",
    description:
      "We are looking for a Senior Software Engineer to join our team.",
    href: "/details",
  },
  {
    id: "2",
    title: "Product Designer",
    subtitle: "Facebook",
    imageUrl: "https://picsum.photos/200",
    description: "We are looking for a Product Designer to join our team.",
    href: "/details",
  },
  {
    id: "3",
    title: "Data Scientist",
    subtitle: "Amazon",
    imageUrl: "https://picsum.photos/200",
    description: "We are looking for a Data Scientist to join our team.",
    href: "/details",
  },
  {
    id: "4",
    title: "Senior Software Engineer",
    subtitle: "Google",
    imageUrl: "https://picsum.photos/200",
    description:
      "We are looking for a Senior Software Engineer to join our team.",
    href: "/details",
  },
  {
    id: "5",
    title: "Product Designer",
    subtitle: "Facebook",
    imageUrl: "https://picsum.photos/200",
    description: "We are looking for a Product Designer to join our team.",
    href: "/details",
  },
  {
    id: "6",
    title: "Data Scientist",
    subtitle: "Amazon",
    imageUrl: "https://picsum.photos/200",
    description: "We are looking for a Data Scientist to join our team.",
    href: "/details",
  },
];

export default function JobsList() {
  //We call all the company joblistings here and pass them to the StackedList component
  return (
    <div className="flex flex-col gap-4">
      <div className="pl-5">
        <h1 className="text-2xl font-bold">Your Job postings</h1>
      </div>
      <StackedList options={jobInviteList} href="/jobs/" />
    </div>
  );
}
