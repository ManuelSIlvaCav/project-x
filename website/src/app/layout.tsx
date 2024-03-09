import "@/styles/tailwind.css";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Toaster } from "react-hot-toast";
import MainInnerComponent from "./mainInnerComponent";

const inter = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s - Unka",
    default: "Unka - Your new recruiting experience",
  },
  description:
    "By leveraging insights from our network of industry insiders, you’ll know exactly when to buy to maximize profit, and exactly when to sell to avoid painful losses.",
};

type Props = { params: Record<string, any> } & Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout(props: Props) {
  const { children } = props;
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainInnerComponent>
          <Toaster />
          {children}
        </MainInnerComponent>
      </body>
    </html>
  );
}
