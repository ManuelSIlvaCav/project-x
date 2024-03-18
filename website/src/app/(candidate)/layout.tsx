import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import authOptions from "../api/auth/[...nextauth]/options";
import { Header } from "./Header";

export const metadata: Metadata = {
  title: {
    template: "%s - Unka",
    default: "Unka - Your new recruiting experience",
  },
  description:
    "By leveraging insights from our network of industry insiders, you’ll know exactly when to buy to maximize profit, and exactly when to sell to avoid painful losses.",
};

type Props = {} & Readonly<{
  children: React.ReactNode;
}>;

export default async function CandidateLayout(props: Props) {
  const session = await getServerSession(authOptions);

  if (
    !["candidate", "admin"].includes(session?.user?.generalRole ?? "") ||
    !session?.user?.accessToken
  ) {
    //Redirect to user profile or company depending on user role
    redirect("/");
  }
  return (
    //Build the Profile layout with the Header - for candidate profile
    <div>
      <Header />
      <div className="mx-auto flex w-full max-w-2xl flex-col px-4 sm:px-6">
        {props.children}
      </div>
    </div>
  );
}
