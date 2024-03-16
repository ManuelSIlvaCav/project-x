import AdminSideBarNavigation from "@/components/SideBarLayout/AdminSideBarNavigation";

type Props = {} & Readonly<{
  children: React.ReactNode;
}>;

export default function AdminLayout(props: Props) {
  return <AdminSideBarNavigation>{props.children}</AdminSideBarNavigation>;
}
