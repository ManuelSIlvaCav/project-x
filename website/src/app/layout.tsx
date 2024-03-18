import "@/styles/tailwind.css";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Toaster } from "react-hot-toast";
import MainInnerComponent from "./mainInnerComponent";

const inter = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s - Hoopme",
    default: "Hoopme - Your new recruiting experience",
  },
  description:
    "Hoopme is a new recruiting experience that helps you find the best talent for your team.",
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
