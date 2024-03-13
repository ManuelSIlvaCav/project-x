import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s - Unka",
    default: "Unka - Your new recruiting experience",
  },
  description:
    "By leveraging insights from our network of industry insiders, you’ll know exactly when to buy to maximize profit, and exactly when to sell to avoid painful losses.",
};

type Props = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export default function Invitations(props: Props) {
  return (
    //Build the Profile layout with the Header - Main and Footer
    <main className="flex min-h-full overflow-hidden pt-16 sm:py-8">
      <div className="mx-auto flex w-full max-w-2xl flex-col px-4 sm:px-6">
        {props.children}
        {props.modal}
        <div id="modal-root" />
      </div>
    </main>
  );
}
