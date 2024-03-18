import authOptions from "@/app/api/auth/[...nextauth]/options";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Header } from "./Header";

export const metadata: Metadata = {
  title: {
    template: "%s - Unka",
    default: "Unka - Your new recruiting experience",
  },
  description:
    "By leveraging insights from our network of industry insiders, you’ll know exactly when to buy to maximize profit, and exactly when to sell to avoid painful losses.",
};

export default async function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  console.log({ session });

  if (session?.user?.generalRole !== "company" || !session?.user?.accessToken) {
    //Redirect to user profile or company depending on user role
    redirect("/");
  }

  return (
    //Build the Profile layout with the Header - Main and Footer
    <div>
      <Header />
      <div className="mx-auto flex w-full max-w-2xl flex-col px-4 sm:px-6">
        {children}
      </div>
    </div>
  );
}
