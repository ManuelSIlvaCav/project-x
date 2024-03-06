import type { Metadata } from "next";
import { Header } from "./Header";

export const metadata: Metadata = {
  title: {
    template: "%s - Unka",
    default: "Unka - Your new recruiting experience",
  },
  description:
    "By leveraging insights from our network of industry insiders, you’ll know exactly when to buy to maximize profit, and exactly when to sell to avoid painful losses.",
};

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
