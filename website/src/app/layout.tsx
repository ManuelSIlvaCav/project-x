import "@/styles/tailwind.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

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

export default function RootLayout(props: Props) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-center" />
        {props.children}
      </body>
    </html>
  );
}
