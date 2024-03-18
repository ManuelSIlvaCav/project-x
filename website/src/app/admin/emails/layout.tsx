type Props = {} & Readonly<{
  children: React.ReactNode;
  params: Record<string, string>;
}>;

export default function EmailsLayout(props: Props) {
  return <div>{props.children}</div>;
}
