"use client";

import SideBarNavigation from "./";

import { HomeIcon, UsersIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: HomeIcon },
  { name: "Emails", href: "/admin/emails", icon: UsersIcon },
  { name: "Companies", href: "/admin/companies", icon: UsersIcon },
  { name: "Profiles", href: "/admin/profiles", icon: UsersIcon },
];

type Props = {} & Readonly<{
  children: React.ReactNode;
}>;

export default function AdminSideBarNavigation(props: Props) {
  return (
    <SideBarNavigation navigationList={navigation}>
      {props.children}
    </SideBarNavigation>
  );
}
