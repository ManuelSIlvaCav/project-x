import { Header } from "@/app/(company)/company/(internal)/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s - Hoopme",
    default: "Hoopme - Your new recruiting experience",
  },
};

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    //Build the Profile layout with the Header - Main and Footer
    <div>
      <Header />
      <div className="mx-auto flex w-full max-w-4xl flex-col px-4 sm:px-6">
        {children}
      </div>
    </div>
  );
}
