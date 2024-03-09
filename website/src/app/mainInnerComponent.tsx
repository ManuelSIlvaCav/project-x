"use client";
import { SessionProvider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};

export default function MainInnerComponent(props: Props) {
  return <SessionProvider>{props.children}</SessionProvider>;
}
